/**
 * Single source of truth for colors that need to be read in JS —
 * Three.js materials, GSAP tweens, and inline SVG can't see Tailwind classes.
 * Keep this in sync with tailwind.config.js whenever a color changes.
 */
export const theme = {
  colors: {
    void: '#03060A',
    panel: '#070D15',
    panelLight: '#0C1520',
    cyanCore: '#2DD4E8',
    cyanDim: '#1A8A9A',
    blueDeep: '#1E5FCC',
    amberSignal: '#F0A830',
    statusOk: '#34D399',
    statusError: '#F87171',
    statusIdle: '#4B6378',
    inkPrimary: '#F0F8FF',
    inkSecondary: '#A8C4D4',
    inkMuted: '#4B6378',
    inkFaint: '#1E2E3A',
  },
  font: {
    display: '"Chakra Petch", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
};
