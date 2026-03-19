import express from "express"; 
import bcrypt from "bctypt"; 
import { pool } from "../server.js"; 

const router = express.Router(); 

router.post("/login", (req, res) => {
  const { id, password } = req.body; 
  const sql = "SELECT * FROM user WHERE id = ?"; 

  pool.query(sql, [id], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: "로그인 실패" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (user.password !== password) return res.status(401).json({ error: "비밀번호 불일치" });

    req.session.userId = user.id;   // 사용자 세션 연결 
    console.log("로그인 성공 후 세션 정보:", req.session);

    res.json({ message: "로그인 성공" });
  });
});