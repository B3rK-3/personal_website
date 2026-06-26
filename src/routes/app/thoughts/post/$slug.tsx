import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ComponentProps } from 'react'
export const Route = createFileRoute('/app/thoughts/post/$slug')({
  component: ThoughtPostPage,
})

const MARKDOWN_COMPONENTS = {
  h1: ({ node: _node, ...props }) => (
    <h1 className="text-2xl font-semibold mt-8 mb-4" {...props} />
  ),
  h2: ({ node: _node, ...props }) => (
    <h2 className="text-xl font-semibold mt-7 mb-3" {...props} />
  ),
  h3: ({ node: _node, ...props }) => (
    <h3 className="text-lg font-semibold mt-6 mb-2" {...props} />
  ),
  p: ({ node: _node, ...props }) => (
    <p className="my-4 leading-7 opacity-90" {...props} />
  ),
  a: ({ node: _node, ...props }) => (
    <a
      className="underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: ({ node: _node, ...props }) => (
    <ul className="my-4 list-disc space-y-2 pl-6" {...props} />
  ),
  ol: ({ node: _node, ...props }) => (
    <ol className="my-4 list-decimal space-y-2 pl-6" {...props} />
  ),
  li: ({ node: _node, ...props }) => <li className="leading-7" {...props} />,
  blockquote: ({ node: _node, ...props }) => (
    <blockquote
      className="my-4 border-l-2 pl-4 italic opacity-70"
      {...props}
    />
  ),
  code: ({ node: _node, className, children, ...props }) => {
    const isBlock = className?.startsWith('language-')
    if (isBlock) {
      return (
        <code className={`${className} text-xs leading-6`} {...props}>
          {children}
        </code>
      )
    }

    return (
      <code className="rounded px-1 py-0.5 text-xs opacity-90" {...props}>
        {children}
      </code>
    )
  },
  pre: ({ node: _node, ...props }) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg border border-current/10 p-4 text-xs leading-6"
      {...props}
    />
  ),
  table: ({ node: _node, ...props }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: ({ node: _node, ...props }) => (
    <th className="border border-current/10 px-3 py-2 text-left" {...props} />
  ),
  td: ({ node: _node, ...props }) => (
    <td className="border border-current/10 px-3 py-2" {...props} />
  ),
} satisfies ComponentProps<typeof ReactMarkdown>['components']

function ThoughtPostPage() {
  const { slug } = Route.useParams()
  const [postMarkdown, setPostMarkdown] = useState<string | null>(null)
  const [error, setError] = useState(false)

  const fetchPost = useCallback(async () => {
    setPostMarkdown(null)
    setError(false)

    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/B3rK-3/thoughts/main/posts/${encodeURIComponent(slug)}`,
        { cache: 'no-store' },
      )
      if (!res.ok) throw new Error('failed to load')
      const md = await res.text()
      setPostMarkdown(md)
    } catch {
      setError(true)
    }
  }, [slug])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-center">
        <p className="text-sm opacity-40">Failed to load post.</p>
      </div>
    )
  }

  if (!postMarkdown) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-sm opacity-40">Loading post...</p>
      </div>
    )
  }

  return (
    <article className="text-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={MARKDOWN_COMPONENTS}>
        {postMarkdown}
      </ReactMarkdown>
    </article>
  )
}
