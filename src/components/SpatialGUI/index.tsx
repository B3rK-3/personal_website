import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import resumeData from '../../data/resume.json'

const data = resumeData as any

const NAV_ITEMS = [
  'Home',
  'Experience',
  'Projects',
  'Research',
  'Terminal',
] as const
type NavItem = (typeof NAV_ITEMS)[number]

const ITEM_HEIGHT = 80
const ITEM_WIDTH = 160
const NAV_GUTTER_HALF = ITEM_HEIGHT / 2
const NAV_GUTTER_HALF_X = ITEM_WIDTH / 2

const SNAP_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
const SNAP_DURATION = '0.35s'

const wrapIndex = (idx: number, length: number) =>
  ((idx % length) + length) % length

// ─── useIsMobile Hook ───────────────────────────────────────────────────────
function useIsMobile(breakpoint = 800) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function SpatialGUI() {
  const isMobile = useIsMobile()
  // activeIndex is now boundless (can go infinite back and forth)
  const [activeIndex, setActiveIndex] = useState(0)

  const navigate = useCallback((dir: 1 | -1) => {
    setActiveIndex((prev) => prev + dir)
  }, [])

  const goToAbsolute = useCallback((idx: number) => {
    setActiveIndex(idx)
  }, [])

  // ── Wheel (desktop: vertical, mobile: horizontal) ──
  useEffect(() => {
    let lastWheelTime = 0
    const canScrollVertically = (el: Element | null): boolean => {
      if (!el || el === document.body || el === document.documentElement)
        return false
      if (el.scrollHeight > el.clientHeight) {
        const atTop = el.scrollTop <= 0
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
        return !atTop && !atBottom
      }
      return canScrollVertically(el.parentElement)
    }
    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)

      if (isMobile) {
        const target = e.target as Element

        if (
          target.closest('.nav-wheel-area') ||
          target.closest('.nav-gutter-area')
        ) {
          return
        }

        if (absY > absX && absY >= 10) {
          // On mobile, vertical scroll (wheel/trackpad) should only scroll content.
          // We disable navigation via vertical scroll to prevent accidental section jumps.
          return
        }

        if (absX > absY * 2 && absX >= 10) {
          if (Math.abs(e.deltaX) < 10) return
          e.preventDefault()
        } else {
          return
        }
      } else {
        if (absY < 10) return
        e.preventDefault()
      }

      const now = Date.now()
      if (now - lastWheelTime < 250) return
      lastWheelTime = now

      const delta = isMobile
        ? absX > absY * 2
          ? e.deltaX
          : e.deltaY
        : e.deltaY

      navigate(delta > 0 ? 1 : -1)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [navigate, isMobile])

  // ── Keyboard ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isMobile) {
        if (e.key === 'ArrowRight' || e.key === 'l') navigate(1)
        if (e.key === 'ArrowLeft' || e.key === 'h') navigate(-1)
      }
      if (e.key === 'ArrowDown' || e.key === 'j') navigate(1)
      if (e.key === 'ArrowUp' || e.key === 'k') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, isMobile])

  // ── Touch / Swipe ──
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return
      const touchTarget = e.target as Element
      if (
        touchTarget.closest('.nav-wheel-area') ||
        touchTarget.closest('.nav-gutter-area')
      ) {
        touchStart.current = null
        return
      }
      const dx = e.changedTouches[0].clientX - touchStart.current.x
      const dy = e.changedTouches[0].clientY - touchStart.current.y
      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)

      // Require minimum swipe distance
      const minSwipe = 40

      if (isMobile) {
        // horizontal swipe prioritized on mobile
        if (absDx > minSwipe && absDx > absDy) {
          // Only allow horizontal swipes to navigate between sections on mobile.
          // Vertical swipes are reserved for content scrolling.
          navigate(dx < 0 ? 1 : -1)
        }
      } else {
        // vertical swipe on desktop
        if (absDy > minSwipe) {
          e.preventDefault()
          e.stopPropagation()
          navigate(dy < 0 ? 1 : -1)
        }
      }
      touchStart.current = null
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [navigate, isMobile])

  const trueIndex = wrapIndex(activeIndex, NAV_ITEMS.length)

  if (isMobile) {
    return (
      <div className="h-screen w-screen bg-black text-white overflow-hidden relative font-mono">
        {/* ── Static Header (mobile) ── */}
        <header className="absolute top-3 right-4 z-50 text-right pointer-events-none">
          <h1 className="text-lg font-bold tracking-[0.15em] uppercase text-white">
            {data.personalInfo.name}
          </h1>
          <p className="text-[10px] text-zinc-600 tracking-[0.3em] mt-0.5 uppercase">
            {data.personalInfo.title}
          </p>
        </header>

        {/* ── Bottom bar (mobile) ── */}
        <div className="absolute bottom-3 left-0 right-0 z-50 flex justify-center gap-4 text-[11px] text-zinc-600 tracking-widest uppercase pointer-events-auto">
          <a
            href={data.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            Github
          </a>
          <a
            href={data.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${data.personalInfo.email}`}
            className="hover:text-white transition-colors duration-300"
          >
            Email
          </a>
          <Link
            to="/portfolio"
            className="hover:text-white transition-colors duration-300"
          >
            Portfolio
          </Link>
        </div>

        {/* ── Section counter (mobile) ── */}
        <div className="absolute bottom-3 left-4 z-50 text-[11px] text-zinc-600 tracking-widest uppercase pointer-events-none font-mono">
          <span className="text-white">
            {String(trueIndex + 1).padStart(2, '0')}
          </span>
          <span className="mx-1">/</span>
          <span>{String(NAV_ITEMS.length).padStart(2, '0')}</span>
        </div>

        {/* ── Vertical Stack: Nav → Gutter → Content ── */}
        <div
          className="grid grid-rows-[5%_8%_87%] h-full w-full relative"
          style={{ paddingTop: '80px', paddingBottom: '40px' }}
        >
          <NavigationWheelMobile
            activeIndex={activeIndex}
            onSelect={goToAbsolute}
          />
          <GeometricGutterMobile />
          <ContentStageMobile activeIndex={activeIndex} />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden relative font-mono">
      {/* ── Static Header ── */}
      <header className="absolute top-[2.5%] right-4 md:right-12 z-50 text-right pointer-events-none">
        <h1 className="text-2xl md:text-3xl font-bold tracking-[0.25em] uppercase text-white">
          {data.personalInfo.name}
        </h1>
        <p className="text-[10px] md:text-[12px] text-zinc-600 tracking-[0.4em] mt-1 uppercase">
          {data.personalInfo.title}
        </p>
      </header>

      {/* ── Bottom bar ── */}
      <div className="absolute bottom-6 right-4 md:right-12 z-50 flex gap-3 md:gap-6 text-[12px] md:text-[14px] text-zinc-600 tracking-widest uppercase pointer-events-auto">
        <a
          href={data.personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-300"
        >
          Github
        </a>
        <a
          href={data.personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-300"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${data.personalInfo.email}`}
          className="hover:text-white transition-colors duration-300"
        >
          Email
        </a>
        <Link
          to="/portfolio"
          className="hover:text-white transition-colors duration-300"
        >
          Portfolio
        </Link>
      </div>

      {/* ── Section counter ── */}
      <div className="absolute bottom-6 left-4 md:left-12 z-50 text-[12px] md:text-[14px] text-zinc-600 tracking-widest uppercase pointer-events-none font-mono">
        <span className="text-white">
          {String(trueIndex + 1).padStart(2, '0')}
        </span>
        <span className="mx-1">/</span>
        <span>{String(NAV_ITEMS.length).padStart(2, '0')}</span>
      </div>

      {/* ── 3-Column Grid (Desktop) ── */}
      <div className="grid grid-cols-[30%_10%_60%] h-full w-full relative">
        <NavigationWheel activeIndex={activeIndex} onSelect={goToAbsolute} />
        <GeometricGutter />
        <ContentStage activeIndex={activeIndex} />
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// DESKTOP COMPONENTS (original, unchanged)
// ═══════════════════════════════════════════════════════════════════════════════

function NavigationWheel({
  activeIndex,
  onSelect,
}: {
  activeIndex: number
  onSelect: (i: number) => void
}) {
  const windowRange = Array.from({ length: 7 }, (_, k) => activeIndex - 3 + k)
  const opacityWithDist = [1, 0.85, 0.65, 0.4, 0.2]
  const scaleWithDist = [1, 0.85, 0.6, 0.5, 0.2]
  return (
    <div className="relative h-full w-full flex flex-col items-end justify-center overflow-hidden">
      <div
        className="absolute pointer-events-none border-t border-b border-white z-20"
        style={{
          top: `calc(50% - ${NAV_GUTTER_HALF}px)`,
          height: ITEM_HEIGHT,
          width: `calc(80%)`,
        }}
      />

      <div
        className="absolute top-1/2 left-10 w-full"
        style={{ transform: 'translateY(-50%)' }}
      >
        <div
          className="relative w-full"
          style={{
            transform: `translate3d(0, ${-activeIndex * ITEM_HEIGHT - ITEM_HEIGHT / 2}px, 0)`,
            willChange: 'transform',
            transition: `transform ${SNAP_DURATION} ${SNAP_EASING}`,
          }}
        >
          {windowRange.map((absIdx) => {
            const wrappedIdx = wrapIndex(absIdx, NAV_ITEMS.length)
            const item = NAV_ITEMS[wrappedIdx]
            const dist = Math.abs(absIdx - activeIndex)
            const isActive = dist === 0
            const opacity = opacityWithDist[dist]
            const scale = scaleWithDist[dist]

            return (
              <div
                key={absIdx}
                className="absolute w-full flex items-center justify-center cursor-pointer"
                style={{
                  top: absIdx * ITEM_HEIGHT,
                  height: ITEM_HEIGHT,
                  opacity,
                  transform: `scale(${scale})`,
                  willChange: 'transform, opacity',
                  transition: `opacity ${SNAP_DURATION} ${SNAP_EASING}, transform ${SNAP_DURATION} ${SNAP_EASING}`,
                }}
                onClick={() => onSelect(absIdx)}
              >
                <span
                  className={`text-[2vw] uppercase tracking-[0.3em] font-black transition-colors duration-150 ${
                    isActive ? 'text-white' : 'text-zinc-600'
                  }`}
                >
                  {item}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Geometric Gutter (Center 10%, Desktop) ─────────────────────────────────
function GeometricGutter() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!svgRef.current) return

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect
      setHeight(rect.height)
    })

    observer.observe(svgRef.current)

    return () => observer.disconnect()
  }, [])

  const center = height / 2
  const topY = center - NAV_GUTTER_HALF
  const bottomY = center + NAV_GUTTER_HALF

  return (
    <div className="relative h-full w-full z-20 pointer-events-none">
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1={topY}
          x2="100%"
          y2={height * 0.1}
          stroke="white"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1={bottomY}
          x2="100%"
          y2={height * 0.9}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

// ─── Content Stage (Right 60%, Desktop) ─────────────────────────────────────
function ContentStage({ activeIndex }: { activeIndex: number }) {
  const windowRange = Array.from({ length: 7 }, (_, k) => activeIndex - 3 + k)

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute left-0 w-[calc(100%-calc(var(--spacing)*12))] border-t border-b border-white overflow-hidden"
        style={{ top: '10%', height: '80%' }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `translate3d(0, ${-activeIndex * 100}%, 0)`,
            willChange: 'transform',
            transition: `transform ${SNAP_DURATION} ${SNAP_EASING}`,
          }}
        >
          {windowRange.map((absIdx) => {
            const wrappedIdx = wrapIndex(absIdx, NAV_ITEMS.length)
            const item = NAV_ITEMS[wrappedIdx]

            return (
              <div
                key={absIdx}
                className="absolute left-0 w-full pl-12 mr-12 pb-12 flex items-center"
                style={{ top: `${absIdx * 100}%`, height: '100%' }}
              >
                <div className="w-full overflow-y-scroll max-h-full scrollbar-hide pr-4 pt-12">
                  <SectionContent section={item} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MOBILE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Navigation Wheel (Horizontal, Mobile) ──────────────────────────────────
function NavigationWheelMobile({
  activeIndex,
  onSelect,
}: {
  activeIndex: number
  onSelect: (i: number) => void
}) {
  const windowRange = Array.from({ length: 7 }, (_, k) => activeIndex - 3 + k)
  const opacityWithDist = [1, 0.85, 0.65, 0.4, 0.2]
  const scaleWithDist = [1, 0.85, 0.6, 0.5, 0.2]

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden nav-wheel-area">
      <div
        className="absolute pointer-events-none border-l border-r border-white z-20 bottom-0"
        style={{
          left: `calc(50% - ${NAV_GUTTER_HALF_X}px)`,
          width: ITEM_WIDTH,
          height: '100%',
        }}
      />

      <div
        className="absolute left-1/2 top-0 h-full"
        style={{ transform: 'translateX(-50%)' }}
      >
        <div
          className="relative h-full"
          style={{
            transform: `translate3d(${-activeIndex * ITEM_WIDTH - ITEM_WIDTH / 2}px, 0, 0)`,
            willChange: 'transform',
            transition: `transform ${SNAP_DURATION} ${SNAP_EASING}`,
          }}
        >
          {windowRange.map((absIdx) => {
            const wrappedIdx = wrapIndex(absIdx, NAV_ITEMS.length)
            const item = NAV_ITEMS[wrappedIdx]
            const dist = Math.abs(absIdx - activeIndex)
            const isActive = dist === 0
            const opacity = opacityWithDist[dist] ?? 0.1
            const scale = scaleWithDist[dist] ?? 0.2

            return (
              <div
                key={absIdx}
                className="absolute h-full flex items-center justify-center cursor-pointer"
                style={{
                  left: absIdx * ITEM_WIDTH,
                  width: ITEM_WIDTH,
                  opacity,
                  transform: `scale(${scale})`,
                  willChange: 'transform, opacity',
                  transition: `opacity ${SNAP_DURATION} ${SNAP_EASING}, transform ${SNAP_DURATION} ${SNAP_EASING}`,
                }}
                onClick={() => onSelect(absIdx)}
              >
                <span
                  className={`text-[14px] uppercase tracking-[0.15em] font-black transition-colors duration-150 whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-zinc-600'
                  }`}
                >
                  {item}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Geometric Gutter (Horizontal connecting lines, Mobile) ─────────────────
function GeometricGutterMobile() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [dims, setDims] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!svgRef.current) return

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect
      setDims({ width: rect.width, height: rect.height })
    })

    observer.observe(svgRef.current)
    return () => observer.disconnect()
  }, [])

  const { width, height } = dims
  const centerX = width / 2

  // Nav active slot borders (left / right)
  const navLeft = centerX - NAV_GUTTER_HALF_X
  const navRight = centerX + NAV_GUTTER_HALF_X

  // Content stage borders (left / right) — with some padding
  const contentPadding = 16
  const contentLeft = contentPadding
  const contentRight = width - contentPadding

  return (
    <div className="relative h-full w-full z-20 pointer-events-none nav-gutter-area">
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Left line: from nav left border → content left border */}
        <line
          x1={navLeft}
          y1={0}
          x2={contentLeft}
          y2={height}
          stroke="white"
          strokeWidth="1"
        />
        {/* Right line: from nav right border → content right border */}
        <line
          x1={navRight}
          y1={0}
          x2={contentRight}
          y2={height}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

// ─── Content Stage (Horizontal, Mobile) ─────────────────────────────────────
function ContentStageMobile({ activeIndex }: { activeIndex: number }) {
  const windowRange = Array.from({ length: 7 }, (_, k) => activeIndex - 3 + k)
  const contentPadding = 16

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute top-0 h-full border-l border-r border-white overflow-hidden"
        style={{ left: contentPadding, right: contentPadding }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `translate3d(${-activeIndex * 100}%, 0, 0)`,
            willChange: 'transform',
            transition: `transform ${SNAP_DURATION} ${SNAP_EASING}`,
          }}
        >
          {windowRange.map((absIdx) => {
            const wrappedIdx = wrapIndex(absIdx, NAV_ITEMS.length)
            const item = NAV_ITEMS[wrappedIdx]

            return (
              <div
                key={absIdx}
                className="absolute top-0 h-full flex items-start"
                style={{ left: `${absIdx * 100}%`, width: '100%' }}
              >
                <div
                  className="w-full overflow-y-auto max-h-full scrollbar-hide p-4 pt-4"
                  style={{
                    overscrollBehavior: 'contain',
                    touchAction: 'pan-y',
                  }}
                >
                  <SectionContent section={item} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Section Content Renderer ───────────────────────────────────────────────
function SectionContent({ section }: { section: NavItem }) {
  switch (section) {
    case 'Home':
      return <HomeContent />
    case 'Experience':
      return <ExperienceContent />
    case 'Projects':
      return <ProjectsContent />
    case 'Research':
      return <ResearchContent />
    case 'Terminal':
      return <TerminalContent />
    default:
      return null
  }
}

// ─── Content Components ─────────────────────────────────────────────────────

function HomeContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-6xl max-[800px]:text-4xl font-black uppercase tracking-tight leading-none">
        Software <br />
        <span className="text-zinc-600">Engineer</span>
      </h2>
      <p className="text-zinc-500 text-md leading-relaxed max-w-xl">
        {data.personalInfo.title}
      </p>
      <div className="flex flex-wrap gap-3 text-[12px] tracking-widest uppercase text-zinc-600 pt-2">
        <span className="border border-zinc-800 px-3 py-1">
          {data.personalInfo.location}
        </span>
        <span className="border border-zinc-800 px-3 py-1">
          {data.education[0]?.institution}
        </span>
      </div>
    </div>
  )
}

function ExperienceContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<
    Array<{ x: number; y: number; src: string; name: string; size: number }>
  >([])

  useEffect(() => {
    if (!containerRef.current) return
    const logos = [
      { src: '/logos/betterment.png', name: 'Betterment' },
      { src: '/logos/disent.png', name: 'Disent' },
      { src: '/logos/nasa.png', name: 'NASA' },
      { src: '/logos/princeton.png', name: 'Princeton' },
      { src: '/logos/xulab.png', name: 'XU Lab' },
      { src: '/logos/yale.png', name: 'Yale' },
    ]

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect
      const w = rect.width
      const h = rect.height

      // Don't calculate if the container is too small or invisible
      if (w < 50 || h < 50) return

      const isMobile = w < 600
      const size = isMobile ? 100 : 220 // logo size bounds
      const padding = 15

      const newPositions: Array<{
        x: number
        y: number
        src: string
        name: string
        size: number
      }> = []

      // Determine grid dimensions based on container aspect ratio
      const cols = w > 600 ? 3 : 2
      const rows = cols === 3 ? 2 : 3
      const cellW = w / cols
      const cellH = h / rows

      // Shuffle logos for a randomized distribution pattern
      const shuffledLogos = [...logos].sort(() => Math.random() - 0.5)

      shuffledLogos.forEach((logo, index) => {
        const col = index % cols
        const row = Math.floor(index / cols)

        // Calculate safe boundaries within the cell for the logo
        const minX = col * cellW + padding
        const maxX = col * cellW + cellW - size - padding
        const minY = row * cellH + padding
        const maxY = row * cellH + cellH - size - padding

        let x = minX
        let y = minY

        // Random jitter within the cell if space permits
        if (maxX > minX) {
          x = minX + Math.random() * (maxX - minX)
        } else {
          // If cell is too small, center it
          x = col * cellW + (cellW - size) / 2
        }

        if (maxY > minY) {
          y = minY + Math.random() * (maxY - minY)
        } else {
          y = row * cellH + (cellH - size) / 2
        }

        newPositions.push({ x, y, src: logo.src, name: logo.name, size })
      })
      setPositions(newPositions)
    })

    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      className="h-full w-full min-h-[60vh] relative overflow-hidden"
      ref={containerRef}
    >
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center transition-all duration-300 hover:scale-110 hover:z-20 cursor-default"
          style={{
            left: pos.x,
            top: pos.y,
            width: pos.size,
            height: pos.size,
          }}
        >
          <img
            src={pos.src}
            alt={pos.name}
            className="max-w-full max-h-full object-contain rounded-2xl transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}

function ProjectsContent() {
  return (
    <div className="space-y-6">
      {data.projects.map((proj: any, idx: number) => (
        <div key={idx} className="border-l border-zinc-800 pl-4">
          <h3 className="text-lg max-[800px]:text-base font-bold text-white uppercase tracking-wide mb-1">
            {proj.name}
          </h3>
          <p className="text-zinc-500 text-[14px] max-[800px]:text-[12px] leading-relaxed mb-2">
            {proj.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {proj.techStack.map((tech: string, tIdx: number) => (
              <span
                key={tIdx}
                className="text-[11px] px-2 py-0.5 border border-zinc-800 text-zinc-600 uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ResearchContent() {
  return (
    <div className="h-full w-full min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-zinc-400">
        Google Scholar
      </h3>
      <a
        href="https://scholar.google.com/citations?hl=en&user=P399EVAAAAAJ&view_op=list_works&authuser=2"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] rounded-2xl"
      >
        <img
          src="/logos/scholar.png"
          alt="Google Scholar"
          className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-2xl drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] bg-white p-4"
          draggable={false}
        />
      </a>
    </div>
  )
}

function TerminalContent() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg max-[800px]:text-base font-bold uppercase tracking-wide">
        Interactive Terminal
      </h3>
      <p className="text-zinc-500 text-[14px] max-[800px]:text-[12px] leading-relaxed max-w-md">
        Access the full interactive terminal — run BASIC programs, play games,
        and explore the virtual filesystem.
      </p>
      <Link
        to="/secret-location"
        className="inline-block border border-white text-white text-[12px] uppercase tracking-widest px-5 py-2 hover:bg-white hover:text-black transition-colors duration-200"
      >
        Launch Terminal →
      </Link>
    </div>
  )
}
