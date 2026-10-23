// Static server for previewing the versioned catalogue (site/), plus a
// /dev/ proxy to the vite dev server (started with --base /dev/) so the
// version picker's "dev (hot reload)" entry works on this same port.
// Usage: node tools/serve-site.mjs [port]   (default 5180)
// Env:   DEV_TARGET=http://localhost:5173  — upstream dev server.
import { createServer, request as httpRequest } from 'node:http';
import { connect as netConnect } from 'node:net';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const port = Number(process.argv[2] ?? 5180);
const devTarget = new URL(process.env.DEV_TARGET ?? 'http://localhost:5173');

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.map': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
};

function proxyDev(req, res, url) {
  const upstream = httpRequest(
    {
      hostname: devTarget.hostname,
      port: devTarget.port || 80,
      path: url.pathname + url.search,
      method: req.method,
      headers: { ...req.headers, host: devTarget.host },
    },
    (up) => {
      res.writeHead(up.statusCode ?? 502, up.headers);
      up.pipe(res);
    },
  );
  upstream.on('error', () => {
    if (!res.headersSent) res.writeHead(502, { 'content-type': 'text/plain' });
    res.end('dev server not reachable — start it with npm run dev:site');
  });
  req.pipe(upstream);
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');

  if (url.pathname === '/dev') {
    res.writeHead(302, { location: '/dev/' });
    return res.end();
  }
  if (url.pathname.startsWith('/dev/')) return proxyDev(req, res, url);

  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
  let file = join(root, rel);
  if (file !== root && !file.startsWith(root + sep)) {
    res.writeHead(403);
    return res.end();
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404);
    return res.end('not found');
  }
  res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});

// WebSocket upgrade (vite HMR) — forward the raw handshake to the dev server.
server.on('upgrade', (req, socket, head) => {
  const up = netConnect(Number(devTarget.port) || 80, devTarget.hostname, () => {
    up.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
    for (const [name, value] of Object.entries(req.headers)) {
      up.write(`${name}: ${value}\r\n`);
    }
    up.write('\r\n');
    if (head?.length) up.write(head);
    socket.pipe(up);
    up.pipe(socket);
  });
  up.on('error', () => socket.destroy());
  socket.on('error', () => up.destroy());
});

server.listen(port, () => {
  console.log(`versioned site at http://localhost:${port}/ (redirects to latest/)`);
  console.log(`dev (hot reload) proxied at http://localhost:${port}/dev/ -> ${devTarget.origin}`);
});
