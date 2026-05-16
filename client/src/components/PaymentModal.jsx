// src/components/PaymentModal.jsx
import React, { useState } from "react";
import "./PaymentModal.css";

export default function PaymentModal({
  open,
  amount = 0,
  orderName = "",
  buyer = {},
  onClose,
  onSuccess,
  onFail
}) {
  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    password2: "",
    name: buyer?.name || "",
    email: buyer?.email || "",
  });
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const fakeValidate = () => {
    // 아주 간단한 최소 검증만 (원한다면 마스킹/포맷 추가)
    if (!form.cardNumber || !form.expiry || !form.cvc) return "카드 정보를 입력해 주세요.";
    if (!form.name || !form.email) return "이름/이메일을 입력해 주세요.";
    return "";
  };

  const handlePay = async () => {
    const err = fakeValidate();
    if (err) return alert(err);
    setLoading(true);
    try {
      // 1~1.5초 로딩 연출
      await new Promise((r) => setTimeout(r, 900));
      onSuccess?.({
        mockPaymentKey: "mock_" + Math.random().toString(36).slice(2),
        paidAt: new Date().toISOString(),
        card: {
          bin: form.cardNumber.slice(0,6),
          last4: form.cardNumber.slice(-4),
        },
      });
    } catch (e) {
      onFail?.(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pmask" role="dialog" aria-modal="true">
      <div className="pmodal">
        <div className="pheader">
          <h3>결제하기</h3>
          <button className="pclose" onClick={onClose} aria-label="닫기">×</button>
        </div>

        <div className="pbody">
          <div className="pline">
            <div className="ptitle">주문명</div>
            <div className="pvalue">{orderName || "-"}</div>
          </div>
          <div className="pline">
            <div className="ptitle">결제금액</div>
            <div className="pvalue"><strong>{amount.toLocaleString()}</strong> 원</div>
          </div>

          <div className="psection">카드 정보</div>
          <div className="grid2">
            <label>
              카드번호
              <input name="cardNumber" maxLength={19} placeholder="1234 5678 9012 3456"
                     value={form.cardNumber} onChange={onChange}/>
            </label>
            <label>
              유효기간(YY/MM)
              <input name="expiry" maxLength={5} placeholder="29/12"
                     value={form.expiry} onChange={onChange}/>
            </label>
            <label>
              CVC
              <input name="cvc" maxLength={4} placeholder="***"
                     value={form.cvc} onChange={onChange}/>
            </label>
            <label>
              비밀번호 앞 2자리
              <input name="password2" maxLength={2} placeholder="**"
                     value={form.password2} onChange={onChange}/>
            </label>
          </div>

          <div className="psection">구매자</div>
          <div className="grid2">
            <label>
              이름
              <input name="name" value={form.name} onChange={onChange}/>
            </label>
            <label>
              이메일
              <input name="email" value={form.email} onChange={onChange}/>
            </label>
          </div>
        </div>

        <div className="pfooter">
          <button className="pbtn secondary" onClick={onClose} disabled={loading}>취소</button>
          <button className="pbtn primary" onClick={handlePay} disabled={loading}>
            {loading ? "결제 중..." : "결제하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
