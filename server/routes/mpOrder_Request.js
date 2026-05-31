import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "../server.js";

const router = express.Router();

const q = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });

function getSessionUserId(req) {
  return req.session?.user?.id || req.session?.userId;
}

// 업로드 폴더 준비
const uploadDir = path.join(process.cwd(), "uploads", "order_requests");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// multer 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const safeBaseName = baseName.replace(/[^\w가-힣.-]/g, "_");
    const fileName = `${Date.now()}_${safeBaseName}${ext}`;

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// 주문문의 작성 화면에 필요한 주문 정보 조회
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
      return res.status(404).json({
        message: "문의 가능한 주문 정보를 찾을 수 없습니다.",
      });
    }

    const items = await q(
      `
      SELECT
        order_item_id,
        order_id,
        pname,
        product_id,
        product_table,
        filename,
        option_label,
        quantity
      FROM order_items
      WHERE order_id = ?
      ORDER BY order_item_id ASC
      `,
      [orderId]
    );

    const [user] = await q(
      `
      SELECT id, name, email
      FROM user
      WHERE id = ?
      `,
      [userId]
    );

    res.json({
      user: {
        id: user?.id || userId,
        name: user?.name || userId,
        email: user?.email || "",
        grade: req.session?.user?.grade || "MEMBER",
      },
      order: {
        ...order,
        items,
      },
    });
  } catch (err) {
    console.error("[GET /api/mp-order-request/:orderId]", err);
    res.status(500).json({ message: "주문문의 화면 조회 실패" });
  }
});

// 주문문의 등록
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
        return res.status(400).json({ message: "주문번호가 없습니다." });
      }

      if (!title?.trim()) {
        return res.status(400).json({ message: "제목을 입력해주세요." });
      }

      if (!content?.trim()) {
        return res.status(400).json({ message: "문의내용을 입력해주세요." });
      }

      const [order] = await q(
        `
        SELECT order_id
        FROM orders
        WHERE order_id = ?
          AND user_id = ?
          AND status = 'PAID'
        `,
        [order_id, userId]
      );

      if (!order) {
        return res.status(404).json({
          message: "문의 가능한 주문 정보를 찾을 수 없습니다.",
        });
      }

      const file1 = req.files?.upfile1?.[0]?.filename || null;
      const file2 = req.files?.upfile2?.[0]?.filename || null;

      const result = await q(
        `
        INSERT INTO order_requests (
          order_id,
          user_id,
          title,
          content,
          file1,
          file2
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [order_id, userId, title.trim(), content.trim(), file1, file2]
      );

      res.status(201).json({
        message: "주문문의가 등록되었습니다.",
        request_id: result.insertId,
      });
    } catch (err) {
      console.error("[POST /api/mp-order-request]", err);
      res.status(500).json({ message: "주문문의 등록 실패" });
    }
  }
);

export default router;