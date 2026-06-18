const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svg = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#059669;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <circle cx="256" cy="256" r="240" fill="url(#grad)"/>
  <path d="M 256 80 L 256 256 L 373 320" stroke="white" stroke-width="20" stroke-linecap="round" fill="none"/>
  <circle cx="256" cy="256" r="20" fill="white"/>
</svg>`;

const publicDir = path.join(__dirname, '..', 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate 192x192 icon
sharp(Buffer.from(svg))
  .resize(192, 192)
  .png()
  .toFile(path.join(publicDir, 'icon-192.png'))
  .then(() => console.log('✅ icon-192.png created'))
  .catch((err) => console.error('❌ Error creating icon-192.png:', err));

// Generate 512x512 icon
sharp(Buffer.from(svg))
  .resize(512, 512)
  .png()
  .toFile(path.join(publicDir, 'icon-512.png'))
  .then(() => console.log('✅ icon-512.png created'))
  .catch((err) => console.error('❌ Error creating icon-512.png:', err));

// Made with Bob
