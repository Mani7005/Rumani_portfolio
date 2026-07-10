import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMenu, MdClose } from 'react-icons/md';
import { navigationData } from './navigationData';
import NavItem from './NavItem';

export default function NavigationRail({ booted }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationData.map(item => item.href.slice(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(navigationData.find(item => item.href.slice(1) === section)?.id || 'home');
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = useCallback((item) => {
    setActiveSection(item.id);
    setIsOpen(false);

    const element = document.getElementById(item.href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (!booted) return null;

  // Desktop Navigation Rail
  if (!isMobile) {
    return (
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed left-6 top-1/2 z-40 -translate-y-1/2 hidden md:block"
      >
        <div className="rounded-lg border border-cyan-core/20 bg-gradient-to-b from-panel/40 to-panel/20 backdrop-blur-md p-3 shadow-lg">
          <div className="flex flex-col gap-1">
            {navigationData.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeSection === item.id}
                onClick={() => handleNavClick(item)}
              />
            ))}
          </div>
        </div>
      </motion.nav>
    );
  }

  // Mobile Floating Menu
  return (
    <>
      {/* Floating Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 md:hidden p-3 rounded-lg border border-cyan-core/30 bg-gradient-to-br from-panel/60 to-panel/40 backdrop-blur-md hover:border-cyan-core/50 transition-all duration-300 shadow-lg hover:shadow-glow-cyan-sm"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MdClose className="h-6 w-6 text-cyan-core" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MdMenu className="h-6 w-6 text-cyan-core/70 group-hover:text-cyan-core" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-void/40 backdrop-blur-sm md:hidden"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-24 right-6 z-40 md:hidden rounded-lg border border-cyan-core/30 bg-gradient-to-b from-panel/80 to-panel/60 backdrop-blur-md shadow-lg p-4"
            >
              <div className="flex flex-col gap-2">
                {navigationData.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-300 text-left ${
                      activeSection === item.id
                        ? 'bg-cyan-core/20 text-cyan-core border border-cyan-core/40'
                        : 'hover:bg-cyan-core/10 text-ink-muted hover:text-cyan-core/70'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm font-mono tracking-[0.1em] uppercase">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
