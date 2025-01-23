import express from "express"; 
import path from "path";      // path : 파일 경로 조작을 위한 Node.js 기본 모듈 
import mysql from "mysql2";   // mysql2 : MySQL 데이터베이스와 통신 
import cors from "cors";  
import { fileURLToPath } from "url";    // __dirname 대체 

// router : Express 라우터 객체. '/api/Popular_Product' 경로에 대한 라우팅 처리 
// app : Express 애플리케이션 객체. 정적 파일 제공과 같은 추가 설정에 사용. 
const router = express.Router();    // 라우터 설정 
const app = express();

// 모든 도메인에서의 요청을 허용 (CORS 문제 해결)
router.use(cors());

// __dirname 대체 설정 
// EXM 환경에서 '__dirname'을 사용할 수 없으므로, 'fileURLToPath'와 'path.dirname'을 사용해 현재 파일의 디렉토리 설정.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__dirname:', __dirname); 
console.log('Serving static files from:', path.join(__dirname, 'uploads'));

// 정적 파일 제공 : '/uploads'로 시작하는 요청은 '__dirname/uploads' 디렉토리에서 파일 제공 
// ex) /uploads/image.jpg 요청 시 '__dirname/uploads/image.jpg' 파일을 반환 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', (req, res, next) => {
  console.log(`Static file requested: ${req.path}`);
  next(); 
}, express.static(path.join(__dirname, 'uploads')));

// MySQL 연결 
// mysql.createPool : MySQL 데이터베이스 연결을 풀링(pooling) 방식으로 설정. 
// promise() : Promise 기반의 API를 사용해 비동기 작업을 처리. 
const db = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: '1234', 
  database: 'recypro',
}).promise();

// 인기 상품 데이터 가져오기 (해당 연결된 경로로 데이터를 전달, 
// 데이터를 찾기 위해, DB에 데이터 조회)
// 'GET /' : 인기 상품 데이터를 반환하는 API. 
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM popular_product'); 
    console.log('Fetched rows:', rows); // 데이터베이스 결과를 콘솔에 출력
    res.json(rows); 
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).send('Server Error');
  }
}); 

console.log('__dirname:', __dirname);
console.log('Serving static files from:', path.join(__dirname, 'uploads'));

export default router;