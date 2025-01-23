import express from "express";
const app = express();
const port = 5003;
import cors from "cors"; 
import mysql from "mysql2"; 

// CORS 설정 (프론트와 백 연결하는 징검다리)
app.use(cors({
  origin: 'http://localhost:5174',  // Vite 개발 서버의 주소 (프론트엔드 주소)
  methods: ['GET', 'POST'],   // 허용할 HTTP 메소드 
  allowedHeaders: ['Content-Type'],   // 허용할 헤더 
}));

app.use(express.json());    // JSON 형식의 요청을 처리하기 위한 미들웨어 

// MySQL 연결 설정 (공통)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',   // MySQL 사용자명 
  password: '1234',   // MySQL 비밀번호 
  database: 'recypro'   // 사용할 데이터베이스 이름 
})
