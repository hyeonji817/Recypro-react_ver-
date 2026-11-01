import React, { useState } from "react";
import "./PaymentModal.css";

const METHODS = {
  TOSS: ["토스페이", "토스페이 앱 인증을 모의로 진행합니다."],
  PAYCO: ["PAYCO 간편결제", "PAYCO 앱 인증을 모의로 진행합니다."],
  CARD: ["신용카드", "카드사 인증 및 승인을 모의로 진행합니다."],
  TRANSFER: ["실시간 계좌이체", "은행 선택 및 계좌 인증·이체를 모의로 진행합니다."],
  ESCROW_VIRTUAL_ACCOUNT: ["에스크로 가상계좌", "에스크로 가상계좌 발급과 입금 확인을 모의로 진행합니다. 실제 계좌는 발급되지 않습니다."],
  BANK: ["무통장입금", "무통장입금 확인을 모의로 진행합니다. 실제 입금 계좌는 제공되지 않습니다."],
  MOBILE_PHONE: ["휴대폰결제", "통신사 본인 인증 및 휴대폰 결제 승인을 모의로 진행합니다."],
};

export default function PaymentModal({
  open, amount = 0, orderName = "", buyer = {}, payMethod = "CARD",
  onClose, onSuccess, onFail,
}) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const method = METHODS[payMethod];
  if (!open) return null;

  const handlePay = async () => {
    if (loading || !confirmed || !method) return;
    setLoading(true);
    setError("");
    try {
      await onSuccess?.({ payMethod, mock: true });
      onClose?.();
    } catch (e) {
      setError(e?.response?.data?.message || "모의 결제 승인에 실패했습니다. 다시 시도해 주세요.");
      onFail?.(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pmask" role="dialog" aria-modal="true" aria-labelledby="payment-title">
      <div className="pmodal">
        <div className="pheader">
          <h3 id="payment-title">{method?.[0] || "지원하지 않는 결제수단"} · 모의 결제</h3>
          <button type="button" className="pclose" onClick={onClose} disabled={loading} aria-label="닫기">×</button>
        </div>
        <div className="pbody">
          <div className="pline"><div className="ptitle">주문명</div><div className="pvalue">{orderName || "-"}</div></div>
          <div className="pline"><div className="ptitle">결제금액</div><div className="pvalue"><strong>{Number(amount).toLocaleString()}</strong> 원</div></div>
          <div className="pline"><div className="ptitle">결제수단</div><div className="pvalue">{method?.[0] || "-"}</div></div>
          <div className="pline"><div className="ptitle">구매자</div><div className="pvalue">{buyer.name || "-"}</div></div>
          <p className="pmock-notice">{method?.[1]} 실제 결제나 입금은 발생하지 않습니다. 카드번호·계좌번호·인증번호를 입력하지 마세요.</p>
          <label className="pmock-confirm">
            <input type="checkbox" checked={confirmed} disabled={loading} onChange={(e) => setConfirmed(e.target.checked)} />
            모의 결제임을 확인했습니다.
          </label>
          {error && <p role="alert" className="pmock-error">{error}</p>}
        </div>
        <div className="pfooter">
          <button type="button" className="pbtn secondary" onClick={onClose} disabled={loading}>취소</button>
          <button type="button" className="pbtn primary" onClick={handlePay} disabled={loading || !confirmed || !method}>
            {loading ? "처리 중..." : ["BANK", "ESCROW_VIRTUAL_ACCOUNT"].includes(payMethod) ? "모의 입금 확인" : "모의 결제 승인"}
          </button>
        </div>
      </div>
    </div>
  );
}
