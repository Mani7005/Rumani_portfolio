import { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * GlassPanel — JARVIS-inspired HUD card surface.
 * Dark translucent background, hairline cyan border, corner reticle marks,
 * optional module label tag.
 *
 * Wrapped in React.memo: GlassPanel is used as the surface for ProjectCard,
 * SkillModule, TimelineNode, ContactCard, StatusPanel, and Terminal.
 * All of those pass children + a small set of scalar props. Memo prevents
 * re-renders caused by parent state that doesn't affect this component's
 * output (e.g. ProjectCard's hover MotionValues updating lightBg/glareBg
 * cause the outer GlassPanel wrapper to re-render on every pointer move;
 * memo short-circuits the diff when active/className/label/children haven't
 * changed — though note: children identity must be stable for memo to win
 * in those cases).
 *
 * The static className string is pre-built at module scope so cn() is only
 * called when the `active` or `className` props change rather than every render.
 */
const BASE_CLASS =
  'relative rounded-sm border bg-panel/70 backdrop-blur-sm ' +
  'border-glass-border shadow-card transition-all duration-300 ' +
  'before:pointer-events-none before:absolute before:inset-0 before:rounded-sm ' +
  'before:bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_40%)] before:opacity-60';

const GlassPanel = memo(function GlassPanel({
  children,
  className,
  label,
  active = false,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={cn(
        BASE_CLASS,
        active && 'border-cyan-core/25 shadow-card-hover',
        className
      )}
      {...props}
    >
      {/* Corner reticle brackets */}
      <span className="pointer-events-none absolute -left-px -top-px h-2.5 w-2.5 border-l border-t border-cyan-core/50" />
      <span className="pointer-events-none absolute -right-px -top-px h-2.5 w-2.5 border-r border-t border-cyan-core/50" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-2.5 w-2.5 border-b border-l border-cyan-core/50" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-cyan-core/50" />

      {/* HUD module label — rendered only when passed */}
      {label && (
        <span className="pointer-events-none absolute -top-[1px] left-5 -translate-y-1/2 bg-void px-1.5 font-mono text-[8px] tracking-[0.2em] text-cyan-core/60 uppercase select-none">
          {label}
        </span>
      )}

      {children}
    </Component>
  );
});

export default GlassPanel;
