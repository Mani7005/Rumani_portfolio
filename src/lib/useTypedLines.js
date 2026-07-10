import { useEffect, useMemo, useRef, useState } from 'react';
import { buildBootTimeline } from './bootTimeline';

/**
 * useTypedLines
 * -------------
 * Same "one real clock, no chained delays" approach used by BootScreen,
 * extracted so any component can type out a fixed set of lines once.
 * `lines` should be a stable reference (define arrays at module scope).
 */
export function useTypedLines(lines, { cps = 45, gapMs = 90, startDelayMs = 100 } = {}) {
  const { lines: timeline, mainDuration } = useMemo(
    () => buildBootTimeline(lines, { cps, gapMs, startDelayMs }),
    [lines, cps, gapMs, startDelayMs]
  );

  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const startedAt = performance.now();

    const tick = (now) => {
      const dt = now - startedAt;
      setElapsed(dt);
      if (dt < mainDuration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mainDuration]);

  const renderedLines = timeline.map((line) => {
    if (elapsed < line.start) return '';
    const span = line.end - line.start || 1;
    const progress = elapsed < line.end ? (elapsed - line.start) / span : 1;
    return line.text.slice(0, Math.max(0, Math.round(line.text.length * progress)));
  });

  return { renderedLines, done };
}
