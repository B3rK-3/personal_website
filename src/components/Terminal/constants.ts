export const profile = 'visitor@website'
/** Fortune cookie quotes */
export const FORTUNES = [
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
  '"The most disastrous thing that you can ever learn is your first programming language." — Alan Kay',
]

export const GITHUB_USERNAME = 'B3rK-3'

/** Fake hack messages */
export const HACK_MESSAGES = [
  'Initializing breach protocol...',
  'Scanning open ports... 22, 80, 443, 8080',
  'SSH fingerprint: RSA 2048 aa:bb:cc:dd:ee:ff',
  'Bypassing firewall... [################] 100%',
  'Injecting payload into memory address 0x7FFE...',
  'Decrypting RSA-4096 key... brute-forcing...',
  'cracking /etc/shadow... hash: $6$rounds=5000$...',
  'Establishing reverse shell on 192.168.1.42:4444...',
  'Connection established. Escalating privileges...',
  'Overriding kernel module... insmod rootkit.ko',
  'Spoofing MAC address... 00:DE:AD:BE:EF:00',
  'Intercepting network traffic on eth0...',
  'Extracting database credentials...',
  'DB_HOST=10.0.0.5 DB_USER=admin DB_PASS=hunter2',
  'Downloading /var/www/secret_plans.pdf...',
  'Implanting backdoor on port 31337...',
  'Covering tracks... clearing /var/log/*',
  'Rerouting through TOR exit nodes...',
  'ACCESS GRANTED.',
  '',
  "Just kidding. I'm a portfolio website. 🙂",
]

/** Fake rm -rf messages */
export const RM_MESSAGES = [
  'rm: removing /usr/bin/...',
  'rm: removing /etc/passwd...',
  'rm: removing /home/visitor/.bashrc...',
  'rm: removing /var/log/syslog...',
  'rm: removing /boot/vmlinuz...',
  'rm: removing /dev/sda1...',
  'rm: removing /System32/...',
  'rm: removing /root/.ssh/id_rsa...',
  '⚠️  CRITICAL SYSTEM FILES DELETED',
  '',
  "Just kidding. You don't have permission. 😏",
]

/** Cowsay template */
export function buildCowsay(text: string): string {
  const maxWidth = 40
  const words = text.split(' ')
  const lines: Array<string> = []
  let currentLine = ''
  for (const word of words) {
    if (currentLine.length + word.length + 1 > maxWidth) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = currentLine ? `${currentLine} ${word}` : word
    }
  }
  if (currentLine) lines.push(currentLine)

  const width = Math.max(...lines.map((l) => l.length))
  const border = ' ' + '_'.repeat(width + 2)
  const bottom = ' ' + '-'.repeat(width + 2)

  let bubble: string
  if (lines.length === 1) {
    bubble = `${border}\n< ${lines[0].padEnd(width)} >\n${bottom}`
  } else {
    const middle = lines.map((line, i) => {
      const padded = line.padEnd(width)
      if (i === 0) return `/ ${padded} \\`
      if (i === lines.length - 1) return `\\ ${padded} /`
      return `| ${padded} |`
    })
    bubble = `${border}\n${middle.join('\n')}\n${bottom}`
  }

  const cow = `        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`

  return `${bubble}\n${cow}`
}
