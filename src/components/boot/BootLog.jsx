import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Hoisted — BootLog renders inside BootScreen which re-renders at ~60fps.
// Without hoisting, each motion.div receives new object literals every frame,
// causing Framer Motion to re-diff the animation state on every tick.
const LINE_INITIAL   = { opacity: 0, x: -4 };
const LINE_ANIMATE   = { opacity: 1, x: 0 };
const LINE_TRANSITION = { duration: 0.2 };

/**
 * BootLog
 * -------
 * Wrapped in React.memo: BootScreen re-renders at ~60fps via rAF. BootLog
 * receives `lines` (stable — built once by buildBootTimeline) and `elapsed`
 * (changes every frame). Memo can't prevent re-renders here since elapsed
 * changes every frame, but the hoisted Framer Motion objects prevent the
 * internal motion.div instances from receiving new prop references on every
 * re-render, allowing Framer Motion's internal reconciler to short-circuit.
 */
const BootLog = memo(function BootLog({ lines, elapsed, className }) {
  return (
    <div className={cn('w-full max-w-xs space-y-1 font-mono text-[11px]', className)}>
      {lines.map((line) => {
        if (elapsed < line.start) return null;

        const typing = elapsed < line.end;
        const span = line.end - line.start || 1;
        const progressInLine = typing ? (elapsed - line.start) / span : 1;
        const visibleChars = Math.max(1, Math.round(line.text.length * progressInLine));
        const displayed = line.text.slice(0, visibleChars);

        return (
          <motion.div
            key={line.text}
            initial={LINE_INITIAL}
            animate={LINE_ANIMATE}
            transition={LINE_TRANSITION}
            className="flex items-center gap-2.5"
          >
            <span className="text-cyan-core/40 select-none">›</span>
            <span className={cn(
              'flex-1 tracking-[0.05em]',
              typing ? 'text-ink-secondary' : 'text-ink-muted'
            )}>
              {displayed}
              {typing && (
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-2.5 w-[5px] animate-blink bg-cyan-core align-middle"
                />
              )}
            </span>
            {!typing && (
              <span className="shrink-0 text-[9px] tracking-[0.3em] text-status-ok/70">OK</span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
});

export default BootLog;
