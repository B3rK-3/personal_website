import { createFileRoute } from '@tanstack/react-router'
import { useContext, useState } from 'react'
import { AppThemeContext } from '../../contexts/AppTheme'
import resumeData from '../../data/resume.json'

interface Project {
  name: string
  description: string
  techStack: Array<string>
}

interface ProjectOverride {
  images?: Array<string>
  summary: string
  links?: Array<{ label: string; href: string }>
}

interface ZoomedImage {
  src: string
  name: string
  index: number
  total: number
}

const data = resumeData as { projects: Array<Project> }

const PROJECT_OVERRIDES: Record<string, ProjectOverride> = {
  'FlowNJIT — AI Course Architect': {
    images: ['/projects/flownjit.png', '/projects/flownjit1.png'],
    summary:
      'AI-powered NJIT course planner with graph-based prerequisite visualization for 15,000+ students.',
    links: [{ label: 'live', href: 'https://flownjit.com' }],
  },
  'Fashion AI App': {
    images: ['/projects/fashion-diagram.png'],
    summary:
      'Mobile outfit assistant with garment upload, background removal, and local vector search recommendations.',
  },
}

export const Route = createFileRoute('/app/projects')({
  component: ProjectsPage,
})

function ProjectVisual({
  images,
  imageIndex,
  name,
  fallbackColor,
  onPrevious,
  onNext,
  onSelect,
}: {
  images: Array<string> | undefined
  imageIndex: number
  name: string
  fallbackColor: string
  onPrevious: () => void
  onNext: () => void
  onSelect: (index: number) => void
}) {
  if (!images?.length) {
    return (
      <div
        className="flex aspect-video items-center justify-center px-6 text-center text-sm font-medium"
        style={{ color: fallbackColor }}
      >
        {name}
      </div>
    )
  }

  const activeImage = images[imageIndex]
  const hasMultiple = images.length > 1

  return (
    <div className="relative aspect-video overflow-hidden bg-black/5">
      <img
        src={activeImage}
        alt={`${name} screenshot ${imageIndex + 1}`}
        className="h-full w-full object-contain p-2"
        loading="lazy"
        draggable={false}
      />

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={onPrevious}
            aria-label={`Show previous ${name} screenshot`}
            className="absolute inset-y-0 left-0 flex w-12 items-center justify-center bg-black/0 text-2xl text-white opacity-70 transition hover:bg-black/25 hover:opacity-100"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label={`Show next ${name} screenshot`}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center bg-black/0 text-2xl text-white opacity-70 transition hover:bg-black/25 hover:opacity-100"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {images.map((image, dotIndex) => (
              <button
                key={image}
                type="button"
                onClick={() => onSelect(dotIndex)}
                aria-label={`Show ${name} screenshot ${dotIndex + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  dotIndex === imageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ProjectCard({
  project,
  override,
  card,
  border,
  sub,
  onZoom,
}: {
  project: Project
  override: ProjectOverride | undefined
  card: string
  border: string
  sub: string
  onZoom: (image: ZoomedImage) => void
}) {
  const [imageIndex, setImageIndex] = useState(0)
  const images = override?.images
  const summary = override?.summary ?? project.description.split('\n')[0]
  const tech = project.techStack.slice(0, 4)

  const showPrevious = () => {
    if (!images?.length) return
    setImageIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  const showNext = () => {
    if (!images?.length) return
    setImageIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  return (
    <article
      className="overflow-hidden rounded-xl transition-transform duration-200 hover:-translate-y-1"
      style={{
        backgroundColor: card,
        border: `1px solid ${border}`,
      }}
    >
      <ProjectVisual
        images={images}
        imageIndex={imageIndex}
        name={project.name}
        fallbackColor={sub}
        onPrevious={showPrevious}
        onNext={showNext}
        onSelect={setImageIndex}
      />

      <div className="space-y-3 p-4">
        <div>
          <h2 className="text-base font-semibold leading-tight">{project.name}</h2>
          <p className="mt-2 text-sm leading-6" style={{ color: sub }}>
            {summary}
          </p>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {tech.map((item) => (
              <span
                key={item}
                className="rounded-full px-2 py-0.5 text-[10px]"
                style={{
                  backgroundColor: sub,
                  color: card,
                  opacity: 0.75,
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {images?.length ? (
            <button
              type="button"
              onClick={() =>
                onZoom({
                  src: images[imageIndex],
                  name: project.name,
                  index: imageIndex,
                  total: images.length,
                })
              }
              className="shrink-0 text-xs underline underline-offset-4 opacity-50 transition-opacity hover:opacity-100"
            >
              zoom
            </button>
          ) : null}
        </div>

        {override?.links?.length ? (
          <div className="flex gap-4 pt-1 text-sm">
            {override.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 opacity-50 transition-opacity hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

function ProjectsPage() {
  const { card, border, sub } = useContext(AppThemeContext)
  const [zoomedImage, setZoomedImage] = useState<ZoomedImage | null>(null)

  return (
    <>
      <div className="grid gap-5 px-2 py-6 sm:grid-cols-2 sm:px-8">
        {data.projects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            override={PROJECT_OVERRIDES[project.name]}
            card={card}
            border={border}
            sub={sub}
            onZoom={setZoomedImage}
          />
        ))}
      </div>

      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${zoomedImage.name} enlarged screenshot`}
          onClick={() => setZoomedImage(null)}
        >
          <div className="max-h-full w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4 text-white">
              <p className="text-sm font-medium">
                {zoomedImage.name}
                {zoomedImage.total > 1 && (
                  <span className="ml-2 opacity-50">
                    {zoomedImage.index + 1}/{zoomedImage.total}
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="text-sm underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
              >
                close
              </button>
            </div>
            <img
              src={zoomedImage.src}
              alt={`${zoomedImage.name} enlarged screenshot`}
              className="max-h-[82vh] w-full rounded-lg object-contain"
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  )
}
