import React from 'react'

export function DisentLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="disentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="20"
        fill="url(#disentGrad)"
      />
      <path
        d="M 35 30 L 52 30 Q 70 30 70 50 Q 70 70 52 70 L 35 70 Z M 47 42 L 47 58 L 52 58 Q 57 58 57 50 Q 57 42 52 42 Z"
        fill="#000000"
      />
    </svg>
  )
}

export function NasaLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="45" fill="#0b3d91" />
      <ellipse
        cx="50"
        cy="50"
        rx="45"
        ry="15"
        fill="none"
        stroke="#fc3d21"
        strokeWidth="6"
        transform="rotate(-30 50 50)"
      />
      <text
        x="50"
        y="58"
        fontSize="24"
        fontFamily="sans-serif"
        fontWeight="900"
        fill="#ffffff"
        textAnchor="middle"
        letterSpacing="1.5"
      >
        NASA
      </text>
      {/* Some stars */}
      <circle cx="25" cy="30" r="1.5" fill="#ffffff" />
      <circle cx="70" cy="25" r="1" fill="#ffffff" />
      <circle cx="75" cy="70" r="2" fill="#ffffff" />
      <circle cx="30" cy="75" r="1" fill="#ffffff" />
    </svg>
  )
}

export function YaleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="80" height="80" rx="12" fill="#0f4d92" />
      <text
        x="50"
        y="68"
        fontSize="56"
        fontFamily="Times New Roman, serif"
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
      >
        Y
      </text>
    </svg>
  )
}
