import HUDCore from '@/components/ui/HUDCore';
import { cn } from '@/lib/utils';

export default function BootLoader({ progress, className }) {
  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <HUDCore size="lg" progress={progress} />

      <div className="flex w-56 flex-col gap-2">
        {/* Linear progress bar */}
        <div className="h-px w-full overflow-hidden bg-ink-faint/60">
          <div
            className="h-full bg-cyan-core"
            style={{
              width: `${progress}%`,
              transition: 'width 80ms linear',
              boxShadow: '0 0 8px rgba(45,212,232,0.6)',
            }}
          />
        </div>
        <div className="flex justify-between font-mono text-[9px] tracking-[0.3em] text-ink-muted uppercase">
          <span>Boot Sequence</span>
          <span className="text-cyan-core">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
