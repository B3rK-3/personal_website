import {
  HeadContent,
  Scripts,
  createRootRoute,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { useState } from 'react'
import TerminalLoader from '../components/TerminalLoader'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Berked - Portfolio',
      },
      {
        name: 'description',
        content: 'this.portfolio. ps: go to /secret-location and type "play"',
      },
      {
        property: 'og:title',
        content: 'Berked - Portfolio',
      },
      {
        property: 'og:description',
        content: 'this.portfolio. ps: go to /secret-location and type "play"',
      },
      {
        property: 'og:image',
        content: 'https://berked.dev/logo.png',
      },
      {
        property: 'og:url',
        content: 'https://berke.disent.com',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:url',
        content: 'https://berke.disent.com',
      },
      {
        name: 'twitter:title',
        content: 'Berked - Portfolio',
      },
      {
        name: 'twitter:description',
        content: 'this.portfolio. ps: go to /secret-location and type "play"',
      },
      {
        name: 'twitter:image',
        content: 'https://berked.dev/logo.png',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/image0.png',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  const [loading, setLoading] = useState(() => {
    if (
      location.pathname === '/portfolio' ||
      location.pathname.startsWith('/portfolio') ||
      location.pathname === '/secret-location' ||
      location.pathname.startsWith('/secret-location')
    ) {
      return false
    }

    // Only run on client for search params if needed, or use location.search if schema is known
    // For now, client-side check for bypass ensures functionality there
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      if (searchParams.get('bypass') === '1') {
        return false
      }
    }

    // Check if location.search has bypass (if available on server context)
    // Note: location.search is typically an object in TanStack Router
    if ((location.search as any)?.bypass === '1') {
      return false
    }

    return true
  })

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-black text-white min-h-screen">
        {loading ? (
          <TerminalLoader onComplete={() => setLoading(false)} />
        ) : (
          <div className="bg-black min-h-screen">{children}</div>
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
        <Scripts />
      </body>
    </html>
  )
}
