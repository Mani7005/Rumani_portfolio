import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiVolume2, FiVolumeX } from 'react-icons/fi';
import GlassPanel from '@/components/ui/GlassPanel';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import { parseCommand } from './CommandParser';
import { runCommand } from './commands';
import { useTypedLines } from '@/lib/useTypedLines';
import { useKeyClick } from '@/lib/useKeyClick';

const BOOT_BANNER = [
  'RUMANI OS TERMINAL v2.0 — link established.',
  "Type 'help' to list available commands.",
];

let entryId = 0;
const nextId = () => `entry-${entryId++}`;

export default function Terminal() {
  const { renderedLines: bannerLines, done: bannerDone } = useTypedLines(BOOT_BANNER);

  const [entries, setEntries] = useState([]);
  const [value, setValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const errorTimeoutRef = useRef(null);
  const playClick = useKeyClick();

  useEffect(() => {
    if (bannerDone) {
      setEntries([{ id: nextId(), kind: 'system', lines: BOOT_BANNER }]);
    }
  }, [bannerDone]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries, bannerLines]);

  useEffect(() => () => clearTimeout(errorTimeoutRef.current), []);

  const append = useCallback((kind, lines) => {
    setEntries((prev) => [...prev, { id: nextId(), kind, lines }]);
  }, []);

  const triggerError = useCallback(() => {
    setHasError(true);
    clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = setTimeout(() => setHasError(false), 450);
  }, []);

  const ctx = {
    print: (lines) => append('output', lines),
    printError: (lines) => { append('error', lines); triggerError(); },
    clear: () => setEntries([]),
    scrollToSection: (id, label) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        append('output', [`Navigating to ${label}...`]);
      } else {
        append('system', [`MODULE OFFLINE — ${label} has not been installed yet.`]);
      }
    },
    downloadResume: () => {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Rumani_Dadyala_Resume.pdf';
      link.click();
      append('output', ['Downloading resume...']);
    },
    openGithub: () => {
      window.open('https://github.com/', '_blank', 'noopener,noreferrer');
      append('output', ['Opening GitHub in a new tab...']);
    },
  };

  const handleSubmit = () => {
    const parsed = parseCommand(value);
    setValue('');
    setHistoryIndex(commandHistory.length + (parsed ? 1 : 0));
    if (!parsed) return;
    append('input', [parsed.raw]);
    setCommandHistory((prev) => [...prev, parsed.raw]);
    runCommand(parsed.name, parsed.args, ctx);
  };

  const handleArrowUp = () => {
    if (commandHistory.length === 0) return;
    const nextIndex = Math.max(0, historyIndex - 1);
    setHistoryIndex(nextIndex);
    setValue(commandHistory[nextIndex] ?? '');
  };

  const handleArrowDown = () => {
    if (commandHistory.length === 0) return;
    const nextIndex = Math.min(commandHistory.length, historyIndex + 1);
    setHistoryIndex(nextIndex);
    setValue(commandHistory[nextIndex] ?? '');
  };

  return (
    <section id="terminal" className="relative section-wrap">
      <div className="section-inner">
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">// MODULE_02</p>
            <h2 className="font-display text-3xl tracking-wide text-ink-primary sm:text-4xl">
              AI Command Console
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              Direct system access. Type{' '}
              <span className="font-mono text-[10px] text-cyan-core tracking-wider">help</span>
              {' '}to list available commands.
            </p>
          </div>
          <span className="hidden font-mono text-[8px] tracking-[0.3em] text-ink-muted/40 uppercase sm:block">
            02 / 03
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <GlassPanel
            label="AI_CONSOLE"
            active={!hasError}
            className={hasError ? '!border-status-error/40 !shadow-[0_0_16px_rgba(248,113,113,0.2)]' : undefined}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-glass-border px-5 py-3">
              <div className="flex items-center gap-2.5 font-mono text-[9px] tracking-[0.3em] text-ink-muted uppercase">
                <FiTerminal className="h-3 w-3 text-cyan-core" />
                RUMANI_OS // TERMINAL
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.3em] text-status-ok/80 uppercase">
                  <span className="h-1 w-1 rounded-full bg-status-ok animate-pulse-glow" />
                  ONLINE
                </span>
                <button
                  type="button"
                  onClick={() => setSoundOn((s) => !s)}
                  aria-label={soundOn ? 'Mute keystroke sound' : 'Unmute keystroke sound'}
                  aria-pressed={soundOn}
                  className="text-ink-muted transition-colors hover:text-cyan-core"
                >
                  {soundOn ? <FiVolume2 className="h-3.5 w-3.5" /> : <FiVolumeX className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Scrollback */}
            <div ref={scrollRef} className="h-72 overflow-y-auto px-5 py-4 sm:h-80">
              {!bannerDone ? (
                <div className="space-y-0.5">
                  {bannerLines.map(
                    (line, i) =>
                      line && (
                        <p key={i} className="font-mono text-[11px] text-ink-muted">
                          {line}
                        </p>
                      )
                  )}
                </div>
              ) : (
                <TerminalOutput entries={entries} />
              )}
            </div>

            {/* Input row */}
            <div className="border-t border-glass-border px-5 py-3">
              <TerminalInput
                value={value}
                onChange={setValue}
                onSubmit={handleSubmit}
                onArrowUp={handleArrowUp}
                onArrowDown={handleArrowDown}
                onKeyStroke={soundOn ? playClick : undefined}
                hasError={hasError}
                inputRef={inputRef}
              />
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Section separator */}
      <div className="section-separator mt-24" />
    </section>
  );
}
