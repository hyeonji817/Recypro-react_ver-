// server/routes/mpWish.js
import express from "express";
import { db } from "../server.js";

const router = express.Router();

const q = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });

function getSessionUserId(req) {
  return (
    req.session?.userId ||
    req.session?.user?.id ||
    req.session?.user_id?.id ||
    req.session?.user_id
  );
}

const ALLOWED_TABLES = [
  "product_life",
  "product_bath",
  "product_food",
  "product_kitchen",
  "product_pet",
  "product_office",
];

function isAllowedTable(productTable) {
  return ALLOWED_TABLES.includes(productTable);
}

// 관심상품 목록 조회
// 관심상품 목록 조회
router.get("/", async (req, res) => {
  try {
    const userId = getSessionUserId(req);

    console.log("[GET /api/mypage/wish] session:", req.session);
    console.log("[GET /api/mypage/wish] userId:", userId);

    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const rows = await q(
      `
      SELECT 
        w.wish_id,
        w.product_table,
        w.product_id,
        w.created_at,
        p.pname,
        p.price,
        p.discount_price,
        p.filename,
        p.category
      FROM wish_products w
      JOIN v_product_catalog p
        ON p.product_table COLLATE utf8mb4_0900_ai_ci
         = w.product_table COLLATE utf8mb4_0900_ai_ci
       AND p.productId COLLATE utf8mb4_0900_ai_ci
         = w.product_id COLLATE utf8mb4_0900_ai_ci
      WHERE w.user_id = ?
      ORDER BY w.created_at DESC
      `,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error("[GET /api/mypage/wish]", err);
    res.status(500).json({
      message: "관심상품 목록 조회 실패",
      error: err.message,
    });
  }
});

// 특정 상품 찜 여부 확인
router.get("/check", async (req, res) => {
  try {
    const userId = getSessionUserId(req);
    const { productTable, productId } = req.query;

    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    if (!isAllowedTable(productTable) || !productId) {
      return res.status(400).json({ message: "잘못된 상품 정보입니다." });
    }

    const rows = await q(
      `
      SELECT wish_id
      FROM wish_products
      WHERE user_id = ?
        AND product_table = ?
        AND product_id = ?
      LIMIT 1
      `,
      [userId, productTable, productId]
    );

    res.json({ wished: rows.length > 0 });
  } catch (err) {
    console.error("[GET /api/mypage/wish/check]", err);
    res.status(500).json({ message: "찜 여부 확인 실패" });
  }
});

// 찜하기 / 찜취소 토글
router.post("/toggle", async (req, res) => {
  try {
    const userId = getSessionUserId(req);
    const { productTable, productId } = req.body;

    console.log("[POST /api/mypage/wish/toggle] body:", req.body);
    console.log("[POST /api/mypage/wish/toggle] userId:", userId);

    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    if (!isAllowedTable(productTable) || !productId) {
      return res.status(400).json({ message: "잘못된 상품 정보입니다." });
    }

    const existing = await q(
      `
      SELECT wish_id
      FROM wish_products
      WHERE user_id = ?
        AND product_table = ?
        AND product_id = ?
      LIMIT 1
      `,
      [userId, productTable, productId]
    );

    if (existing.length > 0) {
      await q(
        `
        DELETE FROM wish_products
        WHERE user_id = ?
          AND product_table = ?
          AND product_id = ?
        `,
        [userId, productTable, productId]
      );

      return res.json({
        wished: false,
        message: "관심상품에서 삭제되었습니다.",
      });
    }

    await q(
      `
      INSERT INTO wish_products (user_id, product_table, product_id)
      VALUES (?, ?, ?)
      `,
      [userId, productTable, productId]
    );

    res.json({
      wished: true,
      message: "관심상품에 추가되었습니다.",
    });
  } catch (err) {
    console.error("[POST /api/mypage/wish/toggle]", err);
    res.status(500).json({ message: "관심상품 처리 실패" });
  }
});

// 관심상품 페이지에서 삭제
router.delete("/:productTable/:productId", async (req, res) => {
  try {
    const userId = getSessionUserId(req);
    const { productTable, productId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    if (!isAllowedTable(productTable) || !productId) {
      return res.status(400).json({ message: "잘못된 상품 정보입니다." });
    }

    await q(
      `
      DELETE FROM wish_products
      WHERE user_id = ?
        AND product_table = ?
        AND product_id = ?
      `,
      [userId, productTable, productId]
    );

    res.json({ message: "관심상품에서 삭제되었습니다." });
  } catch (err) {
    console.error("[DELETE /api/mypage/wish]", err);
    res.status(500).json({ message: "관심상품 삭제 실패" });
  }
});

export default router;