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

export default router;