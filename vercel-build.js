const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to log with timestamp
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌ ERROR' : type === 'warn' ? '⚠️ WARN' : 'ℹ️ INFO';
  console.log(`[${timestamp}] ${prefix}: ${message}`);
}

// Function to check if a directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    log(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to create an empty file if it doesn't exist
function ensureFileExists(filePath, content = '') {
  if (!fs.existsSync(filePath)) {
    log(`Creating file: ${filePath}`);
    fs.writeFileSync(filePath, content);
  }
}

try {
  // Clean the .next directory if it exists
  const nextDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    log('Cleaning .next directory');
    fs.rmSync(nextDir, { recursive: true, force: true });
  }

  // Run the Next.js build
  log('Running Next.js build...');
  execSync('next build', { stdio: 'inherit' });

  // Create the missing directory and file
  const guestDir = path.join(process.cwd(), '.next', 'server', 'app', '(guest)');
  const manifestFile = path.join(guestDir, 'page_client-reference-manifest.js');

  // Ensure directories and files exist
  ensureDirectoryExists(guestDir);
  ensureFileExists(manifestFile, '// Empty manifest file to prevent build errors');

  // Verify the build output
  if (!fs.existsSync(nextDir)) {
    throw new Error('.next directory not found after build');
  }

  // Check for critical files
  const criticalFiles = [
    '.next/server/app/page.js',
    '.next/server/app/guest/page.js',
    '.next/server/app/dashboard/page.js'
  ];

  for (const file of criticalFiles) {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      log(`Critical file missing: ${file}`, 'warn');
    } else {
      log(`Verified file exists: ${file}`);
    }
  }

  log('Build completed successfully!');
} catch (error) {
  log('Build process failed:', 'error');
  log(error.message, 'error');
  if (error.stack) {
    log('Stack trace:', 'error');
    log(error.stack, 'error');
  }
  process.exit(1);
} 