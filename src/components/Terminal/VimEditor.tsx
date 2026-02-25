import React, { useEffect, useState } from 'react'

interface VimEditorProps {
  onExit: (message: string) => void
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  cliRef: React.RefObject<HTMLInputElement | null>
  setInsertMode: (state: boolean) => void
  insertMode: boolean
  initialText?: string
  onSave?: (content: string) => void
}

export default function VimEditor({
  onExit,
  textareaRef,
  cliRef,
  setInsertMode,
  insertMode,
  initialText = '',
  onSave,
}: VimEditorProps) {
  const [text, setText] = useState(initialText)
  const [cliText, setCliText] = useState('')

  useEffect(() => {
    setTimeout(() => cliRef.current?.focus(), 50)
  }, [])

  const exitVim = (msg: string) => {
    onExit(msg)
  }

  const handleTextareaKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      exitVim('^C')
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setInsertMode(false)
      setTimeout(() => cliRef.current?.focus(), 50)
    }
  }

  const handleCliKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      exitVim('^C')
      return
    }
    if (e.key === 'i' && cliText === '') {
      e.preventDefault()
      setInsertMode(true)
      setTimeout(() => textareaRef.current?.focus(), 50)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = cliText.trim()
      if (cmd === ':wq' || cmd === ':w') {
        // Save the file content
        if (onSave) onSave(text)
        if (cmd === ':wq') {
          exitVim('File saved. Exiting vim.')
        } else {
          setCliText('')
        }
      } else if (cmd === ':q!' || cmd === ':q') {
        exitVim('Exiting vim.')
      } else {
        setCliText('')
      }
    }
  }
  
  return (
    <div className="border border-gray-600 bg-black min-h-[400px] flex flex-col font-mono">
      <div className="flex-1 p-2 overflow-y-auto">
        <textarea
          ref={textareaRef}
          value={text}
          rows={text.split('\n').length}
          onChange={(e) => {
            setText(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          onKeyDown={handleTextareaKeyDown}
          onMouseDown={(e) => {
            if (!insertMode) {
              e.preventDefault()
              cliRef.current?.focus()
            }
          }}
          className="w-full bg-transparent text-white border-none outline-none resize-none overflow-hidden block caret-white leading-normal p-0 m-0"
          spellCheck={false}
          readOnly={!insertMode}
        />
        <pre className="text-blue-400 font-mono m-0 leading-normal pointer-events-none select-none">
          {Array(Math.max(0, 20 - text.split('\n').length))
            .fill('~')
            .join('\n')}
        </pre>
      </div>
      <div className="flex items-center text-white bg-gray-800 px-2 py-1 text-sm font-mono h-8">
        {insertMode ? <span className="mr-2">-- INSERT --</span> : null}
        <input
          ref={cliRef}
          type="text"
          value={cliText}
          onChange={(e) => setCliText(e.target.value)}
          onKeyDown={handleCliKeyDown}
          className={`flex-1 bg-transparent border-none outline-none text-white focus:ring-0 caret-white p-0 ${insertMode ? 'opacity-0 w-0' : 'opacity-100'}`}
          spellCheck={false}
          autoComplete="off"
          disabled={insertMode}
        />
      </div>
    </div>
  )
}
