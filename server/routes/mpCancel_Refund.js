// server/routes/mpCancel_Refund.js
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

const uploadDir = path.join(process.cwd(), "uploads", "cancel_refund");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const safeBase = base.replace(/[^\w가-힣.-]/g, "_");
    cb(null, `${Date.now()}_${safeBase}${ext}`);
  },
});

const upload = multer({ storage });

// 취소/반품 신청 페이지용 주문정보 조회
router.get("/:order_id", async (req, res) => {
  try {
    const userId = getSessionUserId(req);
    const { order_id } = req.params;

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
        subtotal,
        shipping_fee,
        discount_total,
        total_pay,
        total_mileage,
        pay_method,
        created_at,
        paid_at
      FROM orders
      WHERE order_id = ?
        AND user_id = ?
      `,
      [order_id, userId]
    );

    if (!order) {
      return res.status(404).json({ message: "주문 정보를 찾을 수 없습니다." });
    }

    const items = await q(
      `
      SELECT
        order_item_id,
        order_id,
        product_table,
        product_id,
        pname,
        filename,
        option_label,
        unit_price,
        quantity,
        line_total,
        mileage
      FROM order_items
      WHERE order_id = ?
      ORDER BY order_item_id ASC
      `,
      [order_id]
    );

    const requests = await q(
      `
      SELECT
        request_id,
        request_type,
        title,
        content,
        status,
        file1,
        file2,
        created_at
      FROM cancel_refund_requests
      WHERE order_id = ?
        AND user_id = ?
      ORDER BY request_id DESC
      `,
      [order_id, userId]
    );

    res.json({
      order: {
        ...order,
        subtotal: Number(order.subtotal || 0),
        shipping_fee: Number(order.shipping_fee || 0),
        discount_total: Number(order.discount_total || 0),
        total_pay: Number(order.total_pay || 0),
        total_mileage: Number(order.total_mileage || 0),
      },
      items: items.map((item) => ({
        ...item,
        unit_price: Number(item.unit_price || 0),
        quantity: Number(item.quantity || 0),
        line_total: Number(item.line_total || 0),
        mileage: Number(item.mileage || 0),
      })),
      requests,
    });
  } catch (err) {
    console.error("[GET /api/mpCancel_Refund/:order_id]", err);
    res.status(500).json({ message: "취소/반품 신청 정보 조회 실패" });
  }
});

// 취소/반품 신청 저장
router.post(
  "/:order_id",
  upload.fields([
    { name: "upfile1", maxCount: 1 },
    { name: "upfile2", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = getSessionUserId(req);
      const { order_id } = req.params;

      const {
        request_type = "CANCEL",
        title,
        content,
        selected_items,
      } = req.body;

      if (!userId) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
      }

      if (!title?.trim()) {
        return res.status(400).json({ message: "제목을 입력해주세요." });
      }

      if (!selected_items) {
        return res.status(400).json({ message: "신청할 상품을 선택해주세요." });
      }

      const selectedItemIds = Array.isArray(selected_items)
        ? selected_items
        : [selected_items];

      if (selectedItemIds.length === 0) {
        return res.status(400).json({ message: "신청할 상품을 선택해주세요." });
      }

      const [order] = await q(
        `
        SELECT order_id, user_id, status
        FROM orders
        WHERE order_id = ?
          AND user_id = ?
        `,
        [order_id, userId]
      );

      if (!order) {
        return res.status(404).json({ message: "주문 정보를 찾을 수 없습니다." });
      }

      if (order.status !== "PAID") {
        return res.status(400).json({
          message: "결제완료 상태의 주문만 취소/반품 신청할 수 있습니다.",
        });
      }

      const placeholders = selectedItemIds.map(() => "?").join(",");

      const selectedRows = await q(
        `
        SELECT
          order_item_id,
          product_table,
          product_id,
          pname,
          filename,
          option_label,
          unit_price,
          quantity,
          line_total
        FROM order_items
        WHERE order_id = ?
          AND order_item_id IN (${placeholders})
        `,
        [order_id, ...selectedItemIds]
      );

      if (selectedRows.length !== selectedItemIds.length) {
        return res.status(400).json({
          message: "선택한 상품 정보가 올바르지 않습니다.",
        });
      }

      const file1 = req.files?.upfile1?.[0]?.filename || null;
      const file2 = req.files?.upfile2?.[0]?.filename || null;

      const result = await q(
        `
        INSERT INTO cancel_refund_requests
          (
            order_id,
            user_id,
            request_type,
            title,
            content,
            status,
            file1,
            file2
          )
        VALUES (?, ?, ?, ?, ?, 'REQUESTED', ?, ?)
        `,
        [
          order_id,
          userId,
          request_type,
          title.trim(),
          content || "",
          file1,
          file2,
        ]
      );

      const requestId = result.insertId;

      for (const item of selectedRows) {
        await q(
          `
          INSERT INTO cancel_refund_request_items
            (
              request_id,
              order_item_id,
              product_table,
              product_id,
              pname,
              filename,
              option_label,
              unit_price,
              quantity,
              line_total
            )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
          [
            requestId,
            item.order_item_id,
            item.product_table,
            item.product_id,
            item.pname,
            item.filename,
            item.option_label,
            item.unit_price,
            item.quantity,
            item.line_total,
          ]
        );
      }

      res.status(201).json({
        message: "취소/반품 신청이 접수되었습니다.",
        request_id: requestId,
      });
    } catch (err) {
      console.error("[POST /api/mpCancel_Refund/:order_id]", err);
      res.status(500).json({ message: "취소/반품 신청 저장 실패" });
    }
  }
);

export default router;