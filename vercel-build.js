#!/usr/bin/env node

console.log('🚀 Running Vercel-specific build...');

// This script runs only the frontend build part of your application
// It gets called from the vercel.json buildCommand

import { execSync } from 'child_process';

try {
  // Only run the frontend build with Vercel-specific config
  execSync('vite build --config vite.vercel.config.ts', { stdio: 'inherit' });
  console.log('✅ Frontend build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}