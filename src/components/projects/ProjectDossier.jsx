import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink, FiImage } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import ProjectStatus from './ProjectStatus';
import TechBadge from './TechBadge';

/**
 * Section — the dossier's own label + content block. Same "mono label,
 * cyan hairline" grammar used elsewhere in the app, kept local to this
 * file since nothing else needs it.
 */
function Section({ label, children }) {
  return (
    <div className="border-l border-cyan-core/20 pl-4">
      <p className="font-mono text-[9px] tracking-[0.06em] text-ink-muted/70 uppercase">// {label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-secondary">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-core/50" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * ScreenshotTile — renders a real image if `src` is provided, otherwise a
 * labeled HUD placeholder. Keeps the section functional and honest before
 * real screenshots exist, without needing to change this component later.
 */
function ScreenshotTile({ caption, src }) {
  if (src) {
    return (
      <div className="overflow-hidden rounded-sm border border-glass-border">
        <img src={src} alt={caption} className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-glass-border bg-panel-light/30 px-3 text-center">
      <FiImage className="h-5 w-5 text-ink-muted" />
      <p className="font-mono text-[9px] tracking-widest text-ink-muted/70 uppercase">Image Pending</p>
      <p className="text-[11px] text-ink-muted/80">{caption}</p>
    </div>
  );
}

export default function ProjectDossier({ project, onClose }) {
  const closeButtonRef = useRef(null);

  // ESC closes; lock background scroll while the dossier is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const hasMetrics = project.performanceMetrics?.length > 0;

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Backdrop — click closes, blurs the rest of the OS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-void/70 backdrop-blur-md"
      />

      {/* Panel — slides in from the right */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} engineering dossier`}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 flex h-full w-full flex-col border-l border-glass-border bg-panel/95 shadow-2xl backdrop-blur-xl sm:max-w-xl lg:max-w-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-glass-border px-6 py-5 sm:px-8">
          <div>
            
            <h3 className="mt-1 font-display text-2xl text-ink-primary sm:text-3xl">{project.name}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <ProjectStatus status={project.status} />
              <span className="font-mono text-[9px] tracking-[0.08em] text-ink-muted uppercase">{project.type}</span>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dossier"
            className="rounded-sm border border-glass-border p-2 text-ink-muted transition-colors hover:border-cyan-core/50 hover:text-cyan-core"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6 sm:px-8">
          <Section label="OVERVIEW">
            <p className="text-sm leading-relaxed text-ink-secondary">{project.overview}</p>
          </Section>

          <Section label="PROBLEM STATEMENT">
            <p className="text-sm leading-relaxed text-ink-secondary">{project.problemStatement}</p>
          </Section>

          <Section label="SYSTEM ARCHITECTURE">
            <p className="text-sm leading-relaxed text-ink-secondary">{project.architecture}</p>
          </Section>

          <Section label="TECHNOLOGY STACK">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>
          </Section>

          <Section label="ENGINEERING CHALLENGES">
            <BulletList items={project.engineeringChallenges} />
          </Section>

          <Section label="KEY LEARNINGS">
            <BulletList items={project.keyLearnings} />
          </Section>

          

          {hasMetrics && (
            <Section label="PERFORMANCE METRICS">
              <div className="flex flex-wrap gap-3">
                {project.performanceMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-sm border border-glass-border bg-panel-light/40 px-4 py-2.5 text-center"
                  >
                    <p className="font-display text-lg text-cyan-core">{metric.value}</p>
                    <p className="font-mono text-[9px] tracking-widest text-ink-muted uppercase">{metric.label}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap gap-3 border-t border-glass-border px-6 py-5 sm:px-8">
          <Button href={project.github} variant="outline" icon={FiGithub}>
            GitHub
          </Button>
          {project.liveDemo && (
            <Button href={project.liveDemo} variant="primary" icon={FiExternalLink}>
              Live Demo
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
