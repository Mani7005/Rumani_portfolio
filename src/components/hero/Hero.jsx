import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiGithub, FiMail } from 'react-icons/fi';
import HUDCore from '@/components/ui/HUDCore';
import Button from '@/components/ui/Button';
import HeroScene from './HeroScene';
import MouseGlow from './MouseGlow';
import StatusPanel from './StatusPanel';
import ProjectTicker from './ProjectTicker';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const CAPABILITIES = [
  { lead: 'Building', highlight: 'AI Systems,' },
  { lead: '', highlight: 'Distributed Infra,' },
  { lead: '', highlight: 'Developer Tools.' },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Top system bar — mirrors JARVIS's top status strip */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between border-b border-line px-6 py-4 sm:px-12 lg:px-20">
        <span className="font-mono text-[9px] tracking-[0.35em] text-ink-muted uppercase">
          SYS:RUMANI-OS · BUILD 2025
        </span>
        <div className="flex items-center gap-4">
          <span className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] tracking-[0.3em] text-status-ok/80 uppercase">
            <span className="h-1 w-1 rounded-full bg-status-ok animate-pulse-glow" />
            ALL_SYSTEMS_NOMINAL
          </span>
          <span className="font-mono text-[9px] tracking-[0.3em] text-ink-muted/50 uppercase">
            UTC {new Date().toUTCString().slice(17, 22)}
          </span>
        </div>
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-100" />

      {/* Subtle radial vignette from top-center (cyan glow source) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(45,212,232,0.05)_0%,transparent_70%)]" />

      {/* Two-column grid */}
      <div className="relative grid min-h-screen grid-cols-1 pt-14 lg:grid-cols-2">

        {/* LEFT — 3D AI Core scene */}
        <div className="relative flex min-h-[52vh] items-center justify-center lg:min-h-screen">
          <MouseGlow />

          {/* Background HUD rings */}
          <HUDCore
            size="lg"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.55] opacity-50"
          />

          {/* 3D Robot scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
            className="relative z-10 h-[58vw] max-h-[500px] w-[58vw] max-w-[500px] sm:h-[400px] sm:w-[400px]"
          >
            <HeroScene className="h-full w-full" />
          </motion.div>

          {/* Vertical divider line (desktop only) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-cyan-core/10 to-transparent lg:block" />

          {/* Corner labels */}
          <span className="pointer-events-none absolute bottom-8 left-6 font-mono text-[8px] tracking-[0.3em] text-ink-muted/40 uppercase">
            AI_CORE · ACTIVE
          </span>
          <span className="pointer-events-none absolute bottom-8 right-8 hidden font-mono text-[8px] tracking-[0.3em] text-ink-muted/40 uppercase lg:block">
            MODULE_01
          </span>

          {/* Edge vignette — blends scene into page */}
          
        </div>

        {/* RIGHT — Identity & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col justify-center gap-10 px-6 py-16 sm:px-12 lg:px-14 lg:py-24"
        >
          {/* Eyebrow */}
          <motion.p variants={itemVariants} className="font-mono text-[9px] tracking-[0.45em] text-cyan-core/60 uppercase">
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
              className="font-mono text-[10px] tracking-[0.4em] text-ink-muted uppercase"
            >
              Software Engineer
            </motion.p>
          </div>

          {/* Capabilities list — JARVIS-style numbered */}
          <motion.div
            variants={itemVariants}
            className="space-y-2 border-l border-cyan-core/20 pl-5"
          >
            {CAPABILITIES.map((line, i) => (
              <p key={line.highlight} className="flex items-baseline gap-2 font-display text-lg text-ink-primary sm:text-xl">
                <span className="font-mono text-[9px] tracking-widest text-cyan-core/40 shrink-0">
                  0{i + 1}
                </span>
                {line.lead && <span className="text-ink-secondary mr-1">{line.lead}</span>}
                <span className="text-cyan-core text-glow-sm">{line.highlight}</span>
              </p>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5">
            <Button href="#projects" variant="primary" icon={FiArrowRight}>
              Explore Projects
            </Button>
            <Button href="/resume.pdf" variant="outline" icon={FiDownload}>
              Resume
            </Button>
            <Button href="https://github.com/" variant="outline" icon={FiGithub}>
              GitHub
            </Button>
            <Button href="#contact" variant="ghost" icon={FiMail}>
              Contact
            </Button>
          </motion.div>

          {/* Status + project list */}
          <div className="flex flex-col gap-4 pt-1">
            <StatusPanel variants={itemVariants} className="w-fit" />
            <ProjectTicker variants={itemVariants} />
          </div>

          {/* Bottom meta row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 border-t border-line pt-6"
          >
            <div className="flex items-center gap-3">
              {['React', 'Go', 'Rust', 'Python'].map((t) => (
                <span key={t} className="font-mono text-[8px] tracking-[0.25em] text-ink-muted/60 uppercase">{t}</span>
              ))}
            </div>
            <div className="ml-auto h-px flex-1 bg-line" />
            <span className="font-mono text-[8px] tracking-[0.25em] text-ink-muted/50 uppercase shrink-0">Est. 2022</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom section separator */}
      <div className="section-separator" />
    </section>
  );
}
