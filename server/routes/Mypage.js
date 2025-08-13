import express from "express"; 
import { db } from "../server.js"; 
const router = express.Router(); 
const app = express(); 

// 마이페이지 정보 가져오기 
router.get("/:id", (req, res) => {
  const userId = req.params.id; 
  const query = "SELECT * FROM mypage WHERE id = ?"; 

  pool.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Not found" });

    res.json(results[0]);
  });
});

// 새로 저장 (없을 경우) or 수정 
router.post("/", (req, res) => {
  const {
    id, couponCount, mileage, point,
    mp_order, wishList, coupon,
    deposits, qa, myboard, withdraw
  } = req.body;

  const query = `
    INSERT INTO mypage (
      id, couponCount, mileage, point, mp_order, wishList, coupon, deposits, qa, myboard, withdraw
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      couponCount = VALUES(couponCount),
      mileage = VALUES(mileage),
      point = VALUES(point),
      mp_order = VALUES(mp_order),
      wishList = VALUES(wishList),
      coupon = VALUES(coupon),
      deposits = VALUES(deposits),
      qa = VALUES(qa),
      myboard = VALUES(myboard),
      withdraw = VALUES(withdraw)
  `;

  const values = [id, couponCount, mileage, point, mp_order, wishList, coupon, deposits, qa, myboard, withdraw];

  pool.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Success", result });
  });

  app.get("/api/mypage", (req, res) => {
    console.log("세션 정보:", req.session);
  
    if (req.session && req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ message: "Not logged in" });
    }
  });  
});

export default router;