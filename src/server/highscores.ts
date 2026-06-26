export async function getHighscores({
  data,
}: {
  data: { currentScore?: number }
}) {
  const params = new URLSearchParams()
  if (data.currentScore !== undefined && data.currentScore !== null) {
    params.set('currentScore', String(data.currentScore))
  }
  const res = await fetch(`/api/highscores?${params.toString()}`)
  return res.json()
}

export async function saveHighscore({
  data,
}: {
  data: { score: number; nickname: string; hash: string }
}) {
  const res = await fetch('/api/highscores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
