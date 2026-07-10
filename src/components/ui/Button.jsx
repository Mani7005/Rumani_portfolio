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

export default function Button({
  children,
  href,
  variant = 'outline',
  icon: Icon,
  iconPosition = 'right',
  className,
  ...props
}) {
  const Component = href ? motion.a : motion.button;
  const linkProps = href
    ? {
        href,
        target: href.startsWith('http') ? '_blank' : undefined,
        rel: href.startsWith('http') ? 'noreferrer' : undefined,
      }
    : {};

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5',
        'font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-200',
        VARIANTS[variant],
        className
      )}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.12 }}
      {...linkProps}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="h-3 w-3" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="h-3 w-3" />}
    </Component>
  );
}
