import { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * NavItem
 * -------
 * Accessibility notes:
 *  - type="button" prevents accidental form submission.
 *  - aria-current="page" signals the active section to screen readers;
 *    this is the correct ARIA attribute for navigation landmarks indicating
 *    the current page/section in a SPA.
 *  - The icon is aria-hidden because the visible text label is sufficient;
 *    announcing both would be redundant ("home Home Home").
 *
 * Wrapped in React.memo: NavigationRail re-renders on every scroll event.
 */
const NavItem = memo(function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className="group relative flex items-center gap-2 rounded-md px-3.5 py-2 transition-colors duration-300"
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* active glow, shared across items via layoutId for a smooth slide */}
      {isActive && (
        <motion.div
          layoutId="nav-glow"
          className="absolute inset-0 -z-10 rounded-md bg-cyan-core/10 shadow-glow-cyan-xs"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          aria-hidden="true"
        />
      )}

      <Icon
        aria-hidden="true"
        className={`h-3.5 w-3.5 transition-colors duration-300 ${
          isActive
            ? 'text-cyan-core drop-shadow-[0_0_6px_rgba(45,212,232,0.6)]'
            : 'text-ink-muted group-hover:text-cyan-core/70'
        }`}
      />

      <span
        className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
          isActive ? 'font-semibold text-cyan-core' : 'text-ink-muted/70 group-hover:text-ink-muted'
        }`}
      >
        {item.label}
      </span>

      {/* active indicator underline */}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-core to-transparent"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
});

export default NavItem;
