import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const VARIANTS = {
  primary:
    'bg-cyan-core text-void font-semibold border border-cyan-core hover:brightness-105 shadow-glow-cyan-xs',
  outline:
    'bg-transparent text-cyan-core/80 border border-cyan-core/25 hover:border-cyan-core/60 hover:text-cyan-core hover:shadow-glow-cyan-xs',
  ghost:
    'bg-transparent text-ink-secondary border border-transparent hover:text-cyan-core hover:border-cyan-core/15',
};

const WHILE_HOVER = { y: -2 };
const WHILE_TAP   = { y: 0, scale: 0.98 };
const TRANSITION  = { duration: 0.2, ease: [0.22, 1, 0.36, 1] };

/**
 * Button
 * ------
 * Accessibility notes:
 *  - Non-link buttons always carry type="button" to prevent accidental
 *    form submission when rendered inside a <form> element.
 *  - External links use rel="noopener noreferrer" (both required: noopener
 *    prevents the opened page from accessing window.opener; noreferrer
 *    additionally suppresses the Referer header).
 *  - External links include a visually-hidden "(opens in new tab)" suffix
 *    so screen reader users are warned before navigation.
 */
const Button = memo(function Button({
  children,
  href,
  variant = 'outline',
  icon: Icon,
  iconPosition = 'right',
  className,
  ...props
}) {
  const isExternal = href?.startsWith('http') || href?.startsWith('mailto:');
  const Component = href ? motion.a : motion.button;

  const linkProps = useMemo(() => {
    if (!href) return { type: 'button' };
    if (isExternal) return { href, target: '_blank', rel: 'noopener noreferrer' };
    return { href };
  }, [href, isExternal]);

  return (
    <Component
      className={cn(
        'sheen-host inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5',
        'font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200',
        VARIANTS[variant],
        className
      )}
      whileHover={WHILE_HOVER}
      whileTap={WHILE_TAP}
      transition={TRANSITION}
      {...linkProps}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="h-3 w-3" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="h-3 w-3" aria-hidden="true" />}
      {/* Screen-reader announcement for links that open in a new tab */}
      {isExternal && <span className="sr-only">(opens in new tab)</span>}
    </Component>
  );
});

export default Button;
