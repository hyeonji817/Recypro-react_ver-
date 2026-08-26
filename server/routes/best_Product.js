import express from "express"; 
import { db } from "../server.js";      // 서버 DB 연결 

const router = express.Router();

// 베스트 상품 가져오기 
router.get("/", (req, res) => {
  const sql = "SELECT * FROM best_product ORDER BY productId DESC LIMIT 9";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB error:", err); 
      return res.status(500).json({ error: "DB Error" });
    }
    res.json(results);
  });
});

export default router;