import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// This config is specifically for Vercel deployment - it only builds the frontend part
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@components': path.resolve(__dirname, './client/src/components'),
      '@assets': path.resolve(__dirname, './attached_assets'),
      '@shared': path.resolve(__dirname, './shared'),
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  publicDir: 'public',
  root: path.resolve(__dirname, './client')
});