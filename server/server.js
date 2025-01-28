import express from "express";  // express : Node.js 기반 웹 애플리케이션 프레임워크. API 요청 처리.
const app = express();
const port = 5003;    // 프론트엔드에서 호출할 포트와 일치해야 한다. 
import cors from "cors";    // 프론트엔드와 백엔드 간의 통신 허용. 
import mysql from "mysql2";   // MySQL 데이터베이스와의 연결 제공. 
import path from "path";    // path : 파일 경로 조작을 위한 Node.js 기본 모듈 
import { fileURLToPath } from "url";

// 라우트 파일 연결 
import Popular_Routes from "./routes/Popular_Product.js";   // 해당 페이지와 관련된 API 로직.
import PP_Routes from "./routes/popular_products.js";

// JSON 형식의 요청을 처리하기 위한 미들웨어 
// JSON 형식으 요청 본문을 읽고 사용할 수 있도록 설정. 
app.use(express.json());

// 라우트 경로 등록 
app.use('/api/Popular_Product', Popular_Routes);  // Popular_Product.js 페이지 로직 실행 
app.use('/api/popular_products', PP_Routes);    // popular_products.js 

// CORS 설정 (프론트와 백 연결하는 징검다리)
app.use(cors({
  origin: 'http://localhost:5174',  // Vite 개발 서버의 주소 (프론트엔드 주소)
  methods: ['GET', 'POST'],   // 허용할 HTTP 메소드 
  allowedHeaders: ['Content-Type'],   // 허용할 헤더 
}));

// MySQL 연결 설정 (공통) (DB 연결은 단일 세션으로 하면 안되고 pool을 통해 다중 세션 처리할 수 있도록 한다.)
const pool = mysql.createPool({
  host: 'localhost',  // host : 데이터베이스 서버 주소 
  user: 'root',   // MySQL 사용자명 
  password: '1234',   // MySQL 비밀번호 
  database: 'recypro',   // 사용할 데이터베이스 이름 
  waitForConnections: true,   // 풀의 연결이 가득 찼을 때 대기 여부 
  connectionLimit: 0,     // 풀에서 사용할 최대 연결 수 (0은 제한 없음)
  queueLimit: 0     // 대기열 크기(0은 제한 없음)
});

// ---------------------------------------------------------------------------
// 인기상품 불러들이기 (해결 원인)
// __dirname 대체 설정 
// ESM 환경에서 '__dirname'을 사용할 수 없으므로, 'fileURLToPath'와 'path.dirname'을 사용해 현재 파일의 디렉토리 설정.
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

console.log('__dirname:', __dirname);
console.log('Serving static files from:', path.join(__dirname, 'uploads'));

// 정적 파일 제공 : '/uploads'로 시작하는 요청은 '__dirname/uploads' 디렉토리에서 파일 제공 (해결 원인)
// ex) /uploads/image.jpg 요청 시 '__dirname/uploads/image.jpg' 파일을 반환 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', (req, res, next) => {
  console.log(`Static file requested: ${req.path}`);
  next();
}, express.static(path.join(__dirname, 'uploads')));

// -----------------------------------------------------------------------------
// API 경로 설정 (예: /api/account/register) (회원가입 처리과정)
// 회원가입 데이터 처리 
// 요청 본문(req.body)에서 사용자 정보 가져옴. 
app.post('/api/account/register', (req, res) => {
  const { id, password, name, age, gender, email } = req.body;

  // 요청 데이터 확인 
  console.log(`ID: ${id}, Password: ${password}, Name: ${name}, Age: ${age}, Gender: ${gender}, Email: ${email}`);

  // 데이터베이스에 데이터 삽입 
  const query = 'INSERT INTO user (id, password, name, age, gender, email) VALUES (?, ?, ?, ?, ?, ?)';

  pool.query(query, [id, password, name, age, gender, email], (err, results) => {
    if (err) {
      console.error('회원가입 실패:', err); 
      return res.status(500).json({ error: '회원가입 처리에 실패했습니다.' });
    }

    // 성공적인 삽입 후 응답 
    console.log('회원가입 성공:', results);
    res.status(201).json({ message: '회원가입 성공!' });
  });
});

// 서버 시작 
// app.listen : 서버를 시작하고, 지정된 포트(5003)에서 클라이언트 요청을 대기. 
// 성공적으로 실행되면 콘솔에 서버 주소 출력 
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});