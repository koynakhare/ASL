// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@redux': '/src/redux/index.jsx', // ✅ this is okay
    }
  }
  
  
});
