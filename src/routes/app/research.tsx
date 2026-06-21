import { createFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import { AppThemeContext } from '../../contexts/AppTheme'

export const Route = createFileRoute('/app/research')({
  component: ResearchPage,
})

const LOGOS = [
  {
    src: '/logos/scholar.png',
    alt: 'Google Scholar',
    href: 'https://scholar.google.com/citations?hl=en&user=P399EVAAAAAJ&view_op=list_works&authuser=2',
  },
  { src: '/logos/nasa.png', alt: 'NASA' },
  { src: '/logos/princeton.png', alt: 'Princeton' },
  { src: '/logos/xulab.png', alt: 'XU Lab' },
]

function ResearchPage() {
  const { card, border } = useContext(AppThemeContext)

  return (
    <div className="flex items-center justify-center p-8">
      <div className="grid grid-cols-2 gap-6 max-w-xs w-full">
        {LOGOS.map((logo) => {
          const inner = (
            <div
              className="flex items-center justify-center p-5 rounded-xl transition-transform duration-200 hover:scale-105"
              style={{
                backgroundColor: card,
                border: `1px solid ${border}`,
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-20 h-20 object-contain rounded-lg"
                draggable={false}
              />
            </div>
          )

          if (logo.href) {
            return (
              <a
                key={logo.src}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inner}
              </a>
            )
          }

          return <div key={logo.src}>{inner}</div>
        })}
      </div>
    </div>
  )
}
