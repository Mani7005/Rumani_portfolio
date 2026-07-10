import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootScreen from '@/components/boot/BootScreen';
import NavigationRail from '@/components/navigation/NavigationRail';
import Hero from '@/components/hero/Hero';
import Terminal from '@/components/terminal/Terminal';
import Projects from '@/components/projects/Projects';
import Skills from '@/components/skills/Skills';
import Timeline from '@/components/timeline/Timeline';
import Communication from '@/components/communication/Communication';

export default function App() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  useEffect(() => {
    if (booted) {
      window.history.scrollRestoration = 'manual';
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [booted]);

  return (
    <>
      <AnimatePresence>
        {!booted && (
          <motion.div
            key="boot"
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="fixed inset-0 z-50"
          >
            <BootScreen onComplete={handleBootComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <NavigationRail booted={booted} />

      {booted && (
        <>
          <Hero />
          <Terminal />
          <Projects />
          <Skills />
          <Timeline />
          <Communication />
        </>
      )}
    </>
  );
}