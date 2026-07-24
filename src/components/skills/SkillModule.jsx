import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import SkillBadge from './SkillBadge';
import StatusIndicator from './StatusIndicator';
import ActivityIndicator from './ActivityIndicator';

/**
 * SkillModule
 * -----------
 * Two separate motion layers on purpose:
 *  - the outer plain <div> owns the continuous idle float, using the
 *    *existing* `animate-float` CSS keyframe (already defined in
 *    tailwind.config.js, unused elsewhere) — reused rather than
 *    reinvented, staggered per card via animationDelay.
 *  - GlassPanel (as={motion.div}) owns hover lift/glow, exactly like
 *    ProjectCard does.
 * Keeping these on two different elements avoids a CSS-animation vs.
 * Framer-Motion-inline-transform conflict on the same node — animations
 * and inline styles both target `transform`, and mixing them on one
 * element causes exactly the kind of jitter this sidesteps.
 */
export default function SkillModule({ module, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="animate-float" style={{ animationDelay: `${index * 0.35}s` }}>
      <GlassPanel
        as={motion.div}
        label={`SYS_0${index + 1}`}
        active={hovered}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group relative h-full overflow-hidden cursor-default"
      >
        {/* scan line — on hover, matching ProjectCard's HUD treatment */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-10 w-full animate-scan bg-gradient-to-b from-transparent via-cyan-core/6 to-transparent" />
        </div>

        {/* rotating micro-HUD ring — corner system emblem */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-4 top-4 h-5 w-5 animate-spin-slow text-cyan-core/25"
        >
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2.5 4" />
        </svg>

        <div className="relative flex h-full flex-col p-5 sm:p-6">
          <div className="mb-4 flex items-start gap-4">
            <span className="mt-0.5 select-none font-mono text-2xl font-semibold leading-none text-ink-faint/80">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-display text-xl text-ink-primary">{module.title}</h3>
              <p className="mt-0.5 font-mono text-[9px] tracking-[0.25em] text-ink-muted uppercase">Technology Stack</p>
            </div>
          </div>

          <div className="pl-10 flex flex-col gap-3">
            <StatusIndicator status="online" />

            <p className="text-sm leading-relaxed text-ink-muted">{module.description}</p>

            {/* Technology badges - primary visual focus */}
            <div className="mt-2 flex flex-wrap gap-2">
              {module.technologies.map((tech, techIndex) => (
                <SkillBadge key={tech} index={techIndex}>
                  {tech}
                </SkillBadge>
              ))}
            </div>

            <ActivityIndicator className="mt-auto pt-2" />
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
