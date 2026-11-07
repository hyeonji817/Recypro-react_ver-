import { timingSafeEqual } from 'node:crypto';

// 기존 평문 비밀번호와 bcrypt 비밀번호를 모두 지원합니다.
export async function verifyPassword(input, stored, compare) {
  if (typeof input !== 'string' || typeof stored !== 'string') return false;
  if (/^\$2[aby]\$/.test(stored)) return compare(input, stored);
  const left = Buffer.from(input);
  const right = Buffer.from(stored);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createAccountHandlers({ getDb, compare, secureCookie, allowedOrigins }) {
  const query = async (sql, params) => (await getDb().promise().query(sql, params))[0];
  const cookie = { path: '/', httpOnly: true, secure: secureCookie, sameSite: secureCookie ? 'none' : 'lax' };
  const expire = (req, res) => {
    // 모든 기기의 세션은 guard의 DB 검사로 차단되며 현재 세션도 삭제합니다.
    if (req.session) {
      delete req.session.userId;
      delete req.session.user_id;
      req.session.destroy(() => {});
    }
    res.clearCookie('connect.sid', cookie);
  };
  const blocked = (req, res) => {
    expire(req, res);
    return res.status(401).json({ code: 'ACCOUNT_WITHDRAWN', message: '탈퇴한 계정입니다. 다시 로그인할 수 없습니다.' });
  };
  const guard = async (req, res, next) => {
    const userId = req.session?.userId ?? req.session?.user_id;
    if (!userId) return next();
    try {
      const rows = await query('SELECT id, withdrawn_at FROM user WHERE id = ?', [userId]);
      if (!rows.length || rows[0].withdrawn_at != null) return blocked(req, res);
      // 기존 라우터가 사용하는 두 세션 키를 동일한 서버 검증 ID로 맞춥니다.
      req.session.userId = rows[0].id;
      req.session.user_id = rows[0].id;
      return next();
    } catch {
      // DB 오류 시 회원 API를 통과시키지 않습니다.
      return res.status(503).json({ message: '계정 상태를 확인할 수 없습니다. 잠시 후 다시 시도해 주세요.' });
    }
  };
  const login = async (req, res) => {
    const { id, password } = req.body || {};
    if (typeof id !== 'string' || typeof password !== 'string' || !id || !password) {
      return res.status(400).json({ message: '아이디와 비밀번호를 입력하세요.' });
    }
    try {
      const rows = await query('SELECT id, password, withdrawn_at FROM user WHERE id = ?', [id]);
      const user = rows[0];
      if (!user || !(await verifyPassword(password, user.password, compare))) {
        return res.status(401).json({ message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
      }
      if (user.withdrawn_at != null) return blocked(req, res);
      req.session.regenerate(error => {
        if (error) return res.status(500).json({ message: '로그인을 처리하지 못했습니다.' });
        req.session.userId = user.id;
        req.session.user_id = user.id;
        req.session.save(saveError => {
          if (saveError) {
            expire(req, res);
            return res.status(500).json({ message: '로그인을 처리하지 못했습니다.' });
          }
          return res.json({ message: '로그인 성공', userId: user.id });
        });
      });
    } catch {
      return res.status(500).json({ message: '로그인을 처리하지 못했습니다.' });
    }
  };
  const withdraw = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    const userId = req.session?.userId ?? req.session?.user_id;
    if (!userId) return res.status(401).json({ message: '로그인이 필요합니다.' });
    // 교차 사이트 쿠키 환경에서도 외부 사이트가 탈퇴 요청을 제출하지 못하도록 합니다.
    if (!allowedOrigins.includes(req.get('Origin')) || !req.is('application/json')) {
      return res.status(403).json({ message: '허용되지 않은 요청입니다.' });
    }
    const { password, reason = '' } = req.body || {};
    if (typeof password !== 'string' || !password || typeof reason !== 'string' || reason.length > 2000) {
      return res.status(400).json({ message: '비밀번호와 탈퇴사유(최대 2,000자)를 확인해 주세요.' });
    }
    try {
      const rows = await query('SELECT id, password, withdrawn_at FROM user WHERE id = ?', [userId]);
      const user = rows[0];
      if (!user || user.withdrawn_at != null) return blocked(req, res);
      if (!(await verifyPassword(password, user.password, compare))) {
        return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
      }
      // 이름/이메일/전화번호/비밀번호/주문/쿠폰 등 기존 필드는 수정하지 않습니다.
      // 조건부 UPDATE로 중복 요청과 비밀번호 동시 변경을 확인합니다.
      const result = await query(
        'UPDATE user SET withdrawn_at = CURRENT_TIMESTAMP, withdrawal_reason = ? WHERE id = ? AND withdrawn_at IS NULL AND BINARY password = BINARY ?',
        [reason.trim() || null, userId, user.password],
      );
      if (result.affectedRows !== 1) {
        return res.status(409).json({ message: '계정 상태가 변경되었습니다. 새로고침 후 다시 확인해 주세요.' });
      }
      expire(req, res);
      return res.json({ message: '회원탈퇴가 완료되었습니다.', withdrawn: true });
    } catch {
      return res.status(500).json({ message: '회원탈퇴를 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.' });
    }
  };
  return { guard, login, withdraw };
}
