import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiDownload, FiMapPin, FiShield } from 'react-icons/fi';
import ContactCard from './ContactCard';
import StatusIndicator from './StatusIndicator';

/**
 * CONTACT_METHODS
 * ----------------
 * Local to this file rather than a separate data.js — the requested
 * folder structure for this section didn't include one, and six fixed
 * channels (email/github/linkedin/resume/location/availability) don't
 * need to be edited outside the component the way project/skill/timeline
 * entries do. Communication.jsx still `.map()`s over it — nothing is
 * hardcoded per-card in JSX.
 */
const CONTACT_METHODS = [
  {
    id: 'email',
    icon: FiMail,
    label: 'Email',
    value: 'hello@rumanidadyala.dev',
    action: { type: 'copy' },
  },
  {
    id: 'github',
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/rumanidadyala',
    action: { type: 'link', href: 'https://github.com/' },
  },
  {
    id: 'linkedin',
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/rumanidadyala',
    action: { type: 'link', href: 'https://linkedin.com/' },
  },
  {
    id: 'resume',
    icon: FiDownload,
    label: 'Resume',
    value: 'Rumani_Dadyala_Resume.pdf',
    action: { type: 'download', href: '/resume.pdf', filename: 'Rumani_Dadyala_Resume.pdf' },
  },
  {
    id: 'location',
    icon: FiMapPin,
    label: 'Location',
    value: 'Remote / Open to Relocation',
    action: null,
  },
  {
    id: 'availability',
    icon: FiShield,
    label: 'Availability',
    action: { type: 'status' },
    statusValue: 'available',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Communication() {
  return (
    <section id="contact" className="relative section-wrap">
      <div className="section-inner">
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">// MODULE_06 · COMMUNICATION_TERMINAL</p>
            <h2 className="font-display text-3xl tracking-wide text-ink-primary sm:text-4xl">Establish Connection</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              Secure communication channel. Reach out directly or pull the resume file below.
            </p>
          </div>
          <span className="hidden font-mono text-[8px] tracking-[0.3em] text-ink-muted/40 uppercase sm:block">
            06 / 06
          </span>
        </div>

        {/* secure channel readout */}
        <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-glass-border pb-6">
          <span className="relative flex h-8 w-8 items-center justify-center">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="absolute h-full w-full animate-spin-slow text-cyan-core/25"
            >
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2.5 4" />
            </svg>
            <FiShield className="relative h-4 w-4 text-cyan-core" />
          </span>
          <p className="font-mono text-[10px] tracking-[0.25em] text-ink-muted uppercase">
            End-to-end secure channel
          </p>
          <StatusIndicator status="online" className="sm:ml-auto" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CONTACT_METHODS.map((method) => (
            <motion.div key={method.id} variants={cardVariants} className="h-full">
              <ContactCard
                icon={method.icon}
                label={method.label}
                value={method.value}
                action={method.action}
                statusValue={method.statusValue}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
