import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — always needed, load first
          "vendor-react": ["react", "react-dom"],

          // Routing — pequeño, siempre activo
          "vendor-router": ["react-router-dom"],

          // Animations — pesada, solo cuando hay animaciones
          "vendor-motion": ["framer-motion"],

          // Icons — muchos SVGs, cacheable por separado
          "vendor-icons": ["lucide-react"],

          // UI utilities
          "vendor-ui": ["clsx", "tailwind-merge", "sonner"],
        },
      },
    },
    // Sube el límite de warning a 600kB para los chunks de vendor
    chunkSizeWarningLimit: 600,
  },
});
