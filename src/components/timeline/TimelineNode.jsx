import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import GlowText from '@/components/ui/GlowText';
import TechBadge from '@/components/projects/TechBadge';

/**
 * TimelineNode
 * ------------
 * Rendered as a fixed two-column grid — a 2.5rem rail column (dot only)
 * and a flexible content column (card). Every row uses the *same* rail
 * width, so Timeline.jsx can draw one continuous line + traveling packets
 * down the center of that column and every dot lands on it automatically,
 * without each node needing to know about the others' positions.
 */
export default function TimelineNode({ event }) {
  const [hovered, setHovered] = useState(false);
  const isCurrent = Boolean(event.current);

  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-4 sm:gap-6">
      {/* rail column — dot only, the connecting line lives in the parent */}
      <div className="flex justify-center pt-1.5">
        <span className="relative flex h-3 w-3 items-center justify-center">
          <span
            className={
              'absolute inline-flex h-full w-full animate-pulse-glow rounded-full ' +
              (isCurrent ? 'bg-amber-signal' : 'bg-cyan-core')
            }
          />
          <span className={'relative h-1.5 w-1.5 rounded-full ' + (isCurrent ? 'bg-amber-signal' : 'bg-cyan-core')} />
        </span>
      </div>

      {/* content column */}
      <GlassPanel
        as={motion.div}
        label={event.code}
        active={hovered}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -2, scale: 1.01 }}
        transition={{ duration: 0.18 }}
        className="relative mb-1 overflow-hidden p-5 sm:p-6"
      >
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <TechBadge>{event.tag}</TechBadge>
          {isCurrent && (
            <GlowText color="amber" className="font-mono text-[9px] tracking-[0.25em] uppercase">
              Live
            </GlowText>
          )}
        </div>

        <h3 className="font-display text-lg text-ink-primary sm:text-xl">{event.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{event.description}</p>

        {/* hover expansion — decorative HUD meta, not fabricated data */}
        <motion.div
          initial={false}
          animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="mt-3 flex items-center gap-2 border-t border-glass-border pt-3 font-mono text-[9px] tracking-[0.2em] text-ink-muted/70 uppercase">
            <span>REF::{event.code}</span>
            <span className="text-ink-faint">/</span>
            <span>{isCurrent ? 'STATUS: LIVE' : 'STATUS: LOGGED'}</span>
          </div>
        </motion.div>
      </GlassPanel>
    </div>
  );
}
