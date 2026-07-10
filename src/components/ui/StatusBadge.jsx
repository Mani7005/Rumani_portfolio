import { cn } from '@/lib/utils';

const STATUS_STYLES = {
  operational: { dot: 'bg-status-ok', text: 'text-status-ok', label: 'OPERATIONAL' },
  in_progress: { dot: 'bg-amber-signal', text: 'text-amber-signal', label: 'IN PROGRESS' },
  archived: { dot: 'bg-status-idle', text: 'text-status-idle', label: 'ARCHIVED' },
  error: { dot: 'bg-status-error', text: 'text-status-error', label: 'ERROR' },
  available: { dot: 'bg-status-ok', text: 'text-status-ok', label: 'AVAILABLE FOR ROLES' },
};

export default function StatusBadge({ status = 'operational', className }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.operational;
  return (
    <div className={cn('inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase', s.text, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse-glow shrink-0', s.dot)} />
      {s.label}
    </div>
  );
}
