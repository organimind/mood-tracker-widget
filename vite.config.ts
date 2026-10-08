import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

function copyIndexHtmlPlugin(): Plugin {
  return {
    name: 'copy-index-html',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        // Copy to 404.html for GitHub Pages fallback
        fs.copyFileSync(indexPath, path.join(distDir, '404.html'));
        
        // Copy to customize/index.html for direct static route
        const customizeDir = path.join(distDir, 'customize');
        if (!fs.existsSync(customizeDir)) {
          fs.mkdirSync(customizeDir, { recursive: true });
        }
        fs.copyFileSync(indexPath, path.join(customizeDir, 'index.html'));
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyIndexHtmlPlugin()],
  base: '/mood-tracker-widget/',
})

