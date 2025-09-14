import express from "express"; 
import mysql from "mysql2";
const router = express.Router(); 

// DB 연결 설정 
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "recypro_test",
});

// 1. 리뷰 목록 가져오기 
router.get("/", (req, res) => {
  const sql = "SELECT * FROM review ORDER BY date DESC";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// 2. 리뷰 등록하기 
router.post("/", (req, res) => {
  const { image, rv_title, rv_rating, id, date, pname } = req.body;
  const sql = `INSERT INTO review (image, rv_title, rv_rating, id, date, pname) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [image, rv_title, rv_rating, id, date, pname];
  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json({ success: true, insertId: result.insertId });
  });
});

export default router;