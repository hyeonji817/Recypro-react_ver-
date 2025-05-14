import express from "express";
import mysql from "mysql2";
import { pool } from "../server.js"; // ← pool export가 필요함
const router = express.Router();

// GET /api/product/:productId
router.get("/product/:productId", async (req, res) => {
  const [product] = await pool.promise().query(
    "SELECT * FROM product WHERE productId = ?", 
    [req.params.productId]
  );
  res.json(product);
});

// GET /api/cart (장바구니 목록 조회)
router.get("/", async (req, res) => {
  const userId = req.session.user_id.id;
  if (!userId) return res.status(401).json({ message: "로그인이 필요합니다" });

  const [cartItems] = await pool.promise().query(
    `SELECT c.*, p.pname, p.price, p.filename 
     FROM cart c 
     JOIN product p ON c.product_id = p.productId 
     WHERE c.user_id = ?`,
    [userId]
  );
  res.json(cartItems);
});

// POST /api/cart/:productId (장바구니에 상품 추가)
router.post("/:productId", async (req, res) => {
  const user = req.session.user_id; 
  console.log("user 데이터 조회 : ", req.session.user_id);

  if (!user) {
    return res.status(401).json({ message: '로그인이 필요합니다. '});
  }

  const user_id = req.session.user_id.id;
  const { productId } = req.params;
  const { cart_quantity } = req.body;
  console.log("cart_quantity:", cart_quantity);

  // 추가내용 (임시)
  try {
    // 이미 장바구니에 같은 상품이 있는지 확인
    const [existing] = await pool.promise().query(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [user_id, productId]
    );

    if (existing.length > 0) {
      // 기존 수량 증가
      await pool.promise().query(
        "UPDATE cart SET cart_quantity = cart_quantity + ? WHERE user_id = ? AND product_id = ?",
        [cart_quantity, user_id, productId]
      );
    } else {
      // 새 상품 추가
      await pool.promise().query(
        "INSERT INTO cart (user_id, product_id, cart_quantity) VALUES (?, ?, ?)",
        [user_id, productId, cart_quantity]
      );
    }

    res.json({ message: "장바구니에 상품이 추가되었습니다." });


  } catch (err) {
    console.error("DB 에러:", err);
    res.status(500).json({ message: "서버 에러 발생" });
  }
});


export default router;