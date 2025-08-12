import express from "express"; 
import path from "path"; 
import { db } from "../server.js";      // 서버 DB 연결 
import { fileURLToPath } from "url";
import cors from "cors"; 

const router = express.Router();
const app = express();

// __dirname 대체 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 파일 경로 (이미지 접근용)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS 허용 
router.use(cors()); 

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