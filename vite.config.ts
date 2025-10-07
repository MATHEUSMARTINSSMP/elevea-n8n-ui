// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
  base: "/",                       // garante caminhos corretos em produção
  server: {
    host: "::",
    port: 5173,  // Porta padrão do Vite
    proxy: mode === "development" ? {
      // Proxy para Netlify Functions em desenvolvimento
      "/.netlify/functions": {
        target: "http://localhost:8888",
        changeOrigin: true,
        configure: (proxy, options) => {
          // Fallback para quando Netlify Dev não está rodando
          proxy.on('error', (err, req, res) => {
            console.warn('Netlify Functions não disponíveis em desenvolvimento:', err.message);
            res.writeHead(503, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
              success: false, 
              error: 'dev_functions_unavailable',
              message: 'Execute "npm run dev:netlify" em outro terminal para ativar as functions'
            }));
          });
        }
      }
    } : undefined
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['favicon.ico', 'logo-elevea.png'],
      manifest: {
        name: 'ELEVEA - Sites Inteligentes',
        short_name: 'ELEVEA',
        description: 'Plataforma para criação de sites inteligentes e automação de marketing',
        theme_color: '#8B4513',
        background_color: '#f0ece8',
        display: 'standalone',
        icons: [
          {
            src: 'logo-elevea.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: mode === "development",
    minify: mode === "production" ? "terser" : false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts']
        }
      }
    }
  },
  preview: {
    port: 4173,
    host: true
  }
}));
