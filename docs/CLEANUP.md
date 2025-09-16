# 🧹 PrintZplus Cleanup Guide

This document provides comprehensive information about cleaning up unnecessary files and folders in the PrintZplus monorepo.

## 🎯 Overview

The PrintZplus project includes automated cleanup tools to maintain a clean and efficient codebase by removing unnecessary files, build artifacts, and temporary data.

## 🛠️ Available Cleanup Scripts

### Node.js Cleanup Script
```bash
# Run full cleanup
npm run clean

# Dry run (see what would be removed without actually removing)
npm run clean:dry

# Clean specific directories
npm run clean:frontend
npm run clean:backend

# Deep cleanup (includes cache cleaning)
npm run clean:deep
```

### PowerShell Cleanup Script
```powershell
# Run full cleanup
.\scripts\cleanup.ps1

# Dry run
.\scripts\cleanup.ps1 -DryRun

# Force cleanup (skip confirmations)
.\scripts\cleanup.ps1 -Force
```

## 📁 What Gets Cleaned

### Directories Removed
- `node_modules/` - Dependencies (can be reinstalled)
- `dist/` - Build outputs
- `build/` - Build artifacts
- `coverage/` - Test coverage reports
- `.cache/` - Cache directories
- `.parcel-cache/` - Parcel bundler cache
- `.next/` - Next.js build cache
- `.nuxt/` - Nuxt.js build cache
- `tmp/` - Temporary directories
- `temp/` - Temporary directories
- `logs/` - Log files directory

### Files Removed
- `*.log` - Log files
- `*.tmp` - Temporary files
- `*.temp` - Temporary files
- `*.cache` - Cache files
- `*.pid` - Process ID files
- `*.seed` - Seed files
- `*.pid.lock` - Process lock files
- `*.tgz` - Compressed archives
- `*.bak` - Backup files
- `*.backup` - Backup files
- `*.old` - Old files
- `.DS_Store` - macOS system files
- `Thumbs.db` - Windows thumbnail cache
- `ehthumbs.db` - Windows thumbnail cache
- `Desktop.ini` - Windows folder configuration

## 🚫 Protected Directories

The cleanup scripts will **NOT** remove files from these protected directories:
- `.git/` - Git repository data
- `frontend/src/` - Frontend source code
- `backend/src/` - Backend source code
- `scripts/` - Cleanup scripts themselves

## 🔧 Manual Cleanup Commands

### Remove node_modules and reinstall
```bash
# Remove all node_modules
npm run clean:all

# Reinstall dependencies
npm run install:all
```

### Clear npm cache
```bash
npm run clean:cache
```

### Remove specific build artifacts
```bash
# Frontend only
cd frontend && rm -rf dist node_modules

# Backend only
cd backend && rm -rf dist node_modules
```

## 📊 Cleanup Benefits

### Disk Space Savings
- **node_modules**: Can save 100MB - 1GB+ depending on dependencies
- **Build artifacts**: Typically 10-100MB
- **Cache files**: 5-50MB
- **Log files**: 1-10MB

### Performance Improvements
- Faster file system operations
- Reduced backup/transfer times
- Cleaner development environment
- Faster IDE indexing

### Repository Health
- Smaller repository size
- Cleaner git history
- Reduced merge conflicts
- Better collaboration

## 🚀 Best Practices

### Regular Maintenance
1. **Weekly**: Run `npm run clean` to remove temporary files
2. **Before commits**: Ensure no unnecessary files are tracked
3. **After major changes**: Run `npm run clean:deep` for thorough cleanup
4. **Before deployment**: Clean build artifacts and reinstall dependencies

### CI/CD Integration
```yaml
# Example GitHub Actions step
- name: Clean workspace
  run: npm run clean

- name: Install dependencies
  run: npm run install:all

- name: Build project
  run: npm run build
```

### Pre-commit Hooks
Consider adding pre-commit hooks to automatically clean unnecessary files:
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run clean:dry"
    }
  }
}
```

## 🔍 Monitoring Cleanup

### Check what would be cleaned
```bash
# See what files would be removed
npm run clean:dry
```

### Verify cleanup results
```bash
# Check for remaining unnecessary files
find . -name "*.log" -o -name "*.tmp" -o -name "*.cache" | head -10
```

### Disk usage analysis
```bash
# Check directory sizes
du -sh frontend/ backend/ node_modules/ 2>/dev/null || echo "Some directories may not exist"
```

## 🛡️ Safety Features

### Dry Run Mode
Always test cleanup with dry run first:
```bash
npm run clean:dry
```

### Protected Paths
The scripts automatically protect important directories and files.

### Selective Cleaning
You can clean specific parts of the project:
```bash
npm run clean:frontend  # Only frontend
npm run clean:backend   # Only backend
```

## 🆘 Troubleshooting

### If cleanup removes too much
1. Check the protected directories list
2. Verify you're running from the correct directory
3. Use dry run mode to preview changes

### If dependencies are missing after cleanup
```bash
# Reinstall all dependencies
npm run install:all
```

### If build fails after cleanup
```bash
# Clean and reinstall everything
npm run clean:deep
npm run install:all
npm run build
```

## 📝 Customization

### Adding new cleanup patterns
Edit `scripts/cleanup.js` or `scripts/cleanup.ps1` to add new file patterns:

```javascript
// In cleanup.js
const CLEANUP_FILES = [
  // ... existing patterns
  '*.custom',  // Add your custom pattern
];
```

### Excluding additional directories
```javascript
// In cleanup.js
const SKIP_DIRS = [
  // ... existing directories
  'custom-folder',  // Add your custom directory
];
```

---

**💡 Pro Tip**: Run `npm run clean` regularly to keep your development environment clean and efficient!

**⚠️ Warning**: Always commit your changes before running cleanup scripts, as they will permanently remove files.
