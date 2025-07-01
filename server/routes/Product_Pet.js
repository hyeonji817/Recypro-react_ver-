import express from "express";
import path from "path"; 
import { db } from "../server.js";    // 서버 DB 연결 
import { fileURLToPath } from "url";
import cors from "cors"; 

const router = express.Router();    // 라우터 설정 
const app = express(); 

// __dirname 대체 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 폴더 제공 (여기서 uploads 경로를 클라이언트가 접근할 수 있게 함)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 모든 도메인에서의 요청을 허용 (CORS 문제 해결)
router.use(cors()); 

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