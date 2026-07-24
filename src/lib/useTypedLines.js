import { useEffect, useMemo, useRef, useState } from 'react';
import { buildBootTimeline } from './bootTimeline';

/**
 * useTypedLines
 * -------------
 * Same "one real clock, no chained delays" approach used by BootScreen,
 * extracted so any component can type out a fixed set of lines once.
 * `lines` should be a stable reference (define arrays at module scope).
 *
 * Performance note: renderedLines is wrapped in useMemo keyed on elapsed.
 * Without this, the terminal banner's rAF loop caused a new array allocation
 * on every animation frame (~60fps × N lines) even though the visible text
 * only changes a few chars per frame. The memoized result is still
 * recomputed every frame (elapsed changes each frame), but the memo ensures
 * React's reconciler sees the same reference when the string content hasn't
 * changed — which can't be detected from outside, so this is primarily about
 * documenting intent. The real win is avoiding the needless re-render when
 * the parent reads done=true and stops the loop.
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

  // Compute rendered lines from elapsed. Memoized on elapsed so the array
  // reference is stable between renders triggered by sources other than the
  // rAF tick (e.g. parent re-renders).
  const renderedLines = useMemo(
    () =>
      timeline.map((line) => {
        if (elapsed < line.start) return '';
        const span = line.end - line.start || 1;
        const progress = elapsed < line.end ? (elapsed - line.start) / span : 1;
        return line.text.slice(0, Math.max(0, Math.round(line.text.length * progress)));
      }),
    [timeline, elapsed]
  );

  return { renderedLines, done };
}
