import { useCallback, memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * TerminalInput
 * -------------
 * Wrapped in React.memo + useCallback on all handlers.
 * Terminal.jsx re-renders on every keystroke (value state), every entry
 * appended (entries state), and on soundOn toggle. Without memo/useCallback,
 * all handlers were recreated and the child re-rendered on every keystroke
 * even when only the parent's entries list changed.
 */
const TerminalInput = memo(function TerminalInput({
  value,
  onChange,
  onSubmit,
  onArrowUp,
  onArrowDown,
  onKeyStroke,
  hasError,
  inputRef,
}) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onArrowUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onArrowDown();
    } else if (e.key.length === 1) {
      onKeyStroke?.();
    }
  }, [onArrowUp, onArrowDown, onKeyStroke]);

  const handleChange = useCallback((e) => onChange(e.target.value), [onChange]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit();
  }, [onSubmit]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
    >
      <span className="shrink-0 font-mono text-[11px] tracking-wider text-cyan-core/60">AI//</span>

      <div className="relative flex-1 font-mono text-[11px]">
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="Terminal command input"
          className={cn(
            'w-full bg-transparent caret-transparent outline-none tracking-wide',
            hasError ? 'text-status-error' : 'text-ink-primary'
          )}
        />
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute top-1/2 h-[1em] w-[6px] -translate-y-1/2 animate-blink',
            hasError ? 'bg-status-error' : 'bg-cyan-core/80'
          )}
          style={{ left: `${value.length}ch` }}
        />
      </div>
    </form>
  );
});

export default TerminalInput;
