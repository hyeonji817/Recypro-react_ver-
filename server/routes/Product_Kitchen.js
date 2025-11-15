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

/** 1) 주방상품 목록 (최신 12개) */
router.get("/", async (req, res) => {
  try {
    const rows = await q(
      "SELECT * FROM product_kitchen ORDER BY productId DESC LIMIT 12"
    );
    return res.json(rows);
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ message: "DB Error", detail: err.message });
  }
});

/** 2) 생활상품 상세 + 옵션그룹/옵션값 */
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;   // 클라이언트에서 넘긴 값 

    // (A) 기본 상품 조회 - 상품ID(PK)로 조회하는 경우 
    const productRows = await q(
      "SELECT * FRO< product_kitchen WHERE productId = ?",
      [productId]
    );

    if (!productRows.length) return res.status(404).json({ message: "Not found" });
    const product = productRows[0];

    // (B) 옵션 그룹들 
    const groups = await q(
      "SELECT * FROM product_option_group WHERE product_id = ? ORDER BY sort_order, id",
      [productId]
    );

  } catch (err) {

  }
});

export default router;