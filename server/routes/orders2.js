// routes/orders2.js
import express from "express";
import axios from "axios";
import { db } from "../server.js";

const router = express.Router();
const q = (sql, params=[]) => new Promise((res, rej) => {
  db.query(sql, params, (err, rows) => err ? rej(err) : res(rows));
});

function genOrderNo(d=new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  const rand = Math.random().toString(36).slice(2,6).toUpperCase();
  return `${y}${m}${day}-${rand}`;
}

// 공통: 스냅샷에서 선택된 cart들만 삭제
async function clearSelectedCarts(userId, totals) {
  const cartIds = totals?.cartIds || [];
  if (!cartIds.length) return;
  await q(`DELETE FROM cart WHERE user_id=? AND cart_id IN (${cartIds.map(()=>"?").join(",")})`, [userId, ...cartIds]);
}

// ---------- 모의 결제 확정 ----------
router.post("/checkout2/confirm-mock", async (req, res) => {
  try {
    const userId = req.session?.user?.id || "guswl0817";
    const { orderId, by="uid" } = req.body || {}; // orderId는 pg_order_uid 또는 order_id
    if (!orderId) return res.status(400).json({ message: "orderId required" });

    const col = by === "db" ? "order_id" : "pg_order_uid";
    const rows = await q(`SELECT * FROM orders WHERE ${col}=? AND user_id=? LIMIT 1`, [orderId, userId]);
    const ord = rows[0];
    if (!ord) return res.status(404).json({ message: "주문을 찾을 수 없습니다." });
    if (ord.status === "PAID") {
      return res.json({ order_id: ord.order_id, order_no: ord.order_no, message: "이미 결제 완료" });
    }

    const items = JSON.parse(ord.items_json || "[]");
    const totals = JSON.parse(ord.totals_json || "{}");
    const buyer  = JSON.parse(ord.buyer_json  || "{}");
    const recv   = JSON.parse(ord.receiver_json || "{}");

    const order_no = genOrderNo();
    await q(`
      UPDATE orders
         SET status='PAID',
             paid_at=NOW(),
             order_no=?,
             pg_provider='MOCK'
       WHERE order_id=? AND user_id=?`, [order_no, ord.order_id, userId]);

    await clearSelectedCarts(userId, totals);

    return res.json({
      ok: true,
      order_id: ord.order_id,
      order_no,
      buyer,
      receiver: recv,
      totals,
      items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: String(err?.message || err) });
  }
});

// ---------- 실결제 확정 (토스) ----------
router.post("/checkout2/confirm", async (req, res) => {
  try {
    const userId = req.session?.user?.id || "guswl0817";
    const { paymentKey, orderId, amount } = req.body || {}; // orderId = pg_order_uid
    if (!paymentKey || !orderId || !Number.isFinite(Number(amount))) {
      return res.status(400).json({ message: "paymentKey, orderId, amount 필요" });
    }

    const rows = await q(`SELECT * FROM orders WHERE pg_order_uid=? AND user_id=? LIMIT 1`, [orderId, userId]);
    const ord = rows[0];
    if (!ord) return res.status(404).json({ message: "주문 없음" });
    if (ord.total_pay !== Number(amount)) {
      return res.status(400).json({ message: "결제 금액 불일치" });
    }

    // 토스 승인 호출 (의사코드)
    // const secretKey = process.env.TOSS_SECRET_KEY;
    // const { data: confirm } = await axios.post(
    //   "https://api.tosspayments.com/v1/payments/confirm",
    //   { paymentKey, orderId, amount },
    //   { auth: { username: secretKey, password: "" } }
    // );

    const items = JSON.parse(ord.items_json || "[]");
    const totals = JSON.parse(ord.totals_json || "{}");
    const buyer  = JSON.parse(ord.buyer_json  || "{}");
    const recv   = JSON.parse(ord.receiver_json || "{}");

    const order_no = genOrderNo();
    await q(`
      UPDATE orders
         SET status='PAID',
             paid_at=NOW(),
             order_no=?,
             pg_payment_key=?, 
             pg_provider='TOSS'
       WHERE order_id=? AND user_id=?`,
      [order_no, paymentKey, ord.order_id, userId]
    );

    await clearSelectedCarts(userId, totals);

    return res.json({
      ok: true,
      order_id: ord.order_id,
      order_no,
      buyer,
      receiver: recv,
      totals,
      items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: String(err?.message || err) });
  }
});

// ---------- 주문 조회 (OrderOK 용) ----------
router.get("/orders/:order_id", async (req, res) => {
  try {
    const userId = req.session?.user?.id || "guswl0817";
    const { order_id } = req.params;
    const rows = await q(`SELECT * FROM orders WHERE order_id=? AND user_id=? LIMIT 1`, [order_id, userId]);
    const ord = rows[0];
    if (!ord) return res.status(404).json({ message: "주문 없음" });

    const buyer  = JSON.parse(ord.buyer_json  || "{}");
    const recv   = JSON.parse(ord.receiver_json || "{}");
    const items  = JSON.parse(ord.items_json || "[]");
    const totals = JSON.parse(ord.totals_json || "{}");

    res.json({
      order_id: ord.order_id,
      order_no: ord.order_no,
      status: ord.status,
      buyer, receiver: recv, items, totals,
      paid_at: ord.paid_at, pg_provider: ord.pg_provider
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: String(err?.message || err) });
  }
});

export default router;
