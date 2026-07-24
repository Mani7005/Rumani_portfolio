import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const DOT_COUNT = 4;

// Hoisted: Array.from allocates a new array on every render call.
// Since the length is constant, build it once at module scope.
const DOT_INDICES = Array.from({ length: DOT_COUNT }, (_, i) => i);

// Transition objects hoisted per dot — avoids 4 new object allocations
// per render. The delay is the only per-dot difference.
const dotTransitions = DOT_INDICES.map((i) => ({
  duration: 1.6,
  repeat: Infinity,
  ease: 'easeInOut',
  delay: i * 0.25,
}));

const dotAnimate = { opacity: [0.2, 1, 0.2] };

/**
 * ActivityIndicator
 * -----------------
 * Deliberately NOT a bar, gauge, or anything that reads as "X% skill."
 * It's a small LED-style chase — each dot pulses in sequence, forever —
 * meant to say "this subsystem is live and running," not "here's a score."
 *
 * Wrapped in memo: parent SkillModule re-renders on hover, but
 * ActivityIndicator has no hover-dependent props.
 */
const ActivityIndicator = memo(function ActivityIndicator({ className }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="font-mono text-[9px] tracking-[0.25em] text-ink-muted uppercase">Activity</span>
      <div className="flex items-center gap-1">
        {DOT_INDICES.map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-cyan-core"
            animate={dotAnimate}
            transition={dotTransitions[i]}
          />
        ))}
      </div>
    </div>
  );
});

export default ActivityIndicator;
