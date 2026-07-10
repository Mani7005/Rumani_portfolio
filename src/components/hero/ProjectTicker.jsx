import { motion } from 'framer-motion';

const PROJECTS = [
  { name: 'TradeStreamX', href: '#projects' },
  { name: 'InterviewAI', href: '#projects' },
  { name: 'ShardMesh', href: '#projects' },
];

export default function ProjectTicker({ variants }) {
  return (
    <motion.div variants={variants} className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      <span className="font-mono text-[8px] tracking-[0.35em] text-ink-muted/60 uppercase shrink-0">
        ACTIVE_PROCESSES
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {PROJECTS.map((project, i) => (
          <span key={project.name} className="flex items-center gap-3">
            <a
              href={project.href}
              className="font-mono text-[9px] tracking-[0.2em] text-ink-secondary/70 uppercase transition-colors hover:text-cyan-core hover:text-glow-sm"
            >
              {project.name}
            </a>
            {i < PROJECTS.length - 1 && (
              <span className="h-px w-3 bg-ink-faint" />
            )}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
