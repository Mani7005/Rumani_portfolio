import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMenu, MdClose } from 'react-icons/md';
import { navigationData } from './navigationData';
import NavItem from './NavItem';

/**
 * NavigationRail
 * ---------------
 * Desktop: fixed horizontal top bar.
 * Mobile: floating hamburger button + popover menu.
 *
 * Performance notes:
 *  - `sectionIds` is derived from navigationData (stable module-scope
 *    constant) and memoized at module scope — the scroll handler was
 *    previously calling `navigationData.map(...)` on EVERY scroll event,
 *    allocating a new string array each time.
 *  - The mobile menu item inline onClick handlers are now produced via
 *    a stable `handleNavClick` that is passed once rather than a new
 *    arrow function per item per render.
 *  - `scrolled` and `activeSection` are still separate state items to
 *    keep re-renders granular; combining them into one object would cause
 *    more re-renders, not fewer.
 */

// Pre-compute section id list at module scope — navigationData is a
// module-scope constant so this derivation never needs to repeat.
const sectionIds = navigationData.map((item) => item.href.slice(1));

// Hoisted mobile menu item transition
const MOBILE_ITEM_TRANSITION = { duration: 0.4, ease: [0.22, 1, 0.36, 1] };
const MOBILE_MENU_TRANSITION = { duration: 0.3, ease: [0.22, 1, 0.36, 1] };

export default function NavigationRail({ booted }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [scrolled, setScrolled] = useState(false);

  // Track active section on scroll — sectionIds is stable (module scope),
  // so the handler only closes over setState functions (also stable).
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      for (const section of sectionIds) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(
              navigationData.find((item) => item.href.slice(1) === section)?.id || 'home'
            );
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize, { passive: true });
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

  // Pre-build stable per-item click handlers so the mobile menu doesn't
  // create new arrow functions per item per render.
  const itemClickHandlers = useMemo(
    () => navigationData.map((item) => () => handleNavClick(item)),
    [handleNavClick]
  );

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((o) => !o), []);

  if (!booted) return null;

  // Desktop: fixed horizontal top bar
  if (!isMobile) {
    return (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
        className="fixed inset-x-0 top-0 z-50 hidden md:block"
      >
        <div
          className={`border-b backdrop-blur-md transition-colors duration-300 ${
            scrolled ? 'border-cyan-core/25 bg-panel/80' : 'border-cyan-core/10 bg-panel/40'
          }`}
        >
          <div className="relative mx-auto flex h-16 max-w-7xl items-center px-6">
            {/* Left — system tag */}
            <div className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-core/80">
              <span className="h-1.5 w-1.5 rounded-full bg-status-ok animate-pulse-glow" />
              SYS::COMMAND_CENTER
            </div>

            {/* Center — absolutely centered so it stays centered
               regardless of the left/right content widths */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1">
              {navigationData.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={() => handleNavClick(item)}
                />
              ))}
            </div>

            {/* Right — system status */}
            <div className="ml-auto hidden shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-status-ok lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-status-ok animate-pulse-glow" />
              All Systems Nominal
            </div>
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
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="fixed bottom-6 right-6 z-40 md:hidden p-3 rounded-lg border border-cyan-core/30 bg-gradient-to-br from-panel/60 to-panel/40 backdrop-blur-md hover:border-cyan-core/50 transition-all duration-300 shadow-lg hover:shadow-glow-cyan-sm"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <MdClose className="h-6 w-6 text-cyan-core" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
              onClick={closeMenu}
              className="fixed inset-0 z-30 bg-void/40 backdrop-blur-sm md:hidden"
            />

            {/* Menu Content */}
            <motion.div
              id="mobile-nav-menu"
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={MOBILE_MENU_TRANSITION}
              className="fixed bottom-24 right-6 z-40 md:hidden rounded-lg border border-cyan-core/30 bg-gradient-to-b from-panel/80 to-panel/60 backdrop-blur-md shadow-lg p-4"
            >
              <div className="flex flex-col gap-2">
                {navigationData.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, ...MOBILE_ITEM_TRANSITION }}
                    onClick={itemClickHandlers[index]}
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
