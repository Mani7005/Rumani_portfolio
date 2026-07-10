import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import StatusBadge from '@/components/ui/StatusBadge';

export default function StatusPanel({ className, variants }) {
  return (
    <motion.div variants={variants}>
      <GlassPanel label="SYS_STATUS" className={className}>
        <div className="flex items-center gap-3 px-4 py-2.5">
          <StatusBadge status="available" />
        </div>
      </GlassPanel>
    </motion.div>
  );
}
