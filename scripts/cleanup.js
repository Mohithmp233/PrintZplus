#!/usr/bin/env node

/**
 * Cleanup script for PrintZplus monorepo
 * Removes unnecessary files and folders to keep the project clean
 */

const fs = require('fs');
const path = require('path');

// Directories to clean
const CLEANUP_DIRS = [
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.cache',
  '.parcel-cache',
  '.next',
  '.nuxt',
  'tmp',
  'temp',
  'logs'
];

// File patterns to remove
const CLEANUP_FILES = [
  '*.log',
  '*.tmp',
  '*.temp',
  '*.cache',
  '*.pid',
  '*.seed',
  '*.pid.lock',
  '*.tgz',
  '*.bak',
  '*.backup',
  '*.old',
  '.DS_Store',
  'Thumbs.db',
  'ehthumbs.db',
  'Desktop.ini'
];

// Directories to skip during cleanup
const SKIP_DIRS = [
  '.git',
  'frontend/src',
  'backend/src',
  'scripts'
];

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log(`Removing directory: ${dirPath}`);
    fs.rmSync(dirPath, { recursive: true, force: true });
    return true;
  }
  return false;
}

function removeFile(filePath) {
  if (fs.existsSync(filePath)) {
    console.log(`Removing file: ${filePath}`);
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
}

function shouldSkipDirectory(dirPath) {
  return SKIP_DIRS.some(skipDir => dirPath.includes(skipDir));
}

function cleanupDirectory(dirPath) {
  if (shouldSkipDirectory(dirPath)) {
    return;
  }

  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Check if this directory should be cleaned
        if (CLEANUP_DIRS.includes(item)) {
          removeDirectory(fullPath);
        } else {
          // Recursively clean subdirectories
          cleanupDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        // Check if this file should be cleaned
        const shouldRemove = CLEANUP_FILES.some(pattern => {
          if (pattern.includes('*')) {
            const regex = new RegExp(pattern.replace(/\*/g, '.*'));
            return regex.test(item);
          }
          return item === pattern;
        });
        
        if (shouldRemove) {
          removeFile(fullPath);
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not access ${dirPath}: ${error.message}`);
  }
}

function main() {
  console.log('🧹 Starting PrintZplus cleanup...\n');
  
  const rootDir = process.cwd();
  console.log(`Cleaning directory: ${rootDir}\n`);
  
  // Clean root directory
  cleanupDirectory(rootDir);
  
  // Clean frontend directory
  const frontendDir = path.join(rootDir, 'frontend');
  if (fs.existsSync(frontendDir)) {
    console.log('\n📁 Cleaning frontend directory...');
    cleanupDirectory(frontendDir);
  }
  
  // Clean backend directory
  const backendDir = path.join(rootDir, 'backend');
  if (fs.existsSync(backendDir)) {
    console.log('\n📁 Cleaning backend directory...');
    cleanupDirectory(backendDir);
  }
  
  console.log('\n✅ Cleanup completed!');
  console.log('\n💡 Tip: Run "npm run install:all" to reinstall dependencies if needed.');
}

if (require.main === module) {
  main();
}

module.exports = { cleanupDirectory, removeDirectory, removeFile };
