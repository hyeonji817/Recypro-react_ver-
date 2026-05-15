import express from "express"; 
import bcrypt from "bcrypt"; 
import { db } from "../server.js"; 

const router = express.Router(); 

router.post("/", (req, res) => {
  const { id, password } = req.body; 
  const sql = "SELECT * FROM user WHERE id = ?"; 

  db.query(sql, [id], async (err, results) => {
    if (err) {
      console.error("[LOGIN] DB 오류:", err);
      return res.status(500).json({ message: "서버 오류" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "로그인 실패" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    // 현재 DB 비밀번호가 평문이면 이 방식 사용
    if (user.password !== password) {
      return res.status(401).json({ message: "비밀번호 불일치" });
    }

    req.session.userId = user.id;   // 사용자 세션 연결 

    console.log("[LOGIN] sessionID:", req.sessionID);
    console.log("[LOGIN] 저장 후 session:", req.session);

    req.session.save((err) => {
      if (err) {
        console.error("세션 저장 오류:", err);
        return res.status(500).json({ message: "세션 저장 실패" });
      }

      res.json({
        message: "로그인 성공",
        userId: user.id,
      });
    });
  });
});

export default router;