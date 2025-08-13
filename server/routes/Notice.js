import express from "express"; 
import mysql from "mysql2";
const router = express.Router(); 

// DB 연결 
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // 또는 본인의 MySQL 유저명
  password: "1234", // 보통은 개발환경에서 '1234'처럼 설정했을 수도 있음
  database: "recypro", // 실제 사용하고 있는 DB 이름
});

// 공지사항 전체 조회 
router.get("/", (req, res) => {
  const sql = `
    SELECT n.nt_num, n.nt_title, n.id, u.name, n.date, n.views
    FROM notice n
    JOIN user u ON n.id = u.id
    ORDER BY n.nt_num DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});


// 공지사항 등록 
router.post("/", (req, res) => {
  const { nt_title, id, date, views } = req.body; 
  const userId = req.session.user?.id; // 세션에서 로그인한 유저 ID 추출

  if (!userId) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  const sql = "INSERT INTO notice (nt_title, id, date, views) VALUES (?, ?, ?, ?)";
  db.query(sql, [nt_title, id, date, views], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

export default router;