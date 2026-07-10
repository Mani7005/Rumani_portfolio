/**
 * COMMAND_LIST is the single source of truth both `help` and the parser
 * read from — add a command here and it appears in `help` automatically.
 *
 * `run(ctx, args)` receives a context object built by Terminal.jsx with:
 *   print(lines)            — append a system/output line block
 *   printError(lines)       — append an error-styled line block
 *   clear()                 — wipe the output history
 *   scrollToSection(id, label) — smooth-scroll to a page section by id
 *   downloadResume()        — trigger the resume PDF download
 *   openGithub()            — open the GitHub profile in a new tab
 *
 * This indirection keeps commands.js testable without a DOM and keeps
 * Terminal.jsx from needing a giant switch statement of its own.
 */
export const COMMAND_LIST = [
  { name: 'help', description: 'List all available commands' },
  { name: 'about', description: 'Jump to the Mission Log' },
  { name: 'projects', description: 'Jump to the Project Database' },
  { name: 'skills', description: 'Jump to the Tech Arsenal' },
  { name: 'research', description: 'Jump to Research' },
  { name: 'resume', description: 'Download the resume (PDF)' },
  { name: 'github', description: 'Open the GitHub profile' },
  { name: 'contact', description: 'Jump to Contact' },
  { name: 'clear', description: 'Clear the terminal output' },
];

const SECTION_TARGETS = {
  about: { id: 'about', label: 'MISSION LOG' },
  projects: { id: 'projects', label: 'PROJECT DATABASE' },
  skills: { id: 'skills', label: 'TECH ARSENAL' },
  research: { id: 'research', label: 'RESEARCH' },
  contact: { id: 'contact', label: 'CONTACT' },
};

export function runCommand(name, args, ctx) {
  if (name in SECTION_TARGETS) {
    const { id, label } = SECTION_TARGETS[name];
    ctx.scrollToSection(id, label);
    return;
  }

  switch (name) {
    case 'help':
      ctx.print([
        'AVAILABLE COMMANDS',
        ...COMMAND_LIST.map((c) => `  ${c.name.padEnd(10)} ${c.description}`),
      ]);
      return;

    case 'resume':
      ctx.downloadResume();
      return;

    case 'github':
      ctx.openGithub();
      return;

    case 'clear':
      ctx.clear();
      return;

    default:
      ctx.printError([`Command not recognized: "${name}". Type 'help' for available commands.`]);
  }
}
