# PowerShell cleanup script for PrintZplus monorepo
# Removes unnecessary files and folders to keep the project clean

param(
    [switch]$Force,
    [switch]$DryRun
)

# Directories to clean
$CLEANUP_DIRS = @(
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
)

# File patterns to remove
$CLEANUP_FILES = @(
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
)

# Directories to skip during cleanup
$SKIP_DIRS = @(
    '.git',
    'frontend\src',
    'backend\src',
    'scripts'
)

function Remove-Directory {
    param([string]$Path)
    
    if (Test-Path $Path) {
        if ($DryRun) {
            Write-Host "Would remove directory: $Path" -ForegroundColor Yellow
        } else {
            Write-Host "Removing directory: $Path" -ForegroundColor Red
            Remove-Item -Path $Path -Recurse -Force
        }
        return $true
    }
    return $false
}

function Remove-File {
    param([string]$Path)
    
    if (Test-Path $Path) {
        if ($DryRun) {
            Write-Host "Would remove file: $Path" -ForegroundColor Yellow
        } else {
            Write-Host "Removing file: $Path" -ForegroundColor Red
            Remove-Item -Path $Path -Force
        }
        return $true
    }
    return $false
}

function Test-ShouldSkipDirectory {
    param([string]$Path)
    
    foreach ($skipDir in $SKIP_DIRS) {
        if ($Path -like "*$skipDir*") {
            return $true
        }
    }
    return $false
}

function Invoke-CleanupDirectory {
    param([string]$Path)
    
    if (Test-ShouldSkipDirectory $Path) {
        return
    }
    
    try {
        $items = Get-ChildItem -Path $Path -Force -ErrorAction SilentlyContinue
        
        foreach ($item in $items) {
            if ($item.PSIsContainer) {
                # Check if this directory should be cleaned
                if ($CLEANUP_DIRS -contains $item.Name) {
                    Remove-Directory $item.FullName
                } else {
                    # Recursively clean subdirectories
                    Invoke-CleanupDirectory $item.FullName
                }
            } else {
                # Check if this file should be cleaned
                $shouldRemove = $false
                foreach ($pattern in $CLEANUP_FILES) {
                    if ($item.Name -like $pattern) {
                        $shouldRemove = $true
                        break
                    }
                }
                
                if ($shouldRemove) {
                    Remove-File $item.FullName
                }
            }
        }
    } catch {
        Write-Warning "Could not access $Path : $($_.Exception.Message)"
    }
}

# Main execution
Write-Host "🧹 Starting PrintZplus cleanup..." -ForegroundColor Green
Write-Host ""

if ($DryRun) {
    Write-Host "🔍 DRY RUN MODE - No files will be actually removed" -ForegroundColor Yellow
    Write-Host ""
}

$rootDir = Get-Location
Write-Host "Cleaning directory: $rootDir" -ForegroundColor Cyan
Write-Host ""

# Clean root directory
Invoke-CleanupDirectory $rootDir

# Clean frontend directory
$frontendDir = Join-Path $rootDir "frontend"
if (Test-Path $frontendDir) {
    Write-Host "`n📁 Cleaning frontend directory..." -ForegroundColor Cyan
    Invoke-CleanupDirectory $frontendDir
}

# Clean backend directory
$backendDir = Join-Path $rootDir "backend"
if (Test-Path $backendDir) {
    Write-Host "`n📁 Cleaning backend directory..." -ForegroundColor Cyan
    Invoke-CleanupDirectory $backendDir
}

Write-Host "`n✅ Cleanup completed!" -ForegroundColor Green
Write-Host "`n💡 Tip: Run 'npm run install:all' to reinstall dependencies if needed." -ForegroundColor Blue
