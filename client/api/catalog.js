import { Buffer } from 'node:buffer';
import process from 'node:process';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const resource = req.query.resource;
  let path;
  if (resource === 'new') path = '/api/newProducts';
  else if (resource === 'best') path = '/api/best_products';
  else if (resource === 'image') {
    const filename = req.query.filename;
    if (typeof filename !== 'string' || !filename || filename.split('/').some(p => !p || p === '.' || p === '..') || filename.includes('\\') || Array.from(filename).some(char => char.charCodeAt(0) <= 31)) {
      return res.status(400).json({ error: 'Invalid filename' });
    }
    path = '/uploads/' + filename.split('/').map(encodeURIComponent).join('/');
  } else return res.status(400).json({ error: 'Invalid resource' });

  let base;
  try {
    base = new URL(process.env.BACKEND_URL);
    if (base.protocol !== 'https:' || base.username || base.password || /^(localhost|127\.|\[::1\])/.test(base.hostname) || base.pathname !== '/' || base.search || base.hash) throw new Error();
  } catch {
    return res.status(503).json({ error: 'Vercel BACKEND_URL must be a public HTTPS backend origin.' });
  }
  try {
    const upstream = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000), redirect: 'error' });
    if (!upstream.ok) return res.status(502).json({ error: 'Backend request failed', upstreamStatus: upstream.status });
    if (resource === 'image') {
      const type = upstream.headers.get('content-type') || '';
      if (!type.startsWith('image/')) return res.status(502).json({ error: 'Backend did not return an image' });
      res.setHeader('Content-Type', type);
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.status(200).send(Buffer.from(await upstream.arrayBuffer()));
    }
    const data = await upstream.json();
    if (!Array.isArray(data)) return res.status(502).json({ error: 'Backend did not return a product array' });
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(data);
  } catch {
    return res.status(502).json({ error: 'Cannot reach the product backend' });
  }
}