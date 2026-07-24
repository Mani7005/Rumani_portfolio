import { motion } from 'framer-motion';
import { skillsData } from '@/data/skillsData';
import SkillModule from './SkillModule';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const moduleVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* Counters standardized to /06 across all sections. */

/**
 * Skills ("Tech Arsenal")
 * -----------------------
 * Structurally a sibling of Terminal.jsx / Projects.jsx — same
 * section-wrap / section-inner / eyebrow header pattern, same
 * whileInView stagger-reveal approach. Grid (not the Project Database's
 * stacked list) since these are compact status modules, not deep records.
 *
 */
export default function Skills() {
  return (
    <section id="skills" className="relative section-wrap">
      <div className="section-inner">
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">// MODULE_04 · SKILLS_AND_TOOLS</p>
            <h2 className="font-display text-3xl tracking-wide text-ink-primary sm:text-4xl">
              SKILLS & TOOLS
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              Technical stack and core competencies. Every technology below represents hands-on expertise and active 
              <span className="font-mono text-[10px] text-cyan-core tracking-wider"> PROFICIENCY</span>.
            </p>
          </div>
          <span className="hidden font-mono text-[8px] tracking-[0.3em] text-ink-muted/40 uppercase sm:block">
            04 / 06
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillsData.map((module, index) => (
            <motion.div key={module.id} variants={moduleVariants} className="h-full">
              <SkillModule module={module} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
