interface Env {
  UPSTASH_REDIS_REST_URL?: string
  UPSTASH_REDIS_REST_TOKEN?: string
  GAME_SALT?: string
}

async function verifyHash(score: number, nickname: string, hash: string, salt: string) {
  const msgBuffer = new TextEncoder().encode(score + nickname + salt)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const expectedHash = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return expectedHash === hash
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const url = context.env.UPSTASH_REDIS_REST_URL
    const token = context.env.UPSTASH_REDIS_REST_TOKEN

    if (!url || !token) {
      return new Response(JSON.stringify({ error: 'Upstash credentials missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const { searchParams } = new URL(context.request.url)
    const currentScoreStr = searchParams.get('currentScore')
    const currentScore =
      currentScoreStr !== null && currentScoreStr !== 'undefined'
        ? parseInt(currentScoreStr, 10)
        : undefined

    const pipelineBody: Array<any> = [['ZREVRANGE', 'highscores', '0', '4', 'WITHSCORES']]

    if (currentScore !== undefined && !isNaN(currentScore)) {
      pipelineBody.push(['ZCOUNT', 'highscores', `(${currentScore}`, '+inf'])
    }

    const response = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pipelineBody),
    })

    const responseData = await response.json()

    if (responseData.error || (responseData[0] && responseData[0].error)) {
      return new Response(
        JSON.stringify({ error: responseData.error || responseData[0].error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const scores = []
    const top5Result = responseData[0].result || []
    for (let i = 0; i < top5Result.length; i += 2) {
      scores.push({
        nickname: top5Result[i],
        score: parseInt(top5Result[i + 1]),
      })
    }

    let playerRank = null
    if (
      responseData.length > 1 &&
      responseData[1] &&
      responseData[1].result !== undefined
    ) {
      playerRank = responseData[1].result + 1
    }

    return new Response(JSON.stringify({ scores, playerRank }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching highscores:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const data = await context.request.json()
    const { score, nickname, hash } = data

    if (typeof score !== 'number' || !nickname || !hash) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const salt = context.env.GAME_SALT || 'asciitron-super-secret-salt-123!'
    const isValid = await verifyHash(score, nickname, hash, salt)
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Cheat detected: Invalid hash' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const url = context.env.UPSTASH_REDIS_REST_URL
    const token = context.env.UPSTASH_REDIS_REST_TOKEN

    if (!url || !token) {
      return new Response(JSON.stringify({ error: 'Upstash credentials missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        'ZADD',
        'highscores',
        'GT',
        score.toString(),
        nickname,
      ]),
    })

    const responseData = await response.json()
    if (responseData.error) {
      return new Response(JSON.stringify({ error: responseData.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error saving highscore:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
