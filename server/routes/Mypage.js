import express from "express"; 
import { db } from "../server.js"; 

const router = express.Router(); 
const app = express(); 

const q = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });

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
      ORDER BY o.paid_at DESC, o.order_id DESC, oi.order_item_id ASC
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
          subtotal: row.subtotal,
          shipping_fee: row.shipping_fee,
          discount_total: row.discount_total,
          total_pay: row.total_pay,
          total_mileage: row.total_mileage,
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
          unit_price: row.unit_price,
          quantity: row.quantity,
          line_total: row.line_total,
          mileage: row.mileage,
        });
      }
    });

    res.json(Object.values(grouped));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "주문내역 조회 실패" });
  }
});

// 마이페이지 정보 가져오기 
/** router.get("/:id", (req, res) => {
  const userId = req.params.id; 
  const query = "SELECT * FROM mypage WHERE id = ?"; 

  pool.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Not found" });

    res.json(results[0]);
  });
}); */

// 새로 저장 (없을 경우) or 수정 
/** router.post("/", (req, res) => {
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
}); */

export default router;