import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const KIND_STYLES = {
  system: 'text-ink-muted',
  input: 'text-ink-primary',
  output: 'text-cyan-core/80',
  error: 'text-status-error',
};

export default function TerminalOutput({ entries }) {
  return (
    <div className="flex flex-col gap-2">
      {entries.map((entry) => (
        <div key={entry.id} className="space-y-0.5">
          {entry.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
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
}
