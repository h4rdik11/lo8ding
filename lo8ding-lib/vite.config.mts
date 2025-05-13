import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  root: __dirname,
  plugins: [
    tailwindcss(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.d.ts'],
      outDir: 'dist/types',
      entryRoot: 'src',
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@h4rdik11/lo8ding-lib',
      fileName: (fmt) => `lo8ding-lib.${fmt}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {},
    cssCodeSplit: true,
  },
});
