import { membershipMiddleware } from "../services/membershipGrade.js";
import express from "express"; 
import { db } from "../server.js"; 

const router = express.Router();
router.use(membershipMiddleware(() => db)); 
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
    grade: req.membership.grade,
        membership: req.membership,
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
        grade: req.membership.grade,
        membership: req.membership,
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

// 적립금 원장을 기준으로 거래 당시 잔액을 계산한다. 만료일은 현재 스키마에 없다.
router.get("/mileage", async (req, res) => {
  const userId = getSessionUserId(req);
  if (!userId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  try {
    const rows = await q(
      `SELECT id, delta, reason, memo,
              DATE_FORMAT(created_at, '%Y/%m/%d') AS created_at
       FROM mileage_ledger
       WHERE user_id = ?
       ORDER BY mileage_ledger.created_at ASC, id ASC`,
      [userId]
    );
    let balance = 0;
    const history = rows.map((row) => {
      const delta = Number(row.delta);
      balance += delta;
      return {
        id: row.id,
        created_at: row.created_at,
        earned: Math.max(delta, 0),
        used: Math.max(-delta, 0),
        balance,
        expired_at: null,
        description: row.memo || row.reason || "-",
      };
    }).reverse();

    res.json({
      user: {
        id: userId,
        name: req.session?.user?.name || userId,
        grade: req.membership.grade,
        membership: req.membership,
      },
      balance,
      history,
    });
  } catch (err) {
    console.error("[GET /api/mypage/mileage]", err);
    res.status(500).json({ message: "적립금 내역을 불러오지 못했습니다." });
  }
});


// Session-scoped personal reviews. Legacy review rows identify products by pname.
router.get('/reviews', async (req, res) => {
  const userId = getSessionUserId(req);
  if (!userId) return res.status(401).json({ message: '로그인이 필요합니다.' });
  try {
    const [written, purchased] = await Promise.all([
      q('SELECT image, rv_title, rv_rating, date, pname FROM review WHERE id = ? ORDER BY date DESC', [userId]),
      q(`SELECT oi.order_item_id, oi.pname, oi.filename, oi.option_label, o.created_at
         FROM order_items oi JOIN orders o ON o.order_id = oi.order_id
         WHERE o.user_id = ? AND o.status = 'PAID' ORDER BY o.created_at ASC`, [userId])
    ]);
    const reviewed = new Set(written.map(row => row.pname));
    const products = new Map(purchased.map(row => [row.pname, row]));
    res.json({
      written: written.map(row => ({ ...row, filename: products.get(row.pname)?.filename || '', option_label: products.get(row.pname)?.option_label || '' })),
      available: purchased.filter(row => !reviewed.has(row.pname))
    });
  } catch (error) {
    console.error('[mypage/reviews]', error);
    res.status(500).json({ message: '리뷰를 불러오지 못했습니다.' });
  }
});
router.post('/reviews', async (req, res) => {
  const userId = getSessionUserId(req);
  if (!userId) return res.status(401).json({ message: '로그인이 필요합니다.' });
  const { order_item_id, rv_title, rv_rating } = req.body || {};
  if (!Number.isSafeInteger(Number(order_item_id)) || Number(order_item_id) <= 0 || typeof rv_title !== 'string' || !rv_title.trim() || rv_title.length > 1000 || !Number.isInteger(rv_rating) || rv_rating < 1 || rv_rating > 5) {
    return res.status(400).json({ message: '리뷰 내용(1~1000자)과 별점(1~5점)을 확인해 주세요.' });
  }
  try {
    const [item] = await q(`SELECT oi.pname FROM order_items oi JOIN orders o ON o.order_id = oi.order_id WHERE oi.order_item_id = ? AND o.user_id = ? AND o.status = 'PAID'`, [order_item_id, userId]);
    if (!item) return res.status(404).json({ message: '리뷰를 작성할 구매 상품이 없습니다.' });
    const result = await q(`INSERT INTO review (image, rv_title, rv_rating, id, date, pname)
      SELECT '', ?, ?, ?, CURRENT_DATE(), ? FROM DUAL
      WHERE NOT EXISTS (SELECT 1 FROM review WHERE id = ? AND pname = ?)`,
      [rv_title.trim(), rv_rating, userId, item.pname, userId, item.pname]);
    if (!result.affectedRows) return res.status(409).json({ message: '이미 작성한 상품평이 있습니다.' });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('[mypage/reviews/create]', error);
    res.status(500).json({ message: '리뷰를 등록하지 못했습니다.' });
  }
});

export default router;
