import { cn } from '@/lib/utils';

const STATUS_STYLES = {
  online: { dot: 'bg-status-ok', text: 'text-status-ok', label: 'ONLINE' },
  active: { dot: 'bg-amber-signal', text: 'text-amber-signal', label: 'ACTIVE' },
};

export default function ProjectStatus({ status = 'online', className }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.online;
  return (
    <div className={cn('inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] uppercase', s.text, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse-glow shrink-0', s.dot)} />
      {s.label}
    </div>
  );
}
