import express from "express";
import { db } from "../server.js";    // mysql2 연결 
const router = express.Router();

// 헬퍼 : 쿼리를 Promise로 
const q = (sql, params=[]) => new Promise((resolve, reject) => {
  db.query(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
});

// 장바구니 목록 조회 (모든 카테고리 공통)
router.get("/", async (req, res) => {
  const sessionUser = req.session?.user_id; 
  if (!sessionUser?.id) return res.status(401).json({ message: "로그인이 필요합니다." });

  try {
    const rows = await q(
      `
      SELECT
        c.*,
        v.pname,
        v.filename,
        v.category,
        COALESCE(v.discount_price, v.price) AS base_price
      FROM cart c
      JOIN v_product_catalog v
        ON v.product_table = c.product_table
       AND v.productId     = c.product_id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
      `,
      [sessionUser.id]
    );

    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "장바구니 조회 중 오류" });
  }
});

// 장바구니 담기 
router.post("/", async (req,res) => {
  const sessionUser = req.session?.user_id;
  if (!sessionUser?.id) return res.status(401).json({ message: "로그인이 필요합니다" });

  const {
    productTable = "product_life",
    productId,
    qty,                     // cart_quantity
    options,                 // 객체 { 색상: '핑크', 사이즈: 'L', ... }
    optionLabel,             // "색상: 핑크 / 사이즈: L"
    unitPrice,               // (할인가 또는 정상가) + 옵션가
    optionDelta,             // 옵션가 합
    totalPrice,              // unitPrice * qty
    mileage                  // 적립금
  } = req.body;

  if (!productId || !qty || qty < 1) {
    return res.status(400).json({ message: "상품정보 또는 수량이 잘못되었습니다." });
  }

  try {
    // 동일 상품+동일 옵션이면 수량만 증가, 옵션이 다르면 별도 행으로 저장
    const exist = await q(
      `SELECT * FROM cart 
       WHERE user_id=? AND product_table=? AND product_id=? AND COALESCE(option_label,'') = COALESCE(?, '')`,
      [sessionUser.id, productTable, productId, optionLabel || ""]
    );

    if (exist.length) {
      const row = exist[0];
      const newQty = row.cart_quantity + Number(qty);
      const newTotal = newQty * Number(unitPrice);
      await q(
        `UPDATE cart SET cart_quantity=?, total_price=?, 
                         options_json=?, option_label=?, unit_price=?, option_delta=?, mileage=? 
         WHERE cart_id=?`,
        [
          newQty, newTotal,
          JSON.stringify(options || null), optionLabel || null,
          unitPrice || 0, optionDelta || 0, mileage || 0,
          row.cart_id
        ]
      );
    } else {
      await q(
        `INSERT INTO cart
         (user_id, product_table, product_id, cart_quantity, options_json, option_label, unit_price, option_delta, total_price, mileage)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          sessionUser.id, productTable, productId, qty,
          JSON.stringify(options || null), optionLabel || null,
          unitPrice || 0, optionDelta || 0, totalPrice || 0, mileage || 0
        ]
      );
    }

    res.json({ ok: true, message: "장바구니에 담았습니다." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "장바구니 담기 중 오류" });
  }
});

// 수량 변경 
router.put("/:cartId/qty", async (req, res) => {
  const sessionUser = req.session?.user_id;
  if (!sessionUser?.id) return res.status(401).json({ message: "로그인이 필요합니다." });

  const { cartId } = req.params;
  const { qty, unitPrice } = req.body;    // unitPrice는 동일 옵션이므로 프론트가 함께 전송 

  if (!qty || qty < 1) return res.status(400).json({ message: "수량 오류" });

  try {
    const total = qty * Number(unitPrice || 0);
    await q(
      `UPDATE cart SET cart_quantity=?, total_price=? WHERE cart_id=? AND user_id=?`,
      [qty, total, cartId, sessionUser.id]
    );
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "수량 변경 오류" });
  }
});

// 항목 삭제 
router.delete("/:cartId", async (req, res) => {
  const sessionUser = req.session?.user_id;
  if (!sessionUser?.id) return res.status(401).json({ message: "로그인이 필요합니다." });

  try {
    await q(`DELETE FROM cart WHERE cart_id=? AND user_id=?`, [req.params.cartId, sessionUser.id]);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "삭제 중 오류" });
  }
});

export default router;