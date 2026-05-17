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

  
}