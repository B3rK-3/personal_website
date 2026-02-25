import React from 'react'

interface ReadRowProps {
  prompt?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/** Renders a prompt + input (or static text) in a single flex row, matching terminal output styling. */
export function ReadRow({ prompt, children, className = '' }: ReadRowProps) {
  return (
    <div className={`flex items-center ${className} opacity-90`}>
      {prompt && <span className="text-green-400 mr-2 shrink-0">{prompt}</span>}
      {children}
    </div>  
  )
}

/** Builds a static JSX node that mimics what the user saw while typing, frozen into history. */
export function buildReadHistoryNode(
  prompt: React.ReactNode,
  value: string,
  isPassword?: boolean,
  className: string = '',
  suffix?: React.ReactNode,
): React.ReactNode {
  const displayValue = isPassword ? '*'.repeat(value.length) : value
  return (
    <div className={`flex items-center ${className} opacity-90`}>
      {prompt && <span className="text-green-400 mr-2 shrink-0">{prompt}</span>}
      <span className="flex-1 text-white font-bold">
        {displayValue}
        {suffix && (
          <span className="text-white ml-2 opacity-80 font-normal">
            {suffix}
          </span>
        )}
      </span>
    </div>
  )
}

interface TerminalInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>
  value: string
  onChange: (val: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  extraProps?: React.InputHTMLAttributes<HTMLInputElement>
}

/** The main terminal input element, used across all modes. */
export function TerminalInput({
  inputRef,
  value,
  onChange,
  onKeyDown,
  extraProps,
}: TerminalInputProps) {
  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      autoFocus
      spellCheck={false}
      autoComplete="off"
      {...extraProps}
      className={`flex-1 bg-transparent border-none outline-none focus:ring-0 text-white caret-green-500 font-bold ${extraProps?.className || ''}`}
    />
  )
}
