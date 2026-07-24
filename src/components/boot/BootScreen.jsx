import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PowerButton from './PowerButton';
import BootLoader from './BootLoader';
import BootLog from './BootLog';
import HUDCore from '@/components/ui/HUDCore';
import GlowText from '@/components/ui/GlowText';
import { buildBootTimeline } from '@/lib/bootTimeline';

const BOOT_LINES = [
  'Initializing Neural Core...',
  'Loading AI Modules...',
  'Connecting GitHub...',
  'Loading TradeStreamX...',
  'Loading InterviewAI...',
  'Loading Research Database...',
  'Authenticating Visitor...',
  'System Online.',
];

const HOLD_MS = 550;

export default function BootScreen({ onComplete }) {
  const [phase, setPhase] = useState('offline');
  const [elapsed, setElapsed] = useState(0);
  const rafRef = useRef(null);
  const firedRef = useRef(false);

  const { lines, mainDuration } = useMemo(() => buildBootTimeline(BOOT_LINES), []);
  const totalDuration = mainDuration + HOLD_MS;
  const progress = Math.min(100, (elapsed / mainDuration) * 100);

  useEffect(() => {
    if (phase !== 'booting') return undefined;
    const startedAt = performance.now();
    const tick = (now) => {
      const dt = now - startedAt;
      setElapsed(dt);
      if (dt < totalDuration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase('complete');
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, totalDuration]);

  useEffect(() => {
    if (phase === 'complete' && !firedRef.current) {
      firedRef.current = true;
      onComplete?.();
    }
  }, [phase, onComplete]);

  const indicators = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        top: `${10 + Math.random() * 80}%`,
        left: `${8 + Math.random() * 84}%`,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-void">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-100" />

      {/* Scan line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 h-32 animate-scan bg-gradient-to-b from-transparent via-cyan-core/5 to-transparent" />
      </div>

      {/* Scanlines texture */}
      <div className="pointer-events-none absolute inset-0 scanlines opacity-30" />

      {/* Background HUD ring */}
      <HUDCore
        size="lg"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.12] scale-[2.6]"
      />

      {/* Tiny system indicators */}
      {indicators.map((dot) => (
        <span
          key={dot.id}
          aria-hidden
          className="pointer-events-none absolute h-0.5 w-0.5 rounded-full bg-cyan-core/60"
          style={{
            top: dot.top,
            left: dot.left,
            animation: `pulse-glow ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}

      {/* Top system bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-4 border-b border-line">
        <span className="font-mono text-[9px] tracking-[0.35em] text-ink-muted uppercase">
          SYS:COMMAND_CENTER · BUILD 2026
        </span>
        <span className="font-mono text-[9px] tracking-[0.35em] text-status-ok/70 uppercase flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-status-ok animate-pulse-glow" />
          {phase === 'offline' ? 'STANDBY' : phase === 'booting' ? 'INITIALIZING' : 'ALL_SYSTEMS_NOMINAL'}
        </span>
      </div>

      {/* Persistent brand — visible after activation */}
      <AnimatePresence>
        {phase !== 'offline' && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-14 font-mono text-[9px] tracking-[0.5em] text-ink-muted uppercase"
          >
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6">
        <AnimatePresence mode="wait">
          {phase === 'offline' && (
            <motion.div
              key="offline"
              className="flex flex-col items-center gap-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
            >
              <div className="space-y-3">
                 <h1 className="font-display text-5xl leading-none tracking-[0.12em] text-ink-primary md:text-7xl">
                   COMMAND
                </h1>

                  <h1 className="font-display text-5xl leading-none tracking-[0.12em] text-cyan-core md:text-7xl text-glow">
                       CENTER
                  </h1>
                <p className="font-mono text-[9px] tracking-[0.45em] text-ink-muted uppercase flex items-center justify-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-status-idle animate-pulse-glow" />
                  SYSTEM OFFLINE · PRESS TO INITIALIZE
                </p>
              </div>

              <PowerButton onActivate={() => setPhase('booting')} />

              {/* Bottom decorative line */}
              <div className="flex items-center gap-4 font-mono text-[8px] tracking-[0.3em] text-ink-muted/50 uppercase">
                <div className="h-px w-12 bg-line" />
                <span>v2.0.25</span>
                <div className="h-px w-12 bg-line" />
              </div>
            </motion.div>
          )}

          {(phase === 'booting' || phase === 'complete') && (
            <motion.div
              key="booting"
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <BootLoader progress={progress} />
              <BootLog lines={lines} elapsed={elapsed} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-6 py-4 border-t border-line">
        <span className="font-mono text-[8px] tracking-[0.3em] text-ink-muted/50 uppercase">
          COMMAND_CENTER · RUMANI DADYALA
        </span>
        <span className="font-mono text-[8px] tracking-[0.3em] text-ink-muted/50 uppercase">
          SOFTWARE ENGINEER
        </span>
      </div>
    </div>
  );
}
