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

// 정적 폴더 제공 (여기서 uploads 경로를 클라이언트가 접근할 수 있게 함)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 모든 도메인에서의 요청을 허용 (CORS 문제 해결)
router.use(cors()); 

router.get('/', async (req, res) => {
  const sql = "SELECT * FROM product_kitchen ORDER BY productId DESC LIMIT 12";  // 최신순 12개 예시 
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB Error" });
    }
    res.json(results);
  });
});

export default router;