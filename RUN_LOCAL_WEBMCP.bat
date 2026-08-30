@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (
  echo Node.js is required.
  exit /b 1
)
node scripts\serve.mjs
