import { motion } from 'framer-motion';

export default function NavItem({ 
  item, 
  isActive, 
  onClick, 
}) {
  const Icon = item.icon;

  return (
    <motion.button
      onClick={onClick}
      className="relative flex flex-col items-center gap-2 px-4 py-3 text-center transition-colors duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon */}
      <motion.div
        className="relative"
        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon
          className={`h-5 w-5 transition-colors duration-300 ${
            isActive 
              ? 'text-cyan-core drop-shadow-[0_0_8px_rgba(45,212,232,0.6)]' 
              : 'text-ink-muted group-hover:text-cyan-core/70'
          }`}
        />
        {isActive && (
          <motion.div
            layoutId="nav-glow"
            className="absolute inset-0 rounded-full bg-cyan-core/20 blur-md -z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1.3 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      {/* Label */}
      <motion.span
        className={`text-[8px] font-mono tracking-[0.2em] uppercase transition-colors duration-300 ${
          isActive 
            ? 'text-cyan-core font-semibold' 
            : 'text-ink-muted/60 group-hover:text-ink-muted'
        }`}
        animate={isActive ? { opacity: 1 } : { opacity: 0.6 }}
      >
        {item.label}
      </motion.span>

      {/* Active indicator line */}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-core to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Hover border */}
      <div
        className={`absolute inset-0 rounded-lg border border-cyan-core/0 transition-colors duration-300 ${
          isActive ? 'border-cyan-core/40' : 'group-hover:border-cyan-core/20'
        }`}
      />
    </motion.button>
  );
}
