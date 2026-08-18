import { defineConfig } from 'vite';
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
});
