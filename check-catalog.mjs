import assert from 'node:assert/strict';
import handler from './client/api/catalog.js';

const originalFetch = globalThis.fetch;
const originalBase = process.env.BACKEND_URL;
async function request(resource) {
  const res = { statusCode: 200, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(s) { this.statusCode = s; return this; }, json(body) { this.body = body; return this; }, send(body) { this.body = body; return this; } };
  await handler({ method: 'GET', query: { resource } }, res);
  return res;
}
try {
  delete process.env.BACKEND_URL;
  assert.equal((await request('new')).body.code, 'BACKEND_NOT_CONFIGURED');
  process.env.BACKEND_URL = 'https://backend.example.com';
  for (const [resource, path] of [['new', '/api/newProducts'], ['best', '/api/best_products']]) {
    globalThis.fetch = async url => { assert.equal(url.pathname, path); return Response.json([{ pname: 'test' }]); };
    const response = await request(resource);
    assert.equal(response.statusCode, 200);
    assert.equal(response.body[0].pname, 'test');
  }
  globalThis.fetch = async () => new Response('<html>missing route</html>', { headers: { 'Content-Type': 'text/html' } });
  assert.equal((await request('new')).body.code, 'BACKEND_INVALID_RESPONSE');
  globalThis.fetch = async () => new Response('', { status: 404 });
  assert.equal((await request('best')).body.upstreamStatus, 404);
  globalThis.fetch = async () => { throw new Error('offline'); };
  assert.equal((await request('new')).body.code, 'BACKEND_UNAVAILABLE');
  console.log('PASS: configuration, new/best routes, HTML response, upstream 404, unavailable backend');
} finally {
  globalThis.fetch = originalFetch;
  if (originalBase === undefined) delete process.env.BACKEND_URL;
  else process.env.BACKEND_URL = originalBase;
}