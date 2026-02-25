import { createFileRoute } from '@tanstack/react-router'
import SpatialGUI from '../components/SpatialGUI'

export const Route = createFileRoute('/portfolio')({
  component: Portfolio,
})

function Portfolio() {
  return <SpatialGUI />
}
