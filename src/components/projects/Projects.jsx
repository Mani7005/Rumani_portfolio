import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '@/data/projectsData';
import ProjectCard from './ProjectCard';
import ProjectDossier from './ProjectDossier';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Projects ("Project Database")
 * ------------------------------
 * `activeId` now drives a full-screen ProjectDossier overlay (rendered
 * once, here, via AnimatePresence) instead of an inline per-card expand —
 * ProjectCard just calls onOpenDossier(project.id) and knows nothing
 * about the dossier itself.
 */
export default function Projects() {
  const [activeId, setActiveId] = useState(null);
  const activeProject = projectsData.find((p) => p.id === activeId) ?? null;

  return (
    <section id="projects" className="relative section-wrap">
      <div className="section-inner">
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">// MODULE_03 · PROJECT_DATABASE</p>
            <h2 className="font-display text-3xl tracking-wide text-ink-primary sm:text-4xl">
              Engineering Projects
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              Press{' '}
              <span className="font-mono text-[10px] text-cyan-core tracking-wider">ACCESS FILE</span>
              {' '}on any entry for the full technical detail.
            </p>
          </div>
          <span className="hidden font-mono text-[8px] tracking-[0.3em] text-ink-muted/40 uppercase sm:block">
            03 / 06
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-4"
        >
          {projectsData.map((project, index) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard project={project} index={index} onOpenDossier={setActiveId} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeProject && <ProjectDossier project={activeProject} onClose={() => setActiveId(null)} />}
      </AnimatePresence>
    </section>
  );
}
