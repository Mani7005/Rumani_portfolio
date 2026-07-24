import { motion } from 'framer-motion';
import { timelineData } from './timelineData';
import TimelineNode from './TimelineNode';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const nodeVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Timeline ("System Timeline")
 * ----------------------------
 * The rail line and the two traveling "data packets" are drawn ONCE here,
 * absolutely positioned down the center of the 2.5rem rail column that
 * every TimelineNode shares (see TimelineNode.jsx). Because the rail
 * column width is constant across every row, that center position never
 * shifts — so a single line, drawn once, lines up with every node's dot
 * with no per-row coordination needed.
 *
 * The line's "grows while scrolling" behavior is a whileInView scaleY
 * (transform-origin: top), triggered once when the section enters view,
 * rather than a continuous scroll-position readout — simpler and can't
 * drift out of sync with the content, at the cost of it being a single
 * reveal rather than a live scrubber tied to exact scroll position.
 */
export default function Timeline() {
  return (
    <section id="timeline" className="relative section-wrap">
      <div className="section-inner">
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">// MODULE_05 · SYSTEM_TIMELINE</p>
            <h2 className="font-display text-3xl tracking-wide text-ink-primary sm:text-4xl">Engineering Timeline</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              A running log of the system's engineering history — from first boot to current status.
            </p>
          </div>
          <span className="hidden font-mono text-[8px] tracking-[0.3em] text-ink-muted/40 uppercase sm:block">
            05 / 05
          </span>
        </div>

        <div className="relative">
          {/* faint static track, full height */}
          <div className="pointer-events-none absolute left-5 top-2 bottom-2 w-px bg-cyan-core/10" />

          {/* animated glowing fill, grows in once the section is in view */}
          <motion.div
            className="pointer-events-none absolute left-5 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-cyan-core via-cyan-core/50 to-transparent"
            style={{ boxShadow: '0 0 8px rgba(45,212,232,0.5)' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />

          {/* traveling data packets — two, offset in phase */}
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute left-5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-core"
              style={{ boxShadow: '0 0 6px rgba(45,212,232,0.9)' }}
              animate={{ top: ['2%', '98%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: i * 2.5 }}
            />
          ))}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-6"
          >
            {timelineData.map((event) => (
              <motion.div key={event.id} variants={nodeVariants}>
                <TimelineNode event={event} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
