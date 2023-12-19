import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

const p = (src: string) => resolve(__dirname, src);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      devTarget: 'es2015',
    }),
  ],
  resolve: {
    alias: [
      { find: '@src', replacement: p('./src') },
      { find: '@view', replacement: p('./src/view') },
      { find: '@components', replacement: p('./src/components') },
    ],
  },
  build: {
    outDir: 'dist',
    target: 'es2015',
  },
});
