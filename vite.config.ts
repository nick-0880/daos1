import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    include: ['@privy-io/react-auth'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  plugins: [
    react(),
    tempo(),
    nodePolyfills({
      protocolImports: true,
      // Include all required Node.js polyfills for Privy
      include: ['buffer', 'process', 'util', 'stream', 'events']
    }),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add polyfill aliases that might be required by Privy
      stream: 'stream-browserify',
      buffer: 'buffer',
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
    hmr: {
      overlay: false, // Disable error overlay to prevent errors during development
    }
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  build: {
    // Reduce chunk size split to better handle dependencies
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'privy': ['@privy-io/react-auth'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
});
