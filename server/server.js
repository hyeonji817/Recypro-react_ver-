import express from "express";  // express : Node.js 기반 웹 애플리케이션 프레임워크. API 요청 처리.
import bcryptjs from "bcryptjs"; 
import session from "express-session"; 
import cors from "cors";    // 프론트엔드와 백엔드 간의 통신 허용. 
import dotenv from "dotenv"; 

// 라우트 파일 연결 
import Popular_Routes from "./routes/Popular_Product.js";   // 해당 페이지와 관련된 API 로직.
import PP_Routes from "./routes/popular_products.js";
import cartRouter from "./routes/cart.js"; 
import mysql from "mysql2";   // MySQL 데이터베이스와의 연결 제공. 
import path from "path";    // path : 파일 경로 조작을 위한 Node.js 기본 모듈 
import { fileURLToPath } from "url";

dotenv.config(); 
const app = express();
const port = 5003;    // 프론트엔드에서 호출할 포트와 일치해야 한다. 

// JSON 형식의 요청을 처리하기 위한 미들웨어
// JSON 형식의 요청 본문을 읽고 사용할 수 있도록 설정. 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser());

// CORS 설정 (프론트와 백 연결하는 징검다리)
app.use(cors({
  origin: 'http://localhost:5174',  // Vite 개발 서버의 주소 (프론트엔드 주소)
  methods: ['GET', 'POST'],   // 허용할 HTTP 메소드 
  allowedHeaders: ['Content-Type'],   // 허용할 헤더 
  credentials: true               // 쿠키 허용
}));

app.use(session({
  secret: "guswl0817",    // 세션 암호화 키 
  resave: false, 
  saveUninitialized: false,
  cookie: {
    secure: false,     // 개발환경에서는 false (https 아니므로)
    httpOnly: true,  // 클라이언트에서 쿠키를 조작할 수 없도록 설정
    maxAge: 1000 * 60 * 60 * 24, // 1일
    sameSite: "lax",   // 크로스 도메인 문제 방지
  }
}));

// 라우트 경로 등록 
app.use('/api/Popular_Product', Popular_Routes);  // Popular_Product.js 페이지 로직 실행 
app.use('/api/popular_products', PP_Routes);    // popular_products.js 
app.use('/api/cart', cartRouter);    // cartRouter 등록하여 로직 실행

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

// DB 연동 확인 (테스트용)
pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL 연결 실패: ", err); 
  } else {
    console.log("MySQL 연결 성공!");
    connection.release();     // 사용한 연결 반환 
  }
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

// -----------------------------------------------------------------------------
// 로그인 API 처리 기능 
app.post('/login', (req, res) => {
  const { id, password } = req.body; 

  if (!id || !password) {
    return res.status(400).json({ message: "아이디와 비밀번호를 입력하세요." });
  }

  const query = 'SELECT * FROM user WHERE id = ? AND password = ?'; 

  pool.query(query, [id, password], (err, results) => {
    if (err) {
      console.error('로그인 실패:', err); 
      return res.status(500).json({ message: "서버 오류로 인해 로그인할 수 없습니다." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "아이디 또는 비밀번호가 올바르지 않습니다. "});
    }

    // 로그인 성공 시 응답 
    res.status(200).json ({
      message: "로그인 성공!",
      token: "dummy-token-for-now"    // 차후에 JWT 토큰 추가 가능 
    });
  });
});

// ----------------------------------------------------------------------------
// 로그아웃 API 
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("세션 삭제 실패:", err); 
      return res.status(500).send("Logout failed");
    }
    res.clearCookie("connect.sid");   // 세션 쿠키 삭제 
    return res.status(200).send("Logout success");
  });
});

// -----------------------------------------------------------------------------
// 아이디 찾기 API
app.post("/api/find_id", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.json({ success: false, message: "이름과 이메일을 입력해 주세요." });
  }

  const sql = "SELECT id FROM user WHERE name = ? AND email = ?"; 
  pool.query(sql, [name, email], (err, results) => {
    if (err) {
      console.error(err); 
      return res.json({ success: false, message: "서버 오류가 발생했습니다." });
    } 

    if (results.length > 0) {
      return res.json({ success: true, userId: results[0].id });
    } else {
      return res.json({ success: false, message: "일치하는 회원 정보가 없습니다." });
    }
  });
});

// ---------------------------------------------------------------------------------
// 비밀번호 찾기 API 
app.post("/api/find_pw", (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.json({ success: false, message: "모든 필드를 입력해 주세요." });
  }

  const sql = "SELECT password FROM user WHERE id = ? AND name = ? AND email = ?"; 
  pool.query(sql, [id, name, email], (err, results) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "서버 오류가 발생했습니다." });
    }

    if (results.length > 0) {
      return res.json({ success: true, userPw: result[0].password });
    } else {
      return res.json({ success: false, message: "일치하는 회원 정보가 없습니다." });
    }
  });
});

// 비밀번호 변경 요청 처리 
// 가짜 사용자 데이터 (실제로는 DB 사용)
let user = {
  id: 1, 
  username: "user",
  password: "$2b$10$abcdefghijklmnopqrstuv" // 해시된 비밀번호 (bcrypt 사용)
};

// 비밀번호 변경 API 
app.post("/api/ChangePassword", async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // 현재 비밀번호 확인 
  const passwordMatch = await bcryptjs.compare(currentPassword, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "현재 비밀번호가 일치하기 않습니다." });
  }

  // 새 비밀번호 해싱 후 저장 
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;
  
  res.json ({ message: "비밀번호가 성공적으로 변경되었습니다." });
});

// 상품 목록 조회 API 
app.get("/api/Products", (req, res) => {
  const sql = "SELECT * FROM product";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

// 특정 상품 정보 API 
app.get('/api/product/:id', (req, res) => {
  const productId = req.params.id; 
  const query = 'SELECT * FROM product WHERE productId = ?';

  pool.query(query, [productId], (err, result) => {
    if (err) {
      console.error('DB 오류:', err); 
      return res.status(500).json({ messsage: '서버 오류' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    console.log('쿼리 결과:', result); 
    res.json(result[0]);
  });
});

// 서버 시작 
// app.listen : 서버를 시작하고, 지정된 포트(5003)에서 클라이언트 요청을 대기. 
// 성공적으로 실행되면 콘솔에 서버 주소 출력 
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});