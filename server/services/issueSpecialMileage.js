// 서버 폴더에서 실행. 관리자용 CLI이며 공개 발급 API는 제공하지 않는다.
import 'dotenv/config';
import mysql from 'mysql2/promise';
import { randomBytes } from 'node:crypto';
import { hashCode } from './specialMileage.js';

const [amountText, title, startsAt, expiresAt, targetUserId, limitText = '1'] = process.argv.slice(2);
const amount = Number(amountText), limit = Number(limitText);
const datePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
if (!Number.isSafeInteger(amount) || amount <= 0 || amount > 2147483647 || !title || title.length > 100 ||
    !datePattern.test(startsAt || '') || !datePattern.test(expiresAt || '') || expiresAt <= startsAt ||
    !Number.isSafeInteger(limit) || limit <= 0 || limit > 4294967295) {
  throw new Error('사용법: node services/issueSpecialMileage.js 금액 "쿠폰명" "시작일 YYYY-MM-DD HH:mm:ss" "종료일 YYYY-MM-DD HH:mm:ss" [회원ID 또는 *] [전체 등록 가능 횟수]');
}
const connection = await mysql.createConnection({host:process.env.DB_HOST,port:Number(process.env.DB_PORT || 3306),user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME});
try {
  const code = 'RCY-' + randomBytes(12).toString('hex').toUpperCase();
  await connection.execute(`INSERT INTO special_mileage_codes
    (code_hash, title, amount, target_user_id, starts_at, expires_at, max_redemptions)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,[hashCode(code),title,amount,targetUserId && targetUserId !== '*' ? targetUserId : null,startsAt,expiresAt,limit]);
  console.log('발급 완료. 아래 번호를 대상 회원에게 전달하세요. DB에는 해시만 저장됩니다.');
  console.log(code);
} finally { await connection.end(); }
