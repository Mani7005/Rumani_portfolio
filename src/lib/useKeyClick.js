import { useRef, useCallback } from 'react';

/**
 * useKeyClick
 * -----------
 * Tiny synthesized "tick" per keystroke, generated with the Web Audio API
 * instead of shipping an audio file. AudioContext is created lazily on the
 * first call (must happen inside a user gesture — a keydown qualifies).
 * Entirely optional: callers just don't call `play()` when sound is off.
 */
export function useKeyClick() {
  const ctxRef = useRef(null);

  const play = useCallback(() => {
    try {
      if (!ctxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        ctxRef.current = new AudioCtx();
      }
      const ctx = ctxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.value = 720;
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio is a nice-to-have; never let it break typing.
    }
  }, []);

  return play;
}
