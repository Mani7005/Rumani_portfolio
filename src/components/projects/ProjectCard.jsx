import { useRef, useState, useCallback, useMemo, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import GlassPanel from '@/components/ui/GlassPanel';
import Button from '@/components/ui/Button';
import ProjectStatus from './ProjectStatus';
import TechBadge from './TechBadge';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

const TILT_MAX = 7; // degrees
const LIFT = -6;    // px on hover

// Hoisted spring config — shared by all ProjectCard instances.
const SPRING_CFG = { stiffness: 280, damping: 24, mass: 0.5 };
const POINTER_SPRING = { stiffness: 150, damping: 18, mass: 0.4 };
const CARD_TRANSITION_REDUCED = { duration: 0.15 };
const CARD_TRANSITION_SPRING = { type: 'spring', ...SPRING_CFG };

// Static variant states for the "rest" position — hoisted and shared.
// The "hover" state's delay is the only per-badge difference, so we build
// a lookup of up to 20 pre-computed hover variants (enough for any project).
const TECH_REST = { opacity: 0.85, y: 0, scale: 1 };
const TECH_HOVER_VARIANTS = Array.from({ length: 20 }, (_, i) => ({
  rest: TECH_REST,
  hover: {
    opacity: 1,
    y: -2,
    scale: 1.04,
    transition: { delay: i * 0.04, type: 'spring', stiffness: 400, damping: 18 },
  },
}));

/**
 * ProjectCard
 * -----------
 * Same record view, layout, spacing, colors, and props as before — now
 * with cursor-driven 3D tilt, a moving glass glare, soft cursor-reactive
 * lighting, individually animated tech chips, and spring-eased hover.
 * All effects are transform/opacity-only (GPU accelerated) and disabled
 * entirely when prefers-reduced-motion is set.
 *
 * Performance notes:
 *  - TECH_HOVER_VARIANTS pre-computed at module scope: was creating a new
 *    variants object per tech badge per render (up to ~8 objects × N renders).
 *  - Spring config objects hoisted to module scope.
 *  - Pointer/hover handlers stabilized with useCallback.
 *  - Wrapped in React.memo: Projects.jsx list re-renders on activeId change
 *    (dossier open/close) — memo prevents all cards from re-rendering when
 *    only one dossier opens.
 */
const ProjectCard = memo(function ProjectCard({ project, index, onOpenDossier }) {
  const reduceMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);

  // Raw pointer position as a fraction of the card (0..1), set on move.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // Springs smooth the raw pointer into eased tilt/light values.
  const sx = useSpring(px, POINTER_SPRING);
  const sy = useSpring(py, POINTER_SPRING);

  // 3D tilt — rotate around Y based on horizontal pointer, X based on vertical.
  const rotateY = useTransform(sx, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rotateX = useTransform(sy, [0, 1], [-TILT_MAX, TILT_MAX]);

  // Layered depth — translate inner content slightly opposite to tilt
  // for a parallax pop. Small multiplier keeps it subtle.
  const depthX = useTransform(sx, [0, 1], [6, -6]);
  const depthY = useTransform(sy, [0, 1], [6, -6]);

  // Glass glare — a radial highlight that follows the cursor.
  const glareX = useTransform(sx, [0, 1], ['0%', '100%']);
  const glareY = useTransform(sy, [0, 1], ['0%', '100%']);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.10), transparent 55%)`;

  // Soft cursor-reactive cyan light — offset slightly from the pointer.
  const lightX = useTransform(sx, [0, 1], ['10%', '90%']);
  const lightY = useTransform(sy, [0, 1], ['10%', '90%']);
  const lightBg = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(45,212,232,0.10), transparent 50%)`;

  const handlePointerMove = useCallback((e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }, [reduceMotion, px, py]);

  const handlePointerEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    if (reduceMotion) return;
    px.set(0.5);
    py.set(0.5);
  }, [reduceMotion, px, py]);

  const handleOpenDossier = useCallback(() => {
    onOpenDossier(project.id);
  }, [onOpenDossier, project.id]);

  // The tilt style object depends on reduceMotion — memoize so it's not
  // rebuilt on every render while hovered (hovered triggers re-render for
  // the light/glare opacity transition).
  const tiltStyle = useMemo(() => (
    reduceMotion
      ? undefined
      : { rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }
  ), [reduceMotion, rotateX, rotateY]);

  const depthStyle = useMemo(() => (
    reduceMotion
      ? undefined
      : { x: depthX, y: depthY, translateZ: 0, transformStyle: 'preserve-3d' }
  ), [reduceMotion, depthX, depthY]);

  return (
    <GlassPanel
      as={motion.div}
      label={`FILE_${String(index + 1).padStart(2, '0')}`}
      active={hovered}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={tiltStyle}
      whileHover={reduceMotion ? undefined : { y: LIFT }}
      transition={reduceMotion ? CARD_TRANSITION_REDUCED : CARD_TRANSITION_SPRING}
      className="group relative overflow-hidden cursor-default"
    >
      {/* Cursor-reactive cyan lighting — behind content, above panel bg */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: lightBg }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* Glass glare — moves with the mouse, visible on hover */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{ background: glareBg }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* Scan line — on hover (unchanged) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="h-10 w-full animate-scan bg-gradient-to-b from-transparent via-cyan-core/6 to-transparent" />
      </div>

      {/* Content with subtle parallax depth — translateZ + slight shift */}
      <motion.div
        style={depthStyle}
        className="relative p-5 sm:p-6"
      >
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

        {/* Tech stack — each chip animates in individually on hover */}
        <div className="flex flex-wrap gap-1.5 mb-5 pl-10">
          {project.techStack.map((tech, i) => (
            <motion.div
              key={tech}
              variants={TECH_HOVER_VARIANTS[i] ?? TECH_HOVER_VARIANTS[19]}
              initial="rest"
              animate={hovered ? 'hover' : 'rest'}
            >
              <TechBadge>{tech}</TechBadge>
            </motion.div>
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
            onClick={handleOpenDossier}
            className="ml-auto"
          >
            Access File
          </Button>
        </div>
      </motion.div>
    </GlassPanel>
  );
});

export default ProjectCard;
