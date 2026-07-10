import { motion } from 'framer-motion';

export default function SkillBadge({ children, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.08,
        boxShadow: '0 0 12px rgba(45, 212, 232, 0.4), inset 0 0 8px rgba(45, 212, 232, 0.1)',
      }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.04,
      }}
      viewport={{ once: true }}
      className="inline-block rounded-md border border-cyan-core/40 bg-gradient-to-br from-cyan-core/10 to-cyan-core/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-cyan-core/90 uppercase shadow-glow-cyan-xs hover:shadow-glow-cyan-sm transition-shadow cursor-default"
    >
      {children}
    </motion.span>
  );
}
