import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
  },
  build: {
    sourcemap: mode === 'development', // Enable sourcemaps only in development
    target: 'esnext', // Target modern browsers for smaller bundle sizes
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Create a vendor chunk for node_modules
          if (id.includes('node_modules')) {
            // Further split large libraries if needed
            if (id.includes('react-router-dom') || id.includes('react-router')) {
              return 'vendor_react-router';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor_radix-ui';
            }
            if (id.includes('framer-motion')) {
                return 'vendor_framer-motion';
            }
            return 'vendor'; // all other node_modules
          }
        }
      }
    }
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
