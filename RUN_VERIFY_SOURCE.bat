@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js is required.& exit /b 1)
where npm >nul 2>nul || (echo npm is required.& exit /b 1)

if not exist "node_modules\typescript\bin\tsc" (
  echo Local TypeScript 5.8.3 is not installed.
  echo Installing pinned verification dependency with npm ci...
  call npm ci --ignore-scripts --no-audit --no-fund
  if errorlevel 1 (
    echo FAILED: npm ci could not install the pinned verification dependency.
    exit /b 1
  )
)

call npm run verify
exit /b %ERRORLEVEL%
