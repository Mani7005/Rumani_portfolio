/**
 * parseCommand
 * ------------
 * Pure and framework-agnostic on purpose — no DOM access, no React. Given
 * the raw input string, returns { name, args, raw } or null for blank
 * input. Command *execution* (scrolling, downloads, etc.) lives in
 * commands.js, which is the only place that touches side effects.
 */
export function parseCommand(rawInput) {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;

  const [name, ...args] = trimmed.split(/\s+/);
  return { name: name.toLowerCase(), args, raw: trimmed };
}
