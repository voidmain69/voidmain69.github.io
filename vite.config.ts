import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// GitHub Pages user site (voidmain69.github.io) is served from the domain
// root, so base must stay '/'. If this ever moves to a project page
// (username.github.io/repo-name), base must become '/repo-name/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
