import { motion } from 'framer-motion';
import { FiPower } from 'react-icons/fi';
import { cn } from '@/lib/utils';

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
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Expanding rings */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-sm border border-cyan-core/15"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-sm border border-cyan-core/08"
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
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
