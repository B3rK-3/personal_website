import { createFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import { AppThemeContext } from '../../contexts/AppTheme'

export const Route = createFileRoute('/app/experience')({
  component: ExperiencePage,
})

const LOGOS = [
  { src: '/logos/disent.png', alt: 'Disent' },
  { src: '/logos/nasa.png', alt: 'NASA' },
  { src: '/logos/yale.png', alt: 'Yale' },
  { src: '/logos/betterment.png', alt: 'Betterment' },
  { src: '/logos/princeton.png', alt: 'Princeton' },
  { src: '/logos/xulab.png', alt: 'XU Lab' },
]

function ExperiencePage() {
  const { card, border } = useContext(AppThemeContext)

  return (
    <div className="flex items-center justify-center p-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-sm w-full">
        {LOGOS.map((logo) => (
          <div
            key={logo.src}
            className="flex items-center justify-center p-5 rounded-xl transition-transform duration-200 hover:scale-105"
            style={{
              backgroundColor: card,
              border: `1px solid ${border}`,
            }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="w-20 h-20 object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
