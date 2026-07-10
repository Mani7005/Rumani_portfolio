import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

export default function MouseGlow() {
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const springX = useSpring(x, { damping: 22, stiffness: 100 });
  const springY = useSpring(y, { damping: 22, stiffness: 100 });

  const background = useMotionTemplate`radial-gradient(circle at ${springX}% ${springY}%, rgba(45,212,232,0.10), transparent 52%)`;

  const handlePointerMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - bounds.left) / bounds.width) * 100);
    y.set(((e.clientY - bounds.top) / bounds.height) * 100);
  };

  const handlePointerLeave = () => {
    x.set(50);
    y.set(50);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="absolute inset-0"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: background }}
      />
    </div>
  );
}
