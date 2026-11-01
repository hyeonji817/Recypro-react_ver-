import { createHash } from 'node:crypto';
export const normalizeCode = code => typeof code === 'string' ? code.trim().toUpperCase() : '';
export const hashCode = code => createHash('sha256').update(normalizeCode(code)).digest('hex');
const fail = (status, message) => Object.assign(new Error(message), { status });

export async function redeemSpecialMileage(pool, userId, input) {
  if (!userId) throw fail(401, '로그인이 필요합니다.');
  const code = normalizeCode(input);
  if (!/^[A-Z0-9-]{8,64}$/.test(code)) throw fail(400, '쿠폰번호는 8~64자의 영문, 숫자, 하이픈으로 입력해 주세요.');
  const conn = await pool.promise().getConnection();
  try {
    await conn.beginTransaction();
    // 결제 서비스와 같은 회원 잠금 순서로 중복 지급·동시 결제를 직렬화한다.
    const [[user]] = await conn.query('SELECT id FROM user WHERE id = ? FOR UPDATE', [userId]);
    if (!user) throw fail(401, '회원 정보를 찾을 수 없습니다.');
    const [[reward]] = await conn.query(`SELECT *, starts_at <= NOW() AND expires_at > NOW() AS in_period
      FROM special_mileage_codes WHERE code_hash = ? FOR UPDATE`, [hashCode(code)]);
    if (!reward) throw fail(404, '쿠폰번호를 확인해 주세요.');
    const [[previous]] = await conn.query('SELECT id FROM special_mileage_redemptions WHERE code_id = ? AND user_id = ?', [reward.id, userId]);
    if (previous) throw fail(409, '이미 등록한 쿠폰입니다. 등록 내역을 확인해 주세요.');
    if (!reward.active || !reward.in_period || reward.redeemed_count >= reward.max_redemptions ||
        (reward.target_user_id !== null && String(reward.target_user_id) !== String(userId))) {
      throw fail(409, '등록 기간이 아니거나 사용 대상이 아닌 쿠폰입니다.');
    }
    const amount = Number(reward.amount);
    if (!Number.isSafeInteger(amount) || amount <= 0 || amount > 2147483647) throw fail(409, '쿠폰 지급 금액을 확인할 수 없습니다.');
    await conn.query('INSERT INTO special_mileage_redemptions (code_id, user_id, amount) VALUES (?, ?, ?)', [reward.id, userId, amount]);
    // 실제 DB의 reason은 VARCHAR(100). 스페셜 지급을 별도 사유로 구분한다.
    // 지급액은 기존 적립금 잔액에 합산되어 주문서에서 사용할 수 있다.
    await conn.query('INSERT INTO mileage_ledger (user_id, delta, reason, memo) VALUES (?, ?, ?, ?)',
      [userId, amount, 'SPECIAL_COUPON', `스페셜 적립금 · ${reward.title}`]);
    await conn.query('UPDATE special_mileage_codes SET redeemed_count = redeemed_count + 1 WHERE id = ?', [reward.id]);
    await conn.commit();
    return { amount, message: `${amount.toLocaleString('ko-KR')}원이 적립되었습니다.` };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally { conn.release(); }
}
