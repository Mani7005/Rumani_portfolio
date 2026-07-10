/**
 * buildBootTimeline
 * -----------------
 * Turns an array of log lines into a timeline of { text, start, end } in ms,
 * where `start`/`end` are the typing window for that line. Typing speed is
 * constant (chars/sec), so timing scales naturally with line length instead
 * of using hand-picked per-line durations.
 *
 * This is the single source of truth BootScreen reads from on every
 * animation frame — there are no setTimeout chains standing in for progress,
 * everything is derived from `elapsed` vs. this timeline.
 */
export function buildBootTimeline(linesText, { cps = 45, gapMs = 120, startDelayMs = 200 } = {}) {
  let cursor = startDelayMs;

  const lines = linesText.map((text) => {
    const typeMs = (text.length / cps) * 1000;
    const start = cursor;
    const end = start + typeMs;
    cursor = end + gapMs;
    return { text, start, end };
  });

  // mainDuration = when the last character finishes typing (drop the trailing gap)
  const mainDuration = cursor - gapMs;

  return { lines, mainDuration };
}
