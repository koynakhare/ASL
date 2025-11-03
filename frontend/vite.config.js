// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // make sure React plugin is used
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@redux': path.resolve(__dirname, 'src/redux/index.jsx'),
    },
  },
  build: {
    outDir: 'dist', // required for Vercel or Netlify
  },
  server: {
    host: true,
    port: 5173,
    open: true,
  },
  // 👇 This is key for React Router (fallback to index.html)
  optimizeDeps: {},
  preview: {
    port: 4173,
  },
});
