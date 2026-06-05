// server/routes/mpOrder_Change.js
import express from "express";
import multer from "multer";
import path from "path";
import { db } from "../server.js";

const router = express.Router();

const q = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });

function getSessionUserId(req) {
  return req.session?.user?.id || req.session?.userId;
}

// 파일 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/order_change");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const safeName = baseName.replace(/[^\w가-힣-]/g, "_");

    cb(null, `${Date.now()}_${safeName}${ext}`);
  },
});

const upload = multer({ storage });

// 주문변경 페이지 진입 시 주문 정보 조회
router.get("/:orderId", async (req, res) => {
  try {
    const userId = getSessionUserId(req);
    const { orderId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const [order] = await q(
      `
      SELECT
        order_id,
        order_no,
        user_id,
        status,
        created_at,
        paid_at
      FROM orders
      WHERE order_id = ?
        AND user_id = ?
        AND status = 'PAID'
      `,
      [orderId, userId]
    );

    if (!order) {
      return res.status(404).json({ message: "주문 정보를 찾을 수 없습니다." });
    }

    const items = await q(
      `
      SELECT
        order_item_id,
        pname,
        option_label,
        quantity
      FROM order_items
      WHERE order_id = ?
      ORDER BY order_item_id ASC
      `,
      [orderId]
    );

    res.json({
      ...order,
      items,
    });
  } catch (err) {
    console.error("[GET /api/mypage/order-change/:orderId]", err);
    res.status(500).json({ message: "주문변경 정보 조회 실패" });
  }
});

// 주문변경 신청 저장
router.post(
  "/",
  upload.fields([
    { name: "upfile1", maxCount: 1 },
    { name: "upfile2", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = getSessionUserId(req);

      if (!userId) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
      }

      const { order_id, title, content } = req.body;

      if (!order_id) {
        return res.status(400).json({ message: "주문번호 정보가 없습니다." });
      }

      if (!title?.trim()) {
        return res.status(400).json({ message: "제목을 입력해주세요." });
      }

      if (!content?.trim()) {
        return res.status(400).json({ message: "문의내용을 입력해주세요." });
      }

      // 본인 주문인지 확인
      const [order] = await q(
        `
        SELECT order_id, order_no
        FROM orders
        WHERE order_id = ?
          AND user_id = ?
          AND status = 'PAID'
        `,
        [order_id, userId]
      );

      if (!order) {
        return res.status(404).json({ message: "주문 정보를 찾을 수 없습니다." });
      }

      const file1 = req.files?.upfile1?.[0]?.filename || null;
      const file2 = req.files?.upfile2?.[0]?.filename || null;

      const result = await q(
        `
        INSERT INTO orders_change (
          order_id,
          order_no,
          user_id,
          title,
          content,
          file1,
          file2
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          order.order_id,
          order.order_no,
          userId,
          title.trim(),
          content.trim(),
          file1,
          file2,
        ]
      );

      res.status(201).json({
        message: "주문변경 신청이 접수되었습니다.",
        change_id: result.insertId,
      });
    } catch (err) {
      console.error("[POST /api/mypage/order-change]", err);
      res.status(500).json({ message: "주문변경 신청 실패" });
    }
  }
);

export default router;