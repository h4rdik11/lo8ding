import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@h4dik11/lo8ding-lib': path.resolve(__dirname, '../lo8ding-lib/dist'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
