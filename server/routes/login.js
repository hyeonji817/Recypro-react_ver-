import express from 'express';

// server.js에서 만든 단일 계정 핸들러를 공유합니다.
export default function createLoginRouter(account) {
  const router = express.Router();
  router.post('/', account.login);
  return router;
}
