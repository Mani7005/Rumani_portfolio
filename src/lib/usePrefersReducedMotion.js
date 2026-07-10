import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * usePrefersReducedMotion
 * ------------------------
 * Single source of truth for the OS-level reduced-motion preference.
 * Components that run continuous animation loops (rotation, orbiting,
 * auto-triggered pulses) should read this and fall back to a static —
 * but still fully designed — presentation rather than just skipping
 * `animate-*` classes.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const handleChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return reduced;
}
