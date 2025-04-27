const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Run the Next.js build
console.log('Running Next.js build...');
execSync('next build', { stdio: 'inherit' });

// Create the missing directory and file if they don't exist
const guestDir = path.join(process.cwd(), '.next', 'server', 'app', '(guest)');
const manifestFile = path.join(guestDir, 'page_client-reference-manifest.js');

// Create the directory if it doesn't exist
if (!fs.existsSync(guestDir)) {
  console.log('Creating missing directory:', guestDir);
  fs.mkdirSync(guestDir, { recursive: true });
}

// Create an empty manifest file if it doesn't exist
if (!fs.existsSync(manifestFile)) {
  console.log('Creating empty manifest file:', manifestFile);
  fs.writeFileSync(manifestFile, '// Empty manifest file to prevent build errors');
}

console.log('Build completed successfully!'); 