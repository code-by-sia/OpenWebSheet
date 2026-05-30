import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/OpenWebSheet/',
  build: {
    emptyOutDir: false,
    outDir: 'docs',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/react/test/setup.ts',
  },
});
