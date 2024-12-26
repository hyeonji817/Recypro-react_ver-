import express from "express";
import path from "path"; 
import mysql from "mysql2";
import cors from "cors"; 
import { fileURLToPath } from "url";    // __dirname 대체 

const app = express();
app.use(cors());    // 모든 도메인에서의 요청을 허용 

// __dirname 대체 설정 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

console.log('__dirname:', __dirname); 
console.log('Serving static files from:', path.join(__dirname, 'uploads'));

// 정적 파일 제공 
app.use('/uploads', express.static(path.resolve(__dirname, "../uploads")));

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads', '1_3-1_minimum.jpg'));
});

// MySQL 연결 
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234', 
  database: 'recypro',
}).promise();

// 인기 상품 데이터 가져오기 
app.get('/api/popular_product', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM popular_product');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

console.log('__dirname:', __dirname);
console.log('Serving static files from:', path.join(__dirname, 'uploads'));

const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});