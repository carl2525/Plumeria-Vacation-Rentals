import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function photoStoragePlugin(): Plugin {
  return {
    name: 'photo-storage-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-property-photo', (req, res, next) => {
        if (req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const bodyStr = Buffer.concat(chunks).toString('utf-8');
              const { filename, base64Data, altFilename } = JSON.parse(bodyStr);
              const targetDir = path.resolve(process.cwd(), 'public/images/properties/wb-3205-t2');
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
              const buffer = Buffer.from(cleanBase64, 'base64');
              if (filename) {
                fs.writeFileSync(path.join(targetDir, filename), buffer);
              }
              if (altFilename) {
                fs.writeFileSync(path.join(targetDir, altFilename), buffer);
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, filename, altFilename }));
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : 'Failed to save photo';
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: message }));
            }
          });
          return;
        }
        next();
      });

      server.middlewares.use('/images/parking', (req, res, next) => {
        if (req.method === 'GET' || req.method === 'HEAD') {
          const rawPath = req.url ? req.url.split('?')[0] : '';
          const decodedPath = decodeURIComponent(rawPath.replace(/^\//, ''));
          const targetDir = path.resolve(process.cwd(), 'public/images/parking');
          const filePath = path.join(targetDir, decodedPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes: Record<string, string> = {
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.webp': 'image/webp',
              '.svg': 'image/svg+xml',
            };
            res.writeHead(200, {
              'Content-Type': mimeTypes[ext] || 'application/octet-stream',
              'Cache-Control': 'public, max-age=3600',
            });
            if (req.method === 'HEAD') {
              res.end();
              return;
            }
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });

      server.middlewares.use('/api/save-parking-photo', (req, res, next) => {
        if (req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const bodyStr = Buffer.concat(chunks).toString('utf-8');
              const { filename, base64Data, altFilename } = JSON.parse(bodyStr);
              const targetDir = path.resolve(process.cwd(), 'public/images/parking');
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
              const buffer = Buffer.from(cleanBase64, 'base64');
              if (filename) {
                fs.writeFileSync(path.join(targetDir, filename), buffer);
              }
              if (altFilename) {
                fs.writeFileSync(path.join(targetDir, altFilename), buffer);
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, filename, altFilename }));
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : 'Failed to save parking photo';
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: message }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), photoStoragePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
