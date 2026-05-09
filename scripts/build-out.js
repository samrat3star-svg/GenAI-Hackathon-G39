import fs from 'fs';
import path from 'path';

const distStaticClient = path.join(process.cwd(), 'dist-static', 'client');
const outDir = path.join(process.cwd(), 'out');

if (!fs.existsSync(distStaticClient)) {
  console.error('Error: dist-static/client does not exist. Did the build fail?');
  process.exit(1);
}

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}

fs.mkdirSync(outDir, { recursive: true });

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(distStaticClient, outDir);

// POST-PROCESS out/index.html
const outIndexHtml = path.join(outDir, 'index.html');
if (fs.existsSync(outIndexHtml)) {
  let content = fs.readFileSync(outIndexHtml, 'utf8');
  
  // 1. Fix relative paths (./assets -> /assets) to support sub-routes on Netlify
  content = content.replace(/href="\.\/assets/g, 'href="/assets');
  content = content.replace(/src="\.\/assets/g, 'src="/assets');

  // 2. Inject Error Catcher
  const errorCatcher = `
    <script>
      window.onerror = function(msg, url, line, col, error) {
        var root = document.getElementById('root');
        if (root) {
          root.innerHTML = '<div style="padding: 40px; color: #ff4d4d; background: #1a1a1a; min-height: 100vh; font-family: monospace; position: fixed; inset: 0; z-index: 9999;">' +
            '<h1 style="font-size: 24px;">CineVault: Runtime Error</h1>' +
            '<p><strong>' + msg + '</strong></p>' +
            '<p>' + url + ':' + line + '</p>' +
            '<pre style="background: #000; padding: 15px; overflow: auto;">' + (error ? error.stack : 'No stack trace') + '</pre>' +
            '</div>';
        }
        return false;
      };
    </script>
  `;
  content = content.replace('</head>', errorCatcher + '</head>');

  // 3. Ensure we have a visible marker that the JS loaded
  const marker = `<script>console.log("CineVault Assets Loaded Successfully");</script>`;
  content = content.replace('</body>', marker + '</body>');

  fs.writeFileSync(outIndexHtml, content);
}

console.log('Successfully created and patched out/ folder');
