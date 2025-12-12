// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

// Define the absolute paths for copying the large model
const modelSource = join(__dirname, 'public', 'car.glb');
const modelDest = join(__dirname, 'dist', 'car.glb');

export default defineConfig({
  plugins: [
    react(),
    {
      // Vite Plugin: This runs after the build finishes, ensuring the dist folder exists
      name: 'copy-glb-after-build',
      closeBundle() {
        if (existsSync(modelSource)) {
          // If the model exists in public/, copy it to the dist/ folder
          copyFileSync(modelSource, modelDest);
          console.log('\n[Vite Build Hook] Successfully copied car.glb to dist/');
        } else {
          console.warn('\n[Vite Build Hook] WARNING: car.glb not found in public/ directory.');
        }
      },
    },
  ],
  // Ensure we use the correct base path for the final deployment
  base: '/',
  build: {
    outDir: 'dist', 
    // Set the target browser to ensure compatibility
    target: 'es2020',
  }
});