import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';
import HUDCore from '@/components/ui/HUDCore';
import Button from '@/components/ui/Button';
import HeroScene from './HeroScene';
import MouseGlow from './MouseGlow';
import StatusPanel from './StatusPanel';
import ProjectTicker from './ProjectTicker';

// Variant objects defined at module scope — stable references, never
// recreated on re-render, so Framer Motion can diff them by identity.
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Hoisted — avoids a new string allocation inside the render function.
const INTRODUCTION = `
I'm a Computer Engineering student passionate about building AI-powered applications,
distributed backend systems, and developer tools. I enjoy solving real-world problems
through full-stack development, machine learning, and scalable system design.
Currently seeking Software Engineering and AI internship opportunities.
`;

// Hero has no props that change after mount; the static inline style object
// below (opacity: 0.5) is moved to module scope to avoid a new allocation
// on every render.
const hudRingStyle = { opacity: 0.5 };

// The initial animation for the scene wrapper is also stable — hoisted.
const sceneInitial = { opacity: 0, scale: 0.92 };
const sceneAnimate = { opacity: 1, scale: 1 };
const sceneTransition = { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 };

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-100" />

      {/* Subtle radial vignette from top-center (cyan glow source) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(45,212,232,0.05)_0%,transparent_70%)]" />

      {/* Two-column grid */}
      <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-2">

        {/* LEFT — 3D AI Core scene */}
        <div className="relative flex min-h-[52vh] items-center justify-center lg:min-h-screen">
          <MouseGlow />

          {/* Background HUD rings */}
          <div
            style={hudRingStyle}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <HUDCore
              size="lg"
              className="scale-[1.55] opacity-50"
            />
          </div>

          {/* 3D Robot scene — entrance animation only, no scroll-driven values */}
          <motion.div
            initial={sceneInitial}
            animate={sceneAnimate}
            transition={sceneTransition}
            className="relative z-10 h-[58vw] max-h-[500px] w-[58vw] max-w-[500px] sm:h-[400px] sm:w-[400px]"
          >
            <HeroScene className="h-full w-full" />
          </motion.div>

          {/* Vertical divider line (desktop only) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-cyan-core/10 to-transparent lg:block" />

          {/* Corner labels */}
          <span className="pointer-events-none absolute bottom-8 left-6 font-mono text-[8px] tracking-[0.06em] text-ink-muted/40 uppercase">
            AI_CORE · ACTIVE
          </span>
          <span className="pointer-events-none absolute bottom-8 right-8 hidden font-mono text-[8px] tracking-[0.06em] text-ink-muted/40 uppercase lg:block">
            MODULE_01
          </span>

          {/* Edge vignette — blends scene into page */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#03060A_90%)]" />
        </div>

        {/* RIGHT — Identity & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-9 flex flex-col justify-center gap-8 px-6 py-4 sm:px-12 lg:px-14 lg:py-4"
        >
          {/* Eyebrow */}
          <motion.p variants={itemVariants} className="font-mono text-[9px] tracking-[0.18em] text-ink-muted uppercase">
            // PORTFOLIO_OS · BOOT_COMPLETE
          </motion.p>

          {/* Name + role */}
          <div className="space-y-2">
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl leading-[1.08] tracking-[0.04em] text-ink-primary sm:text-6xl lg:text-[3.75rem]"
            >
              Rumani
              <br />
              Dadyala
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="font-mono text-[10px] tracking-[0.16em] text-ink-muted uppercase"
            >
              Software Engineer
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="max-w-xl mt-3">
                 <p className="text-[1.15rem] md:text-[1.2rem] leading-[2rem] text-slate-200">
                  {INTRODUCTION}
                 </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5">
            <Button href="#projects" variant="primary" icon={FiArrowRight}>
              Explore Projects
            </Button>
            <Button href="/Dadyala_rumani...pdf" variant="outline" icon={FiDownload}>
              Resume
            </Button>
            <Button href="https://github.com/Mani7005" variant="outline" icon={FiGithub}>
              GitHub
            </Button>
            <Button
               href="https://www.linkedin.com/in/rumani-dadyala-421a56313"
               variant="outline"
               icon={FiLinkedin}
            >
               LinkedIn
            </Button>
            <Button href="mailto:rumanidadyala@gmail.com" variant="ghost" icon={FiMail}>
              Contact
            </Button>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom section separator */}
      <div className="section-separator" />
    </section>
  );
}
