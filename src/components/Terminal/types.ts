import type React from 'react'

export type LogEntry = {
  type: 'input' | 'output'
  content: string | React.ReactNode
  /** Snapshot of the path at the time this input was run — only used for 'input' entries */
  path?: string
  /** Whether this output should add a newline above itself (default true for input, configurable for output) */
  newline?: boolean
}

/**
 * Terminal modes control how input is captured.
 * - NORMAL: standard prompt
 * - AWAITING_INPUT: special capture (e.g. sudo password)
 * - MODAL_UI: full-screen take-over (vim, matrix)
 */
export type TerminalMode =
  | 'NORMAL'
  | 'AWAITING_INPUT'
  | 'MODAL_UI'
  | 'GAME'
  | 'HACK'
  | 'RMRF'

/** In-memory virtual file system: path → { filename → content } */
export type VirtualFileSystem = Record<string, Record<string, string>>

/** Context passed to every command handler */
export interface CommandContext {
  currentPath: string
  setCurrentPath: (p: string) => void
  currentPathRef: React.MutableRefObject<string>
  history: Array<LogEntry>
  setHistory: React.Dispatch<React.SetStateAction<Array<LogEntry>>>
  setInput: (s: string) => void
  setMode: (m: TerminalMode) => void
  setModeData: (d: any) => void
  setGameRunning: (b: boolean) => void
  playerNicknameRef: React.MutableRefObject<string>
  repoNames: Array<string>
  setRepoNames: (n: Array<string>) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  addOutput: (content: string | React.ReactNode) => void
  abortSignal?: AbortSignal
  fileSystem: VirtualFileSystem
  setFileSystem: React.Dispatch<React.SetStateAction<VirtualFileSystem>>
}

export interface CommandDef {
  name: string
  description: string
  handler: (
    args: Array<string>,
    ctx: CommandContext,
    rawCmd: string,
  ) =>
    | Promise<string | React.ReactNode | void>
    | string
    | React.ReactNode
    | void
}
