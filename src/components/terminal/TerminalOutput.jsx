import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const KIND_STYLES = {
  system: 'text-ink-muted',
  input: 'text-ink-primary',
  output: 'text-cyan-core/80',
  error: 'text-status-error',
};

// Hoisted animate/transition objects — motion.p used for every output line,
// and these values are identical for all lines in all entries.
const LINE_ANIMATE = { opacity: 1, y: 0 };
const LINE_INITIAL = { opacity: 0, y: 3 };

/**
 * TerminalOutput
 * --------------
 * Wrapped in React.memo: Terminal.jsx re-renders on every keypress
 * (value state change), but TerminalOutput only needs to re-render when
 * entries are appended — not on every character typed into the input.
 *
 * With memo + stable entries array identity (Terminal uses functional
 * setState spread), React can skip this component's reconcile pass
 * entirely on every character keystroke.
 */
const TerminalOutput = memo(function TerminalOutput({ entries }) {
  return (
    <div className="flex flex-col gap-2">
      {entries.map((entry) => (
        <div key={entry.id} className="space-y-0.5">
          {entry.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={LINE_INITIAL}
              animate={LINE_ANIMATE}
              transition={{ duration: 0.18, delay: i * 0.025 }}
              className={cn('whitespace-pre-wrap font-mono text-[11px] leading-relaxed tracking-wide', KIND_STYLES[entry.kind])}
            >
              {entry.kind === 'input' && (
                <span className="mr-2 text-cyan-core/60">AI//</span>
              )}
              {line}
            </motion.p>
          ))}
        </div>
      ))}
    </div>
  );
});

export default TerminalOutput;
