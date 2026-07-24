import { useEffect, useRef } from 'react';

/**
 * SceneBackground
 * ---------------
 * Fixed, full-viewport ambient layer rendered behind every section:
 *  - panning cyber grid
 *  - two slow aurora blobs (cyan + blue)
 *  - a receding floor grid near the bottom
 *  - a canvas of drifting particles
 *  - a cursor-reactive radial glow that follows the pointer
 *
 * Purely decorative (aria-hidden), pointer-events disabled, and pauses
 * its canvas animation when the tab is hidden or the user prefers
 * reduced motion.
 */

const PARTICLE_COUNT = 46;

export default function SceneBackground() {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let particles = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18 - 0.04,
        a: Math.random() * 0.5 + 0.15,
        tw: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    let running = true;
    const onVisibility = () => {
      running = !document.hidden;
      if (running) loop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const loop = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        if (p.y > h + 4) p.y = -4;
        const twinkle = 0.6 + Math.sin(p.tw) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,212,232,${p.a * twinkle})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(45,212,232,0.5)';
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Cursor-reactive glow — eased via rAF, no React re-renders.
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf = null;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      glow.style.background = `radial-gradient(420px circle at ${cx}px ${cy}px, rgba(45,212,232,0.06), transparent 60%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base void wash */}
      <div className="absolute inset-0 bg-void" />

      {/* Panning cyber grid */}
      <div className="absolute inset-0 bg-grid-pan opacity-70" />

      {/* Aurora blobs — slow drifting color fields */}
      <div className="absolute -left-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full bg-cyan-core/5 blur-[120px] animate-aurora" />
      <div className="absolute -right-1/4 bottom-1/4 h-[55vh] w-[55vh] rounded-full bg-blue-deep/6 blur-[130px] animate-aurora" style={{ animationDelay: '6s' }} />

      {/* Receding floor grid */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-grid-floor opacity-60" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Cursor-reactive glow */}
      <div ref={glowRef} className="absolute inset-0" />

      {/* Top + bottom vignette to seat content */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void/80 to-transparent" />
    </div>
  );
}
