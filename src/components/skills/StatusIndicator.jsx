import { cn } from '@/lib/utils';

const STATUS_STYLES = {
  online: { dot: 'bg-status-ok', text: 'text-status-ok', label: 'ONLINE' },
  calibrating: { dot: 'bg-amber-signal', text: 'text-amber-signal', label: 'CALIBRATING' },
};

/**
 * StatusIndicator
 * ---------------
 * Deliberately its own file (not a reuse of ui/StatusBadge or
 * projects/ProjectStatus) per the requested folder structure — scoped to
 * skill modules, same visual grammar (dot + mono uppercase label) as the
 * rest of the system's status readouts.
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
