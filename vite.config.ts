import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');
          if (normalizedId.includes('node_modules')) {
            if (normalizedId.includes('react') || normalizedId.includes('scheduler')) {
              return 'vendor-react';
            }
            if (normalizedId.includes('react-router')) {
              return 'vendor-router';
            }
            return 'vendor';
          }
          if (normalizedId.includes('/src/features/')) {
            const match = normalizedId.match(/\/src\/features\/([^/]+)\//);
            if (match) {
              return `feat-${match[1]}`;
            }
          }
        },
      },
    },
  },
});
