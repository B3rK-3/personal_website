import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

export interface MatrixRainHandle {
  getCanvasDataURL: () => string | undefined
}

interface MatrixRainProps {
  width?: number
  height?: number
  paused?: boolean
}

const MatrixRain = forwardRef<MatrixRainHandle, MatrixRainProps>(
  ({ width = 800, height = 400, paused = false }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useImperativeHandle(ref, () => ({
      getCanvasDataURL: () => canvasRef.current?.toDataURL(),
    }))

    const pausedRef = useRef(paused)

    useEffect(() => {
      pausedRef.current = paused
    }, [paused])

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = width
      canvas.height = height

      const fontSize = 14
      const columns = Math.floor(width / fontSize)
      const drops: Array<number> = new Array(columns).fill(1)

      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()ァイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

      const draw = () => {
        if (pausedRef.current) return
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx.fillRect(0, 0, width, height)

        ctx.fillStyle = '#0f0'
        ctx.font = `${fontSize}px monospace`

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)]
          ctx.fillStyle = Math.random() > 0.98 ? '#fff' : '#0f0'
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      }

      if (pausedRef.current) {
        pausedRef.current = false
        for (let i = 0; i < 100; i++) draw()
        pausedRef.current = true
      }

      const interval = setInterval(draw, 40)
      return () => clearInterval(interval)
    }, [width, height])

    return (
      <canvas
        ref={canvasRef}
        className="rounded border border-green-900/50"
        style={{
          width: '100%',
          height: `${height}px`,
          imageRendering: 'pixelated',
        }}
      />
    )
  },
)

export default MatrixRain
