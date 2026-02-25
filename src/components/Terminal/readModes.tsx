import React from 'react'
import { buildReadHistoryNode } from './InputComponents'
import type { LogEntry, TerminalMode } from './types'

/** The config for each AWAITING_INPUT mode: what prompt to show, and how to handle submission. */
export interface ReadModeDef {
  /** Prompt shown next to the input while typing */
  prompt: React.ReactNode
  /** Extra input props (e.g. type: 'password') */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  /** Custom className for the ReadRow wrapper */
  className?: string
  /** Called when the user presses Enter. Return history entries to push + the next mode. */
  onSubmit: (
    value: string,
    helpers: ReadModeHelpers,
  ) => {
    historyEntries: Array<LogEntry>
    nextMode: TerminalMode
    nextModeData?: any
  }
}

export interface ReadModeHelpers {
  setGameRunning: (b: boolean) => void
  addOutput: (content: string | React.ReactNode) => void
  playerNicknameRef: React.MutableRefObject<string>
}

export const readModes: Record<string, ReadModeDef> = {
  sudo: {
    prompt: '[sudo] password for visitor:',
    inputProps: { type: 'password' },
    className: 'mt-1',
    onSubmit: (value) => ({
      historyEntries: [
        {
          type: 'output',
          content: buildReadHistoryNode(
            '[sudo] password for visitor:',
            value,
            true,
            'mt-1',
          ),
          newline: false,
        },
        { type: 'output', content: 'Nice try. 😏' },
      ],
      nextMode: 'NORMAL',
    }),
  },

  play_nickname: {
    prompt: 'Nickname:',
    onSubmit: (value, helpers) => {
      const nickname = value.trim() || 'Anonymous'

      helpers.playerNicknameRef.current = nickname
      helpers.setGameRunning(true)

      setTimeout(() => {
        const iframe = document.querySelector(
          'iframe[title="ASCIItron Game"]',
        ) as HTMLIFrameElement | null
        iframe?.focus()
      }, 150)

      return {
        historyEntries: [
          {
            type: 'output',
            content: buildReadHistoryNode('Nickname:', nickname),
            newline: false,
          },
          {
            type: 'output',
            content: (
              <div className="relative">
                <div className="text-yellow-400 mb-2">
                  Launching ASCIItron... Press Ctrl+C to quit. Credits to:{' '}
                  <a
                    href="https://github.com/lklynet/asciitron"
                    target="_blank"
                  >
                    lklynet
                  </a>
                </div>
                <iframe
                  src="/game/index.html"
                  className="w-full border border-green-800 rounded bg-black"
                  style={{ height: '600px', colorScheme: 'dark' }}
                  title="ASCIItron Game"
                />
              </div>
            ),
          },
        ],
        nextMode: 'GAME',
      }
    },
  },
}
