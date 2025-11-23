import express from "express"; 
import { db } from "../server";

const router = express.Router();    // 라우터 설정 

/** 콜백 기반 db.query -> Promise 래퍼 */
const q = (sql, params = []) => 
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
  });
});

router.get('/', async (req, res) => {
  const sql = "SELECT * FROM product_pet ORDER BY productId DESC LIMIT 12";  // 최신순 12개 예시 
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB Error" });
    }
    res.json(results);
  });
});

export default router;