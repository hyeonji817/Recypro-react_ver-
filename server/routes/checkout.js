// 주문 생성 페이지 (장바구니 기반)
// routes/checkout.js 
import express from "express"; 
import crypto from "crypto"; 
import { db } from "../server.js"; 

const router = express.Router(); 

const q = (sql, params=[]) => new Promise((res, rej) => {
  db.query(sql, params, (err, rows) => err ? rej(err) : res(rows));
});

// 무료배송 임계값/배송비 정책 예시 
const SHIPPING_THRESHOLD = 30000; 
const SHIPPING_FEE = 3000; 
const MILEAGE_RATE = 0.05; 

// 공통 헬퍼: 주문 UID 
function makeOrderUID(orderId) {
  const rand = crypto.randomBytes(9).toString("base64").replace(/[+/]/g, "_");
  return `recypro_test_${orderId}_${Date.now()}_${rand}`;
}

// 장바구니 -> 주문 미리보기/재계산 공통 함수(간단 예시)
// v_product_catalog 뷰(또는 조인)에서 상품 기본정보를 가져온다는 전제
async function loadCartSnapshot({ user_id, all, cart_ids }) {
  let where = "c.user_id = ?";
  const params = [user_id]; 

  if (!all && cart_ids) {
    const ids = String(cart_ids)
      .split(",")
      .map((s) => Number(s.trim()))
      .filter(Boolean);
    if (ids.length) {
      where += ` AND c.cart_id IN (${ids.map(() => "?").join(",")})`;
      params.push(...ids);
    }
  }

  const rows = await q (
    `
    SELECT
      c.cart_id,
      c.product_id,
      c.product_table,
      c.cart_quantity AS quantity,
      c.options_json,
      c.option_label,
      COALESCE(v.discount_price, v.price) AS base_price,
      v.pname,
      v.filename
    FROM cart c
    JOIN v_product_catalog v
      ON v.product_table = c.product_table
     AND v.productId     = c.product_id
    WHERE ${where}
    ORDER BY c.created_at DESC
  `,
    params
  );

  // 금액 계산
  let subtotal = 0;
  const items = rows.map((r) => {
    const unit_price = Number(r.base_price || 0); // 옵션가까지 합산해 담고 싶으면 여기서 합산
    const quantity = Number(r.quantity || 1);
    const line_total = unit_price * quantity;
    const mileage = Math.floor(unit_price * MILEAGE_RATE);

    subtotal += line_total;
    return {
      cart_id: r.cart_id,
      product_id: r.product_id,
      product_table: r.product_table,
      pname: r.pname,
      filename: r.filename,
      option_label: r.option_label,
      unit_price,
      quantity,
      line_total,
      mileage,
    };
  });

  const shipping_fee = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE; 
  const discount_total = 0;     // 쿠폰 적용은 별도 함수에서 
  const total_pay = subtotal + shipping_fee - discount_total; 
  const total_mileage = items.reduce((s, it) => s + it.mileage, 0);

  return {
    items,
    totals: { subtotal, shipping_fee, discount_total, total_pay, total_mileage },
  };  
}

function applyCoupon (totals, coupon_code) {
  // 아주 단순 예시: "CPN5K" -> 5,000원, "CPN10P" → 10% (최대 1만원)
  let discount = 0; 
  if (!coupon_code) return { ...totals }; 

  if (coupon_code === "CPN5K") {
    discount = 5000; 
  } else if (coupon_code === "CPN10P") {
    discount = Math.floor((total_mileage.subtotal * 10) / 100);
    discount = Math.min(discount, 10000);
  }

  const discount_total = (totals.discount_total || 0) + discount; 
  const total_pay = Math.max(0, totals,subtotal + totals.shipping_fee - discount_total);

  return { ...totals, discount_total, total_pay };
}

async function getPreview(userId, { all, cart_ids, coupon_code, use_mileage }) {
  // 1) 카트 행 조회 (기존 /preview 쿼리 그대로 활용)
  let rows;
  if (all === "1") {
    rows = await q(`
      SELECT c.*, v.pname, v.filename, v.category,
             COALESCE(v.discount_price, v.price) AS base_price
        FROM cart c
        JOIN v_product_catalog v
          ON v.product_table = c.product_table
         AND v.productId     = c.product_id
       WHERE c.user_id = ?
       ORDER BY c.created_at DESC
    `, [userId]);
  } else if (cart_ids) {
    const ids = String(cart_ids).split(",").map(s => +s).filter(Boolean);
    if (!ids.length) return { items: [], totals: {} };
    const placeholders = ids.map(()=>"?").join(",");
    rows = await q(`
      SELECT c.*, v.pname, v.filename, v.category,
             COALESCE(v.discount_price, v.price) AS base_price
        FROM cart c
        JOIN v_product_catalog v
          ON v.product_table = c.product_table
         AND v.productId     = c.product_id
       WHERE c.user_id = ?
         AND c.cart_id IN (${placeholders})
       ORDER BY c.created_at DESC
    `, [userId, ...ids]);
  } else {
    return { items: [], totals: {} };
  }

  // 2) 금액/마일리지 계산 (서버 권위)
  const items = rows.map(r => {
    const unitPrice = r.unit_price || r.base_price || 0;
    const qty = r.cart_quantity || 1;
    const lineTotal = unitPrice * qty;
    const mileage = Math.floor(unitPrice * MILEAGE_RATE) * qty;
    return {
      cart_id: r.cart_id,
      product_table: r.product_table,
      product_id: r.product_id,
      pname: r.pname,
      filename: r.filename,
      option_label: r.option_label,
      unit_price: unitPrice,
      option_delta: r.option_delta || 0,
      quantity: qty,
      line_total: lineTotal,
      mileage
    };
  });

  const subtotal = items.reduce((s,i)=>s+i.line_total, 0);
  const shipping_fee = (subtotal >= SHIPPING_THRESHOLD || subtotal === 0) ? 0 : SHIPPING_FEE;

  // 3. 쿠폰 검증/할인 
  let coupon = null; 
  if (coupon_code) {
    const [c] = await q(`SELECT * FROM coupons WHERE code=?`, [coupon_code]);
    coupon = c || null;
    // 예시: 1인 1회 제한
    if (coupon?.per_user_limit === 1) {
      const [used] = await q(
        `SELECT COUNT(1) AS c FROM coupon_redemptions WHERE code=? AND user_id=?`,
        [coupon_code, userId]
      );
      if (used.c > 0) coupon = { ...coupon, active: 0 };
    }
    if (coupon?.total_limit && coupon.used_count >= coupon.total_limit) {
      coupon = { ...coupon, active: 0 };
    }
  }
  const { discount: coupon_discount, reason } = calcCouponDiscount({ subtotal, coupon });

  // 4. 적립금 사용 한도 
  const myBalance = await getMileageBalance(userId); 
  const wantedUse = Math.max(0, parseInt(use_mileage || "0", 10) || 0);
  const afterCoupon = Math.max(0, subtotal - coupon_discount + shipping_fee);
  const mileage_to_use = Math.min(wantedUse, myBalance, afterCoupon);

  // 4-2. 적립금 잔액 조회 
  async function getMileageBalance(userId) {
    const [row] = await q(
      `SELECT COALESCE(SUM(delta), 0) AS bal
        FROM mileage_ledger
        WHERE user_id = ?`,
      [userId]
    );
    return Number(row?.bal || 0);
  }

  // 5. 총 결제금액 (= 실제 결제 요청 금액)
  const discount_total = coupon_discount; // (+ 다른 할인 항목이 있으면 여기 합산)
  const total_pay = Math.max(0, subtotal + shipping_fee - discount_total - mileage_to_use);
  const total_mileage = items.reduce((s,i)=>s+i.mileage, 0);

  return {
    items,
    totals: {
      subtotal,
      shipping_fee,
      coupon_code: coupon_code || null,
      coupon_discount,
      coupon_reason: reason,
      used_mileage: mileage_to_use,
      mileage_balance: myBalance,
      discount_total, // 가독성용
      total_pay,
      total_mileage
    }
  };
}

// 쿠폰할인 
function calcCouponDiscount({ subtotal, coupon }) {
  if (!coupon) return { discount: 0, reason: 'NO_COUPON' };
  if (coupon.active !== 1) return { discount: 0, reason: 'INACTIVE' };

  const now = Date.now();
  if (coupon.starts_at && now < +new Date(coupon.starts_at)) return { discount: 0, reason: 'NOT_STARTED' };
  if (coupon.ends_at   && now > +new Date(coupon.ends_at))   return { discount: 0, reason: 'EXPIRED' };

  if (subtotal < coupon.min_order) return { discount: 0, reason: 'MIN_NOT_MET' };

  let discount = 0;
  if (coupon.type === 'FIXED') {
    discount = coupon.value;
  } else if (coupon.type === 'PERCENT') {
    discount = Math.floor(subtotal * (coupon.value / 100));
    if (coupon.max_discount) discount = Math.min(discount, coupon.max_discount);
  }
  discount = Math.max(0, Math.min(discount, subtotal)); // 과할인 방지
  return { discount, reason: 'OK' };
}

// 1. 카트 -> 프리뷰 아이템 조회 (v_product_catalog 뷰 재활용)
router.get("/preview", async (req, res) => {
  try {
    const userId = req.user?.user_id || "guswl0817"; 
    const preview = await getPreview(userId, {
      all: req.query.all, 
      cart_ids: req.query.cart_ids, 
      coupon_code: req.query.coupon_code, 
      use_mileage: req.query.use_mileage
    });
    res.json(preview);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "프리뷰 조회 실패" });
  }
});

