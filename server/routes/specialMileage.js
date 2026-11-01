import express from 'express';
import { redeemSpecialMileage } from '../services/specialMileage.js';

export function createSpecialMileageRouter(getPool) {
  const router = express.Router();
  router.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    req.specialUserId = req.session?.user?.id || req.session?.userId;
    if (!req.specialUserId) return res.status(401).json({ message: '로그인이 필요합니다.' });
    next();
  });
  router.get('/', async (req, res) => {
    try {
      const [history] = await getPool().promise().query(`SELECT r.id, c.title, r.amount,
        DATE_FORMAT(r.created_at, '%Y/%m/%d %H:%i') AS created_at
        FROM special_mileage_redemptions r JOIN special_mileage_codes c ON c.id = r.code_id
        WHERE r.user_id = ? ORDER BY r.created_at DESC, r.id DESC`, [req.specialUserId]);
      res.json({ history: history.map(row => ({ ...row, amount: Number(row.amount) })) });
    } catch { res.status(500).json({ message: '등록 내역을 불러오지 못했습니다.' }); }
  });
  router.post('/redeem', async (req, res) => {
    if (!req.is('application/json')) return res.status(415).json({ message: 'JSON 요청이 필요합니다.' });
    const origin = req.get('origin');
    const allowed = [process.env.FRONTEND_URL, 'https://recypro-react-ver.vercel.app'];
    if (process.env.NODE_ENV !== 'production' && !process.env.RAILWAY_ENVIRONMENT_ID) {
      allowed.push('http://localhost:5274', 'http://127.0.0.1:5274', 'http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174');
    }
    if (!origin || !allowed.includes(origin)) return res.status(403).json({ message: '허용되지 않은 요청입니다.' });
    const now = Date.now();
    if (now - (req.session.specialLastAttempt || 0) < 2000) return res.status(429).json({ message: '잠시 후 다시 시도해 주세요.' });
    req.session.specialLastAttempt = now;
    try { res.json(await redeemSpecialMileage(getPool(), req.specialUserId, req.body?.code)); }
    catch (error) { res.status(error.status || 500).json({ message: error.status ? error.message : '등록 결과를 확인하지 못했습니다. 등록 내역을 먼저 확인해 주세요.' }); }
  });
  return router;
}
