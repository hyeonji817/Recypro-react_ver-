// server/routes/orders.js
import express from "express";
import { db } from "../server.js";

const router = express.Router();

const q = (sql, params = []) =>
  new Promise((res, rej) => {
    db.query(sql, params, (err, rows) => (err ? rej(err) : res(rows)));
  });

router.get("/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;
    const [ord] = await q(`SELECT * FROM orders WHERE order_id = ?`, [order_id]);
    if (!ord) return res.status(404).json({ message: "주문을 찾을 수 없습니다." });

    res.json({
      order_id: ord.order_id,
      order_no: ord.order_no,
      buyer: JSON.parse(ord.buyer_json || "{}"),
      receiver: JSON.parse(ord.receiver_json || "{}"),
      items: JSON.parse(ord.items_json || "[]"),
      totals: JSON.parse(ord.totals_json || "{}"),
      created_at: ord.created_at,
      status: ord.status,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "주문 조회 중 오류가 발생했습니다." });
  }
});

export default router;
