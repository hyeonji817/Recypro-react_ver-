import { useEffect, useState } from 'react';

export default function useMemberGrade() {
  const [member, setMember] = useState({ grade: null, name: '', error: '' });
  useEffect(() => {
    const controller = new AbortController();
    let timer;
    const refresh = () => fetch(`${import.meta.env.VITE_API_URL || ''}/api/mypage`, { credentials: 'include', signal: controller.signal })
      .then(async response => { if (!response.ok) throw new Error('회원등급 조회 실패'); return response.json(); })
      .then(user => {
        setMember({ ...user, error: '' });
        clearTimeout(timer);
        const next = new Date(user.membership?.next_update_at).getTime();
        if (Number.isFinite(next)) timer = setTimeout(refresh, Math.max(1000, Math.min(86400000, next - Date.now() + 1000)));
      })
      .catch(error => { if (error.name !== 'AbortError') setMember({ grade: null, name: '', error: '조회 불가' }); });
    refresh();
    window.addEventListener('focus', refresh);
    return () => { controller.abort(); clearTimeout(timer); window.removeEventListener('focus', refresh); };
  }, []);
  return member;
}
