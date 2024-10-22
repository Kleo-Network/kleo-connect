import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      process: 'process/browser',
      path: 'path-browserify',
      os: 'os-browserify'
    }
  },
  plugins: [
    react(),
    svgr(),
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      exclude: [
        'fs' // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true,
        global: true,
        process: true
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true
    })
  ],
  envPrefix: 'VITE_',
  build: {
    rollupOptions: {
      external: ['@emotion/styled', 'chart.js']
    }
  }
  // build: {
  //   assetsInlineLimit: 1000000,
  //   assetsInclude: ['**/*.svg'],
  //   commonjsOptions: {
  //     include: []
  //   }
  //   // rollupOptions: {
  //   //   plugins: [rollupNodePolyFill()]
  //   // }
  // }
  // optimizeDeps: {
  //   disabled: false,
  //   esbuildOptions: {
  //     // Enable esbuild polyfill plugins
  //     plugins: [
  //       NodeGlobalsPolyfillPlugin({
  //         process: true,
  //         buffer: true
  //       }),
  //       NodeModulesPolyfillPlugin()
  //     ]
  //   }
  // }
})
