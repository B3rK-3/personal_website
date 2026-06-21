import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
} from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'

export const Route = createFileRoute('/app/thoughts')({
  component: ThoughtsPage,
})

interface Post {
  title: string
  date: string
  slug: string
}

function ThoughtsPage() {
  const location = useLocation()
  const isPostRoute = location.pathname.startsWith('/app/thoughts/post/')
  const [posts, setPosts] = useState<Array<Post> | null>(null)
  const [error, setError] = useState(false)

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch(
        'https://api.github.com/repos/B3rK-3/thoughts/contents/posts',
        { headers: { Accept: 'application/vnd.github.v3+json' } },
      )
      if (!res.ok) throw new Error('not found')
      const files: Array<{ name: string }> = await res.json()
      const parsed = files
        .filter((f) => f.name.endsWith('.md'))
        .sort((a, b) => b.name.localeCompare(a.name))
        .map((f) => {
          const nameNoExt = f.name.replace(/\.md$/, '')
          const dateMatch = nameNoExt.match(/^(\d{4}-\d{2}-\d{2})/)
          const date = dateMatch ? dateMatch[1] : ''
          const title = nameNoExt
            .replace(/^\d{4}-\d{2}-\d{2}[-_]?/, '')
            .replace(/[-_]/g, ' ')
          return { title: title || nameNoExt, date, slug: f.name }
        })
      setPosts(parsed)
    } catch {
      setError(true)
    }
  }, [])

  useEffect(() => {
    if (!isPostRoute) fetchPosts()
  }, [fetchPosts, isPostRoute])

  if (isPostRoute) {
    return <Outlet />
  }

  if (!posts && !error) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-sm opacity-40">Loading...</p>
      </div>
    )
  }

  if (error || (posts && posts.length === 0)) {
    return (
      <div className="flex items-center justify-center p-8 text-center">
        <p className="text-sm opacity-40">
          Push a <code className="text-xs">.md</code> file to{' '}
          <a
            href="https://github.com/B3rK-3/thoughts"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            B3rK-3/thoughts
          </a>{' '}
          <code className="text-xs">posts/</code> directory.
          <br />
          Format: <code className="text-xs">YYYY-MM-DD-title.md</code>
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 pt-5">
      <h2 className='text-[20px]'><strong>Posts:</strong></h2>
      <ul className="list-disc space-y-2 pl-5">
        {posts!.map((post) => (
          <li key={post.slug}>
            <Link
              to="/app/thoughts/post/$slug"
              params={{ slug: post.slug }}
              className="text-sm font-medium underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity text-[17px]"
            >
              {post.title}
              {post.date && (
                <span className="text-[15px] opacity-40 ml-2">{post.date}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
