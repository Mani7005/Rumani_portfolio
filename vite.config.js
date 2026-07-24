import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': '/src',
    },
  },

  server: {
    allowedHosts: true,
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React runtime — rarely changes, long cache lifetime
          'vendor-react': ['react', 'react-dom'],
          // Framer Motion — large, isolated from Three.js
          'vendor-framer': ['framer-motion'],
          // Three.js ecosystem — largest chunk, isolated so it can be
          // cached independently from app code changes
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Icon tree-shaken at import level; group residual runtime
          'vendor-icons': ['react-icons'],
        },
      },
    },
  },
});
