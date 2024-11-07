import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api/v1': 'http://localhost:3000/api/v1'
    },
  },
  build: {
    // add any rollup options here, e.g., add a plugin, minify the bundle, etc.
    rollupOptions: {
      plugins: [],
    }
  }
});
