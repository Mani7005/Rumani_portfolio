/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#03060A',
        panel: '#070D15',
        'panel-light': '#0C1520',
        'panel-mid': '#0F1B28',
        cyan: {
          core: '#2DD4E8',
          dim: '#1A8A9A',
          faint: 'rgba(45,212,232,0.08)',
        },
        blue: {
          deep: '#1E5FCC',
        },
        amber: {
          signal: '#F0A830',
        },
        status: {
          ok: '#34D399',
          error: '#F87171',
          idle: '#4B6378',
          warn: '#FBBF24',
        },
        ink: {
          primary: '#F5F9FC',
          secondary: '#D3DCE2',
          muted: '#6B7680',
          faint: '#242C33',
        },
        glass: 'rgba(45,212,232,0.06)',
        'glass-border': 'rgba(45,212,232,0.08)',
        'glass-hover': 'rgba(45,212,232,0.11)',
        line: 'rgba(45,212,232,0.07)',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem', letterSpacing: '0.12em' }],
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(45,212,232,0.12), 0 0 48px rgba(45,212,232,0.04)',
        'glow-cyan-sm': '0 0 12px rgba(45,212,232,0.11)',
        'glow-cyan-xs': '0 0 6px rgba(45,212,232,0.09)',
        'glow-amber': '0 0 20px rgba(240,168,48,0.3)',
        'inset-glass': 'inset 0 1px 0 rgba(255,255,255,0.03)',
        'panel-border': '0 0 0 1px rgba(45,212,232,0.06)',
        'card': '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(45,212,232,0.04)',
      },
      borderColor: {
        DEFAULT: 'rgba(45,212,232,0.06)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(45,212,232,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,232,0.025) 1px, transparent 1px)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'border-flow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.8s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
        'spin-slower': 'spin-slow 28s linear infinite',
        'spin-reverse': 'spin-reverse 20s linear infinite',
        scan: 'scan 4s linear infinite',
        blink: 'blink 1s step-start infinite',
        'fade-up': 'fade-up 0.5s ease-out forwards',
        ticker: 'ticker 30s linear infinite',
        'border-flow': 'border-flow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
