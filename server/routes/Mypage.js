import express from "express"; 
import { db } from "../server.js"; 

const router = express.Router(); 
const app = express(); 

const q = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });

function parseJsonMaybe(value, fallback = {}) {
  if (!value) return fallback;
  
  // MySQL JSON 컬럼이 이미 객체/배열로 넘어온 경우
  if (typeof value === "object") return value;
  
  // 문자열일 때만 JSON.parse
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (err) {
      console.error("[parseJsonMaybe] JSON parse 실패:", value);
      return fallback;
    }
  }
  
  return fallback;
}

function getSessionUserId(req) {
  return req.session?.user?.id || req.session?.userId;
}

// 로그인 사용자 정보 
router.get("/", (req, res) => {
  const userId = getSessionUserId(req); 

  if (!userId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  res.json({
    id: userId, 
    name: req.session?.user?.name || "",
    grade: req.session?.user?.grade || "MEMBER",
  }); 
});

// 마이페이지 요약 
router.get("/summary", async (req, res) => {
  try {
    const userId = getSessionUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const [[orderSummary], [mileageSummary], [wishSummary]] = await Promise.all([
      q(
        `
        SELECT
          COUNT(*) AS orderCount,
          COALESCE(SUM(total_pay), 0) AS orderTotal
        FROM orders
        WHERE user_id = ?
          AND status = 'PAID'
        `,
        [userId]
      ),
      q(
        `
        SELECT COALESCE(SUM(delta), 0) AS mileage
        FROM mileage_ledger
        WHERE user_id = ?
        `,
        [userId]
      ),
      q(
        `
        SELECT COUNT(*) AS wishCount
        FROM wishlist
        WHERE user_id = ?
        `,
        [userId]
      ).catch(() => [{ wishCount: 0 }]),
    ]);

    res.json({
      user: {
        id: userId,
        name: req.session?.user?.name || userId,
        grade: req.session?.user?.grade || "MEMBER",
      },
      counts: {
        orders: Number(orderSummary?.orderCount || 0),
        wishlist: Number(wishSummary?.wishCount || 0),
        coupons: 0,
        qa: 0,
        reviews: 0,
      },
      money: {
        mileage: Number(mileageSummary?.mileage || 0),
        deposits: 0,
        specialMileage: 0,
        points: 0,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "마이페이지 요약 조회 실패" });
  }
}); 

// 마이페이지 주문내역 
// 마이페이지 주문내역
router.get("/orders", async (req, res) => {
  try {
    const userId = getSessionUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const rows = await q(
      `
      SELECT
        o.order_id,
        o.order_no,
        o.status,
        o.subtotal,
        o.shipping_fee,
        o.discount_total,
        o.total_pay,
        o.total_mileage,
        o.created_at,
        o.paid_at,
        o.pay_method,

        oi.order_item_id,
        oi.product_table,
        oi.product_id,
        oi.pname,
        oi.filename,
        oi.option_label,
        oi.unit_price,
        oi.quantity,
        oi.line_total,
        oi.mileage
      FROM orders o
      LEFT JOIN order_items oi
        ON oi.order_id = o.order_id
      WHERE o.user_id = ?
        AND o.status = 'PAID'
      ORDER BY COALESCE(o.paid_at, o.created_at) DESC,
        o.order_id DESC,
        oi.order_item_id ASC
      `,
      [userId]
    );

    const grouped = {};

    rows.forEach((row) => {
      if (!grouped[row.order_id]) {
        grouped[row.order_id] = {
          order_id: row.order_id,
          order_no: row.order_no,
          status: row.status,
          subtotal: Number(row.subtotal || 0),
          shipping_fee: Number(row.shipping_fee || 0),
          discount_total: Number(row.discount_total || 0),
          total_pay: Number(row.total_pay || 0),
          total_mileage: Number(row.total_mileage || 0),
          created_at: row.created_at,
          paid_at: row.paid_at,
          pay_method: row.pay_method,
          items: [],
        };
      }

      if (row.order_item_id) {
        grouped[row.order_id].items.push({
          order_item_id: row.order_item_id,
          product_table: row.product_table,
          product_id: row.product_id,
          pname: row.pname,
          filename: row.filename,
          option_label: row.option_label,
          unit_price: Number(row.unit_price || 0),
          quantity: Number(row.quantity || 0),
          line_total: Number(row.line_total || 0),
          mileage: Number(row.mileage || 0),
        });
      }
    });

    res.json(Object.values(grouped));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "주문내역 조회 실패" });
  }
});

// 주문 상세 조회
router.get("/orders/:order_id", async (req, res) => {
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
        coupon_code,
        coupon_discount,
        used_mileage,
        pay_method,
        pg_provider,
        buyer_json,
        receiver_json,
        dlv_memo,
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
        options_json,
        option_label,
        unit_price,
        option_delta,
        quantity,
        line_total,
        mileage
      FROM order_items
      WHERE order_id = ?
      ORDER BY order_item_id ASC
      `,
      [order_id]
    );

    res.json({
      ...order,
      subtotal: Number(order.subtotal || 0),
      shipping_fee: Number(order.shipping_fee || 0),
      discount_total: Number(order.discount_total || 0),
      total_pay: Number(order.total_pay || 0),
      total_mileage: Number(order.total_mileage || 0),
      coupon_discount: Number(order.coupon_discount || 0),
      used_mileage: Number(order.used_mileage || 0),
    
      buyer: parseJsonMaybe(order.buyer_json, {}),
      receiver: parseJsonMaybe(order.receiver_json, {}),
    
      items: items.map((item) => ({
        ...item,
        options_json: parseJsonMaybe(item.options_json, {}),
        unit_price: Number(item.unit_price || 0),
        option_delta: Number(item.option_delta || 0),
        quantity: Number(item.quantity || 0),
        line_total: Number(item.line_total || 0),
        mileage: Number(item.mileage || 0),
      })),
    });
  } catch (err) {
    console.error("[GET /api/orders/:order_id]", err);
    res.status(500).json({ message: "주문 상세 조회 실패" });
  }
});

export default router;