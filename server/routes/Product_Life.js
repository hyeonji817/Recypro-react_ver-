import express from "express";
import { db } from "../server.js";    // 서버 DB 연결 

const router = express.Router();    // 라우터 설정 

/** 콜백 기반 db.query -> Promise 래퍼 */
const q = (sql, params = []) => 
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

/** 1) 생활상품 목록 (최신 12개) */
router.get("/", async (req, res) => {
  try {
    const rows = await q(
      "SELECT * FROM product_life ORDER BY productId DESC LIMIT 12"
    );
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ message: "DB Error", detail: err.message });
  }
});

/** 2) 생활상품 상세 + 옵션그룹/옵션값 */
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;   // 클라이언트에서 넘긴 값 

    // (A) 기본 상품 조회 
    // - 상품ID(PK)로 조회하는 경우 
    const productRows = await q(
      "SELECT * FROM product_life WHERE productId = ?",
      [productId]
    );

    if (!productRows.length) return res.status(404).json({ message: "Not found" });
    const product = productRows[0];

    // (B) 옵션 그룹들 
    const groups = await q(
      "SELECT * FROM product_option_group WHERE product_id = ? ORDER BY sort_order, id",
      [productId]
    );

    // (C) 각 그룹의 옵션값 
    const optionGroups = [];
    for (const g of groups) {
      const vals = await q(
        "SELECT * FROM product_option_value WHERE group_id = ? ORDER BY sort_order, id",
        [g.id]
      );
      optionGroups.push({
        id: g.id,
        name: g.name,
        required: !!g.required,
        displayName: g.display_name, 
        values: vals.map((v) => ({
          id: v.id,
          label: v.label,
          value: v.value,
          priceDelta: v.price_delta || 0, 
          stock: v.stock,     // null이면 공통/무제한 처리
        })),
      });
    }

    
  } catch (err) {

  }
})

export default router;