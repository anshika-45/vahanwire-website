/* eslint-env node */
/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Bundle analyzer - only in production builds
    process.env.NODE_ENV === 'production' && visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  build: {
    // Enable aggressive minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
        passes: 2, // Multiple passes for better compression
        unsafe: true, // Enable unsafe optimizations
        unsafe_comps: true, // Unsafe property access compression
        unsafe_Function: true, // Unsafe Function constructor
        unsafe_math: true, // Unsafe math optimizations
        unsafe_symbols: true, // Unsafe symbol compression
        unsafe_methods: true, // Unsafe method compression
        unsafe_proto: true, // Unsafe prototype access
        unsafe_regexp: true, // Unsafe regexp optimizations
        unsafe_undefined: true, // Unsafe undefined optimizations
      },
      mangle: {
        safari10: true, // Fix Safari 10/11 bugs
      },
      format: {
        comments: false, // Remove comments
      },
    },
    // Optimize chunk splitting with preload hints
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', 'framer-motion'],
        },
        // Add preload hints for critical chunks
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (set to false for production)
    sourcemap: false,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  // Add compression for production builds
  esbuild: {
    drop: ['console', 'debugger'], // Remove console and debugger in production
    minify: true, // Enable esbuild minification
    minifyIdentifiers: true, // Minify identifiers
    minifySyntax: true, // Minify syntax
    minifyWhitespace: true, // Minify whitespace
  },

})
