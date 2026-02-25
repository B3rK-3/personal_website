import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import resumeData from '../../data/resume.json'

// ─── Data ───────────────────────────────────────────────────────────────────
const data = resumeData as any

const NAV_ITEMS = [
  'Home',
  'Experience',
  'Projects',
  'Research',
  'Terminal',
] as const
type NavItem = (typeof NAV_ITEMS)[number]

// Physics & Dimensions
const ITEM_HEIGHT = 80 // height for each nav slot
const NAV_GUTTER_HALF = ITEM_HEIGHT / 2 // 40px

// We want the left nav border to span the biggest text ("EXPERIENCE").
// A width of ~280px usually fits 3xl with 0.3em tracking perfectly.
const MAX_TEXT_WIDTH = 280

const SNAP_SPRING = { type: 'spring' as const, stiffness: 200, damping: 28 }

// Helper for safe modulo on negative numbers
const wrapIndex = (idx: number, length: number) =>
  ((idx % length) + length) % length

// ─── Main Component ─────────────────────────────────────────────────────────
export default function SpatialGUI() {
  // activeIndex is now boundless (can go infinite back and forth)
  const [activeIndex, setActiveIndex] = useState(0)

  const navigate = useCallback((dir: 1 | -1) => {
    setActiveIndex((prev) => {
      return prev + dir
    })
  }, [])

  const goToAbsolute = useCallback((idx: number) => {
    setActiveIndex(idx)
  }, [])

  // ── Wheel ──
  useEffect(() => {
    let lastWheelTime = 0
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Require a meaningful scroll threshold to ignore tiny trackpad nudges
      if (Math.abs(e.deltaY) < 3) return

      const now = Date.now()
      if (now - lastWheelTime < 150) return
      lastWheelTime = now

      navigate(e.deltaY > 0 ? 1 : -1)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [navigate])

  // ── Keyboard ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') navigate(1)
      if (e.key === 'ArrowUp' || e.key === 'k') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const trueIndex = wrapIndex(activeIndex, NAV_ITEMS.length)

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidde2.5%lative font-mono">
      {/* ── Static Header ── */}
      <header className="absolute top-[2.5%] right-12 z-50 text-right pointer-events-none">
        <h1 className="text-3xl font-bold tracking-[0.25em] uppercase text-white">
          {data.personalInfo.name}
        </h1>
        <p className="text-[12px] text-zinc-600 tracking-[0.4em] mt-1 uppercase">
          {data.personalInfo.title}
        </p>
      </header>

      {/* ── Bottom bar ── */}
      <div className="absolute bottom-6 right-12 z-50 flex gap-6 text-[14px] text-zinc-600 tracking-widest uppercase pointer-events-auto">
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
      <div className="absolute bottom-6 left-12 z-50 text-[14px] text-zinc-600 tracking-widest uppercase pointer-events-none font-mono">
        <span className="text-white">
          {String(trueIndex + 1).padStart(2, '0')}
        </span>
        <span className="mx-1">/</span>
        <span>{String(NAV_ITEMS.length).padStart(2, '0')}</span>
      </div>

      {/* ── 3-Column Grid ── */}
      <div className="grid grid-cols-[30%_10%_60%] h-full w-full relative">
        {/* Left: Infinite Navigation Wheel */}
        <NavigationWheel activeIndex={activeIndex} onSelect={goToAbsolute} />

        {/* Center: Angled SVG Gutter Lines */}
        <GeometricGutter />

        {/* Right: Gated Content Stage (80vh) */}
        <ContentStage activeIndex={activeIndex} />
      </div>
    </div>
  )
}

// ─── Navigation Wheel (Left 30%) ────────────────────────────────────────────
function NavigationWheel({
  activeIndex,
  onSelect,
}: {
  activeIndex: number
  onSelect: (i: number) => void
}) {
  // Generate a sliding window of -4 to +4 items around the activeIndex
  const windowRange = Array.from({ length: 7 }, (_, k) => activeIndex - 3 + k)
  // console.log(windowRange)
  const opacityWithDist = [1, 0.85, 0.65, 0.4, 0.2]
  const scaleWithDist = [1, 0.85, 0.6, 0.5, 0.2]
  return (
    <div className="relative h-full w-full flex flex-col items-end justify-center overflow-hidden">
      {/* Static Nav Borders wrapping the active slot (longest text width) */}
      <div
        className="absolute pointer-events-none border-t border-b border-white z-20"
        style={{
          top: `calc(50% - ${NAV_GUTTER_HALF}px)`,
          height: ITEM_HEIGHT,
          width: `calc(80%)`,
        }}
      />

      {/* The scrolling track */}
      <div
        className="absolute top-1/2 left-10 w-full"
        style={{ transform: 'translateY(-50%)' }}
      >
        <motion.div
          className="relative w-full"
          animate={{ y: -activeIndex * ITEM_HEIGHT - ITEM_HEIGHT / 2 }}
          transition={SNAP_SPRING}
        >
          {windowRange.map((absIdx) => {
            const wrappedIdx = wrapIndex(absIdx, NAV_ITEMS.length)
            const item = NAV_ITEMS[wrappedIdx]
            const dist = Math.abs(absIdx - activeIndex)
            const isActive = dist === 0
            const opacity = opacityWithDist[dist]
            const scale = scaleWithDist[dist]

            return (
              <motion.div
                key={absIdx} // Absolute index ensures stable DOM nodes during infinite scroll
                className="absolute w-full flex items-center justify-center cursor-pointer"
                style={{ top: absIdx * ITEM_HEIGHT, height: ITEM_HEIGHT }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ opacity, scale }}
                transition={SNAP_SPRING}
                onClick={() => onSelect(absIdx)}
              >
                <span
                  className={`text-[2vw] uppercase tracking-[0.3em] font-black transition-colors duration-150 ${
                    isActive ? 'text-white' : 'text-zinc-600'
                  }`}
                >
                  {item}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Geometric Gutter (Center 10%) ──────────────────────────────────────────
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
// ─── Content Stage (Right 60%) ──────────────────────────────────────────────
// Height is 80vh (top: 10%, height: 80%).
// Has a top border and bottom border stretching to the right edge.
// Content infinitely wraps matching the activeIndex absolute value.
function ContentStage({ activeIndex }: { activeIndex: number }) {
  // Generate a sliding window of -3 to +3 items for the content carousel
  const windowRange = Array.from({ length: 7 }, (_, k) => activeIndex - 3 + k)

  // 100vh * 0.8 = 80vh. Rely on CSS percentages for perfect syncing.
  return (
    <div className="relative h-full w-full">
      {/* 80vh Masked Gate */}
      <div
        className="absolute left-0 w-[calc(100%-calc(var(--spacing)*12))] border-t border-b border-white overflow-hidden"
        style={{ top: '10%', height: '80%' }}
      >
        {/* The translating carousel track inside the 80vh gate */}
        <motion.div
          className="relative w-full h-full"
          animate={{ y: `${-activeIndex * 100}%` }}
          transition={SNAP_SPRING}
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
                <div className="w-full overflow-y-auto max-h-full scrollbar-hide pr-4 pt-12">
                  <SectionContent section={item} />
                </div>
              </div>
            )
          })}
        </motion.div>
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

// (The rest of the content components remain unchanged but I will include them for completeness)

function HomeContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-6xl font-black uppercase tracking-tight leading-none">
        Software <br />
        <span className="text-zinc-600">Engineer</span>
      </h2>
      <p className="text-zinc-500 text-md leading-relaxed max-w-xl">
        {data.personalInfo.title}
      </p>
      <div className="flex gap-3 text-[12px] tracking-widest uppercase text-zinc-600 pt-2">
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
  return (
    <div className="space-y-6">
      {data.experience.map((exp: any, idx: number) => (
        <div key={idx}>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              {exp.role}
            </h3>
            <span className="text-[13px] text-zinc-600 tracking-wider whitespace-nowrap ml-4">
              {exp.startDate} — {exp.endDate}
            </span>
          </div>
          <p className="text-[13px] text-zinc-600 mb-2 tracking-wider">
            {exp.company} · {exp.location}
          </p>
          <ul className="space-y-1">
            {exp.highlights.map((h: string, hIdx: number) => (
              <li
                key={hIdx}
                className="text-zinc-500 text-[14px] leading-relaxed pl-3 border-l border-zinc-800"
              >
                {h}
              </li>
            ))}
          </ul>
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
          <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-1">
            {proj.name}
          </h3>
          <p className="text-zinc-500 text-[14px] leading-relaxed mb-2">
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
  const researchExp = data.experience.find(
    (e: any) => e.companyType === 'Research',
  )
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold uppercase tracking-wide">
        Academic Research
      </h3>
      {researchExp && (
        <div className="border-l border-zinc-800 pl-4">
          <p className="text-[13px] text-zinc-600 tracking-wider mb-2">
            {researchExp.company} · {researchExp.startDate} —{' '}
            {researchExp.endDate}
          </p>
          <ul className="space-y-1">
            {researchExp.highlights.map((h: string, i: number) => (
              <li
                key={i}
                className="text-zinc-500 text-[14px] leading-relaxed pl-3 border-l border-zinc-800"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4">
        <h4 className="text-md text-white uppercase tracking-widest mb-2">
          Awards & Publications
        </h4>
        {data.awardsAndLeadership.map((a: any, i: number) => (
          <p key={i} className="text-zinc-500 text-[14px] leading-relaxed mb-1">
            <span className="text-gray-300 font-bold">{a.title}:</span>{' '}
            {a.description}
          </p>
        ))}
      </div>
    </div>
  )
}

function TerminalContent() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold uppercase tracking-wide">
        Interactive Terminal
      </h3>
      <p className="text-zinc-500 text-[14px] leading-relaxed max-w-md">
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
