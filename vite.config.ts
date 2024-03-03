import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [
    react(),
    visualizer()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'lodash-es': ['lodash-es'],
          'react': ['react', 'react-dom', 'react-router-dom'],
          '@ant-design/charts': ['@ant-design/charts']
        }
      }
    }
  }
});
