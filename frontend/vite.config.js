import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: [
      // Add this for the files in the `src` directory
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
    exclude: [
      // Exclude any node_modules files
      'node_modules',
    ],
  },
});
