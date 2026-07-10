import { cn } from '@/lib/utils';

const STATUS_STYLES = {
  online: { dot: 'bg-status-ok', text: 'text-status-ok', label: 'ONLINE' },
  available: { dot: 'bg-status-ok', text: 'text-status-ok', label: 'AVAILABLE FOR OPPORTUNITIES' },
  busy: { dot: 'bg-amber-signal', text: 'text-amber-signal', label: 'LIMITED AVAILABILITY' },
};

/**
 * StatusIndicator
 * ---------------
 * Same dot + mono-uppercase grammar as every other status readout in the
 * app (ui/StatusBadge, projects/ProjectStatus, skills/StatusIndicator) —
 * kept as its own file, scoped to this section, per the requested
 * structure rather than reaching into an unrelated feature folder.
 */
export default function StatusIndicator({ status = 'online', className }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.online;
  return (
    <div className={cn('inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase', s.text, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse-glow shrink-0', s.dot)} />
      {s.label}
    </div>
  );
}
