import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function BootLog({ lines, elapsed, className }) {
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
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
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
}
