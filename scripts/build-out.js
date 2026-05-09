import fs from 'fs';
import path from 'path';

const distClient = path.join(process.cwd(), 'dist', 'client');
const outDir = path.join(process.cwd(), 'out');

if (!fs.existsSync(distClient)) {
  console.error('Error: dist/client does not exist. Build might have failed.');
  process.exit(1);
}

// 1. Clean and recreate out dir
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// 2. Copy assets from dist/client
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}
copyDir(distClient, outDir);

// 3. Generate a fresh index.html that actually works
const assetsDir = path.join(distClient, 'assets');
const files = fs.readdirSync(assetsDir);
const mainJs = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
const mainCss = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CineVault | Premium Cinematic Watchlist</title>
  ${mainCss ? `<link rel="stylesheet" href="/assets/${mainCss}">` : ''}
  <script>
    window.onerror = function(msg, url, line, col, error) {
      document.body.innerHTML = '<div style="padding: 40px; color: #ff4d4d; background: #1a1a1a; min-height: 100vh; font-family: monospace;">' +
        '<h1>CineVault: Runtime Error</h1><p>' + msg + '</p>' +
        '<pre style="background:#000;padding:10px;">' + (error ? error.stack : 'No stack trace') + '</pre></div>';
    };
  </script>
</head>
<body class="bg-[#1a1a1a] text-white">
  <div id="root"></div>
  ${mainJs ? `<script type="module" src="/assets/${mainJs}"></script>` : ''}
  <script>console.log("CineVault SPA Started");</script>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
console.log('SUCCESS: Generated fresh SPA in out/ folder');
console.log('Main JS:', mainJs);
console.log('Main CSS:', mainCss);
