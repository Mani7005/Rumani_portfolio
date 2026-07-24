import { motion } from 'framer-motion';
import { FiPower } from 'react-icons/fi';
import { cn } from '@/lib/utils';

// Hoisted motion prop objects — PowerButton is rendered during the boot
// sequence which fires rAF every frame. Inline object literals would be
// reallocated on every BootScreen render.
const RING1_ANIMATE = { scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] };
const RING1_TRANSITION = { duration: 2.8, repeat: Infinity, ease: 'easeInOut' };
const RING2_ANIMATE = { scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] };
const RING2_TRANSITION = { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 };

const BTN_INITIAL = { opacity: 0, scale: 0.85 };
const BTN_ANIMATE = { opacity: 1, scale: 1 };
const BTN_EXIT    = { opacity: 0, scale: 0.9 };
const BTN_TRANSITION = { duration: 0.4, ease: 'easeOut' };
const BTN_HOVER   = { scale: 1.04 };
const BTN_TAP     = { scale: 0.96 };

export default function PowerButton({ onActivate, disabled = false, className }) {
  return (
    <motion.button
      type="button"
      onClick={onActivate}
      disabled={disabled}
      aria-label="Power on RUMANI DADYALA"
      className={cn(
        'group relative flex h-20 w-20 items-center justify-center rounded-sm',
        'border border-cyan-core/20 bg-panel/80 backdrop-blur-sm',
        'transition-all duration-300 hover:border-cyan-core/50 hover:shadow-glow-cyan-sm',
        'disabled:pointer-events-none disabled:opacity-30',
        className
      )}
      initial={BTN_INITIAL}
      animate={BTN_ANIMATE}
      exit={BTN_EXIT}
      whileHover={BTN_HOVER}
      whileTap={BTN_TAP}
      transition={BTN_TRANSITION}
    >
      {/* Expanding rings */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-sm border border-cyan-core/15"
        animate={RING1_ANIMATE}
        transition={RING1_TRANSITION}
      />
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-sm border border-cyan-core/08"
        animate={RING2_ANIMATE}
        transition={RING2_TRANSITION}
      />

      <FiPower
        className="relative z-10 h-7 w-7 text-cyan-core transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(45,212,232,0.7)]"
      />

      {/* Corner reticles */}
      <span className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t border-cyan-core/50" />
      <span className="pointer-events-none absolute -right-px -top-px h-2 w-2 border-r border-t border-cyan-core/50" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b border-l border-cyan-core/50" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-cyan-core/50" />
    </motion.button>
  );
}
