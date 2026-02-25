import React, { useCallback, useEffect } from 'react'
import type { LogEntry } from './types'

interface UseGameManagerProps {
  gameRunning: boolean
  setGameRunning: (b: boolean) => void
  setMode: (m: any) => void
  setHistory: React.Dispatch<React.SetStateAction<Array<LogEntry>>>
  inputRef: React.RefObject<HTMLInputElement | null>
  playerNicknameRef: React.MutableRefObject<string>
  onKeyDown: (e: KeyboardEvent | React.KeyboardEvent) => void
}

export function useGameManager({
  gameRunning,
  setGameRunning,
  setMode,
  setHistory,
  inputRef,
  playerNicknameRef,
  onKeyDown,
}: UseGameManagerProps) {
  const terminateGame = useCallback(() => {
    setGameRunning(false)
    setMode('NORMAL')
    setHistory((prev) => {
      const nh = [...prev]
      for (let i = nh.length - 1; i >= 0; i--) {
        if (nh[i].type === 'output' && typeof nh[i].content !== 'string') {
          nh[i].content = (
            <div className="relative">
              <div className="text-red-400 mb-2">Game terminated (Ctrl+C)</div>
              <iframe
                src="/game/index.html"
                className="w-full border border-green-900/50 rounded bg-black opacity-60"
                style={{
                  height: '600px',
                  colorScheme: 'dark',
                  pointerEvents: 'none',
                }}
                title="ASCIItron Game (terminated)"
              />
            </div>
          )
          break
        }
      }
      return nh
    })
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [setGameRunning, setMode, setHistory, inputRef])

  const onKeyDownRef = React.useRef(onKeyDown)
  useEffect(() => {
    onKeyDownRef.current = onKeyDown
  }, [onKeyDown])

  // Iframe keydown listener
  useEffect(() => {
    if (!gameRunning) return

    const handler = (e: KeyboardEvent) => {
      onKeyDownRef.current(e)
    }

    let cleanup: (() => void) | null = null

    const attach = () => {
      const iframe = document.querySelector(
        'iframe[title="ASCIItron Game"]',
      ) as HTMLIFrameElement | null
      const cw = iframe?.contentWindow
      if (cw) {
        cw.addEventListener('keydown', handler)
        cleanup = () => {
          cw.removeEventListener('keydown', handler)
        }
      }
    }

    const timer = setTimeout(attach, 200)
    const iframe = document.querySelector('iframe[title="ASCIItron Game"]')
    iframe?.addEventListener('load', attach)

    return () => {
      clearTimeout(timer)
      iframe?.removeEventListener('load', attach)
      cleanup?.()
    }
  }, [gameRunning])

  // Iframe Nickname sender
  useEffect(() => {
    if (!gameRunning) return

    const sendNickname = () => {
      const iframe = document.querySelector(
        'iframe[title="ASCIItron Game"]',
      ) as HTMLIFrameElement | null
      const cw = iframe?.contentWindow
      if (cw) {
        cw.postMessage(
          { type: 'SET_NICKNAME', nickname: playerNicknameRef.current },
          '*',
        )
      }
    }

    const timer = setTimeout(sendNickname, 200)
    const iframe = document.querySelector('iframe[title="ASCIItron Game"]')
    iframe?.addEventListener('load', sendNickname)

    return () => {
      clearTimeout(timer)
      iframe?.removeEventListener('load', sendNickname)
    }
  }, [gameRunning, playerNicknameRef])

  return { terminateGame }
}
