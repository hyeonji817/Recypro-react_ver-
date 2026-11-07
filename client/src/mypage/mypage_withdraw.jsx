import { useId, useRef, useState } from 'react';
import Header from '../main/Header_loginOK';
import Footer from '../main/Footer';
import './mypage_withdraw.css';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const requestWithdrawal = async (values) => {
  const response = await fetch(`${API_URL}/api/account/withdraw`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || '회원탈퇴 요청에 실패했습니다.');
};

const Mp_Withdraw = ({ onWithdraw, onCancel }) => {
  const id = useId();
  const submitting = useRef(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting.current) return;
    setMessage('');
    const form = event.currentTarget;
    const values = new FormData(form);
    const password = String(values.get('password') || '');
    const reason = String(values.get('reason') || '').trim();

    if (!window.confirm('회원탈퇴 후 이 계정으로 다시 로그인할 수 없습니다. 기존 회원정보는 보존됩니다. 탈퇴하시겠습니까?')) return;

    submitting.current = true;
    setPending(true);
    try {
      await (onWithdraw || requestWithdrawal)({ password, reason });
      form.reset();
      window.alert('회원탈퇴가 완료되었습니다. 이 계정으로 다시 로그인할 수 없습니다.');
      window.location.replace('/login');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '회원탈퇴를 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      submitting.current = false;
      setPending(false);
    }
  };

  const handleCancel = () => {
    if (pending) return;
    if (onCancel) onCancel();
    else window.location.assign('/mypage');
  };

  return (
    <div className="Mp_withdraw_wrapper">
      <div className="Mp_withdraw_Header">
        <Header />
      </div>
      <div className="Mp_withdraw_Content">
    <section className="mypage-withdraw" aria-labelledby={`${id}-title`}>
      <h3 className="mypage-withdraw__title" id={`${id}-title`}>회원 탈퇴</h3>
      <form onSubmit={handleSubmit} aria-busy={pending}>
        <div className="mypage-withdraw__panel">
          <div className="mypage-withdraw__fields">
            <div className="mypage-withdraw__notice" id={`${id}-notice`}>
              <p>탈퇴하실 경우 구매내역 확인은 물론 로그인 후 가능한 모든 기능을 사용하실 수 없습니다.</p>
              <p>회원탈퇴 후에도 기존 회원정보와 이용내역은 보존되며, 이 계정으로 다시 로그인하거나 회원 혜택을 이용할 수 없습니다.</p>
            </div>
            <label className="mypage-withdraw__sr-only" htmlFor={`${id}-password`}>비밀번호 (필수)</label>
            <input id={`${id}-password`} name="password" type="password" placeholder="비밀번호"
              autoComplete="current-password" required disabled={pending} aria-describedby={`${id}-notice`} />
            <label className="mypage-withdraw__sr-only" htmlFor={`${id}-reason`}>탈퇴사유 (선택)</label>
            <textarea id={`${id}-reason`} name="reason" placeholder="탈퇴사유" maxLength={2000} disabled={pending} />
          </div>
        </div>
        {message && <p className="mypage-withdraw__message" role="status">{message}</p>}
        <div className="mypage-withdraw__actions">
          <button className="mypage-withdraw__confirm" type="submit" disabled={pending}>{pending ? '처리 중…' : '확인'}</button>
          <button className="mypage-withdraw__cancel" type="button" onClick={handleCancel} disabled={pending}>취소</button>
        </div>
      </form>
    </section>
      </div>
      <div className="Mp_withdraw_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Mp_Withdraw;
