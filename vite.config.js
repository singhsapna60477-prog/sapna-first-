import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Use relative asset paths so the app works when served from subpaths or static hosts
  base: './',
  // Point to the CommonJS PostCSS config so the nesting plugin is loaded
  // correctly during Vercel's build environment.
  css: {
    postcss: './postcss.config.cjs',
  },
});