import { j as jsxRuntimeExports, r as reactExports, a as React } from "../_libs/react.mjs";
import { A as ASCII_ART } from "./router-ZZ61vyTM.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./index.mjs";
import { r as resumeData } from "./resume-D4OLojd1.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:https";
import "node:http2";
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getHighscores = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(createSsrRpc("940c838dc6cf882bc59c7bbb13a1fcb400f0b0c2a0f25444a03cb742303ef2e7"));
const saveHighscore = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("1afda741c3bccd54602eece2bec99e527e28efd152a6613dfa703c2502ec76dd"));
const profile = "visitor@website";
const FORTUNES = [
  '"Programs must be written for people to read, and only incidentally for machines to execute." — Harold Abelson',
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"It works on my machine." — Every developer ever',
  '"There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton',
  '"The best error message is the one that never shows up." — Thomas Fuchs',
  '"Deleted code is debugged code." — Jeff Sickel',
  '"In theory, there is no difference between theory and practice. But, in practice, there is." — Jan L. A. van de Snepscheut',
  '"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry',
  '"Code never lies, comments sometimes do." — Ron Jeffries',
  '"Simplicity is the soul of efficiency." — Austin Freeman',
  '"Programming is the art of telling another human what one wants the computer to do." — Donald Knuth',
  '"Before software can be reusable it first has to be usable." — Ralph Johnson',
  '"The most disastrous thing that you can ever learn is your first programming language." — Alan Kay'
];
const GITHUB_USERNAME = "B3rK-3";
const HACK_MESSAGES = [
  "Initializing breach protocol...",
  "Scanning open ports... 22, 80, 443, 8080",
  "SSH fingerprint: RSA 2048 aa:bb:cc:dd:ee:ff",
  "Bypassing firewall... [################] 100%",
  "Injecting payload into memory address 0x7FFE...",
  "Decrypting RSA-4096 key... brute-forcing...",
  "cracking /etc/shadow... hash: $6$rounds=5000$...",
  "Establishing reverse shell on 192.168.1.42:4444...",
  "Connection established. Escalating privileges...",
  "Overriding kernel module... insmod rootkit.ko",
  "Spoofing MAC address... 00:DE:AD:BE:EF:00",
  "Intercepting network traffic on eth0...",
  "Extracting database credentials...",
  "DB_HOST=10.0.0.5 DB_USER=admin DB_PASS=hunter2",
  "Downloading /var/www/secret_plans.pdf...",
  "Implanting backdoor on port 31337...",
  "Covering tracks... clearing /var/log/*",
  "Rerouting through TOR exit nodes...",
  "ACCESS GRANTED.",
  "",
  "Just kidding. I'm a portfolio website. 🙂"
];
const RM_MESSAGES = [
  "rm: removing /usr/bin/...",
  "rm: removing /etc/passwd...",
  "rm: removing /home/visitor/.bashrc...",
  "rm: removing /var/log/syslog...",
  "rm: removing /boot/vmlinuz...",
  "rm: removing /dev/sda1...",
  "rm: removing /System32/...",
  "rm: removing /root/.ssh/id_rsa...",
  "⚠️  CRITICAL SYSTEM FILES DELETED",
  "",
  "Just kidding. You don't have permission. 😏"
];
function buildCowsay(text) {
  const maxWidth = 40;
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";
  for (const word of words) {
    if (currentLine.length + word.length + 1 > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine ? `${currentLine} ${word}` : word;
    }
  }
  if (currentLine) lines.push(currentLine);
  const width = Math.max(...lines.map((l) => l.length));
  const border = " " + "_".repeat(width + 2);
  const bottom = " " + "-".repeat(width + 2);
  let bubble;
  if (lines.length === 1) {
    bubble = `${border}
< ${lines[0].padEnd(width)} >
${bottom}`;
  } else {
    const middle = lines.map((line, i) => {
      const padded = line.padEnd(width);
      if (i === 0) return `/ ${padded} \\`;
      if (i === lines.length - 1) return `\\ ${padded} /`;
      return `| ${padded} |`;
    });
    bubble = `${border}
${middle.join("\n")}
${bottom}`;
  }
  const cow = `        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
  return `${bubble}
${cow}`;
}
function formatAbout(info) {
  return `NAME:    ${info.name}
TITLE:   ${info.title}
LOC:     ${info.location}
EMAIL:   ${info.email}
GITHUB:  ${info.github}
LINKEDIN: ${info.linkedin}
`;
}
function formatEducation(eduList) {
  return eduList.map(
    (edu) => `${edu.institution}
${edu.college} | ${edu.degree}
[ ${edu.startDate} - ${edu.endDate} ]
GPA: ${edu.gpa}
Courses: ${edu.courses.join(", ")}
`
  ).join("\n");
}
function formatExperience(expList) {
  return expList.map(
    (exp) => `${exp.role} @ ${exp.company}
[ ${exp.startDate} - ${exp.endDate} ]
${exp.companyType} — ${exp.location}
${exp.highlights.map((h) => `- ${h}`).join("\n")}
`
  ).join("\n");
}
function formatProjects(projList) {
  return projList.map(
    (proj) => `${proj.name}
Stack: [ ${proj.techStack.join(", ")} ]
${proj.description}
`
  ).join("\n");
}
function formatSkills(skills) {
  return `LANGUAGES:
  ${skills.languages.join(", ")}

MACHINE LEARNING:
  ${skills.machineLearning.join(", ")}

SYSTEMS & TOOLS:
  ${skills.systemsTools.join(", ")}
`;
}
function formatAwards(awards) {
  return awards.map(
    (award) => `${award.title}
${award.description}
`
  ).join("\n");
}
const buildLsNode = (names, vfsNames = []) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap gap-x-6 gap-y-0.5", children: [
  names.map((name) => {
    const isDir = name.endsWith("/");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: isDir ? "text-cyan-400 font-semibold" : "text-white",
        children: name
      },
      name
    );
  }),
  vfsNames.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-300", children: name }, `vfs-${name}`))
] });
async function fetchGithubRepos(ctx) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`
    );
    if (!response.ok) throw new Error("Failed to fetch repos");
    const data = await response.json();
    const names = data.map((repo) => repo.name);
    ctx.setRepoNames(names);
    return buildLsNode(names);
  } catch {
    return "Error fetching repositories.";
  }
}
async function fetchRepoDetails(repoName) {
  try {
    const [repoRes, commitsRes, langsRes, readmeRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`),
      fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/commits?per_page=1`
      ),
      fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`
      ),
      fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`,
        { headers: { Accept: "application/vnd.github.v3.raw" } }
      )
    ]);
    if (!repoRes.ok) return `Repository '${repoName}' not found.`;
    const repoData = await repoRes.json();
    const languages = await langsRes.json();
    const readme = readmeRes.ok ? await readmeRes.text() : "README.md not found.";
    const commitMatch = commitsRes.headers.get("link")?.match(/page=(\d+)>; rel="last"/);
    const commitCount = commitMatch ? commitMatch[1] : ">0";
    return `Project: ${repoData.name}
Description: ${repoData.description || "No description provided."}
Stars: ${repoData.stargazers_count} | Forks: ${repoData.forks_count}
Languages: ${Object.keys(languages).join(", ")}
Approx. Commits: ${commitCount}
---
README.md:
${readme.slice(0, 1e3)}${readme.length > 1e3 ? "\n...(truncated)" : ""}
`;
  } catch {
    return `Error fetching details for '${repoName}'.`;
  }
}
function typewriterEffect(messages, ctx, delayBase = 150) {
  messages.forEach((msg, i) => {
    setTimeout(
      () => {
        if (ctx.abortSignal?.aborted) return;
        ctx.setHistory((prev) => [
          ...prev,
          { type: "output", content: msg }
        ]);
      },
      delayBase * (i + 1)
    );
  });
  setTimeout(
    () => {
      if (ctx.abortSignal?.aborted) return;
      ctx.setMode("NORMAL");
    },
    delayBase * messages.length + 100
  );
}
const commands = [
  // --- Portfolio / Resume ---
  {
    name: "help",
    description: "List available commands",
    handler: (_args, _ctx) => {
      return `Available commands: ${commands.map((c) => c.name).join(", ")}

Scripts & Files:
  vim [file]     Create or edit a BASIC script in the virtual filesystem.
  ./[file]       Execute a BASIC script from the current directory.
  ls             List files (VFS files appear in yellow).
  cat [file]     View file contents.
  rm [file]      Remove a file from the virtual filesystem.`;
    }
  },
  {
    name: "whoami",
    description: "Who are you?",
    handler: () => `${profile}`
  },
  {
    name: "about",
    description: "About me",
    handler: () => formatAbout(resumeData.personalInfo)
  },
  {
    name: "education",
    description: "Education history",
    handler: () => formatEducation(resumeData.education)
  },
  {
    name: "experience",
    description: "Work experience",
    handler: () => formatExperience(resumeData.experience)
  },
  {
    name: "projects",
    description: "Project portfolio",
    handler: () => formatProjects(resumeData.projects)
  },
  {
    name: "skills",
    description: "Technical skills",
    handler: () => formatSkills(resumeData.skills)
  },
  {
    name: "awards",
    description: "Awards & leadership",
    handler: () => formatAwards(resumeData.awardsAndLeadership)
  },
  // --- Navigation ---
  {
    name: "gui",
    description: "Redirect to GUI version",
    handler: () => {
      setTimeout(() => {
        window.location.href = "/portfolio?bypass=1";
      }, 1e3);
      return "Redirecting to GUI version...";
    }
  },
  // --- File system ---
  {
    name: "pwd",
    description: "Print working directory",
    handler: (_args, ctx) => ctx.currentPath
  },
  {
    name: "ls",
    description: "List directory contents",
    handler: async (_args, ctx, _rawCmd) => {
      const path = ctx.currentPathRef.current;
      const vfsFiles = Object.keys(ctx.fileSystem[path] ?? {});
      if (path === "~") {
        return buildLsNode(["github/"], vfsFiles);
      } else if (path === "~/github") {
        ctx.addOutput("Loading repositories...");
        const repos = await fetchGithubRepos(ctx);
        if (vfsFiles.length > 0) {
          ctx.setHistory((prev) => {
            const nh = [...prev];
            nh[nh.length - 1].content = buildLsNode(ctx.repoNames, vfsFiles);
            return nh;
          });
        } else {
          ctx.setHistory((prev) => {
            const nh = [...prev];
            nh[nh.length - 1].content = repos;
            return nh;
          });
        }
        return;
      }
      if (vfsFiles.length > 0) {
        return buildLsNode([], vfsFiles);
      }
      return "";
    }
  },
  {
    name: "cd",
    description: "Change directory",
    handler: (args, ctx) => {
      const target = args[0] || "~";
      if (target === "~" || target === "..") {
        ctx.setCurrentPath("~");
        ctx.currentPathRef.current = "~";
        return "";
      } else if (target === "github" || target === "~/github") {
        ctx.setCurrentPath("~/github");
        ctx.currentPathRef.current = "~/github";
        return "";
      } else if (target === "." || target === "./") {
        return "";
      }
      return `cd: no such directory: ${target}`;
    }
  },
  {
    name: "cat",
    description: "View file contents",
    handler: async (args, ctx, _rawCmd) => {
      const path = ctx.currentPathRef.current;
      const fileName = args[0];
      if (!fileName) return "usage: cat [file]";
      const vfsContent = (ctx.fileSystem[path] ?? {})[fileName];
      if (vfsContent !== void 0) return vfsContent;
      if (path === "~/github") {
        ctx.addOutput(`Fetching details for ${fileName}...`);
        const details = await fetchRepoDetails(fileName);
        ctx.setHistory((prev) => {
          const nh = [...prev];
          nh[nh.length - 1].content = details;
          return nh;
        });
        return;
      }
      return `cat: ${fileName}: No such file`;
    }
  },
  // --- Game ---
  {
    name: "play",
    description: "Launch ASCIItron",
    handler: (_args, ctx) => {
      ctx.setMode("AWAITING_INPUT");
      ctx.setModeData("play_nickname");
      return null;
    }
  },
  // --- Fun Commands ---
  {
    name: "fortune",
    description: "Random programming quote",
    handler: () => FORTUNES[Math.floor(Math.random() * FORTUNES.length)]
  },
  {
    name: "cowsay",
    description: "Cow says what you type",
    handler: (args) => {
      const text = args.join(" ") || "moo";
      return buildCowsay(text);
    }
  },
  {
    name: "matrix",
    description: "Enter the Matrix",
    handler: (_args, ctx) => {
      ctx.setMode("MODAL_UI");
      ctx.setModeData("matrix");
      return null;
    }
  },
  // --- Easter Eggs ---
  {
    name: "sudo",
    description: "Superuser do",
    handler: (_args, ctx) => {
      ctx.setMode("AWAITING_INPUT");
      ctx.setModeData("sudo");
      return null;
    }
  },
  {
    name: "rm",
    description: "Remove files",
    handler: (args, ctx, rawCmd) => {
      const fullArgs = rawCmd.replace(/^rm\s*/, "").trim();
      if (!fullArgs) {
        return `rm: missing operand. Try 'rm --help'`;
      }
      if (fullArgs.includes("-rf") && (fullArgs.includes("~") || fullArgs.includes("/"))) {
        return "that must be an oopsie!";
      }
      if (fullArgs.includes("-rf") && !fullArgs.includes("~") && !fullArgs.includes("/")) {
        ctx.setMode("RMRF");
        typewriterEffect(RM_MESSAGES, ctx, 200);
        return null;
      }
      if (fullArgs.includes("-r") && args.some((arg) => arg !== "-r")) {
        return `rm: cannot remove '${args.find((a) => a !== "-r")}': Permission denied`;
      }
      const path = ctx.currentPathRef.current;
      const fileName = args[0];
      const currentFiles = ctx.fileSystem[path] ?? {};
      if (fileName in currentFiles) {
        ctx.setFileSystem((prev) => {
          const next = { ...prev };
          const nextDir = { ...next[path] };
          delete nextDir[fileName];
          next[path] = nextDir;
          return next;
        });
        return "";
      }
      return `rm: cannot remove '${fileName}': No such file or directory`;
    }
  },
  {
    name: "vim",
    description: "The editor you can never leave",
    handler: (args, ctx) => {
      const filename = args[0] || "";
      const path = ctx.currentPathRef.current;
      const existingContent = filename ? (ctx.fileSystem[path] ?? {})[filename] ?? "" : "";
      ctx.setMode("MODAL_UI");
      ctx.setModeData({ type: "vim", filename, content: existingContent });
      return null;
    }
  },
  {
    name: "hack",
    description: "Hack the mainframe",
    handler: (_args, ctx) => {
      ctx.setMode("HACK");
      typewriterEffect(HACK_MESSAGES, ctx, 250);
      return "🔓 Initiating hack sequence...";
    }
  }
];
const commandMap = new Map(
  commands.map((c) => [c.name, c])
);
const ALL_COMMAND_NAMES = commands.map((c) => c.name);
function runBasicProgram(source) {
  const interpreter = new BasicInterpreter(source);
  interpreter.run();
  return interpreter.output;
}
class BasicInterpreter {
  /** Collected PRINT output */
  output = [];
  lines;
  currentLine = 0;
  vars = {};
  stack = [];
  constructor(source) {
    this.lines = source.replace(/\r\n?/g, "\n").split("\n");
    for (let c = 97; c <= 122; c++) {
      this.vars[String.fromCharCode(c)] = 0;
    }
  }
  // ---------------------- public API ----------------------
  run() {
    const MAX_STEPS = 1e5;
    let steps = 0;
    while (this.currentLine < this.lines.length && steps < MAX_STEPS) {
      const raw = this.lines[this.currentLine];
      if (raw === void 0) break;
      this.executeLine(raw);
      this.currentLine++;
      steps++;
    }
  }
  // ------------------- line execution --------------------
  executeLine(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const firstToken = this.getWord(trimmed, 0);
    let rest;
    if (/^\d+$/.test(firstToken)) {
      rest = trimmed.slice(firstToken.length).trim();
    } else {
      rest = trimmed;
    }
    if (!rest) return;
    const command = this.getWord(rest, 0).toUpperCase();
    const params = rest.slice(command.length).trim();
    switch (command) {
      case "PRINT":
        this.cmdPrint(params);
        break;
      case "LET":
        this.cmdLet(params);
        break;
      case "FOR":
        this.cmdFor(params);
        break;
      case "NEXT":
        this.cmdNext(params);
        break;
      case "IF":
        this.cmdIf(params);
        break;
      case "GOTO":
        this.cmdGoto(params);
        break;
      case "GOSUB":
        this.cmdGosub(params);
        break;
      case "RETURN":
        this.cmdReturn();
        break;
      case "REM":
        break;
      // comment – do nothing
      case "END":
        this.currentLine = this.lines.length;
        break;
      case "CLS":
        this.output = [];
        break;
      case "STOP":
        this.currentLine = this.lines.length;
        break;
      default:
        if (params.startsWith("=")) {
          this.cmdLet(command + " " + params);
        }
        break;
    }
  }
  // --------------------- commands ------------------------
  cmdPrint(params) {
    if (!params) {
      this.output.push("");
      return;
    }
    const suppressNewline = params.endsWith(";");
    const expr = suppressNewline ? params.slice(0, -1).trim() : params;
    const value = this.evaluateExpression(expr);
    const str = String(value);
    if (suppressNewline) {
      if (this.output.length > 0) {
        this.output[this.output.length - 1] += str;
      } else {
        this.output.push(str);
      }
    } else {
      if (this.output.length > 0 && this.output[this.output.length - 1] !== void 0) {
        this.output.push(str);
      } else {
        this.output.push(str);
      }
    }
  }
  cmdLet(params) {
    const eqIdx = params.indexOf("=");
    if (eqIdx === -1) return;
    const varName = params.slice(0, eqIdx).trim().replace(/^LET\s+/i, "").toLowerCase();
    const expr = params.slice(eqIdx + 1).trim();
    this.vars[varName] = Number(this.evaluateExpression(expr));
  }
  cmdFor(params) {
    const match = params.match(
      /^(\w+)\s*=\s*(.+?)\s+TO\s+(.+?)(?:\s+STEP\s+(.+))?$/i
    );
    if (!match) return;
    const varName = match[1].toLowerCase();
    const start = Number(this.evaluateExpression(match[2]));
    this.vars[varName] = start;
  }
  cmdNext(params) {
    const varName = params.trim().toLowerCase();
    for (let i = this.currentLine - 1; i >= 0; i--) {
      const line = this.lines[i].trim();
      const stripped = this.stripLineNumber(line);
      const cmd = this.getWord(stripped, 0).toUpperCase();
      if (cmd !== "FOR") continue;
      const rest = stripped.slice(3).trim();
      const match = rest.match(
        /^(\w+)\s*=\s*(.+?)\s+TO\s+(.+?)(?:\s+STEP\s+(.+))?$/i
      );
      if (!match) continue;
      if (match[1].toLowerCase() !== varName) continue;
      const limit = Number(this.evaluateExpression(match[3]));
      const step = match[4] ? Number(this.evaluateExpression(match[4])) : 1;
      const current = (this.vars[varName] ?? 0) + step;
      this.vars[varName] = current;
      if (step > 0 && current <= limit || step < 0 && current >= limit) {
        this.currentLine = i;
      }
      return;
    }
  }
  cmdIf(params) {
    const thenIdx = params.toUpperCase().indexOf(" THEN ");
    if (thenIdx === -1) return;
    const condStr = params.slice(0, thenIdx).trim();
    const rest = params.slice(thenIdx + 6).trim();
    let thenPart;
    let elsePart = null;
    const elseIdx = rest.toUpperCase().indexOf(" ELSE ");
    if (elseIdx !== -1) {
      thenPart = rest.slice(0, elseIdx).trim();
      elsePart = rest.slice(elseIdx + 6).trim();
    } else {
      thenPart = rest;
    }
    const condValue = this.evaluateExpression(condStr);
    if (condValue) {
      this.executeLine(thenPart);
    } else if (elsePart) {
      this.executeLine(elsePart);
    }
  }
  cmdGoto(params) {
    const targetLabel = params.trim();
    const idx = this.findLineByLabel(targetLabel);
    if (idx !== -1) {
      this.currentLine = idx - 1;
    }
  }
  cmdGosub(params) {
    this.stack.push(this.currentLine);
    this.cmdGoto(params);
  }
  cmdReturn() {
    const returnLine = this.stack.pop();
    if (returnLine !== void 0) {
      this.currentLine = returnLine;
    }
  }
  // ------------------- expression eval -------------------
  evaluateExpression(expr) {
    const trimmed = expr.trim();
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      return trimmed.slice(1, -1);
    }
    if (trimmed.includes('"')) {
      return this.evalStringExpression(trimmed);
    }
    const funcMatch = trimmed.match(
      /^(ABS|ACOS|ASIN|ATAN|COS|EXP|LOG|RND|ROUND|SIN|SQR|TAN|VAL|LEN|INT)\s*\(\s*(.+)\s*\)$/i
    );
    if (funcMatch) {
      const fname = funcMatch[1].toUpperCase();
      const arg = this.evaluateExpression(funcMatch[2]);
      switch (fname) {
        case "ABS":
          return Math.abs(Number(arg));
        case "ACOS":
          return Math.acos(Number(arg));
        case "ASIN":
          return Math.asin(Number(arg));
        case "ATAN":
          return Math.atan(Number(arg));
        case "COS":
          return Math.cos(Number(arg));
        case "EXP":
          return Math.exp(Number(arg));
        case "LOG":
          return Math.log(Number(arg));
        case "RND":
          return Math.random();
        case "ROUND":
          return Math.round(Number(arg));
        case "SIN":
          return Math.sin(Number(arg));
        case "SQR":
          return Math.sqrt(Number(arg));
        case "TAN":
          return Math.tan(Number(arg));
        case "INT":
          return Math.floor(Number(arg));
        case "VAL":
          return Number(arg);
        case "LEN":
          return String(arg).length;
        default:
          return 0;
      }
    }
    const strFuncMatch = trimmed.match(
      /^(LEFT|MID|RIGHT)\$?\s*\(\s*(.+)\s*\)$/i
    );
    if (strFuncMatch) {
      const fname = strFuncMatch[1].toUpperCase();
      const innerArgs = this.splitFuncArgs(strFuncMatch[2]);
      if (fname === "LEFT" && innerArgs.length >= 2) {
        const s = String(this.evaluateExpression(innerArgs[0]));
        const n = Number(this.evaluateExpression(innerArgs[1]));
        return s.substring(0, n);
      }
      if (fname === "RIGHT" && innerArgs.length >= 2) {
        const s = String(this.evaluateExpression(innerArgs[0]));
        const n = Number(this.evaluateExpression(innerArgs[1]));
        return s.substring(s.length - n);
      }
      if (fname === "MID" && innerArgs.length >= 3) {
        const s = String(this.evaluateExpression(innerArgs[0]));
        const start = Number(this.evaluateExpression(innerArgs[1]));
        const count = Number(this.evaluateExpression(innerArgs[2]));
        return s.substring(start, start + count);
      }
    }
    return this.evalNumericExpression(trimmed);
  }
  evalStringExpression(expr) {
    const parts = [];
    let current = "";
    let inQuote = false;
    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i];
      if (ch === '"') {
        inQuote = !inQuote;
        current += ch;
      } else if (ch === "+" && !inQuote) {
        parts.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    if (current.trim()) parts.push(current.trim());
    return parts.map((p) => {
      if (p.startsWith('"') && p.endsWith('"')) {
        return p.slice(1, -1);
      }
      return String(this.evaluateExpression(p));
    }).join("");
  }
  /**
   * Simple recursive-descent numeric evaluator.
   * Supports: +, -, *, /, %, parentheses, comparison operators,
   * variable lookup, and numeric literals.
   */
  evalNumericExpression(expr) {
    const tokens = this.tokenize(expr);
    const ctx = { pos: 0, tokens };
    const result = this.parseComparison(ctx);
    return result;
  }
  tokenize(expr) {
    const tokens = [];
    let i = 0;
    const s = expr.trim();
    while (i < s.length) {
      if (/\s/.test(s[i])) {
        i++;
        continue;
      }
      if (s[i] === "<" && s[i + 1] === "=") {
        tokens.push("<=");
        i += 2;
        continue;
      }
      if (s[i] === ">" && s[i + 1] === "=") {
        tokens.push(">=");
        i += 2;
        continue;
      }
      if (s[i] === "<" && s[i + 1] === ">") {
        tokens.push("<>");
        i += 2;
        continue;
      }
      if ("+-*/%()=<>".includes(s[i])) {
        tokens.push(s[i]);
        i++;
        continue;
      }
      if (/[0-9.]/.test(s[i])) {
        let num = "";
        while (i < s.length && /[0-9.]/.test(s[i])) {
          num += s[i];
          i++;
        }
        tokens.push(num);
        continue;
      }
      if (/[a-zA-Z_]/.test(s[i])) {
        let id = "";
        while (i < s.length && /[a-zA-Z0-9_]/.test(s[i])) {
          id += s[i];
          i++;
        }
        tokens.push(id);
        continue;
      }
      i++;
    }
    return tokens;
  }
  parseComparison(ctx) {
    let left = this.parseAddSub(ctx);
    while (ctx.pos < ctx.tokens.length) {
      const op = ctx.tokens[ctx.pos];
      if (!["=", "<", ">", "<=", ">=", "<>"].includes(op)) break;
      ctx.pos++;
      const right = this.parseAddSub(ctx);
      switch (op) {
        case "=":
          left = left === right ? 1 : 0;
          break;
        case "<":
          left = left < right ? 1 : 0;
          break;
        case ">":
          left = left > right ? 1 : 0;
          break;
        case "<=":
          left = left <= right ? 1 : 0;
          break;
        case ">=":
          left = left >= right ? 1 : 0;
          break;
        case "<>":
          left = left !== right ? 1 : 0;
          break;
      }
    }
    return left;
  }
  parseAddSub(ctx) {
    let left = this.parseMulDiv(ctx);
    while (ctx.pos < ctx.tokens.length) {
      const op = ctx.tokens[ctx.pos];
      if (op !== "+" && op !== "-") break;
      ctx.pos++;
      const right = this.parseMulDiv(ctx);
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }
  parseMulDiv(ctx) {
    let left = this.parseUnary(ctx);
    while (ctx.pos < ctx.tokens.length) {
      const op = ctx.tokens[ctx.pos];
      if (op !== "*" && op !== "/" && op !== "%") break;
      ctx.pos++;
      const right = this.parseUnary(ctx);
      if (op === "*") left *= right;
      else if (op === "/") left = right !== 0 ? left / right : 0;
      else left = right !== 0 ? left % right : 0;
    }
    return left;
  }
  parseUnary(ctx) {
    if (ctx.tokens[ctx.pos] === "-") {
      ctx.pos++;
      return -this.parsePrimary(ctx);
    }
    if (ctx.tokens[ctx.pos] === "+") {
      ctx.pos++;
    }
    return this.parsePrimary(ctx);
  }
  parsePrimary(ctx) {
    const token = ctx.tokens[ctx.pos];
    if (!token) return 0;
    if (token === "(") {
      ctx.pos++;
      const val = this.parseComparison(ctx);
      if (ctx.tokens[ctx.pos] === ")") ctx.pos++;
      return val;
    }
    if (/^[0-9]/.test(token)) {
      ctx.pos++;
      return parseFloat(token);
    }
    ctx.pos++;
    return this.vars[token.toLowerCase()] ?? 0;
  }
  // --------------------- utilities -----------------------
  getWord(text, index) {
    const words = text.trim().split(/\s+/);
    return words[index] ?? "";
  }
  stripLineNumber(line) {
    const trimmed = line.trim();
    const first = this.getWord(trimmed, 0);
    if (/^\d+$/.test(first)) {
      return trimmed.slice(first.length).trim();
    }
    return trimmed;
  }
  findLineByLabel(label) {
    for (let i = 0; i < this.lines.length; i++) {
      const first = this.getWord(this.lines[i].trim(), 0);
      if (first === label) return i;
    }
    return -1;
  }
  splitFuncArgs(inner) {
    const args = [];
    let depth = 0;
    let current = "";
    let inQuote = false;
    for (const ch of inner) {
      if (ch === '"') inQuote = !inQuote;
      if (!inQuote && ch === "(") depth++;
      if (!inQuote && ch === ")") depth--;
      if (!inQuote && ch === "," && depth === 0) {
        args.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    if (current.trim()) args.push(current.trim());
    return args;
  }
}
const MatrixRain = reactExports.forwardRef(
  ({ width = 800, height = 400, paused = false }, ref) => {
    const canvasRef = reactExports.useRef(null);
    reactExports.useImperativeHandle(ref, () => ({
      getCanvasDataURL: () => canvasRef.current?.toDataURL()
    }));
    const pausedRef = reactExports.useRef(paused);
    reactExports.useEffect(() => {
      pausedRef.current = paused;
    }, [paused]);
    reactExports.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = width;
      canvas.height = height;
      const fontSize = 14;
      const columns = Math.floor(width / fontSize);
      const drops = new Array(columns).fill(1);
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()ァイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
      const draw = () => {
        if (pausedRef.current) return;
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#0f0";
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = Math.random() > 0.98 ? "#fff" : "#0f0";
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };
      if (pausedRef.current) {
        pausedRef.current = false;
        for (let i = 0; i < 100; i++) draw();
        pausedRef.current = true;
      }
      const interval = setInterval(draw, 40);
      return () => clearInterval(interval);
    }, [width, height]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        className: "rounded border border-green-900/50",
        style: {
          width: "100%",
          height: `${height}px`,
          imageRendering: "pixelated"
        }
      }
    );
  }
);
function VimEditor({
  onExit,
  textareaRef,
  cliRef,
  setInsertMode,
  insertMode,
  initialText = "",
  onSave
}) {
  const [text, setText] = reactExports.useState(initialText);
  const [cliText, setCliText] = reactExports.useState("");
  reactExports.useEffect(() => {
    setTimeout(() => cliRef.current?.focus(), 50);
  }, []);
  const exitVim = (msg) => {
    onExit(msg);
  };
  const handleTextareaKeyDown = (e) => {
    if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      exitVim("^C");
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setInsertMode(false);
      setTimeout(() => cliRef.current?.focus(), 50);
    }
  };
  const handleCliKeyDown = (e) => {
    if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      exitVim("^C");
      return;
    }
    if (e.key === "i" && cliText === "") {
      e.preventDefault();
      setInsertMode(true);
      setTimeout(() => textareaRef.current?.focus(), 50);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = cliText.trim();
      if (cmd === ":wq" || cmd === ":w") {
        if (onSave) onSave(text);
        if (cmd === ":wq") {
          exitVim("File saved. Exiting vim.");
        } else {
          setCliText("");
        }
      } else if (cmd === ":q!" || cmd === ":q") {
        exitVim("Exiting vim.");
      } else {
        setCliText("");
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-gray-600 bg-black min-h-[400px] flex flex-col font-mono", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-2 overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          ref: textareaRef,
          value: text,
          rows: text.split("\n").length,
          onChange: (e) => {
            setText(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          },
          onKeyDown: handleTextareaKeyDown,
          onMouseDown: (e) => {
            if (!insertMode) {
              e.preventDefault();
              cliRef.current?.focus();
            }
          },
          className: "w-full bg-transparent text-white border-none outline-none resize-none overflow-hidden block caret-white leading-normal p-0 m-0",
          spellCheck: false,
          readOnly: !insertMode
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-blue-400 font-mono m-0 leading-normal pointer-events-none select-none", children: Array(Math.max(0, 20 - text.split("\n").length)).fill("~").join("\n") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-white bg-gray-800 px-2 py-1 text-sm font-mono h-8", children: [
      insertMode ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2", children: "-- INSERT --" }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: cliRef,
          type: "text",
          value: cliText,
          onChange: (e) => setCliText(e.target.value),
          onKeyDown: handleCliKeyDown,
          className: `flex-1 bg-transparent border-none outline-none text-white focus:ring-0 caret-white p-0 ${insertMode ? "opacity-0 w-0" : "opacity-100"}`,
          spellCheck: false,
          autoComplete: "off",
          disabled: insertMode
        }
      )
    ] })
  ] });
}
function ReadRow({ prompt, children, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center ${className} opacity-90`, children: [
    prompt && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400 mr-2 shrink-0", children: prompt }),
    children
  ] });
}
function buildReadHistoryNode(prompt, value, isPassword, className = "", suffix) {
  const displayValue = isPassword ? "*".repeat(value.length) : value;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center ${className} opacity-90`, children: [
    prompt && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400 mr-2 shrink-0", children: prompt }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 text-white font-bold", children: [
      displayValue,
      suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white ml-2 opacity-80 font-normal", children: suffix })
    ] })
  ] });
}
function TerminalInput({
  inputRef,
  value,
  onChange,
  onKeyDown,
  extraProps
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      ref: inputRef,
      type: "text",
      value,
      onChange: (e) => onChange(e.target.value),
      onKeyDown,
      autoFocus: true,
      spellCheck: false,
      autoComplete: "off",
      ...extraProps,
      className: `flex-1 bg-transparent border-none outline-none focus:ring-0 text-white caret-green-500 font-bold ${extraProps?.className || ""}`
    }
  );
}
const readModes = {
  sudo: {
    prompt: "[sudo] password for visitor:",
    inputProps: { type: "password" },
    className: "mt-1",
    onSubmit: (value) => ({
      historyEntries: [
        {
          type: "output",
          content: buildReadHistoryNode(
            "[sudo] password for visitor:",
            value,
            true,
            "mt-1"
          ),
          newline: false
        },
        { type: "output", content: "Nice try. 😏" }
      ],
      nextMode: "NORMAL"
    })
  },
  play_nickname: {
    prompt: "Nickname:",
    onSubmit: (value, helpers) => {
      const nickname = value.trim() || "Anonymous";
      helpers.playerNicknameRef.current = nickname;
      helpers.setGameRunning(true);
      setTimeout(() => {
        const iframe = document.querySelector(
          'iframe[title="ASCIItron Game"]'
        );
        iframe?.focus();
      }, 150);
      return {
        historyEntries: [
          {
            type: "output",
            content: buildReadHistoryNode("Nickname:", nickname),
            newline: false
          },
          {
            type: "output",
            content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-yellow-400 mb-2", children: [
                "Launching ASCIItron... Press Ctrl+C to quit. Credits to:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://github.com/lklynet/asciitron",
                    target: "_blank",
                    children: "lklynet"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "iframe",
                {
                  src: "/game/index.html",
                  className: "w-full border border-green-800 rounded bg-black",
                  style: { height: "600px", colorScheme: "dark" },
                  title: "ASCIItron Game"
                }
              )
            ] })
          }
        ],
        nextMode: "GAME"
      };
    }
  }
};
function useGameManager({
  gameRunning,
  setGameRunning,
  setMode,
  setHistory,
  inputRef,
  playerNicknameRef,
  onKeyDown
}) {
  const terminateGame = reactExports.useCallback(() => {
    setGameRunning(false);
    setMode("NORMAL");
    setHistory((prev) => {
      const nh = [...prev];
      for (let i = nh.length - 1; i >= 0; i--) {
        if (nh[i].type === "output" && typeof nh[i].content !== "string") {
          nh[i].content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-400 mb-2", children: "Game terminated (Ctrl+C)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "iframe",
              {
                src: "/game/index.html",
                className: "w-full border border-green-900/50 rounded bg-black opacity-60",
                style: {
                  height: "600px",
                  colorScheme: "dark",
                  pointerEvents: "none"
                },
                title: "ASCIItron Game (terminated)"
              }
            )
          ] });
          break;
        }
      }
      return nh;
    });
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [setGameRunning, setMode, setHistory, inputRef]);
  const onKeyDownRef = React.useRef(onKeyDown);
  reactExports.useEffect(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);
  reactExports.useEffect(() => {
    if (!gameRunning) return;
    const handler = (e) => {
      onKeyDownRef.current(e);
    };
    let cleanup = null;
    const attach = () => {
      const iframe2 = document.querySelector(
        'iframe[title="ASCIItron Game"]'
      );
      const cw = iframe2?.contentWindow;
      if (cw) {
        cw.addEventListener("keydown", handler);
        cleanup = () => {
          cw.removeEventListener("keydown", handler);
        };
      }
    };
    const timer = setTimeout(attach, 200);
    const iframe = document.querySelector('iframe[title="ASCIItron Game"]');
    iframe?.addEventListener("load", attach);
    return () => {
      clearTimeout(timer);
      iframe?.removeEventListener("load", attach);
      cleanup?.();
    };
  }, [gameRunning]);
  reactExports.useEffect(() => {
    if (!gameRunning) return;
    const sendNickname = () => {
      const iframe2 = document.querySelector(
        'iframe[title="ASCIItron Game"]'
      );
      const cw = iframe2?.contentWindow;
      if (cw) {
        cw.postMessage(
          { type: "SET_NICKNAME", nickname: playerNicknameRef.current },
          "*"
        );
      }
    };
    const timer = setTimeout(sendNickname, 200);
    const iframe = document.querySelector('iframe[title="ASCIItron Game"]');
    iframe?.addEventListener("load", sendNickname);
    return () => {
      clearTimeout(timer);
      iframe?.removeEventListener("load", sendNickname);
    };
  }, [gameRunning, playerNicknameRef]);
  return { terminateGame };
}
function InteractiveTerminal() {
  const [history, setHistory] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [currentPath, setCurrentPath] = reactExports.useState("~");
  const currentPathRef = reactExports.useRef("~");
  const bottomRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const [repoNames, setRepoNames] = reactExports.useState([]);
  const [gameRunning, setGameRunning] = reactExports.useState(false);
  const playerNicknameRef = reactExports.useRef("Anonymous");
  const [mode, setMode] = reactExports.useState("NORMAL");
  const [modeData, setModeData] = reactExports.useState(null);
  const [fileSystem, setFileSystem] = reactExports.useState({
    "~": {},
    "~/github": {}
  });
  const [historyIndex, setHistoryIndex] = reactExports.useState(null);
  const [commandHistory, setCommandHistory] = reactExports.useState([]);
  const [matrixPaused, setMatrixPaused] = reactExports.useState(false);
  const matrixRef = reactExports.useRef(null);
  const abortControllerRef = reactExports.useRef(null);
  const vimTextareaRef = reactExports.useRef(null);
  const vimCliRef = reactExports.useRef(null);
  const [vimInsertMode, setVimInsertMode] = reactExports.useState(false);
  reactExports.useEffect(() => {
    currentPathRef.current = currentPath;
  }, [currentPath]);
  const bestGameScoreRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);
  reactExports.useEffect(() => {
    if (!gameRunning) return;
    const handleMessage = async (e) => {
      if (e.data?.type === "GAME_OVER") {
        const { score, nickname } = e.data;
        if (!bestGameScoreRef.current || bestGameScoreRef.current.score < score) {
          const salt = "asciitron-custom-salt-xyz890";
          const msgBuffer = new TextEncoder().encode(score + nickname + salt);
          const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const newHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
          bestGameScoreRef.current = { score, nickname, hash: newHash };
        }
        try {
          const response = await getHighscores({
            data: { currentScore: score }
          });
          const iframe = document.querySelector(
            'iframe[title="ASCIItron Game"]'
          );
          if (iframe && iframe.contentWindow) {
            const cw = iframe.contentWindow;
            cw.postMessage({ type: "LEADERBOARD_UPDATE", data: response }, "*");
          }
        } catch (error) {
          console.error("Failed to get highscores", error);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [gameRunning]);
  reactExports.useEffect(() => {
    if (!gameRunning && bestGameScoreRef.current && bestGameScoreRef.current.score > 0) {
      saveHighscore({ data: bestGameScoreRef.current }).catch(console.error).finally(() => {
        console.log("Highscore save attempted");
      });
      bestGameScoreRef.current = null;
    }
  }, [gameRunning]);
  const handleKeyDownRef = reactExports.useRef(() => {
  });
  const { terminateGame } = useGameManager({
    gameRunning,
    setGameRunning,
    setMode,
    setHistory,
    inputRef,
    playerNicknameRef,
    onKeyDown: (e) => handleKeyDownRef.current(e)
  });
  reactExports.useEffect(() => {
    const handleClick = (e) => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) return;
      e.preventDefault();
      const target = e.target;
      let focusRef = null;
      if (target.tagName === "IFRAME") return;
      if (gameRunning) {
        const iframe = document.querySelector(
          'iframe[title="ASCIItron Game"]'
        );
        iframe?.focus();
        return;
      }
      if (mode === "MODAL_UI" && modeData?.type === "vim") {
        if (vimInsertMode) {
          focusRef = vimTextareaRef;
        } else {
          focusRef = vimCliRef;
        }
      } else if (mode === "MODAL_UI" && modeData === "matrix") {
        focusRef = inputRef;
      } else if (!gameRunning && mode !== "MODAL_UI") focusRef = inputRef;
      if (focusRef) focusRef.current?.focus();
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [gameRunning, mode, modeData, vimInsertMode, terminateGame]);
  const addOutput = (content) => {
    setHistory((prev) => [...prev, { type: "output", content }]);
  };
  const buildContext = () => ({
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
    setFileSystem
  });
  const exitModal = (message, retainInputState) => {
    let modeDataCapture = null;
    if (retainInputState && mode === "AWAITING_INPUT" && modeData) {
      const activeReadMode2 = readModes[modeData];
      if (activeReadMode2) {
        modeDataCapture = {
          prompt: activeReadMode2.prompt,
          value: input,
          isPassword: activeReadMode2.inputProps?.type === "password",
          className: activeReadMode2.className
        };
      }
    }
    setMode("NORMAL");
    setModeData(null);
    if (modeDataCapture) {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: buildReadHistoryNode(
            modeDataCapture.prompt,
            modeDataCapture.value,
            modeDataCapture.isPassword,
            modeDataCapture.className,
            typeof message === "string" ? message : void 0
          ),
          newline: false
        }
      ]);
    } else if (message) {
      addOutput(message);
    }
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };
  const handleCommand = async (cmd) => {
    const pathAtCommandTime = currentPathRef.current;
    const parts = cmd.trim().split(/\s+/);
    const mainCommand = parts[0].toLowerCase();
    const args = parts.slice(1);
    setHistoryIndex(null);
    abortControllerRef.current = new AbortController();
    if (cmd.trim() !== "") {
      setCommandHistory((prev) => {
        const last = prev[prev.length - 1];
        return last !== cmd ? [...prev, cmd] : prev;
      });
    }
    console.log(modeData, cmd, document.activeElement);
    if (mode === "AWAITING_INPUT" && modeData) {
      const readDef = readModes[modeData];
      if (readDef) {
        const result = readDef.onSubmit(cmd, {
          setGameRunning,
          addOutput,
          playerNicknameRef
        });
        setHistory((prev) => [...prev, ...result.historyEntries]);
        setMode(result.nextMode);
        setModeData(result.nextModeData ?? null);
        return;
      }
    }
    if (mainCommand === "clear") {
      setHistory([]);
      setMode("NORMAL");
      setModeData(null);
      return;
    }
    setHistory((prev) => [
      ...prev,
      { type: "input", content: cmd, path: pathAtCommandTime }
    ]);
    if (mainCommand === "") return;
    if (mainCommand.startsWith("./")) {
      const filename = mainCommand.slice(2);
      const currentFiles = fileSystem[pathAtCommandTime] ?? {};
      const fileContent = currentFiles[filename];
      if (!fileContent) {
        addOutput(`bash: ./${filename}: No such file or directory`);
        return;
      }
      try {
        const outputLines = runBasicProgram(fileContent);
        if (outputLines.length > 0) {
          addOutput(outputLines.join("\n"));
        }
      } catch (err) {
        addOutput(`Runtime error: ${err.message ?? err}`);
      }
      return;
    }
    const def = commandMap.get(mainCommand);
    if (!def) {
      addOutput(
        `Command not found: ${mainCommand}. Type 'help' for available commands.`
      );
      return;
    }
    const ctx = buildContext();
    const response = await def.handler(args, ctx, cmd);
    if (response === void 0 || response === null) return;
    if (response !== "") addOutput(response);
  };
  const handleTabCompletion = () => {
    const trimmedInput = input.trimStart();
    const parts = trimmedInput.split(/\s+/);
    const path = currentPathRef.current;
    if (parts.length >= 2) {
      const cmd = parts[0].toLowerCase();
      const partial = parts.slice(1).join(" ");
      if (cmd === "cd") {
        const dirs = path === "~" ? ["github"] : [];
        const matches2 = dirs.filter((d) => d.startsWith(partial));
        if (matches2.length === 1) setInput(`cd ${matches2[0]}`);
        else if (matches2.length > 1) {
          setHistory((prev) => [
            ...prev,
            { type: "input", content: input, path },
            { type: "output", content: matches2.join("  ") }
          ]);
        }
        return;
      }
      if (cmd === "cat") {
        const files = path === "~/github" ? repoNames : [];
        const matches2 = files.filter((f) => f.startsWith(partial));
        if (matches2.length === 1) setInput(`cat ${matches2[0]}`);
        else if (matches2.length > 1) {
          setHistory((prev) => [
            ...prev,
            { type: "input", content: input, path },
            { type: "output", content: matches2.join("  ") }
          ]);
        }
        return;
      }
    }
    const lower = trimmedInput.toLowerCase();
    if (!lower) return;
    const matches = ALL_COMMAND_NAMES.filter((c) => c.startsWith(lower));
    if (matches.length === 1) {
      setInput(matches[0]);
    } else if (matches.length > 1) {
      setHistory((prev) => [
        ...prev,
        { type: "input", content: input, path },
        { type: "output", content: matches.join("  ") }
      ]);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "c" && e.ctrlKey) {
      if (gameRunning) {
        e.preventDefault();
        terminateGame();
      } else if (mode === "MODAL_UI") {
        e.preventDefault();
        if (modeData === "matrix") {
          const snapshot = matrixRef.current?.getCanvasDataURL();
          exitModal(
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-green-400 mb-2", children: "Matrix connection terminated." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none mb-4", children: snapshot ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: snapshot,
                  alt: "Matrix Snapshot",
                  className: "rounded border border-green-900/50 w-full",
                  style: { imageRendering: "pixelated" }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(MatrixRain, { paused: true }) })
            ] })
          );
        } else {
          exitModal("^C");
        }
      } else if (mode === "AWAITING_INPUT" || mode === "HACK" || mode === "RMRF") {
        e.preventDefault();
        abortControllerRef.current?.abort();
        exitModal("^C", mode === "AWAITING_INPUT");
      }
    }
    if (e.key === "Enter") {
      const cmd = input;
      setInput("");
      handleCommand(cmd);
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === null) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };
  handleKeyDownRef.current = handleKeyDown;
  const inputElement = (extraProps) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    TerminalInput,
    {
      inputRef,
      value: input,
      onChange: setInput,
      onKeyDown: handleKeyDown,
      extraProps
    }
  );
  const activeReadMode = mode === "AWAITING_INPUT" && modeData ? readModes[modeData] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-green-500 font-mono p-4 flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-[4px] sm:text-[6px] md:text-[8px] leading-none mb-8 text-green-700 select-none hidden sm:block whitespace-pre-wrap w-fit", children: ASCII_ART }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-2xl w-4xl block flex flex-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "opacity-70 mb-6", children: [
        "Welcome to the interactive terminal v1.0.0",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        " Type ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-400", children: "'help'" }),
        " for commands, or use",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-400", children: "'vim [file]'" }),
        " to create BASIC scripts and",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-400", children: "'./[file]'" }),
        " to run them."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: history.map((entry, i) => {
        const needsMargin = entry.type === "input" || entry.newline !== false;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `${needsMargin ? "my-4" : ""} ${entry.type === "input" ? "" : "opacity-90 ml-4"}`,
            children: entry.type === "input" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mr-2 shrink-0", children: `${profile}:${entry.path ?? currentPath}$` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white break-all font-bold", children: entry.content })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-green-300 whitespace-pre-wrap font-mono", children: entry.content })
          },
          i
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        mode === "NORMAL" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 mr-2 shrink-0", children: `${profile}:${currentPath}$` }),
          inputElement()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-4", children: [
          activeReadMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReadRow,
            {
              prompt: activeReadMode.prompt,
              className: activeReadMode.className,
              children: inputElement(activeReadMode.inputProps)
            }
          ),
          mode === "MODAL_UI" && modeData === "matrix" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-green-400 mb-2", children: "Entering the Matrix... Press Ctrl+C to pause/escape." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MatrixRain, { ref: matrixRef, paused: matrixPaused }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: inputRef,
                type: "text",
                value: input,
                onChange: (e) => setInput(e.target.value),
                onKeyDown: handleKeyDown,
                className: "opacity-0 w-0 h-0",
                autoFocus: true
              }
            )
          ] }),
          mode === "MODAL_UI" && modeData?.type === "vim" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            VimEditor,
            {
              onExit: exitModal,
              textareaRef: vimTextareaRef,
              cliRef: vimCliRef,
              setInsertMode: setVimInsertMode,
              insertMode: vimInsertMode,
              initialText: modeData.content ?? "",
              onSave: (content) => {
                const fname = modeData.filename;
                if (fname) {
                  const path = currentPathRef.current;
                  setFileSystem((prev) => ({
                    ...prev,
                    [path]: { ...prev[path] ?? {}, [fname]: content }
                  }));
                }
              }
            }
          ),
          mode !== "NORMAL" && !activeReadMode && !(mode === "MODAL_UI" && modeData?.type === "vim") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-0 w-0 h-0 overflow-hidden", children: inputElement() })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef, className: "h-4" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-4 border-t border-green-900/30 text-[10px] uppercase tracking-widest text-green-700/80 flex justify-between select-none font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tip: use 'vim [file]' to create and './[file]' to run BASIC scripts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "OS: BerK-Terminal-v1.0.0" })
    ] })
  ] });
}
function RouteComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InteractiveTerminal, {});
}
export {
  RouteComponent as component
};
