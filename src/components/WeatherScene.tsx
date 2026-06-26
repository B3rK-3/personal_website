import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

type WeatherKind = 'sunny' | 'partly-sunny' | 'rain'

type WeatherSceneProps = {
  weather: WeatherKind
}

type ActiveRainDrop = {
  id: number
  cloudIndex: number
  x: number
  y: number
  size: number
  duration: number
  tilt: number
}

export function WeatherScene({ weather }: WeatherSceneProps) {
  const cloudRefs = useRef<Array<HTMLImageElement | null>>([])
  const nextDropId = useRef(0)
  const [activeRainDrops, setActiveRainDrops] = useState<Array<ActiveRainDrop>>([])

  useEffect(() => {
    if (weather !== 'rain') {
      setActiveRainDrops([])
      return
    }

    let isCancelled = false
    const spawnTimers: Array<number> = []
    const removalTimers: Array<number> = []

    const spawnDropFromCloud = (cloudIndex: number) => {
      const cloud = cloudRefs.current[cloudIndex]?.getBoundingClientRect()
      if (!cloud || cloud.width <= 0 || cloud.height <= 0) return

      const id = nextDropId.current
      nextDropId.current += 1

      const x = cloud.left + cloud.width * (0.18 + Math.random() * 0.64)
      const y = cloud.top + cloud.height * (0.64 + Math.random() * 0.22)
      const duration = 1200 + Math.random() * 500

      setActiveRainDrops((drops) => [
        ...drops.slice(-24),
        {
          id,
          cloudIndex,
          x,
          y,
          duration,
          size: 20 + Math.random() * 8,
          tilt: -10 + Math.random() * 20,
        },
      ])

      const removalTimer = window.setTimeout(() => {
        setActiveRainDrops((drops) => drops.filter((drop) => drop.id !== id))
      }, duration)

      removalTimers.push(removalTimer)
    }

    let previousCloudIndex: number | null = null

    const scheduleNextDrop = (delay: number) => {
      const timer = window.setTimeout(() => {
        if (isCancelled) return

        const cloudIndexes = cloudRefs.current
          .map((cloud, cloudIndex) => ({ cloud, cloudIndex }))
          .filter(({ cloud }) => Boolean(cloud))
          .map(({ cloudIndex }) => cloudIndex)

        if (cloudIndexes.length > 0) {
          const eligibleCloudIndexes =
            cloudIndexes.length === 1
              ? cloudIndexes
              : cloudIndexes.filter(
                  (cloudIndex) => cloudIndex !== previousCloudIndex,
                )
          const cloudIndex =
            eligibleCloudIndexes[
              Math.floor(Math.random() * eligibleCloudIndexes.length)
            ]

          previousCloudIndex = cloudIndex
          spawnDropFromCloud(cloudIndex)
        }

        scheduleNextDrop(180 + Math.random() * 260)
      }, delay)

      spawnTimers.push(timer)
    }

    scheduleNextDrop(80)

    return () => {
      isCancelled = true
      spawnTimers.forEach((timer) => window.clearTimeout(timer))
      removalTimers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [weather])

  if (weather !== 'sunny' && weather !== 'partly-sunny' && weather !== 'rain') return null
  return (
    <>
      <div className="weather-scene weather-scene-back" aria-hidden="true">
        <img className="weather-sun" src="/sun.png" alt="" draggable={false} />
      </div>
      {(weather === 'partly-sunny' || weather === 'rain') && (
        <>
          <div className="weather-scene weather-scene-mid" aria-hidden="true">
            <img
              className="weather-cloud weather-cloud-drift weather-cloud-drift-1"
              src="/cloud2.png"
              alt=""
              draggable={false}
              ref={(element) => {
                cloudRefs.current[0] = element
              }}
            />
            <img
              className="weather-cloud weather-cloud-drift weather-cloud-drift-2"
              src="/cloud3.png"
              alt=""
              draggable={false}
              ref={(element) => {
                cloudRefs.current[1] = element
              }}
            />
            <img
              className="weather-cloud weather-cloud-drift weather-cloud-drift-3"
              src="/cloud1.png"
              alt=""
              draggable={false}
              ref={(element) => {
                cloudRefs.current[2] = element
              }}
            />
            <img
              className="weather-cloud weather-cloud-drift weather-cloud-drift-4"
              src="/cloud2.png"
              alt=""
              draggable={false}
              ref={(element) => {
                cloudRefs.current[3] = element
              }}
            />
          </div>
          {weather === 'rain' && (
            <div className="weather-scene weather-scene-rain" aria-hidden="true">
              {activeRainDrops.map((drop) => (
                <span
                  key={drop.id}
                  className="weather-raindrop"
                  data-cloud-index={drop.cloudIndex}
                  style={
                    {
                      '--rain-x': `${drop.x}px`,
                      '--rain-y': `${drop.y}px`,
                      '--rain-duration': `${drop.duration}ms`,
                      '--rain-size': `${drop.size}px`,
                      '--rain-tilt': `${drop.tilt}deg`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          )}
          <div className="weather-scene weather-scene-front" aria-hidden="true">
            <img
              className="weather-cloud weather-cloud-partly-sunny"
              src="/cloud1.png"
              alt=""
              draggable={false}
              ref={(element) => {
                cloudRefs.current[4] = element
              }}
            />
          </div>
        </>
      )}
    </>
  )
}
