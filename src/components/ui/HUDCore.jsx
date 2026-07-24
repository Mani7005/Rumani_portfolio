import { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * HUDCore
 * -------
 * SVG ring cluster used in both BootScreen (re-renders at ~60fps during
 * boot) and Hero (static after mount). Wrapped in React.memo so BootScreen's
 * rAF-driven elapsed state changes don't cause HUDCore to reconcile on
 * every frame — it receives no props that change during the boot animation
 * (size="lg", progress changes but only affects the arc dash, not the DOM
 * structure).
 *
 * Computed values (circumference, dash, tick mark coordinates) are derived
 * from props and are cheap arithmetic; no additional memoization needed for
 * them — they're already only re-run when memo allows a re-render through.
 */
const SIZE_MAP = {
  sm: 32,
  md: 220,
  lg: 320,
};

const HUDCore = memo(function HUDCore({ size = 'md', progress = null, className }) {
  const px = SIZE_MAP[size];
  const r = { sm: 12, md: 94, lg: 138 }[size];
  const circumference = 2 * Math.PI * r;
  const dash = progress !== null ? (progress / 100) * circumference : circumference * 0.68;

  return (
    <div
      className={cn('relative', className)}
      style={{ width: px, height: px }}
      role="img"
      aria-label={progress !== null ? `System loading, ${Math.round(progress)} percent` : 'System status: online'}
    >
      <svg viewBox={`0 0 ${px} ${px}`} className="h-full w-full overflow-visible">
        {/* Outermost faint dotted reference ring */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r + (size === 'sm' ? 8 : 26)}
          fill="none"
          stroke="rgba(45,212,232,0.08)"
          strokeWidth="1"
          strokeDasharray="1 8"
          strokeLinecap="round"
        />

        {/* Slow outer rotation ring — dashed arc */}
        <g style={{ transformOrigin: '50% 50%' }} className="animate-spin-slower">
          <circle
            cx={px / 2}
            cy={px / 2}
            r={r + (size === 'sm' ? 14 : 38)}
            fill="none"
            stroke="rgba(45,212,232,0.12)"
            strokeWidth="1"
            strokeDasharray={`${size === 'sm' ? 3 : 8} ${size === 'sm' ? 12 : 30}`}
            strokeLinecap="round"
          />
        </g>

        {/* Counter-rotating ring — thin solid */}
        <g style={{ transformOrigin: '50% 50%' }} className="animate-spin-reverse">
          <circle
            cx={px / 2}
            cy={px / 2}
            r={r + (size === 'sm' ? 5 : 12)}
            fill="none"
            stroke="rgba(30,95,204,0.35)"
            strokeWidth="1"
            strokeDasharray={`${size === 'sm' ? 5 : 18} ${size === 'sm' ? 8 : 16}`}
            strokeLinecap="round"
          />
        </g>

        {/* Secondary inner ring */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r - (size === 'sm' ? 5 : 18)}
          fill="none"
          stroke="rgba(45,212,232,0.06)"
          strokeWidth="1"
        />

        {/* Main progress / idle arc */}
        <g style={{ transformOrigin: '50% 50%' }} className={progress === null ? 'animate-spin-slow' : ''}>
          <circle
            cx={px / 2}
            cy={px / 2}
            r={r}
            fill="none"
            stroke="#2DD4E8"
            strokeWidth={size === 'sm' ? 1.5 : 1.75}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            transform={`rotate(-90 ${px / 2} ${px / 2})`}
            style={{ filter: 'drop-shadow(0 0 4px rgba(45,212,232,0.5))' }}
          />
        </g>

        {/* Subtle tick marks at 90° intervals */}
        {size !== 'sm' && [0, 90, 180, 270].map((deg) => {
          const rad = (deg - 90) * (Math.PI / 180);
          const x1 = px / 2 + (r - 4) * Math.cos(rad);
          const y1 = px / 2 + (r - 4) * Math.sin(rad);
          const x2 = px / 2 + (r + 4) * Math.cos(rad);
          const y2 = px / 2 + (r + 4) * Math.sin(rad);
          return (
            <line
              key={deg}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(45,212,232,0.4)"
              strokeWidth="1"
            />
          );
        })}

        {/* Center core dot */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={size === 'sm' ? 2.5 : 4}
          fill="#2DD4E8"
          className="animate-pulse-glow"
          style={{ filter: 'drop-shadow(0 0 6px rgba(45,212,232,0.8))' }}
        />
      </svg>

      {progress !== null && size !== 'sm' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs tracking-[0.2em] text-cyan-core/80">{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
});

export default HUDCore;
