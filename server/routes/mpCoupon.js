// server/routes/mpCoupon.js
import express from "express";
import { db } from "../server.js";

const router = express.Router();

const q = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });

function getSessionUserId(req) {
  return req.session?.user?.id || req.session?.userId;
}

const formatDate = (value) => {
  if (!value) return null;
  return new Date(value).toISOString().slice(0, 10);
};

function calcDiscount(coupon, subtotal) {
  const minAmount = Number(coupon.min_order_amount || 0);

  if (subtotal < minAmount) return 0;

  if (coupon.discount_type === "AMOUNT") {
    return Number(coupon.discount_value || 0);
  }

  if (coupon.discount_type === "PERCENT") {
    const raw = Math.floor(subtotal * (Number(coupon.discount_value || 0) / 100));
    const max = coupon.max_discount_amount;

    if (max == null) return raw;
    return Math.min(raw, Number(max));
  }

  return 0;
}

// 마이페이지 쿠폰 내역 조회
router.get("/", async (req, res) => {
  try {
    const userId = getSessionUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const rows = await q(
      `
      SELECT
        uc.user_coupon_id,
        uc.user_id,
        uc.issued_at,
        uc.expired_at,
        uc.used_at,
        uc.order_id,

        c.coupon_id,
        c.coupon_code,
        c.coupon_name,
        c.discount_type,
        c.discount_value,
        c.min_order_amount,
        c.max_discount_amount,
        c.target_type
      FROM user_coupons uc
      JOIN coupons c ON c.coupon_id = uc.coupon_id
      WHERE uc.user_id = ?
      ORDER BY uc.user_coupon_id DESC
      `,
      [userId]
    );

    const coupons = rows.map((r, index) => {
      const isExpired =
        r.expired_at && new Date(r.expired_at).getTime() < Date.now();

      let status = "AVAILABLE";
      if (r.used_at) status = "USED";
      else if (isExpired) status = "EXPIRED";

      return {
        no: rows.length - index,
        user_coupon_id: r.user_coupon_id,
        coupon_id: r.coupon_id,
        coupon_code: r.coupon_code,
        coupon_name: r.coupon_name,
        discount_type: r.discount_type,
        discount_value: r.discount_value,
        min_order_amount: r.min_order_amount,
        max_discount_amount: r.max_discount_amount,
        target_type: r.target_type,
        issued_at: formatDate(r.issued_at),
        expired_at: formatDate(r.expired_at),
        used_at: formatDate(r.used_at),
        order_id: r.order_id,
        status,
      };
    });

    const availableCount = coupons.filter((c) => c.status === "AVAILABLE").length;

    res.json({
      user: {
        user_id: userId,
        grade: "MEMBER",
      },
      summary: {
        total: coupons.length,
        available: availableCount,
      },
      coupons,
    });
  } catch (err) {
    console.error("[GET /api/mpCoupon]", err);
    res.status(500).json({ message: "쿠폰 내역 조회 실패" });
  }
});

// 주문서에서 사용 가능한 쿠폰 조회
router.get("/available", async (req, res) => {
  try {
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const subtotal = Number(req.query.subtotal || 0);

    const rows = await q(
      `
      SELECT
        uc.user_coupon_id,
        uc.used_at,
        uc.expired_at,
        c.coupon_id,
        c.coupon_code,
        c.coupon_name,
        c.discount_type,
        c.discount_value,
        c.min_order_amount,
        c.max_discount_amount,
        c.is_active
      FROM user_coupons uc
      JOIN coupons c ON c.coupon_id = uc.coupon_id
      WHERE uc.user_id = ?
      ORDER BY uc.issued_at DESC
      `,
      [userId]
    );

    const coupons = rows.map((cp) => {
      let usable = true;
      let reason = "사용 가능";

      if (cp.used_at) {
        usable = false;
        reason = "이미 사용한 쿠폰입니다.";
      } else if (!cp.is_active) {
        usable = false;
        reason = "비활성화된 쿠폰입니다.";
      } else if (cp.expired_at && new Date(cp.expired_at) < new Date()) {
        usable = false;
        reason = "기간이 만료된 쿠폰입니다.";
      } else if (subtotal < Number(cp.min_order_amount || 0)) {
        usable = false;
        reason = "최소주문금액 조건 미충족";
      }

      return {
        ...cp,
        usable,
        reason,
      };
    });

    res.json({ coupons });
  } catch (err) {
    console.error("[GET /api/mpCoupon/available]", err);
    res.status(500).json({ message: "쿠폰 조회 실패" });
  }
});

export default router;