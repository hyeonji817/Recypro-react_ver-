import express from "express"; 
import mysql from "mysql2";
import multer from "multer";    // multer 추가 : 백엔드 서버에 POST 라우터 추가
import path from "path"; 
import fs from "fs";

const router = express.Router(); 

// 업로드 디렉토리 설정
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// multer 설정 (파일 업로드 설정)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");   // 서버 루트에 uploads 폴더 필요
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "_" + file.originalname;
    cb(null, unique);
  }
});
const upload = multer({ storage });

// DB 연결 설정 
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "recypro",
});

// Q&A 전체 목록 가져오기 
router.get("/", (req, res) => {
  const query = "SELECT * FROM questionAnswer ORDER BY qa_num DESC";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Q&A 데이터 불러오기 오류:", err);
      return res.status(500).json({ error: "DB 오류" });
    }
    res.json(result);
  });
});

// POST: Q&A 글 등록
router.post("/customer_question", upload.fields([
  { name: "upfile1" }, 
  { name: "upfile2" }
]), (req, res) => {
  const { title, content, cate, id } = req.body;
  const file1 = req.files['upfile1']?.[0]?.filename || null;
  const file2 = req.files['upfile2']?.[0]?.filename || null;

  const query = `
    INSERT INTO questionanswer (title, content, category, id, date, answer, upfile1, upfile2)
    VALUES (?, ?, ?, ?, NOW(), '대기중', ?, ?)
  `;

  const values = [title, content, cate, id || '비회원', file1, file2];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Q&A 저장 오류:", err);
      return res.status(500).json({ error: "DB 오류" });
    }
    res.status(201).json({ message: "Q&A 등록 완료" });
  });
});


export default router;