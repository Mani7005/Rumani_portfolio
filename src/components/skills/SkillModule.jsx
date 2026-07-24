import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import SkillBadge from './SkillBadge';
import StatusIndicator from './StatusIndicator';
import ActivityIndicator from './ActivityIndicator';

// Hoisted at module scope — stable transition object shared by all cards.
const HOVER_TRANSITION = { duration: 0.3, ease: [0.22, 1, 0.36, 1] };
const HOVER_Y = { y: -4 };

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
 *
 * Performance notes:
 *  - animationDelay style objects hoisted — buildFloatStyle avoids inline
 *    `{}` creation on every render for each card.
 *  - onMouseEnter/Leave wrapped in useCallback so GlassPanel (as motion.div)
 *    doesn't receive new function references on re-render.
 *  - Wrapped in React.memo: Skills.jsx never passes new props after mount,
 *    so memoization prevents re-renders during sibling hover events.
 */

// Pre-compute one style object per possible index position.
// skillsData has 5 items — build 8 to be safe.
const FLOAT_STYLES = Array.from({ length: 8 }, (_, i) => ({
  animationDelay: `${i * 0.35}s`,
}));

const SkillModule = memo(function SkillModule({ module, index }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  return (
    <div className="animate-float" style={FLOAT_STYLES[index] ?? FLOAT_STYLES[0]}>
      <GlassPanel
        as={motion.div}
        label={`SYS_0${index + 1}`}
        active={hovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={HOVER_Y}
        transition={HOVER_TRANSITION}
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
});

export default SkillModule;
