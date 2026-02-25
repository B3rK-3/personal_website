import { createFileRoute } from '@tanstack/react-router'
import InteractiveTerminal from '../components/Terminal'

export const Route = createFileRoute('/secret-location')({
  component: RouteComponent,
})

function RouteComponent() {
  return <InteractiveTerminal />
}
