export const GRADE_TIERS = Object.freeze([
  { name: 'NEW', minimum: 0 }, { name: 'BRONZE', minimum: 1 },
  { name: 'SILVER', minimum: 200000 }, { name: 'GOLD', minimum: 500000 },
  { name: 'PLATINUM', minimum: 1000000 }, { name: 'VIP', minimum: 1500000 },
  { name: 'QUEEN', minimum: 2500000 },
].map(Object.freeze));

export function describeGrade(amount) {
  const spend = Number(amount);
  if (!Number.isSafeInteger(spend) || spend < 0) throw new Error('회원등급 구매실적을 확인할 수 없습니다.');
  const index = GRADE_TIERS.findLastIndex(tier => spend >= tier.minimum);
  const tier = GRADE_TIERS[index];
  const next = GRADE_TIERS[index + 1];
  return { grade: tier.name, qualifying_spend: spend, next_grade: next?.name || null,
    next_grade_minimum: next?.minimum || null, remaining_amount: next ? next.minimum - spend : 0 };
}

const KST = 9 * 60 * 60 * 1000;
// 매일 한국시간 03:00에 산정 구간을 이동한다. 6개월은 180일이 아닌 달력 기준.
export function gradeWindow(now = new Date()) {
  if (!Number.isFinite(now.getTime())) throw new Error('등급 기준일 오류');
  const local = new Date(now.getTime() + KST);
  const end = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(), 3));
  if (local < end) end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(end);
  const day = start.getUTCDate();
  start.setUTCDate(1);
  start.setUTCMonth(start.getUTCMonth() - 6);
  const lastDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0)).getUTCDate();
  start.setUTCDate(Math.min(day, lastDay));
  return { start: new Date(start.getTime() - KST), end: new Date(end.getTime() - KST), next: new Date(end.getTime() - KST + 86400000) };
}
const mysqlDate = date => date.toISOString().slice(0,19).replace('T',' ');

export async function getMembershipGrade(pool, userId, now = new Date()) {
  if (typeof userId !== 'string' || !userId) throw new Error('회원 식별자가 필요합니다.');
  const window = gradeWindow(now);
  // paid_at은 DB 세션 시간 기준 DATETIME. UTC 기준일을 DB 세션 시간으로 변환한다.
  // 취소/환불/미결제 주문은 제외. 배송비와 현금이 아닌 적립금 사용분은 실적에 포함하지 않는다.
  const [rows] = await pool.promise().query(`
    SELECT COALESCE(SUM(GREATEST(0, LEAST(
      COALESCE(total_pay, 0) - COALESCE(shipping_fee, 0),
      COALESCE(subtotal, 0) - COALESCE(coupon_discount, 0) - COALESCE(used_mileage, 0)
    ))), 0) AS qualifying_spend
    FROM orders
    WHERE user_id = ? AND status = 'PAID' AND paid_at IS NOT NULL
      AND paid_at >= TIMESTAMPADD(SECOND, TIMESTAMPDIFF(SECOND, UTC_TIMESTAMP(), NOW()), ?)
      AND paid_at < TIMESTAMPADD(SECOND, TIMESTAMPDIFF(SECOND, UTC_TIMESTAMP(), NOW()), ?)
  `, [userId, mysqlDate(window.start), mysqlDate(window.end)]);
  return { ...describeGrade(rows[0]?.qualifying_spend ?? 0),
    period_start: window.start.toISOString(), period_end: window.end.toISOString(),
    next_update_at: window.next.toISOString(), timezone: 'Asia/Seoul',
    basis: '최근 6개월 결제완료 주문의 상품 실결제금액 · 배송비·쿠폰 할인·사용 적립금 제외',
    benefits_active: false };
}

// 각 API의 고정 MEMBER/세션 등급 대신 동일한 서버 계산 결과를 사용한다.
export function membershipMiddleware(getPool) {
  return async (req, res, next) => {
    const userId = req.session?.user?.id || req.session?.userId || req.session?.user_id;
    if (!userId) return next();
    try {
      req.membership = await getMembershipGrade(getPool(), userId);
      res.setHeader('Cache-Control', 'private, no-store');
      return next();
    } catch (error) {
      console.error('[membership-grade]', { code: error.code, message: error.message });
      return res.status(503).json({ code: 'MEMBERSHIP_UNAVAILABLE', message: '회원등급을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.' });
    }
  };
}
