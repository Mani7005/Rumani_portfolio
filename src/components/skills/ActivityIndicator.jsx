import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const DOT_COUNT = 4;

/**
 * ActivityIndicator
 * -----------------
 * Deliberately NOT a bar, gauge, or anything that reads as "X% skill."
 * It's a small LED-style chase — each dot pulses in sequence, forever —
 * meant to say "this subsystem is live and running," not "here's a score."
 */
export default function ActivityIndicator({ className }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="font-mono text-[9px] tracking-[0.25em] text-ink-muted uppercase">Activity</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-cyan-core"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
          />
        ))}
      </div>
    </div>
  );
}
