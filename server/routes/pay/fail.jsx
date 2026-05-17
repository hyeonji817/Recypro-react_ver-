import React from "react"; 
import { useSearchParams, Link } from "react-router-dom"; 
export default function PayFail() {
  const [sp] = useSearchParams(); 
  return (
    <div style={{ padding: "24px" }}>
      <h2>결제가 실패했어요 😢</h2>
      <p>사유: {sp.get("message") || sp.get("code") || "알 수 없음"}</p>
      <Link to="/cart">장바구니로 돌아가기</Link>
    </div>
  );
}