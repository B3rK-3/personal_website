import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/terminal')({
  component: TerminalPage,
})

function TerminalPage() {
  return (
    <div className="flex items-center justify-center p-8 font-sans">
      <Link
        to="/secret-location"
        className="text-lg opacity-60 hover:opacity-100 transition-opacity border-b border-current pb-1"
      >
        Launch Terminal →
      </Link>
    </div>
  )
}
