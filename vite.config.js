// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsDir: 'img',
    assetsInclude: ['icons-type/**/*.svg'], // Mantenha este padrão para incluir SVGs em icons-type
  },
});
