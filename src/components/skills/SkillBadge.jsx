import { memo } from 'react';
import { motion } from 'framer-motion';

// Hoisted motion prop objects — SkillBadge renders inside SkillModule
// which re-renders on hover, and whileInView triggers on scroll.
// Without hoisting, each badge creates a new transition object per render.
const BADGE_INITIAL    = { opacity: 0, scale: 0.8 };
const BADGE_HOVER_BOX  = '0 0 12px rgba(45, 212, 232, 0.4), inset 0 0 8px rgba(45, 212, 232, 0.1)';

// whileHover object is the same for every badge — hoist it.
const BADGE_WHILE_HOVER = {
  scale: 1.08,
  boxShadow: BADGE_HOVER_BOX,
};

// Pre-compute transitions for up to 20 badge positions (enough for any skill).
// The only per-badge difference is the delay (index * 0.04).
const BADGE_TRANSITIONS = Array.from({ length: 20 }, (_, i) => ({
  duration: 0.3,
  delay: i * 0.04,
}));

const BADGE_ANIMATE = { opacity: 1, scale: 1 };

/**
 * SkillBadge
 * ----------
 * Wrapped in React.memo: SkillModule re-renders on hover (hovered state),
 * but SkillBadge props (children, index) never change during that hover.
 * Memo prevents all badges in a card from re-rendering on each hover event.
 */
const SkillBadge = memo(function SkillBadge({ children, index }) {
  return (
    <motion.span
      initial={BADGE_INITIAL}
      animate={BADGE_ANIMATE}
      whileHover={BADGE_WHILE_HOVER}
      transition={BADGE_TRANSITIONS[index] ?? BADGE_TRANSITIONS[19]}
      viewport={{ once: true }}
      className="inline-block rounded-md border border-cyan-core/40 bg-gradient-to-br from-cyan-core/10 to-cyan-core/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-cyan-core/90 uppercase shadow-glow-cyan-xs hover:shadow-glow-cyan-sm transition-shadow cursor-default"
    >
      {children}
    </motion.span>
  );
});

export default SkillBadge;
