import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/tests/slitscan')({
  component: SlitScanDemo,
})

const IMAGE_POOL = [
  '/projects/fashion-diagram.png',
  '/projects/flownjit.png',
  '/projects/flownjit1.png',
  '/sun.png',
  '/bg.avif',
]

const SLICE_COUNT = 25
const PULL_RADIUS = 3
const MAX_PULL = 245
const MAX_ALIGNED_NEIGHBOURS = 1
const ALIGN_START = 0.88
const DEFAULT_CURVE_FREQUENCY = 1
const DEFAULT_PULL_START = 0.18
const DEFAULT_PULL_END = 0.82
const DEFAULT_RELEASE_LIMIT = 1.4
const DEFAULT_IMAGE_WIDTH = 0.6
const DEFAULT_IMAGE_HEIGHT = 0.64
const SLANT_DEGREES = 3.5
const ROTATION_DEGREES = 3

function SlitScanDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageSrc, setImageSrc] = useState(IMAGE_POOL[0])
  const [curveFrequency, setCurveFrequency] = useState(DEFAULT_CURVE_FREQUENCY)
  const [imageWidth, setImageWidth] = useState(DEFAULT_IMAGE_WIDTH)
  const [imageHeight, setImageHeight] = useState(DEFAULT_IMAGE_HEIGHT)
  const [pullStart, setPullStart] = useState(DEFAULT_PULL_START)
  const [pullEnd, setPullEnd] = useState(DEFAULT_PULL_END)
  const [releaseLimit, setReleaseLimit] = useState(DEFAULT_RELEASE_LIMIT)
  const [stageImageWidth, setStageImageWidth] = useState(DEFAULT_IMAGE_WIDTH)
  const [stageImageHeight, setStageImageHeight] = useState(DEFAULT_IMAGE_HEIGHT)
  const curveFrequencyRef = useRef(curveFrequency)
  const pullStartRef = useRef(pullStart)
  const pullEndRef = useRef(pullEnd)
  const releaseLimitRef = useRef(releaseLimit)
  const boundarySeedsRef = useRef(
    Array.from({ length: SLICE_COUNT + 1 }, (_, index) => {
      if (index === 0 || index === SLICE_COUNT) return 0
      return Math.random() * 2 - 1
    }),
  )

  useEffect(() => {
    curveFrequencyRef.current = curveFrequency
    pullStartRef.current = pullStart
    pullEndRef.current = pullEnd
    releaseLimitRef.current = releaseLimit
  }, [curveFrequency, pullEnd, pullStart, releaseLimit])

  useEffect(() => {
    const resizeCommit = window.setTimeout(() => {
      setStageImageWidth(imageWidth)
      setStageImageHeight(imageHeight)
    }, 120)

    return () => window.clearTimeout(resizeCommit)
  }, [imageHeight, imageWidth])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const image = new Image()
    image.src = imageSrc

    let animationFrame = 0
    let width = 0
    let height = 0
    let stageX = 0
    let stageY = 0
    let stageWidth = 0
    let stageHeight = 0
    let pointerSlice = Math.floor(SLICE_COUNT / 2)
    let pointerPull = 0
    let pullProgress = 0
    let alignmentProgress = 0
    let isPointerActive = false
    let sliceOffsets = new Array<number>(SLICE_COUNT).fill(0)
    let targetOffsets = new Array<number>(SLICE_COUNT).fill(0)
    let restingOffsets = new Array<number>(SLICE_COUNT).fill(0)
    let cachedSlices: HTMLCanvasElement[] = []
    let cachedSliceWidth = 0
    let cachedStageHeight = 0
    let cachedSliceBounds: Array<{
      x: number
      y: number
      width: number
      height: number
    }> = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      stageWidth = Math.min(width * stageImageWidth, 1600)
      stageHeight = Math.min(height * stageImageHeight, stageWidth * 0.78)
      stageX = (width - stageWidth) / 2
      stageY = Math.max(56, height * 0.07)

      restingOffsets = restingOffsets.map((_, index) => {
        const smallCutVariance =
          Math.sin(index * 1.7) * 10 + Math.cos(index * 0.47) * 8
        const edgeLooseness = Math.abs(index / (SLICE_COUNT - 1) - 0.5) * 28
        return smallCutVariance + edgeLooseness
      })
      buildSliceCache()
      recalculateTargets()
    }

    const boundaryShift = (boundaryIndex: number) => {
      const t = boundaryIndex / SLICE_COUNT
      const edgeFade = Math.sin(t * Math.PI)
      return (
        boundarySeedsRef.current[boundaryIndex] *
        edgeFade *
        Math.tan((SLANT_DEGREES * Math.PI) / 180) *
        stageHeight *
        0.58
      )
    }
    const buildSliceCache = () => {
      if (!image.complete || image.naturalWidth === 0) return

      const coverScale = Math.max(
        stageWidth / image.naturalWidth,
        stageHeight / image.naturalHeight,
      )
      const sourceWidth = stageWidth / coverScale
      const sourceHeight = stageHeight / coverScale
      const sourceX = (image.naturalWidth - sourceWidth) / 2
      const sourceY = (image.naturalHeight - sourceHeight) / 2
      const destinationSliceWidth = stageWidth / SLICE_COUNT

      cachedSliceWidth = destinationSliceWidth
      cachedStageHeight = stageHeight
      const cacheScale = Math.min(window.devicePixelRatio || 1, 2)
      cachedSliceBounds = []
      const boundaryShifts = Array.from(
        { length: SLICE_COUNT + 1 },
        (_, boundaryIndex) => boundaryShift(boundaryIndex),
      )

      cachedSlices = Array.from({ length: SLICE_COUNT }, (_, index) => {
        const leftTop = index * destinationSliceWidth + boundaryShifts[index]
        const rightTop =
          (index + 1) * destinationSliceWidth + boundaryShifts[index + 1]
        const leftBottom = index * destinationSliceWidth - boundaryShifts[index]
        const rightBottom =
          (index + 1) * destinationSliceWidth - boundaryShifts[index + 1]
        const minX = Math.floor(
          Math.min(leftTop, rightTop, leftBottom, rightBottom),
        )
        const maxX = Math.ceil(
          Math.max(leftTop, rightTop, leftBottom, rightBottom),
        )
        const cssWidth = maxX - minX
        const cssHeight = Math.ceil(stageHeight)
        const sliceCanvas = document.createElement('canvas')

        cachedSliceBounds[index] = {
          x: minX,
          y: 0,
          width: cssWidth,
          height: cssHeight,
        }
        sliceCanvas.width = Math.ceil(cssWidth * cacheScale)
        sliceCanvas.height = Math.ceil(cssHeight * cacheScale)

        const sliceContext = sliceCanvas.getContext('2d')
        if (!sliceContext) return sliceCanvas

        sliceContext.imageSmoothingEnabled = true
        sliceContext.imageSmoothingQuality = 'high'
        sliceContext.setTransform(cacheScale, 0, 0, cacheScale, 0, 0)
        sliceContext.translate(-minX, 0)
        sliceContext.beginPath()
        sliceContext.moveTo(leftTop, 0)
        sliceContext.lineTo(rightTop, 0)
        sliceContext.lineTo(rightBottom, stageHeight)
        sliceContext.lineTo(leftBottom, stageHeight)
        sliceContext.closePath()
        sliceContext.clip()
        sliceContext.drawImage(
          image,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          stageWidth,
          stageHeight,
        )

        return sliceCanvas
      })
    }

    const recalculateTargets = () => {
      targetOffsets = targetOffsets.map((_, index) => {
        const resting = restingOffsets[index]
        if (!isPointerActive) return resting

        const distance = Math.abs(index - pointerSlice)
        if (distance > PULL_RADIUS) return resting

        const normalizedDistance = distance / PULL_RADIUS
        const oneWaveX = (1 - normalizedDistance) * (Math.PI / 2)
        const fastElasticFalloff =
          Math.sin(oneWaveX * curveFrequencyRef.current) /
          Math.sin((Math.PI / 2) * curveFrequencyRef.current)
        const sinusoidalTarget = resting + pointerPull * fastElasticFalloff

        if (distance > MAX_ALIGNED_NEIGHBOURS) return sinusoidalTarget

        const alignedTarget = restingOffsets[pointerSlice] + pointerPull
        return (
          sinusoidalTarget +
          (alignedTarget - sinusoidalTarget) * alignmentProgress
        )
      })
    }

    const setPointerSlice = (clientX: number) => {
      const normalizedX = Math.min(
        1,
        Math.max(0, (clientX - stageX) / stageWidth),
      )
      pointerSlice = Math.min(
        SLICE_COUNT - 1,
        Math.max(0, Math.floor(normalizedX * SLICE_COUNT)),
      )
    }

    const updatePull = (event: PointerEvent) => {
      setPointerSlice(event.clientX)
      const normalizedY = Math.max(0, (event.clientY - stageY) / stageHeight)
      if (normalizedY > releaseLimitRef.current) {
        isPointerActive = false
        pullProgress = 0
        alignmentProgress = 0
        pointerPull = 0
        recalculateTargets()
        return
      }

      const pullRange = releaseLimitRef.current - pullStartRef.current
      pullProgress = Math.min(
        1,
        Math.max(0, (normalizedY - pullStartRef.current) / pullRange),
      )
      const alignRange = pullEndRef.current - pullStartRef.current
      alignmentProgress = Math.min(
        1,
        Math.max(0, (normalizedY - pullStartRef.current) / alignRange),
      )
      pointerPull = MAX_PULL * pullProgress
      isPointerActive = true
      recalculateTargets()
    }

    const releasePull = () => {
      isPointerActive = false
      pullProgress = 0
      alignmentProgress = 0
      pointerPull = 0
      recalculateTargets()
    }

    const draw = () => {
      sliceOffsets = sliceOffsets.map(
        (offset, index) => offset + (targetOffsets[index] - offset) * 0.16,
      )

      context.clearRect(0, 0, width, height)
      context.fillStyle = '#111111'
      context.fillRect(0, 0, width, height)

      if (cachedSlices.length === SLICE_COUNT) {
        context.save()
        context.shadowColor = 'rgba(0, 0, 0, 0.52)'
        context.shadowBlur = 12
        context.shadowOffsetY = 12

        for (let index = 0; index < SLICE_COUNT; index += 1) {
          const sliceCanvas = cachedSlices[index]
          const sliceBounds = cachedSliceBounds[index]
          const centerX = stageX + sliceBounds.x + sliceBounds.width / 2
          const centerY =
            stageY +
            sliceOffsets[index] +
            sliceBounds.y +
            sliceBounds.height / 2
          const rotation =
            boundarySeedsRef.current[index] *
            ((ROTATION_DEGREES * Math.PI) / 180) *
            (1 - alignmentProgress)

          context.save()
          context.translate(centerX, centerY)
          context.rotate(rotation)
          context.drawImage(
            sliceCanvas,
            -sliceBounds.width / 2,
            -sliceBounds.height / 2,
            sliceBounds.width,
            sliceBounds.height,
          )
          context.restore()
        }

        context.restore()
      }

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    image.onload = () => {
      buildSliceCache()
      draw()
    }
    if (image.complete) {
      buildSliceCache()
      draw()
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', updatePull)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', updatePull)
    }
  }, [imageSrc, stageImageHeight, stageImageWidth])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#111] font-mono text-[#eeeeee]">
      <nav className="fixed left-0 top-7 z-20 hidden w-28 flex-col gap-3 pl-1 text-[11px] uppercase leading-none tracking-[-0.08em] text-white/72 md:flex">
        <a href="/app">Home</a>
        <a href="/app/thoughts">Changelog</a>
        <a href="/app/projects">Manual</a>
        <a href="/app/experience">Pricing</a>
        <a href="/tests/slitscan">Status</a>
      </nav>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-10 flex justify-center pt-1 text-center text-[11px] uppercase tracking-[0.02em] text-white/80">
        <div>
          <div className="mx-auto mb-6 w-fit border border-white/60 px-2 py-0.5 leading-none">
            OCT.13.2025
          </div>
          <p>Introducing code.storage</p>
        </div>
      </header>

      <button
        type="button"
        onClick={() => setImageSrc(randomImage(imageSrc))}
        className="fixed right-5 top-5 z-20 rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase text-white/70 transition hover:border-white/60 hover:text-white"
      >
        Random image
      </button>

      <div className="fixed right-5 top-16 z-20 flex w-52 flex-col gap-3 rounded-2xl border border-white/15 bg-[#111]/70 p-3 text-[10px] uppercase tracking-[0.18em] text-white/55 backdrop-blur">
        <label className="flex flex-col gap-2">
          <span className="flex justify-between">
            Curve b<span>{curveFrequency.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min="0.35"
            max="1"
            step="0.05"
            value={curveFrequency}
            onInput={(event) =>
              setCurveFrequency(Number(event.currentTarget.value))
            }
            onChange={(event) =>
              setCurveFrequency(Number(event.currentTarget.value))
            }
            className="accent-white"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="flex justify-between">
            Image width<span>{Math.round(imageWidth * 100)}%</span>
          </span>
          <input
            type="range"
            min="0.55"
            max="1"
            step="0.01"
            value={imageWidth}
            onInput={(event) =>
              setImageWidth(Number(event.currentTarget.value))
            }
            onChange={(event) =>
              setImageWidth(Number(event.currentTarget.value))
            }
            className="accent-white"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="flex justify-between">
            Image height<span>{Math.round(imageHeight * 100)}%</span>
          </span>
          <input
            type="range"
            min="0.35"
            max="0.82"
            step="0.01"
            value={imageHeight}
            onInput={(event) =>
              setImageHeight(Number(event.currentTarget.value))
            }
            onChange={(event) =>
              setImageHeight(Number(event.currentTarget.value))
            }
            className="accent-white"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="flex justify-between">
            Pull start<span>{Math.round(pullStart * 100)}%</span>
          </span>
          <input
            type="range"
            min="0"
            max={Math.max(0, pullEnd - 0.05)}
            step="0.01"
            value={pullStart}
            onInput={(event) =>
              setPullStart(
                Math.min(Number(event.currentTarget.value), pullEnd - 0.05),
              )
            }
            onChange={(event) =>
              setPullStart(
                Math.min(Number(event.currentTarget.value), pullEnd - 0.05),
              )
            }
            className="accent-white"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="flex justify-between">
            Align start<span>{Math.round(pullEnd * 100)}%</span>
          </span>
          <input
            type="range"
            min={Math.min(1, pullStart + 0.05)}
            max={Math.max(0, releaseLimit - 0.05)}
            step="0.01"
            value={pullEnd}
            onInput={(event) =>
              setPullEnd(
                Math.min(
                  Math.max(Number(event.currentTarget.value), pullStart + 0.05),
                  releaseLimit - 0.05,
                ),
              )
            }
            onChange={(event) =>
              setPullEnd(
                Math.min(
                  Math.max(Number(event.currentTarget.value), pullStart + 0.05),
                  releaseLimit - 0.05,
                ),
              )
            }
            className="accent-white"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="flex justify-between">
            Release<span>{Math.round(releaseLimit * 100)}%</span>
          </span>
          <input
            type="range"
            min={Math.min(1, pullEnd + 0.05)}
            max="1.5"
            step="0.01"
            value={releaseLimit}
            onInput={(event) =>
              setReleaseLimit(
                Math.max(Number(event.currentTarget.value), pullEnd + 0.05),
              )
            }
            onChange={(event) =>
              setReleaseLimit(
                Math.max(Number(event.currentTarget.value), pullEnd + 0.05),
              )
            }
            className="accent-white"
          />
        </label>

        <span className="normal-case tracking-normal text-white/35">
          Slits tilt randomly when relaxed and straighten as they align. At
          align start the center three lock together. Pull outer slits further
          until release snaps everything back.
        </span>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-ns-resize touch-none"
        aria-label="Elastic slit-scan canvas using fixed image slices"
      />

      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-10 mx-auto max-w-[1360px] px-16 text-[22px] leading-9 text-white/86">
        <p>
          Today we&rsquo;re announcing a new product from the Pierre Computer
          Company that we&rsquo;re calling &ldquo;Code Storage&rdquo;{' '}
          <span className="text-[#a6a0ff]">(https://code.storage)</span>. Code
          Storage is a white-label, ultra low-latency git infrastructure layer
          that you can integrate directly into your applications in just a few
          lines of code.
        </p>
        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.32em] text-white/35">
          {imageSrc} · b={curveFrequency.toFixed(2)} · image{' '}
          {Math.round(imageWidth * 100)}×{Math.round(imageHeight * 100)} · align{' '}
          {Math.round(pullEnd * 100)} release {Math.round(releaseLimit * 100)} ·
          random {SLANT_DEGREES}° trapezoid slits · {SLICE_COUNT} fixed canvas
          slices
        </p>
      </div>
    </main>
  )
}

function randomImage(excluding?: string) {
  if (IMAGE_POOL.length === 1) return IMAGE_POOL[0]

  let next = IMAGE_POOL[Math.floor(Math.random() * IMAGE_POOL.length)]
  while (next === excluding) {
    next = IMAGE_POOL[Math.floor(Math.random() * IMAGE_POOL.length)]
  }
  return next
}
