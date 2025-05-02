import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react(), mode === 'development' && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: mode === 'development',
    minify: mode === 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-toast', '@radix-ui/react-tooltip'],
        },
        // You can uncomment this if you want better folder structure for assets:
        // assetFileNames: (assetInfo) => {
        //   const ext = assetInfo.name?.split('.').pop() || '';
        //   if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'ico'].includes(ext)) {
        //     return 'assets/images/[name]-[hash][extname]';
        //   } else if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(ext)) {
        //     return 'assets/fonts/[name]-[hash][extname]';
        //   } else if (ext === 'css') {
        //     return 'assets/css/[name]-[hash][extname]';
        //   }
        //   return 'assets/[name]-[hash][extname]';
        // },
      },
    },
  },
  base: '/', // ✅ Keep this if deploying at mahendran.info
}));
