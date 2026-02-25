import React from 'react'
import resumeData from '../../data/resume.json'
import {
  FORTUNES,
  GITHUB_USERNAME,
  HACK_MESSAGES,
  RM_MESSAGES,
  buildCowsay,
  profile,
} from './constants'
import type { CommandContext, CommandDef, LogEntry } from './types'

// --- Resume Formatting Helpers ---

function formatAbout(info: typeof resumeData.personalInfo) {
  return `NAME:    ${info.name}
TITLE:   ${info.title}
LOC:     ${info.location}
EMAIL:   ${info.email}
GITHUB:  ${info.github}
LINKEDIN: ${info.linkedin}
`
}

function formatEducation(eduList: typeof resumeData.education) {
  return eduList
    .map(
      (edu) => `${edu.institution}
${edu.college} | ${edu.degree}
[ ${edu.startDate} - ${edu.endDate} ]
GPA: ${edu.gpa}
Courses: ${edu.courses.join(', ')}
`,
    )
    .join('\n')
}

function formatExperience(expList: typeof resumeData.experience) {
  return expList
    .map(
      (exp) => `${exp.role} @ ${exp.company}
[ ${exp.startDate} - ${exp.endDate} ]
${exp.companyType} — ${exp.location}
${exp.highlights.map((h) => `- ${h}`).join('\n')}
`,
    )
    .join('\n')
}

function formatProjects(projList: typeof resumeData.projects) {
  return projList
    .map(
      (proj) => `${proj.name}
Stack: [ ${proj.techStack.join(', ')} ]
${proj.description}
`,
    )
    .join('\n')
}

function formatSkills(skills: typeof resumeData.skills) {
  return `LANGUAGES:
  ${skills.languages.join(', ')}

MACHINE LEARNING:
  ${skills.machineLearning.join(', ')}

SYSTEMS & TOOLS:
  ${skills.systemsTools.join(', ')}
`
}

function formatAwards(awards: typeof resumeData.awardsAndLeadership) {
  return awards
    .map(
      (award) => `${award.title}
${award.description}
`,
    )
    .join('\n')
}

// --- Shared Rendering Helpers ---

const buildLsNode = (
  names: Array<string>,
  vfsNames: Array<string> = [],
): React.ReactNode => (
  <span className="flex flex-wrap gap-x-6 gap-y-0.5">
    {names.map((name) => {
      const isDir = name.endsWith('/')
      return (
        <span
          key={name}
          className={isDir ? 'text-cyan-400 font-semibold' : 'text-white'}
        >
          {name}
        </span>
      )
    })}
    {vfsNames.map((name) => (
      <span key={`vfs-${name}`} className="text-yellow-300">
        {name}
      </span>
    ))}
  </span>
)

// --- GitHub API Helpers ---

async function fetchGithubRepos(ctx: CommandContext): Promise<React.ReactNode> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
    )
    if (!response.ok) throw new Error('Failed to fetch repos')
    const data = await response.json()
    const names: Array<string> = data.map((repo: any) => repo.name as string)
    ctx.setRepoNames(names)
    return buildLsNode(names)
  } catch {
    return 'Error fetching repositories.'
  }
}

async function fetchRepoDetails(repoName: string): Promise<string> {
  try {
    const [repoRes, commitsRes, langsRes, readmeRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`),
      fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/commits?per_page=1`,
      ),
      fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      ),
      fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`,
        { headers: { Accept: 'application/vnd.github.v3.raw' } },
      ),
    ])

    if (!repoRes.ok) return `Repository '${repoName}' not found.`

    const repoData = await repoRes.json()
    const languages = await langsRes.json()
    const readme = readmeRes.ok
      ? await readmeRes.text()
      : 'README.md not found.'

    const commitMatch = commitsRes.headers
      .get('link')
      ?.match(/page=(\d+)>; rel="last"/)
    const commitCount = commitMatch ? commitMatch[1] : '>0'

    return `Project: ${repoData.name}
Description: ${repoData.description || 'No description provided.'}
Stars: ${repoData.stargazers_count} | Forks: ${repoData.forks_count}
Languages: ${Object.keys(languages).join(', ')}
Approx. Commits: ${commitCount}
---
README.md:
${readme.slice(0, 1000)}${readme.length > 1000 ? '\n...(truncated)' : ''}
`
  } catch {
    return `Error fetching details for '${repoName}'.`
  }
}

// --- Typewriter Effect Helper ---

function typewriterEffect(
  messages: Array<string>,
  ctx: CommandContext,
  delayBase: number = 150,
) {
  messages.forEach((msg, i) => {
    setTimeout(
      () => {
        if (ctx.abortSignal?.aborted) return

        ctx.setHistory((prev) => [
          ...prev,
          { type: 'output', content: msg } as LogEntry,
        ])
      },
      delayBase * (i + 1),
    )
  })
  setTimeout(
    () => {
      if (ctx.abortSignal?.aborted) return
      ctx.setMode('NORMAL')
    },
    delayBase * messages.length + 100,
  )
}

// ================================
//         COMMAND REGISTRY
// ================================

export const commands: Array<CommandDef> = [
  // --- Portfolio / Resume ---
  {
    name: 'help',
    description: 'List available commands',
    handler: (_args, _ctx) => {
      return `Available commands: ${commands.map((c) => c.name).join(', ')}

Scripts & Files:
  vim [file]     Create or edit a BASIC script in the virtual filesystem.
  ./[file]       Execute a BASIC script from the current directory.
  ls             List files (VFS files appear in yellow).
  cat [file]     View file contents.
  rm [file]      Remove a file from the virtual filesystem.`
    },
  },
  {
    name: 'whoami',
    description: 'Who are you?',
    handler: () => `${profile}`,
  },
  {
    name: 'about',
    description: 'About me',
    handler: () => formatAbout(resumeData.personalInfo),
  },
  {
    name: 'education',
    description: 'Education history',
    handler: () => formatEducation(resumeData.education),
  },
  {
    name: 'experience',
    description: 'Work experience',
    handler: () => formatExperience(resumeData.experience),
  },
  {
    name: 'projects',
    description: 'Project portfolio',
    handler: () => formatProjects(resumeData.projects),
  },
  {
    name: 'skills',
    description: 'Technical skills',
    handler: () => formatSkills(resumeData.skills),
  },
  {
    name: 'awards',
    description: 'Awards & leadership',
    handler: () => formatAwards(resumeData.awardsAndLeadership),
  },

  // --- Navigation ---
  {
    name: 'gui',
    description: 'Redirect to GUI version',
    handler: () => {
      setTimeout(() => {
        window.location.href = '/portfolio?bypass=1'
      }, 1000)
      return 'Redirecting to GUI version...'
    },
  },

  // --- File system ---
  {
    name: 'pwd',
    description: 'Print working directory',
    handler: (_args, ctx) => ctx.currentPath,
  },
  {
    name: 'ls',
    description: 'List directory contents',
    handler: async (_args, ctx, _rawCmd) => {
      const path = ctx.currentPathRef.current
      const vfsFiles = Object.keys(ctx.fileSystem[path] ?? {})
      if (path === '~') {
        return buildLsNode(['github/'], vfsFiles)
      } else if (path === '~/github') {
        // Show loading, then replace with results
        ctx.addOutput('Loading repositories...')
        const repos = await fetchGithubRepos(ctx)
        // Merge VFS files into the result
        if (vfsFiles.length > 0) {
          ctx.setHistory((prev) => {
            const nh = [...prev]
            nh[nh.length - 1].content = buildLsNode(ctx.repoNames, vfsFiles)
            return nh
          })
        } else {
          ctx.setHistory((prev) => {
            const nh = [...prev]
            nh[nh.length - 1].content = repos
            return nh
          })
        }
        return // output handled manually
      }
      if (vfsFiles.length > 0) {
        return buildLsNode([], vfsFiles)
      }
      return ''
    },
  },
  {
    name: 'cd',
    description: 'Change directory',
    handler: (args, ctx) => {
      const target = args[0] || '~'
      if (target === '~' || target === '..') {
        ctx.setCurrentPath('~')
        ctx.currentPathRef.current = '~'
        return ''
      } else if (target === 'github' || target === '~/github') {
        // console.log(ctx.fileSystem)
        ctx.setCurrentPath('~/github')
        ctx.currentPathRef.current = '~/github'
        return ''
      } else if (target === '.' || target === './') {
        return ''
      }
      return `cd: no such directory: ${target}`
    },
  },
  {
    name: 'cat',
    description: 'View file contents',
    handler: async (args, ctx, _rawCmd) => {
      const path = ctx.currentPathRef.current
      const fileName = args[0]
      if (!fileName) return 'usage: cat [file]'

      // Check VFS first
      const vfsContent = (ctx.fileSystem[path] ?? {})[fileName]
      if (vfsContent !== undefined) return vfsContent

      // Fall through to GitHub repos
      if (path === '~/github') {
        ctx.addOutput(`Fetching details for ${fileName}...`)
        const details = await fetchRepoDetails(fileName)
        ctx.setHistory((prev) => {
          const nh = [...prev]
          nh[nh.length - 1].content = details
          return nh
        })
        return // output handled manually
      }
      return `cat: ${fileName}: No such file`
    },
  },

  // --- Game ---
  {
    name: 'play',
    description: 'Launch ASCIItron',
    handler: (_args, ctx) => {
      ctx.setMode('AWAITING_INPUT')
      ctx.setModeData('play_nickname')
      return null
    },
  },

  // --- Fun Commands ---
  {
    name: 'fortune',
    description: 'Random programming quote',
    handler: () => FORTUNES[Math.floor(Math.random() * FORTUNES.length)],
  },
  {
    name: 'cowsay',
    description: 'Cow says what you type',
    handler: (args) => {
      const text = args.join(' ') || 'moo'
      return buildCowsay(text)
    },
  },
  {
    name: 'matrix',
    description: 'Enter the Matrix',
    handler: (_args, ctx) => {
      ctx.setMode('MODAL_UI')
      ctx.setModeData('matrix')
      return null as any
    },
  },

  // --- Easter Eggs ---
  {
    name: 'sudo',
    description: 'Superuser do',
    handler: (_args, ctx) => {
      ctx.setMode('AWAITING_INPUT')
      ctx.setModeData('sudo')
      return null
    },
  },
  {
    name: 'rm',
    description: 'Remove files',
    handler: (args, ctx, rawCmd) => {
      const fullArgs = rawCmd.replace(/^rm\s*/, '').trim()

      if (!fullArgs) {
        return `rm: missing operand. Try 'rm --help'`
      }

      // Check for the "oopsie" cases
      if (
        fullArgs.includes('-rf') &&
        (fullArgs.includes('~') || fullArgs.includes('/'))
      ) {
        return 'that must be an oopsie!'
      }

      // Existing Easter egg (only trigger if it doesn't match the oopsie)
      if (
        fullArgs.includes('-rf') &&
        !fullArgs.includes('~') &&
        !fullArgs.includes('/')
      ) {
        ctx.setMode('RMRF')
        typewriterEffect(RM_MESSAGES, ctx, 200)
        return null as any // output is handled by typewriter
      }

      // If it's a directory removal attempt (e.g. rm -r github)
      if (fullArgs.includes('-r') && args.some((arg) => arg !== '-r')) {
        return `rm: cannot remove '${args.find((a) => a !== '-r')}': Permission denied`
      }

      // Check if it's a VFS file
      const path = ctx.currentPathRef.current
      const fileName = args[0]
      const currentFiles = ctx.fileSystem[path] ?? {}
      // ctx.fileSyst
      if (fileName in currentFiles) {
        // Remove the file from VFS
        ctx.setFileSystem((prev) => {
          const next = { ...prev }
          const nextDir = { ...next[path] }
          delete nextDir[fileName]
          next[path] = nextDir
          return next
        })
        return '' // Successful silent removal
      }

      return `rm: cannot remove '${fileName}': No such file or directory`
    },
  },
  {
    name: 'vim',
    description: 'The editor you can never leave',
    handler: (args, ctx) => {
      const filename = args[0] || ''
      const path = ctx.currentPathRef.current
      const existingContent = filename
        ? ((ctx.fileSystem[path] ?? {})[filename] ?? '')
        : ''
      ctx.setMode('MODAL_UI')
      ctx.setModeData({ type: 'vim', filename, content: existingContent })
      return null as any
    },
  },
  {
    name: 'hack',
    description: 'Hack the mainframe',
    handler: (_args, ctx) => {
      ctx.setMode('HACK')
      typewriterEffect(HACK_MESSAGES, ctx, 250)
      return '🔓 Initiating hack sequence...'
    },
  },
]

// Build a map for fast lookup
export const commandMap = new Map<string, CommandDef>(
  commands.map((c) => [c.name, c]),
)

/** The list of command names, used for tab completion */
export const ALL_COMMAND_NAMES = commands.map((c) => c.name)
