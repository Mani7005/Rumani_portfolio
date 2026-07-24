import { FiGithub, FiLinkedin } from 'react-icons/fi';

/**
 * Footer
 * ------
 * Minimal HUD-aesthetic footer. Contains:
 *  - Persistent availability status (surfacing the existing ContactCard value)
 *  - Copyright + "built with" attribution
 *  - GitHub / LinkedIn links
 *
 * Intentionally lightweight — one border-top divider, two rows of mono
 * text, no glassmorphism panels (too heavy for a footer). Matches the
 * nav bar's use of raw divider + mono labels.
 */
export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan-core/10">
      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-12 lg:px-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Left — copyright + built-with */}
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] tracking-[0.2em] text-ink-muted/70 uppercase">
              © 2026 Rumani Dadyala
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] text-ink-faint/50 uppercase">
              Built with React · Three.js · Tailwind · Framer Motion
            </p>
          </div>

          {/* Center — availability status */}
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-status-ok/80 uppercase sm:absolute sm:left-1/2 sm:-translate-x-1/2">
            <span className="h-1.5 w-1.5 rounded-full bg-status-ok animate-pulse-glow shrink-0" />
            Available · Software Engineering &amp; AI Internships
          </div>

          {/* Right — social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Mani7005"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-ink-muted/60 uppercase transition-colors duration-200 hover:text-cyan-core"
            >
              <FiGithub className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rumani-dadyala-421a56313"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-ink-muted/60 uppercase transition-colors duration-200 hover:text-cyan-core"
            >
              <FiLinkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
