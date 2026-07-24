import { cn } from '@/lib/utils';

/**
 * GlassPanel — JARVIS-inspired HUD card surface.
 * Dark translucent background, hairline cyan border, corner reticle marks,
 * optional module label tag.
 */
export default function GlassPanel({
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
        'relative rounded-sm border bg-panel/70 backdrop-blur-sm',
        'border-glass-border shadow-card transition-all duration-300',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-sm',
        'before:bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_40%)] before:opacity-60',
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

      {children}
    </Component>
  );
}
