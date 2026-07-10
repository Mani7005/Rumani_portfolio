import { cn } from '@/lib/utils';

const COLOR_MAP = {
  cyan: 'text-cyan-core text-glow-sm',
  amber: 'text-amber-signal [text-shadow:0_0_10px_rgba(240,168,48,0.45)]',
  ok: 'text-status-ok [text-shadow:0_0_10px_rgba(52,211,153,0.45)]',
};

export default function GlowText({ as: Component = 'span', color = 'cyan', className, children, ...props }) {
  return (
    <Component className={cn(COLOR_MAP[color], className)} {...props}>
      {children}
    </Component>
  );
}
