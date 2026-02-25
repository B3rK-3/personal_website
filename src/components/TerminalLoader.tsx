import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { ASCII_ART } from '../constants/terminal'

export default function TerminalLoader({
  onComplete,
}: {
  onComplete: () => void
}) {
  const [logs, setLogs] = useState<Array<string>>([])
  const [isGlitching, setIsGlitching] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const navigate = useNavigate()
  const mounted = useRef(true)
  const aborted = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'n' || e.key === 'N') {
        if (aborted.current) return
        aborted.current = true
        setIsGlitching(true)

        setLogs((prev) => {
          const newLogs = [...prev]
          if (newLogs.length > 0) {
            const lastLine = newLogs[newLogs.length - 1]
            // Strip the cursor if it exists at the very end of the last line
            if (lastLine.endsWith('█')) {
              newLogs[newLogs.length - 1] = lastLine.slice(0, -1)
            }
          }
          return [...newLogs, '>', '>', '> ABORTED.█']
        })

        setTimeout(() => {
          if (mounted.current) {
            onComplete()
            navigate({ to: '/secret-location' } as any)
          }
        }, 800)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Helper to add a new line immediately
    const addLog = (text: string) => {
      setLogs((prev) => [...prev, text])
    }

    // Helper to append to the last line
    const appendToLastLog = (text: string) => {
      setLogs((prev) => {
        const newLogs = [...prev]
        if (newLogs.length > 0) {
          newLogs[newLogs.length - 1] += text
        }
        return newLogs
      })
    }

    // Helper to replace the last character of the last line
    const replaceLastCharOfLastLog = (char: string) => {
      setLogs((prev) => {
        const newLogs = [...prev]
        if (newLogs.length > 0) {
          const lastLine = newLogs[newLogs.length - 1]
          newLogs[newLogs.length - 1] = lastLine.slice(0, -1) + char
        }
        return newLogs
      })
    }

    // Helper to simulate cursor flashing
    const flashCursor = async (count: number = 3) => {
      const CURSOR = '█'
      const ON_DELAY = 200
      const OFF_DELAY = 100

      for (let i = 0; i < count; i++) {
        if (aborted.current || !mounted.current) return
        appendToLastLog(CURSOR)
        await new Promise((r) => setTimeout(r, ON_DELAY))

        if (aborted.current || !mounted.current) return
        // Remove the cursor character
        setLogs((prev) => {
          const newLogs = [...prev]
          if (newLogs.length > 0) {
            newLogs[newLogs.length - 1] = newLogs[newLogs.length - 1].slice(
              0,
              -1,
            )
          }
          return newLogs
        })
        await new Promise((r) => setTimeout(r, OFF_DELAY))
      }
    }

    const typeText = async (text: string, isNewLine = false) => {
      if (aborted.current || !mounted.current) return

      if (isNewLine) {
        addLog('')
      }

      for (let i = 0; i < text.length; i++) {
        if (aborted.current || !mounted.current) return
        appendToLastLog('█')
        await new Promise((resolve) =>
          setTimeout(resolve, Math.floor(Math.random() * 40) + 10),
        )

        if (aborted.current || !mounted.current) return
        replaceLastCharOfLastLog(text[i])
      }
    }

    // Helper to type text instantly
    const typeInstantly = (text: string, isNewLine = false) => {
      if (aborted.current || !mounted.current) return
      if (isNewLine) {
        addLog(text)
      } else {
        appendToLastLog(text)
      }
    }

    const runSequence = async () => {
      // Step 1: Boot kernel
      typeInstantly('> BOOTING KERNEL v4.0.2', true)
      await typeText('...')
      await new Promise((r) => setTimeout(r, 400))

      // Step 2: Memory
      if (aborted.current || !mounted.current) return
      typeInstantly('> MEMORY', true)
      await flashCursor(2)
      typeInstantly(' OK')
      await new Promise((r) => setTimeout(r, 100))

      // Step 3: CPU
      if (aborted.current || !mounted.current) return
      typeInstantly('> CPU', true)
      await flashCursor(2)
      typeInstantly(' OK')
      await new Promise((r) => setTimeout(r, 100))

      // // Step 4: Link
      // if (aborted.current || !mounted.current) return
      // typeInstantly('> LINK', true)
      // await flashCursor(2)
      // typeInstantly(' UP')
      // await new Promise((r) => setTimeout(r, 200))

      // Step 5: Portfolio Data
      if (aborted.current || !mounted.current) return
      typeInstantly('> FETCHING PORTFOLIO_DATA [', true)

      const totalHashes = 10
      for (let i = 0; i < totalHashes; i++) {
        if (aborted.current || !mounted.current) return
        // Append dash
        appendToLastLog('-')
        let random: number
        random = Math.random() * 100
        await new Promise((r) => setTimeout(r, random)) // Wait a bit
        // Replace with hash
        replaceLastCharOfLastLog('#')

        random = Math.random() * 100
        await new Promise((r) => setTimeout(r, random)) // Wait a bit
      }
      typeInstantly(']')

      await new Promise((r) => setTimeout(r, 200))

      // // Step 6: Security Handshake
      // if (aborted.current || !mounted.current) return
      // typeInstantly('> SECURITY HANDSHAKE:', true)
      // await flashCursor(2)
      // typeInstantly(' SUCCESS')

      // await new Promise((r) => setTimeout(r, 400))

      // Step 7: Shell
      if (aborted.current || !mounted.current) return
      typeInstantly('loader@website:~$ ', true)
      await new Promise((r) => setTimeout(r, 400))
      await typeText('cat portfolio.html')
      await new Promise((r) => setTimeout(r, 500))

      // Completion
      if (!aborted.current && mounted.current) {
        setIsVisible(false) // Trigger fade out
        setTimeout(() => {
          if (mounted.current) {
            // Only navigate to /portfolio if we're on the home page
            const currentPath = window.location.pathname
            if (currentPath === '/' || currentPath === '') {
              navigate({ to: '/portfolio' } as any)
            }
            onComplete()
          }
        }, 500) // Wait for fade out
      }
    }

    runSequence()

    return () => {
      mounted.current = false
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate, onComplete])

  if (!isVisible && !isGlitching) return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-black text-white font-mono p-4 flex flex-col transition-opacity duration-500 ${!isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isGlitching ? 'animate-pulse' : ''}`}
    >
      {/* Glitch Overlay */}
      {isGlitching && (
        <div className="absolute inset-0 bg-red-900/20 z-10 pointer-events-none mix-blend-overlay flex items-center justify-center">
          <h1 className="text-9xl font-bold text-red-600 animate-bounce">
            SYSTEM FAILURE
          </h1>
        </div>
      )}

      {/* ASCII Art Area */}
      <div className="flex justify-end mb-2 ">
        <pre className="text-[4px] leading-none whitespace-pre overflow-hidden text-right opacity-50">
          {ASCII_ART}
        </pre>
      </div>

      {/* Dashed Separator */}
      <div className="w-full border-b-2 border-dashed border-white/50 mb-6"></div>

      {/* Header */}
      <div className="border-b border-white/30 pb-2 mb-4 flex justify-between items-center">
        <span className="font-bold">[ SYSTEM OVERRIDE ]</span>
        <span className="animate-pulse">Press 'N' to abort sequence...</span>
      </div>

      {/* Logs */}
      <div className="flex-1 overflow-hidden">
        {logs.map((log, index) => (
          <div key={index} className="mb-1">
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}
