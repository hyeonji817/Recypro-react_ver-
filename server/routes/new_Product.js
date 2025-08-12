import express from 'express';    // express : 웹 서버 프레임워크 
import { db } from '../server.js'; 

const router = express.Router();    // 라우터 설정 

// 인기 상품 데이터 가져오기 (해당 연결된 경로로 데이터를 전달)
// 데이터를 찾기 위해, DB에 데이터 조회 
// 'GET /' : 인기 상품 데이터를 반환하는 API. 
router.get("/", (req, res) => {
  const sql = "SELECT * FROM new_product ORDER BY productId DESC LIMIT 10"; // 최신순 10개 예시 
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB Error" });
    }
    res.json(results);
  });
});

export default router;