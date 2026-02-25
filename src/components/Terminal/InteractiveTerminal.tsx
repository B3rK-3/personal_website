import React, { useEffect, useRef, useState } from 'react'
import { ASCII_ART } from '../../constants/terminal'
import { getHighscores, saveHighscore } from '../../server/highscores'
import { ALL_COMMAND_NAMES, commandMap } from './commandRegistry'
import { runBasicProgram } from './basic_interpreter'
import MatrixRain from './MatrixRain'
import VimEditor from './VimEditor'
import { ReadRow, TerminalInput, buildReadHistoryNode } from './InputComponents'
import { readModes } from './readModes'
import { useGameManager } from './useGameManager'
import { profile } from './constants'
import type { MatrixRainHandle } from './MatrixRain'
import type {
  CommandContext,
  LogEntry,
  TerminalMode,
  VirtualFileSystem,
} from './types'

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<Array<LogEntry>>([])
  const [input, setInput] = useState('')
  const [currentPath, setCurrentPath] = useState('~')
  const currentPathRef = useRef('~')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [repoNames, setRepoNames] = useState<Array<string>>([])
  const [gameRunning, setGameRunning] = useState(false)
  const playerNicknameRef = useRef('Anonymous')
  const [mode, setMode] = useState<TerminalMode>('NORMAL')
  const [modeData, setModeData] = useState<any>(null)
  const [fileSystem, setFileSystem] = useState<VirtualFileSystem>({
    '~': {},
    '~/github': {},
  })

  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [commandHistory, setCommandHistory] = useState<Array<string>>([])

  const [matrixPaused, setMatrixPaused] = useState(false)
  const matrixRef = useRef<MatrixRainHandle>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const vimTextareaRef = useRef<HTMLTextAreaElement>(null)
  const vimCliRef = useRef<HTMLInputElement>(null)
  const [vimInsertMode, setVimInsertMode] = useState(false)

  // Keep path ref in sync
  useEffect(() => {
    currentPathRef.current = currentPath
  }, [currentPath])

  // Keeps track of the best score for the current run to push on exit
  const bestGameScoreRef = useRef<{
    score: number
    nickname: string
    hash: string
  } | null>(null)

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  // Game scores handling
  useEffect(() => {
    if (!gameRunning) return

    const handleMessage = async (e: MessageEvent) => {
      // Check if it's from our iframe
      if (e.data?.type === 'GAME_OVER') {
        const { score, nickname } = e.data

        if (
          !bestGameScoreRef.current ||
          bestGameScoreRef.current.score < score
        ) {
          // Calculate hash for the new best score to prevent simple tampering
          const salt =
            import.meta.env.VITE_GAME_SALT || 'asciitron-super-secret-salt-123!'
          const msgBuffer = new TextEncoder().encode(score + nickname + salt)
          const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
          const hashArray = Array.from(new Uint8Array(hashBuffer))
          const newHash = hashArray
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('')

          bestGameScoreRef.current = { score, nickname, hash: newHash }
        }

        try {
          // Fetch highscores and return to iframe
          const response = await getHighscores({
            data: { currentScore: score },
          })

          // Post back
          const iframe = document.querySelector(
            'iframe[title="ASCIItron Game"]',
          ) as HTMLIFrameElement
          if (iframe && iframe.contentWindow) {
            const cw = iframe.contentWindow
            cw.postMessage({ type: 'LEADERBOARD_UPDATE', data: response }, '*')
          }
        } catch (error) {
          console.error('Failed to get highscores', error)
        }
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [gameRunning])

  // Save game score when gameRunning turns false (game terminates)
  useEffect(() => {
    if (
      !gameRunning &&
      bestGameScoreRef.current &&
      bestGameScoreRef.current.score > 0
    ) {
      saveHighscore({ data: bestGameScoreRef.current })
        .catch(console.error)
        .finally(() => {
          console.log('Highscore save attempted')
        })
      bestGameScoreRef.current = null
    }
  }, [gameRunning])

  const handleKeyDownRef = useRef<
    (e: React.KeyboardEvent | KeyboardEvent) => void
  >(() => {})

  // Game management hook
  const { terminateGame } = useGameManager({
    gameRunning,
    setGameRunning,
    setMode,
    setHistory,
    inputRef,
    playerNicknameRef,
    onKeyDown: (e) => handleKeyDownRef.current(e),
  })

  // Focus management
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 0) return

      e.preventDefault()

      const target = e.target as HTMLElement

      let focusRef: React.RefObject<
        HTMLInputElement | HTMLTextAreaElement | null
      > | null = null

      if (target.tagName === 'IFRAME') return

      if (gameRunning) {
        const iframe = document.querySelector(
          'iframe[title="ASCIItron Game"]',
        ) as HTMLIFrameElement | null
        iframe?.focus()
        return
      }

      if (mode === 'MODAL_UI' && modeData?.type === 'vim') {
        if (vimInsertMode) {
          focusRef = vimTextareaRef
        } else {
          focusRef = vimCliRef
        }
      } else if (mode === 'MODAL_UI' && modeData === 'matrix') {
        focusRef = inputRef
      } else if (!gameRunning && mode !== 'MODAL_UI') focusRef = inputRef

      if (focusRef) focusRef.current?.focus()
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [gameRunning, mode, modeData, vimInsertMode, terminateGame])

  // --- Helpers ---

  const addOutput = (content: string | React.ReactNode) => {
    setHistory((prev) => [...prev, { type: 'output', content } as LogEntry])
  }

  const buildContext = (): CommandContext => ({
    currentPath,
    setCurrentPath,
    currentPathRef,
    history,
    setHistory,
    setInput,
    setMode,
    setModeData,
    setGameRunning,
    playerNicknameRef,
    repoNames,
    setRepoNames,
    inputRef,
    addOutput,
    abortSignal: abortControllerRef.current?.signal,
    fileSystem,
    setFileSystem,
  })

  const exitModal = (
    message?: string | React.ReactNode,
    retainInputState?: boolean,
  ) => {
    let modeDataCapture = null
    if (retainInputState && mode === 'AWAITING_INPUT' && modeData) {
      const activeReadMode = readModes[modeData]
      if (activeReadMode) {
        modeDataCapture = {
          prompt: activeReadMode.prompt,
          value: input,
          isPassword: activeReadMode.inputProps?.type === 'password',
          className: activeReadMode.className,
        }
      }
    }

    setMode('NORMAL')
    setModeData(null)

    if (modeDataCapture) {
      setHistory((prev) => [
        ...prev,
        {
          type: 'output',
          content: buildReadHistoryNode(
            modeDataCapture.prompt,
            modeDataCapture.value,
            modeDataCapture.isPassword,
            modeDataCapture.className,
            typeof message === 'string' ? message : undefined,
          ),
          newline: false,
        },
      ])
    } else if (message) {
      addOutput(message)
    }

    setInput('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  // --- Command Execution ---

  const handleCommand = async (cmd: string) => {
    const pathAtCommandTime = currentPathRef.current
    const parts = cmd.trim().split(/\s+/)
    const mainCommand = parts[0].toLowerCase()
    const args = parts.slice(1)

    setHistoryIndex(null)
    abortControllerRef.current = new AbortController()

    if (cmd.trim() !== '') {
      setCommandHistory((prev) => {
        const last = prev[prev.length - 1]
        return last !== cmd ? [...prev, cmd] : prev
      })
    }

    // --- AWAITING_INPUT handler (data-driven) ---
    console.log(modeData, cmd, document.activeElement)
    if (mode === 'AWAITING_INPUT' && modeData) {
      const readDef = readModes[modeData]
      if (readDef) {
        const result = readDef.onSubmit(cmd, {
          setGameRunning,
          addOutput,
          playerNicknameRef,
        })
        setHistory((prev) => [...prev, ...result.historyEntries])
        setMode(result.nextMode)
        setModeData(result.nextModeData ?? null)
        return
      }
    }

    // --- Special: clear ---
    if (mainCommand === 'clear') {
      setHistory([])
      setMode('NORMAL')
      setModeData(null)
      return
    }

    // Always record the user's input first
    setHistory((prev) => [
      ...prev,
      { type: 'input', content: cmd, path: pathAtCommandTime },
    ])

    if (mainCommand === '') return

    // --- ./filename execution ---
    if (mainCommand.startsWith('./')) {
      const filename = mainCommand.slice(2)
      const currentFiles = fileSystem[pathAtCommandTime] ?? {}
      const fileContent = currentFiles[filename]
      if (!fileContent) {
        addOutput(`bash: ./${filename}: No such file or directory`)
        return
      }
      try {
        const outputLines = runBasicProgram(fileContent)
        if (outputLines.length > 0) {
          addOutput(outputLines.join('\n'))
        }
      } catch (err: any) {
        addOutput(`Runtime error: ${err.message ?? err}`)
      }
      return
    }

    // --- Look up the command ---
    const def = commandMap.get(mainCommand)

    if (!def) {
      addOutput(
        `Command not found: ${mainCommand}. Type 'help' for available commands.`,
      )
      return
    }

    const ctx = buildContext()
    const response = await def.handler(args, ctx, cmd)

    if (response === undefined || response === null) return
    if (response !== '') addOutput(response)
  }

  // --- Tab Completion ---

  const handleTabCompletion = () => {
    const trimmedInput = input.trimStart()
    const parts = trimmedInput.split(/\s+/)
    const path = currentPathRef.current

    // Argument completion for cd and cat
    if (parts.length >= 2) {
      const cmd = parts[0].toLowerCase()
      const partial = parts.slice(1).join(' ')

      if (cmd === 'cd') {
        const dirs = path === '~' ? ['github'] : []
        const matches = dirs.filter((d) => d.startsWith(partial))
        if (matches.length === 1) setInput(`cd ${matches[0]}`)
        else if (matches.length > 1) {
          setHistory((prev) => [
            ...prev,
            { type: 'input', content: input, path },
            { type: 'output', content: matches.join('  ') },
          ])
        }
        return
      }

      if (cmd === 'cat') {
        const files = path === '~/github' ? repoNames : []
        const matches = files.filter((f) => f.startsWith(partial))
        if (matches.length === 1) setInput(`cat ${matches[0]}`)
        else if (matches.length > 1) {
          setHistory((prev) => [
            ...prev,
            { type: 'input', content: input, path },
            { type: 'output', content: matches.join('  ') },
          ])
        }
        return
      }
    }

    // Command-level completion
    const lower = trimmedInput.toLowerCase()
    if (!lower) return
    const matches = ALL_COMMAND_NAMES.filter((c) => c.startsWith(lower))
    if (matches.length === 1) {
      setInput(matches[0])
    } else if (matches.length > 1) {
      setHistory((prev) => [
        ...prev,
        { type: 'input', content: input, path },
        { type: 'output', content: matches.join('  ') },
      ])
    }
  }

  // --- Keyboard ---

  const handleKeyDown = (e: React.KeyboardEvent | KeyboardEvent) => {
    // Ctrl+C: exit modal/matrix/hack modes
    if (e.key === 'c' && e.ctrlKey) {
      if (gameRunning) {
        e.preventDefault()
        terminateGame()
      } else if (mode === 'MODAL_UI') {
        e.preventDefault()
        if (modeData === 'matrix') {
          const snapshot = matrixRef.current?.getCanvasDataURL()
          exitModal(
            <div>
              <div className="text-green-400 mb-2">
                Matrix connection terminated.
              </div>
              <div className="pointer-events-none mb-4">
                {snapshot ? (
                  <img
                    src={snapshot}
                    alt="Matrix Snapshot"
                    className="rounded border border-green-900/50 w-full"
                    style={{ imageRendering: 'pixelated' }}
                  />
                ) : (
                  <MatrixRain paused={true} />
                )}
              </div>
            </div>,
          )
        } else {
          exitModal('^C')
        }
      } else if (
        mode === 'AWAITING_INPUT' ||
        mode === 'HACK' ||
        mode === 'RMRF'
      ) {
        e.preventDefault()
        abortControllerRef.current?.abort()
        exitModal('^C', mode === 'AWAITING_INPUT')
      }
    }

    if (e.key === 'Enter') {
      const cmd = input
      setInput('')
      handleCommand(cmd)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      handleTabCompletion()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const newIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      setInput(commandHistory[newIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (commandHistory.length === 0 || historyIndex === null) return
      const newIndex = historyIndex + 1
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(null)
        setInput('')
      } else {
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    }
  }

  handleKeyDownRef.current = handleKeyDown

  // --- Shared input element builder ---
  const inputElement = (
    extraProps?: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <TerminalInput
      inputRef={inputRef}
      value={input}
      onChange={setInput}
      onKeyDown={handleKeyDown}
      extraProps={extraProps}
    />
  )

  // --- Active read mode (data-driven) ---
  const activeReadMode =
    mode === 'AWAITING_INPUT' && modeData ? readModes[modeData] : null

  // --- Render ---

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 flex flex-col items-center">
      {/* Header ASCII */}
      <pre className="text-[4px] sm:text-[6px] md:text-[8px] leading-none mb-8 text-green-700 select-none hidden sm:block whitespace-pre-wrap w-fit">
        {ASCII_ART}
      </pre>
      <div className="min-w-2xl w-4xl block flex flex-start">
        {/* Terminal Output */}
        <div className="w-full">
          <div className="opacity-70 mb-6">
            Welcome to the interactive terminal v1.0.0
            <br /> Type <span className="text-yellow-400">'help'</span> for
            commands, or use{' '}
            <span className="text-yellow-400">'vim [file]'</span> to create
            BASIC scripts and{' '}
            <span className="text-yellow-400">'./[file]'</span> to run them.
          </div>

          <div className="space-y-1">
            {history.map((entry, i) => {
              const needsMargin =
                entry.type === 'input' || entry.newline !== false

              return (
                <div
                  key={i}
                  className={`${needsMargin ? 'my-4' : ''} ${entry.type === 'input' ? '' : 'opacity-90 ml-4'}`}
                >
                  {entry.type === 'input' ? (
                    <div className="flex">
                      <span className="text-green-500 mr-2 shrink-0">
                        {`${profile}:${entry.path ?? currentPath}$`}
                      </span>
                      <span className="text-white break-all font-bold">
                        {entry.content}
                      </span>
                    </div>
                  ) : (
                    <div className="text-green-300 whitespace-pre-wrap font-mono">
                      {entry.content}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-4">
            {/* Input Area */}
            {mode === 'NORMAL' && (
              <div className="flex items-center">
                <span className="text-green-500 mr-2 shrink-0">
                  {`${profile}:${currentPath}$`}
                </span>
                {inputElement()}
              </div>
            )}

            <div className="ml-4">
              {/* Data-driven AWAITING_INPUT rendering */}
              {activeReadMode && (
                <ReadRow
                  prompt={activeReadMode.prompt}
                  className={activeReadMode.className}
                >
                  {inputElement(activeReadMode.inputProps)}
                </ReadRow>
              )}

              {/* Matrix */}
              {mode === 'MODAL_UI' && modeData === 'matrix' && (
                <>
                  <div className="text-green-400 mb-2">
                    Entering the Matrix... Press Ctrl+C to pause/escape.
                  </div>
                  <MatrixRain ref={matrixRef} paused={matrixPaused} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="opacity-0 w-0 h-0"
                    autoFocus
                  />
                </>
              )}

              {/* Vim */}
              {mode === 'MODAL_UI' && modeData?.type === 'vim' && (
                <VimEditor
                  onExit={exitModal}
                  textareaRef={vimTextareaRef}
                  cliRef={vimCliRef}
                  setInsertMode={setVimInsertMode}
                  insertMode={vimInsertMode}
                  initialText={modeData.content ?? ''}
                  onSave={(content: string) => {
                    const fname = modeData.filename
                    if (fname) {
                      const path = currentPathRef.current
                      setFileSystem((prev) => ({
                        ...prev,
                        [path]: { ...(prev[path] ?? {}), [fname]: content },
                      }))
                    }
                  }}
                />
              )}

              {/* Hidden input fallback for other modes */}
              {mode !== 'NORMAL' &&
                !activeReadMode &&
                !(mode === 'MODAL_UI' && modeData?.type === 'vim') && (
                  <div className="opacity-0 w-0 h-0 overflow-hidden">
                    {inputElement()}
                  </div>
                )}
            </div>
          </div>
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-green-900/30 text-[10px] uppercase tracking-widest text-green-700/80 flex justify-between select-none font-bold">
            <span>
              Tip: use 'vim [file]' to create and './[file]' to run BASIC
              scripts
            </span>
            <span>OS: BerK-Terminal-v1.0.0</span>
          </div>
    </div>
  )
}
