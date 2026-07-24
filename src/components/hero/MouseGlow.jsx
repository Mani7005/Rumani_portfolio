import { useCallback, memo } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

/**
 * MouseGlow
 * ---------
 * Cursor-reactive radial glow in the Hero's left column.
 *
 * Wrapped in memo: Hero itself never re-renders after mount (no state),
 * but memoization is cheap insurance if a parent ever does. Handler
 * functions stabilized with useCallback — the component re-renders when
 * the motion template value changes (internally via Framer Motion's
 * subscriber system, not React state), but handlers don't depend on
 * render-time values so they only need to be created once.
 */
const MouseGlow = memo(function MouseGlow() {
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const springX = useSpring(x, { damping: 22, stiffness: 100 });
  const springY = useSpring(y, { damping: 22, stiffness: 100 });

  const background = useMotionTemplate`radial-gradient(circle at ${springX}% ${springY}%, rgba(45,212,232,0.10), transparent 52%)`;

  const handlePointerMove = useCallback((e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - bounds.left) / bounds.width) * 100);
    y.set(((e.clientY - bounds.top) / bounds.height) * 100);
  }, [x, y]);

  const handlePointerLeave = useCallback(() => {
    x.set(50);
    y.set(50);
  }, [x, y]);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="absolute inset-0"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: background }}
      />
    </div>
  );
});

export default MouseGlow;
