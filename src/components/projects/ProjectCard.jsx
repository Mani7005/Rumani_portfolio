import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import GlassPanel from '@/components/ui/GlassPanel';
import Button from '@/components/ui/Button';
import ProjectStatus from './ProjectStatus';
import TechBadge from './TechBadge';

/**
 * ProjectCard
 * -----------
 * ACCESS FILE now opens the full-screen ProjectDossier (rendered once, at
 * the Projects.jsx level) instead of expanding inline — so this card has
 * no expanded state of its own anymore. `onOpenDossier` is the only new
 * prop; everything else about the collapsed record view is unchanged.
 */
export default function ProjectCard({ project, index, onOpenDossier }) {
  const [hovered, setHovered] = useState(false);

  return (
    <GlassPanel
      as={motion.div}
      label={`FILE_${String(index + 1).padStart(2, '0')}`}
      active={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="group relative overflow-hidden cursor-default"
    >
      {/* Scan line — on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="h-10 w-full animate-scan bg-gradient-to-b from-transparent via-cyan-core/6 to-transparent" />
      </div>

      <div className="relative p-5 sm:p-6">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-4">
            {/* Index number */}
            <span className="font-mono text-2xl font-semibold text-ink-faint/80 leading-none select-none mt-0.5">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-xl text-ink-primary sm:text-2xl">{project.name}</h3>
              <p className="mt-0.5 font-mono text-[9px] tracking-[0.25em] text-ink-muted uppercase">{project.type}</p>
            </div>
          </div>
          <ProjectStatus status={project.status} />
        </div>

        <p className="text-sm leading-relaxed text-ink-muted mb-4 pl-10">{project.shortDescription}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5 pl-10">
          {project.techStack.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2.5 pl-10">
          <Button href={project.github} variant="outline" icon={FiGithub}>
            GitHub
          </Button>
          {project.liveDemo && (
            <Button href={project.liveDemo} variant="outline" icon={FiExternalLink}>
              Live Demo
            </Button>
          )}
          <Button
            variant="primary"
            icon={FiFolder}
            onClick={() => onOpenDossier(project.id)}
            className="ml-auto"
          >
            Access File
          </Button>
        </div>
      </div>
    </GlassPanel>
  );
}
