/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
const proxyIP = 'http://192.168.6.104';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/ultrasound',

  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '/apiv3': proxyIP,
      '/oauth': proxyIP,
      '/bm': proxyIP,
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/ultrasound',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/ultrasound',
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '@cornerstonejs/tools': '@cornerstonejs/tools/dist/umd/index.js',
    },
  },
});
