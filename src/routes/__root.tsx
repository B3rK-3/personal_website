import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useState } from 'react'
import TerminalLoader from '../components/TerminalLoader'

export const Route = createRootRoute({
  component: RootComponent,
})

function checkLoading(pathname: string, search: unknown): boolean {
  if (
    pathname === '/' ||
    pathname === '/portfolio' ||
    pathname.startsWith('/portfolio') ||
    pathname === '/secret-location' ||
    pathname.startsWith('/secret-location') ||
    pathname === '/app' ||
    pathname.startsWith('/app') ||
    pathname === '/tests' ||
    pathname.startsWith('/tests')
  ) {
    return false
  }

  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get('bypass') === '1') {
      return false
    }
  }

  if (
    search &&
    typeof search === 'object' &&
    'bypass' in search &&
    search.bypass === '1'
  ) {
    return false
  }

  return true
}

function RootComponent() {
  const location = useLocation()
  const [loading, setLoading] = useState(() =>
    checkLoading(location.pathname, location.search),
  )

  return (
    <>
      {loading ? (
        <TerminalLoader onComplete={() => setLoading(false)} />
      ) : (
        <div className="bg-black min-h-screen">
          <Outlet />
        </div>
      )}
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
