import { createServerFn } from '@tanstack/react-start'

// Simple hash verification
async function verifyHash(score: number, nickname: string, hash: string) {
  const salt = process.env.GAME_SALT || 'asciitron-super-secret-salt-123!'
  const msgBuffer = new TextEncoder().encode(score + nickname + salt)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const expectedHash = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return expectedHash === hash
}

export const getHighscores = createServerFn({ method: 'GET' })
  .inputValidator((data: { currentScore?: number }) => data)
  .handler(async ({ data }) => {
    try {
      const url = process.env.UPSTASH_REDIS_REST_URL
      const token = process.env.UPSTASH_REDIS_REST_TOKEN

      if (!url || !token) {
        return { error: 'Upstash credentials missing' }
      }

      const currentScore = data.currentScore

      const pipelineBody = [['ZREVRANGE', 'highscores', '0', '4', 'WITHSCORES']]

      if (
        currentScore !== undefined &&
        currentScore !== null &&
        !isNaN(currentScore)
      ) {
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
        return { error: responseData.error || responseData[0].error }
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

      return { scores, playerRank }
    } catch (error) {
      console.error('Error fetching highscores:', error)
      return { error: 'Internal Server Error' }
    }
  })

export const saveHighscore = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { score: number; nickname: string; hash: string }) => data,
  )
  .handler(async ({ data }) => {
    try {
      const { score, nickname, hash } = data

      if (typeof score !== 'number' || !nickname || !hash) {
        return { error: 'Invalid payload' }
      }

      const isValid = await verifyHash(score, nickname, hash)
      if (!isValid) {
        return { error: 'Cheat detected: Invalid hash' }
      }

      const url = process.env.UPSTASH_REDIS_REST_URL
      const token = process.env.UPSTASH_REDIS_REST_TOKEN

      if (!url || !token) {
        return { error: 'Upstash credentials missing' }
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
        return { error: responseData.error }
      }

      return { success: true }
    } catch (error) {
      console.error('Error saving highscore:', error)
      return { error: 'Internal Server Error' }
    }
  })
