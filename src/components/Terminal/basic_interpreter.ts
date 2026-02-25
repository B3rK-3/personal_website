// ============================================================
// Tiny BASIC Interpreter — TypeScript rewrite
// Supported: PRINT, LET, FOR/NEXT, GOTO, GOSUB/RETURN,
//            IF/THEN/ELSE, REM, END, CLS, STOP,
//            built-in math & string functions
// ============================================================

/** Run a BASIC program and return its printed output lines. */
export function runBasicProgram(source: string): string[] {
  const interpreter = new BasicInterpreter(source)
  interpreter.run()
  return interpreter.output
}

// -------------------------------------------------------
//  Interpreter class – all state is encapsulated here
// -------------------------------------------------------

class BasicInterpreter {
  /** Collected PRINT output */
  output: string[] = []

  private lines: string[]
  private currentLine = 0
  private vars: Record<string, number> = {}
  private stack: number[] = []

  constructor(source: string) {
    // Normalise line endings and split
    this.lines = source.replace(/\r\n?/g, '\n').split('\n')

    // Initialise single-letter variables a–z to 0
    for (let c = 97; c <= 122; c++) {
      this.vars[String.fromCharCode(c)] = 0
    }
  }

  // ---------------------- public API ----------------------

  run(): void {
    const MAX_STEPS = 100_000 // safety net against infinite loops
    let steps = 0

    while (this.currentLine < this.lines.length && steps < MAX_STEPS) {
      const raw = this.lines[this.currentLine]
      if (raw === undefined) break
      this.executeLine(raw)
      this.currentLine++
      steps++
    }
  }

  // ------------------- line execution --------------------

  private executeLine(raw: string): void {
    const trimmed = raw.trim()
    if (!trimmed) return

    // Strip an optional leading line-number (e.g. "10 PRINT …")
    const firstToken = this.getWord(trimmed, 0)
    let rest: string
    if (/^\d+$/.test(firstToken)) {
      rest = trimmed.slice(firstToken.length).trim()
    } else {
      rest = trimmed
    }

    if (!rest) return

    const command = this.getWord(rest, 0).toUpperCase()
    const params = rest.slice(command.length).trim()

    switch (command) {
      case 'PRINT':
        this.cmdPrint(params)
        break
      case 'LET':
        this.cmdLet(params)
        break
      case 'FOR':
        this.cmdFor(params)
        break
      case 'NEXT':
        this.cmdNext(params)
        break
      case 'IF':
        this.cmdIf(params)
        break
      case 'GOTO':
        this.cmdGoto(params)
        break
      case 'GOSUB':
        this.cmdGosub(params)
        break
      case 'RETURN':
        this.cmdReturn()
        break
      case 'REM':
        break // comment – do nothing
      case 'END':
        this.currentLine = this.lines.length // terminates
        break
      case 'CLS':
        this.output = []
        break
      case 'STOP':
        this.currentLine = this.lines.length
        break
      default:
        // Try implicit LET (e.g. "X = 5")
        if (params.startsWith('=')) {
          this.cmdLet(command + ' ' + params)
        }
        break
    }
  }

  // --------------------- commands ------------------------

  private cmdPrint(params: string): void {
    if (!params) {
      this.output.push('')
      return
    }

    // Handle semicolons (suppress newline / concatenate)
    const suppressNewline = params.endsWith(';')
    const expr = suppressNewline ? params.slice(0, -1).trim() : params

    const value = this.evaluateExpression(expr)
    const str = String(value)

    if (suppressNewline) {
      // Append to last line if one exists, otherwise create one
      if (this.output.length > 0) {
        this.output[this.output.length - 1] += str
      } else {
        this.output.push(str)
      }
    } else {
      if (
        this.output.length > 0 &&
        this.output[this.output.length - 1] !== undefined
      ) {
        // Check if previous PRINT used semicolon (last char appended)
        // If the last output line was started by a semicolon print, append and finish
        this.output.push(str)
      } else {
        this.output.push(str)
      }
    }
  }

  private cmdLet(params: string): void {
    // LET X = expr  or just  X = expr
    const eqIdx = params.indexOf('=')
    if (eqIdx === -1) return

    const varName = params
      .slice(0, eqIdx)
      .trim()
      .replace(/^LET\s+/i, '')
      .toLowerCase()
    const expr = params.slice(eqIdx + 1).trim()
    this.vars[varName] = Number(this.evaluateExpression(expr))
  }

  private cmdFor(params: string): void {
    // FOR X = start TO end [STEP inc]
    const match = params.match(
      /^(\w+)\s*=\s*(.+?)\s+TO\s+(.+?)(?:\s+STEP\s+(.+))?$/i,
    )
    if (!match) return

    const varName = match[1].toLowerCase()
    const start = Number(this.evaluateExpression(match[2]))
    this.vars[varName] = start
    // The limit and step are evaluated when NEXT is reached
  }

  private cmdNext(params: string): void {
    const varName = params.trim().toLowerCase()

    // Walk backwards to find the matching FOR
    for (let i = this.currentLine - 1; i >= 0; i--) {
      const line = this.lines[i].trim()
      const stripped = this.stripLineNumber(line)
      const cmd = this.getWord(stripped, 0).toUpperCase()
      if (cmd !== 'FOR') continue

      const rest = stripped.slice(3).trim()
      const match = rest.match(
        /^(\w+)\s*=\s*(.+?)\s+TO\s+(.+?)(?:\s+STEP\s+(.+))?$/i,
      )
      if (!match) continue
      if (match[1].toLowerCase() !== varName) continue

      const limit = Number(this.evaluateExpression(match[3]))
      const step = match[4] ? Number(this.evaluateExpression(match[4])) : 1
      const current = (this.vars[varName] ?? 0) + step
      this.vars[varName] = current

      if ((step > 0 && current <= limit) || (step < 0 && current >= limit)) {
        // Jump to the line AFTER the FOR (run() will ++ so we land on the body)
        this.currentLine = i
      }
      return
    }
  }

  private cmdIf(params: string): void {
    // IF expr THEN statement [ELSE statement]
    const thenIdx = params.toUpperCase().indexOf(' THEN ')
    if (thenIdx === -1) return

    const condStr = params.slice(0, thenIdx).trim()
    const rest = params.slice(thenIdx + 6).trim()

    let thenPart: string
    let elsePart: string | null = null

    const elseIdx = rest.toUpperCase().indexOf(' ELSE ')
    if (elseIdx !== -1) {
      thenPart = rest.slice(0, elseIdx).trim()
      elsePart = rest.slice(elseIdx + 6).trim()
    } else {
      thenPart = rest
    }

    const condValue = this.evaluateExpression(condStr)
    if (condValue) {
      this.executeLine(thenPart)
    } else if (elsePart) {
      this.executeLine(elsePart)
    }
  }

  private cmdGoto(params: string): void {
    const targetLabel = params.trim()
    const idx = this.findLineByLabel(targetLabel)
    if (idx !== -1) {
      this.currentLine = idx - 1 // run() will ++
    }
  }

  private cmdGosub(params: string): void {
    this.stack.push(this.currentLine)
    this.cmdGoto(params)
  }

  private cmdReturn(): void {
    const returnLine = this.stack.pop()
    if (returnLine !== undefined) {
      this.currentLine = returnLine // run() will ++
    }
  }

  // ------------------- expression eval -------------------

  private evaluateExpression(expr: string): number | string {
    const trimmed = expr.trim()

    // String literal
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      return trimmed.slice(1, -1)
    }

    // String concatenation with + between quoted strings / vars
    if (trimmed.includes('"')) {
      return this.evalStringExpression(trimmed)
    }

    // Handle built-in functions
    const funcMatch = trimmed.match(
      /^(ABS|ACOS|ASIN|ATAN|COS|EXP|LOG|RND|ROUND|SIN|SQR|TAN|VAL|LEN|INT)\s*\(\s*(.+)\s*\)$/i,
    )
    if (funcMatch) {
      const fname = funcMatch[1].toUpperCase()
      const arg = this.evaluateExpression(funcMatch[2])

      switch (fname) {
        case 'ABS':
          return Math.abs(Number(arg))
        case 'ACOS':
          return Math.acos(Number(arg))
        case 'ASIN':
          return Math.asin(Number(arg))
        case 'ATAN':
          return Math.atan(Number(arg))
        case 'COS':
          return Math.cos(Number(arg))
        case 'EXP':
          return Math.exp(Number(arg))
        case 'LOG':
          return Math.log(Number(arg))
        case 'RND':
          return Math.random()
        case 'ROUND':
          return Math.round(Number(arg))
        case 'SIN':
          return Math.sin(Number(arg))
        case 'SQR':
          return Math.sqrt(Number(arg))
        case 'TAN':
          return Math.tan(Number(arg))
        case 'INT':
          return Math.floor(Number(arg))
        case 'VAL':
          return Number(arg)
        case 'LEN':
          return String(arg).length
        default:
          return 0
      }
    }

    // LEFT$, MID$, RIGHT$
    const strFuncMatch = trimmed.match(
      /^(LEFT|MID|RIGHT)\$?\s*\(\s*(.+)\s*\)$/i,
    )
    if (strFuncMatch) {
      const fname = strFuncMatch[1].toUpperCase()
      const innerArgs = this.splitFuncArgs(strFuncMatch[2])

      if (fname === 'LEFT' && innerArgs.length >= 2) {
        const s = String(this.evaluateExpression(innerArgs[0]))
        const n = Number(this.evaluateExpression(innerArgs[1]))
        return s.substring(0, n)
      }
      if (fname === 'RIGHT' && innerArgs.length >= 2) {
        const s = String(this.evaluateExpression(innerArgs[0]))
        const n = Number(this.evaluateExpression(innerArgs[1]))
        return s.substring(s.length - n)
      }
      if (fname === 'MID' && innerArgs.length >= 3) {
        const s = String(this.evaluateExpression(innerArgs[0]))
        const start = Number(this.evaluateExpression(innerArgs[1]))
        const count = Number(this.evaluateExpression(innerArgs[2]))
        return s.substring(start, start + count)
      }
    }

    // Numeric expression — use safe arithmetic evaluator
    return this.evalNumericExpression(trimmed)
  }

  private evalStringExpression(expr: string): string {
    // Split on + outside quotes and concatenate
    const parts: string[] = []
    let current = ''
    let inQuote = false

    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i]
      if (ch === '"') {
        inQuote = !inQuote
        current += ch
      } else if (ch === '+' && !inQuote) {
        parts.push(current.trim())
        current = ''
      } else {
        current += ch
      }
    }
    if (current.trim()) parts.push(current.trim())

    return parts
      .map((p) => {
        if (p.startsWith('"') && p.endsWith('"')) {
          return p.slice(1, -1)
        }
        return String(this.evaluateExpression(p))
      })
      .join('')
  }

  /**
   * Simple recursive-descent numeric evaluator.
   * Supports: +, -, *, /, %, parentheses, comparison operators,
   * variable lookup, and numeric literals.
   */
  private evalNumericExpression(expr: string): number {
    const tokens = this.tokenize(expr)
    const ctx = { pos: 0, tokens }
    const result = this.parseComparison(ctx)
    return result
  }

  private tokenize(expr: string): string[] {
    const tokens: string[] = []
    let i = 0
    const s = expr.trim()

    while (i < s.length) {
      if (/\s/.test(s[i])) {
        i++
        continue
      }

      // Multi-char operators
      if (s[i] === '<' && s[i + 1] === '=') {
        tokens.push('<=')
        i += 2
        continue
      }
      if (s[i] === '>' && s[i + 1] === '=') {
        tokens.push('>=')
        i += 2
        continue
      }
      if (s[i] === '<' && s[i + 1] === '>') {
        tokens.push('<>')
        i += 2
        continue
      }

      // Single-char operators and parens
      if ('+-*/%()=<>'.includes(s[i])) {
        tokens.push(s[i])
        i++
        continue
      }

      // Numbers
      if (/[0-9.]/.test(s[i])) {
        let num = ''
        while (i < s.length && /[0-9.]/.test(s[i])) {
          num += s[i]
          i++
        }
        tokens.push(num)
        continue
      }

      // Identifiers (variable names)
      if (/[a-zA-Z_]/.test(s[i])) {
        let id = ''
        while (i < s.length && /[a-zA-Z0-9_]/.test(s[i])) {
          id += s[i]
          i++
        }
        tokens.push(id)
        continue
      }

      i++ // skip unknown
    }
    return tokens
  }

  private parseComparison(ctx: { pos: number; tokens: string[] }): number {
    let left = this.parseAddSub(ctx)
    while (ctx.pos < ctx.tokens.length) {
      const op = ctx.tokens[ctx.pos]
      if (!['=', '<', '>', '<=', '>=', '<>'].includes(op)) break
      ctx.pos++
      const right = this.parseAddSub(ctx)
      switch (op) {
        case '=':
          left = left === right ? 1 : 0
          break
        case '<':
          left = left < right ? 1 : 0
          break
        case '>':
          left = left > right ? 1 : 0
          break
        case '<=':
          left = left <= right ? 1 : 0
          break
        case '>=':
          left = left >= right ? 1 : 0
          break
        case '<>':
          left = left !== right ? 1 : 0
          break
      }
    }
    return left
  }

  private parseAddSub(ctx: { pos: number; tokens: string[] }): number {
    let left = this.parseMulDiv(ctx)
    while (ctx.pos < ctx.tokens.length) {
      const op = ctx.tokens[ctx.pos]
      if (op !== '+' && op !== '-') break
      ctx.pos++
      const right = this.parseMulDiv(ctx)
      left = op === '+' ? left + right : left - right
    }
    return left
  }

  private parseMulDiv(ctx: { pos: number; tokens: string[] }): number {
    let left = this.parseUnary(ctx)
    while (ctx.pos < ctx.tokens.length) {
      const op = ctx.tokens[ctx.pos]
      if (op !== '*' && op !== '/' && op !== '%') break
      ctx.pos++
      const right = this.parseUnary(ctx)
      if (op === '*') left *= right
      else if (op === '/') left = right !== 0 ? left / right : 0
      else left = right !== 0 ? left % right : 0
    }
    return left
  }

  private parseUnary(ctx: { pos: number; tokens: string[] }): number {
    if (ctx.tokens[ctx.pos] === '-') {
      ctx.pos++
      return -this.parsePrimary(ctx)
    }
    if (ctx.tokens[ctx.pos] === '+') {
      ctx.pos++
    }
    return this.parsePrimary(ctx)
  }

  private parsePrimary(ctx: { pos: number; tokens: string[] }): number {
    const token = ctx.tokens[ctx.pos]
    if (!token) return 0

    // Parenthesised expression
    if (token === '(') {
      ctx.pos++
      const val = this.parseComparison(ctx)
      if (ctx.tokens[ctx.pos] === ')') ctx.pos++
      return val
    }

    // Numeric literal
    if (/^[0-9]/.test(token)) {
      ctx.pos++
      return parseFloat(token)
    }

    // Variable
    ctx.pos++
    return this.vars[token.toLowerCase()] ?? 0
  }

  // --------------------- utilities -----------------------

  private getWord(text: string, index: number): string {
    const words = text.trim().split(/\s+/)
    return words[index] ?? ''
  }

  private stripLineNumber(line: string): string {
    const trimmed = line.trim()
    const first = this.getWord(trimmed, 0)
    if (/^\d+$/.test(first)) {
      return trimmed.slice(first.length).trim()
    }
    return trimmed
  }

  private findLineByLabel(label: string): number {
    for (let i = 0; i < this.lines.length; i++) {
      const first = this.getWord(this.lines[i].trim(), 0)
      if (first === label) return i
    }
    return -1
  }

  private splitFuncArgs(inner: string): string[] {
    const args: string[] = []
    let depth = 0
    let current = ''
    let inQuote = false

    for (const ch of inner) {
      if (ch === '"') inQuote = !inQuote
      if (!inQuote && ch === '(') depth++
      if (!inQuote && ch === ')') depth--
      if (!inQuote && ch === ',' && depth === 0) {
        args.push(current.trim())
        current = ''
      } else {
        current += ch
      }
    }
    if (current.trim()) args.push(current.trim())
    return args
  }
}
