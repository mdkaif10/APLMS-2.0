const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to log with timestamp
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

try {
  // Run the Next.js build
  log('Running Next.js build...');
  execSync('next build', { stdio: 'inherit' });

  // Create the missing directory and file if they don't exist
  const guestDir = path.join(process.cwd(), '.next', 'server', 'app', '(guest)');
  const manifestFile = path.join(guestDir, 'page_client-reference-manifest.js');

  // Create the directory if it doesn't exist
  if (!fs.existsSync(guestDir)) {
    log('Creating missing directory: ' + guestDir);
    fs.mkdirSync(guestDir, { recursive: true });
  }

  // Create an empty manifest file if it doesn't exist
  if (!fs.existsSync(manifestFile)) {
    log('Creating empty manifest file: ' + manifestFile);
    fs.writeFileSync(manifestFile, '// Empty manifest file to prevent build errors');
  }

  // Check if the file was created successfully
  if (fs.existsSync(manifestFile)) {
    log('Manifest file created successfully');
  } else {
    log('WARNING: Failed to create manifest file');
  }

  // Check for other potential issues
  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    log('ERROR: .next directory not found after build');
  } else {
    log('.next directory exists');
  }

  log('Build completed successfully!');
} catch (error) {
  log('ERROR during build process:');
  log(error.message);
  if (error.stack) {
    log('Stack trace:');
    log(error.stack);
  }
  process.exit(1);
} 