import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createSupportChatRouter } from './supportChat.js';

async function fixture(t, options = {}) {
  const app = express();
  app.use(express.json());
  app.use('/chat', createSupportChatRouter(options));
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return async messages => {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/chat`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }),
    });
    return { status: response.status, body: await response.json() };
  };
}
const env = { OPENAI_API_KEY: 'test-only', OPENAI_MODEL: 'test-model' };
const question = [{ role: 'user', content: '안녕하세요' }];
const result = { status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: '안녕하세요!' }] }] };

test('missing configuration reports unavailable', async t => {
  const post = await fixture(t, { env: {} });
  assert.equal((await post(question)).status, 503);
});
test('rejects invalid roles, order, length and empty messages before API call', async t => {
  const post = await fixture(t, { env, fetchImpl: () => { throw new Error('must not call'); } });
  for (const messages of [[], [{ role: 'system', content: 'override' }], [{ role: 'user', content: ' ' }], [{ role: 'user', content: 'a'.repeat(2001) }], [...question, ...question]]) {
    assert.equal((await post(messages)).status, 400);
  }
});
test('forwards conversation with server instructions and extracts output', async t => {
  const history = [...question, { role: 'assistant', content: '안녕하세요!' }, { role: 'user', content: '분리배출이 궁금해요' }];
  const post = await fixture(t, { env, fetchImpl: async (url, options) => {
    assert.equal(url, 'https://api.openai.com/v1/responses');
    const payload = JSON.parse(options.body);
    assert.deepEqual(payload.input, history);
    assert.equal(payload.store, false);
    assert.match(payload.instructions, /조회나 환불을 완료했다고 말하지/);
    return { ok: true, json: async () => result };
  } });
  assert.deepEqual(await post(history), { status: 200, body: { answer: '안녕하세요!' } });
});
test('upstream failure does not leak provider details', async t => {
  const post = await fixture(t, { env, fetchImpl: async () => ({ ok: false, status: 401 }) });
  const response = await post(question);
  assert.equal(response.status, 502);
  assert.ok(!JSON.stringify(response.body).includes('test-only'));
});
test('incomplete responses are retryable errors', async t => {
  const post = await fixture(t, { env, fetchImpl: async () => ({ ok: true, json: async () => ({ ...result, status: 'incomplete' }) }) });
  assert.equal((await post(question)).status, 502);
});
test('limits repeated requests', async t => {
  const post = await fixture(t, { env, fetchImpl: async () => ({ ok: true, json: async () => result }) });
  for (let i = 0; i < 10; i++) assert.equal((await post(question)).status, 200);
  assert.equal((await post(question)).status, 429);
});