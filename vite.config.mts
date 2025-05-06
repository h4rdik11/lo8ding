import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'lo8dingLib',
      fileName: (format) => `lo8ding-lib.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // don't bundle React in your library
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: true, // separate CSS so consumers only import used styles
  },
});
