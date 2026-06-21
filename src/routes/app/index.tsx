import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: AppIndex,
})

const SECTIONS = [
  { name: 'experience', to: '/app/experience' },
  { name: 'projects', to: '/app/projects' },
  { name: 'research', to: '/app/research' },
  { name: 'terminal', to: '/app/terminal' },
  { name: 'thoughts', to: '/app/thoughts' },
] as const

function AppIndex() {
  return (
    <nav className="space-y-3 text-center flex-1 flex flex-col justify-center">
      {SECTIONS.map((s) => (
        <Link
          key={s.name}
          to={s.to}
          className="block text-xl font-semibold underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity"
        >
          {s.name}
        </Link>
      ))}
    </nav>
  )
}
