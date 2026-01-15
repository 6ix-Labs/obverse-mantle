import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      '@': '/src',
      buffer: 'buffer',
    },
  },
  server: {
    port: 3000,
    watch: {
      // Reduce file watchers by ignoring these directories
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/build/**',
        '**/.vscode/**',
        '**/.idea/**',
        '**/coverage/**',
        '**/*.md',
      ],
    },
    proxy: {
      '/api': {
        target: 'https://obverse.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'build'
  },
  css: {
    postcss: './postcss.config.js'
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },

});
