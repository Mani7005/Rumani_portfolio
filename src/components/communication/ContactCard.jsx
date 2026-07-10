import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck, FiExternalLink, FiDownload } from 'react-icons/fi';
import GlassPanel from '@/components/ui/GlassPanel';
import Button from '@/components/ui/Button';
import StatusIndicator from './StatusIndicator';

/**
 * ContactCard
 * -----------
 * One component, five behaviors, driven entirely by `action.type`:
 *   'copy'     — copies `value` to clipboard, button flips to a
 *                confirmed "COPIED" state for a moment
 *   'link'     — opens `action.href` in a new tab
 *   'download' — triggers a file download via a temporary <a download>
 *   'status'   — renders <StatusIndicator> instead of a plain value
 *                (used for Availability)
 *   undefined  — info-only, no button (used for Location)
 *
 * Every card shares the same GlassPanel hover-lift/glow + scan-line
 * treatment already established in ProjectCard/SkillModule/TimelineNode.
 */
export default function ContactCard({ icon: Icon, label, value, action, statusValue }) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can fail (permissions, insecure context) — the
      // card just stays in its normal state rather than throwing.
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = action.href;
    link.download = action.filename ?? '';
    link.click();
  };

  const renderAction = () => {
    if (!action) return null;

    if (action.type === 'copy') {
      return (
        <Button variant="outline" icon={copied ? FiCheck : FiCopy} onClick={handleCopy} className="mt-4 w-full sm:w-auto">
          {copied ? 'Copied' : 'Copy'}
        </Button>
      );
    }
    if (action.type === 'link') {
      return (
        <Button href={action.href} variant="outline" icon={FiExternalLink} className="mt-4 w-full sm:w-auto">
          Open
        </Button>
      );
    }
    if (action.type === 'download') {
      return (
        <Button variant="primary" icon={FiDownload} onClick={handleDownload} className="mt-4 w-full sm:w-auto">
          Download
        </Button>
      );
    }
    return null;
  };

  return (
    <GlassPanel
      as={motion.div}
      active={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="group relative flex h-full flex-col overflow-hidden p-5 sm:p-6"
    >
      {/* scan line — on hover, matching the rest of the system */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="h-8 w-full animate-scan bg-gradient-to-b from-transparent via-cyan-core/6 to-transparent" />
      </div>

      <div className="relative flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-glass-border bg-panel-light/40 text-cyan-core">
          <Icon className="h-4 w-4" />
        </span>
        <p className="font-mono text-[10px] tracking-[0.25em] text-ink-muted uppercase">{label}</p>
      </div>

      <div className="relative mt-4 flex-1">
        {action?.type === 'status' ? (
          <StatusIndicator status={statusValue ?? 'available'} />
        ) : (
          <p className="break-words text-sm text-ink-primary/90">{value}</p>
        )}
      </div>

      <div className="relative">{renderAction()}</div>
    </GlassPanel>
  );
}
