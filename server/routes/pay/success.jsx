import React, { useEffect } from "react"; 
import { useSearchParams, useNavigate } from "react-router-dom"; 
import axios from "axios"; 

export default function PaySuccess() {
  const [sp] = useSearchParams(); 
  const nav = useNavigate(); 

  useEffect(() => {
    (async () => {
      try {
        const paymentKey = sp.get("paymentKey"); 
        const orderId = sp.get("orderId");    // = pg_order_uid
        const amount = Number(sp.get("amount"));

        const { data } = await axios.post(
          "http://localhost:5003/api/checkout/confirm",
          { paymentKey, orderId, amount },
          { withCredentials: true }
        );

        nav(`/orderOk?order_id=${data.order_id}`, { replace: true });
      } catch (e) {
        console.error(e);
        alert(e?.response?.data?.message || "결제 승인 실패");
        nav("/pay/fail", { replace: true });
      }
    })();
  }, []);

  return <div>결제 승인 처리 중...</div>
}