import { createContext, useCallback, useState } from 'react'

export const AppThemeContext = createContext<{
  dark: boolean
  toggle: () => void
  bg: string
  text: string
  sub: string
  card: string
  border: string
}>({
  dark: false,
  toggle: () => {},
  bg: '#f1e9da',
  text: '#1a1a2e',
  sub: '#666',
  card: '#fff',
  border: '#ccc',
})

export function useAppTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('app-theme') === 'dark'
  })

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev
      localStorage.setItem('app-theme', next ? 'dark' : 'light')
      return next
    })
  }, [])

  return {
    dark,
    toggle,
    bg: dark ? '#2e294e' : '#f1e9da',
    text: dark ? '#f1e9da' : '#1a1a2e',
    sub: dark ? '#b6b5b5ff' : '#666',
    card: dark ? '#4f4b6cff' : '#ffffff',
    border: dark ? '#555' : '#ccc3b3',
  }
}
