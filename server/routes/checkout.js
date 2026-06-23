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
    discount = Math.floor((totals.subtotal * 10) / 100);
    discount = Math.min(discount, 10000);
  }

  const discount_total = (totals.discount_total || 0) + discount; 
  const total_pay = Math.max(0, totals.subtotal + totals.shipping_fee - discount_total);

  return { ...totals, discount_total, total_pay };
}

// 쿠폰 검증 
async function getUsableCoupon(userId, couponCode, subtotal) {
  if (!couponCode) return null;

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
      c.max_discount_amount
    FROM user_coupons uc
    JOIN coupons c ON c.coupon_id = uc.coupon_id
    WHERE uc.user_id = ?
      AND c.coupon_code = ?
      AND uc.used_at IS NULL
      AND c.is_active = 1
      AND (uc.expired_at IS NULL OR uc.expired_at >= NOW())
    LIMIT 1
    `,
    [userId, couponCode]
  );

  const coupon = rows[0];

  if (!coupon) {
    throw new Error("사용할 수 없는 쿠폰입니다.");
  }

  if (subtotal < Number(coupon.min_order_amount || 0)) {
    throw new Error("쿠폰 최소주문금액 조건을 만족하지 않습니다.");
  }

  return coupon;
}

async function getPreview(userId, { all, cart_ids, coupon_code, use_mileage }) {
  // 1) 카트 행 조회
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
    const ids = String(cart_ids)
      .split(",")
      .map((s) => Number(s))
      .filter(Boolean);

    if (!ids.length) {
      return { items: [], totals: {} };
    }

    const placeholders = ids.map(() => "?").join(",");

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

  // 2) 상품 금액 / 적립금 계산
  const items = rows.map((r) => {
    const unitPrice = Number(r.unit_price || r.base_price || 0);
    const qty = Number(r.cart_quantity || 1);
    const lineTotal = unitPrice * qty;
    const mileage = Math.floor(unitPrice * MILEAGE_RATE) * qty;

    let optionsJson = {};

    try {
      if (typeof r.options_json === "string") {
        optionsJson = JSON.parse(r.options_json || "{}");
      } else if (r.options_json && typeof r.options_json === "object") {
        optionsJson = r.options_json;
      }
    } catch (err) {
      optionsJson = {};
    }

    return {
      cart_id: r.cart_id,
      product_table: r.product_table,
      product_id: r.product_id,
      pname: r.pname,
      filename: r.filename,
      option_label: r.option_label,
      options_json: optionsJson,
      unit_price: unitPrice,
      option_delta: Number(r.option_delta || 0),
      quantity: qty,
      line_total: lineTotal,
      mileage,
    };
  });

  const subtotal = items.reduce((sum, item) => {
    return sum + Number(item.line_total || 0);
  }, 0);

  const shipping_fee =
    subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;

  const total_mileage = items.reduce((sum, item) => {
    return sum + Number(item.mileage || 0);
  }, 0);

  // 3) 쿠폰 검증 / 할인 계산
  let usableCoupon = null;
  let coupon_discount = 0;
  let coupon_reason = "";

  const couponCode = coupon_code || null;

  if (couponCode) {
    const couponRows = await q(
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
        c.target_type,
        c.is_active
      FROM user_coupons uc
      JOIN coupons c ON c.coupon_id = uc.coupon_id
      WHERE uc.user_id = ?
        AND c.coupon_code = ?
        AND uc.used_at IS NULL
        AND c.is_active = 1
        AND (uc.expired_at IS NULL OR uc.expired_at >= NOW())
      LIMIT 1
      `,
      [userId, couponCode]
    );

    usableCoupon = couponRows[0] || null;

    if (!usableCoupon) {
      coupon_reason = "사용할 수 없는 쿠폰입니다.";
    } else if (subtotal < Number(usableCoupon.min_order_amount || 0)) {
      coupon_reason = "쿠폰 최소주문금액 조건을 만족하지 않습니다.";
      usableCoupon = null;
    } else {
      if (usableCoupon.discount_type === "AMOUNT") {
        coupon_discount = Number(usableCoupon.discount_value || 0);
      }

      if (usableCoupon.discount_type === "PERCENT") {
        const rawDiscount = Math.floor(
          subtotal * (Number(usableCoupon.discount_value || 0) / 100)
        );

        if (usableCoupon.max_discount_amount == null) {
          coupon_discount = rawDiscount;
        } else {
          coupon_discount = Math.min(
            rawDiscount,
            Number(usableCoupon.max_discount_amount || 0)
          );
        }
      }

      // 할인금액이 상품합계보다 커지는 것 방지
      coupon_discount = Math.min(coupon_discount, subtotal);

      coupon_reason = "쿠폰 적용 가능";
    }
  }

  // 4) 적립금 잔액 조회
  let myBalance = 0;

  try {
    const [mileageRow] = await q(
      `
      SELECT COALESCE(SUM(delta), 0) AS bal
        FROM mileage_ledger
       WHERE user_id = ?
      `,
      [userId]
    );

    myBalance = Number(mileageRow?.bal || 0);
  } catch (err) {
    console.warn("[getPreview] mileage_ledger 조회 실패:", err.message);
    myBalance = 0;
  }

  // 5) 적립금 사용 한도 계산
  const wantedUse = Math.max(
    0,
    parseInt(use_mileage || "0", 10) || 0
  );

  const afterCoupon = Math.max(
    0,
    subtotal + shipping_fee - coupon_discount
  );

  const mileage_to_use = Math.min(
    wantedUse,
    myBalance,
    afterCoupon
  );

  // 6) 최종 결제 금액 계산
  const discount_total = coupon_discount;

  const total_pay = Math.max(
    0,
    subtotal + shipping_fee - discount_total - mileage_to_use
  );

  return {
    items,
    totals: {
      subtotal,
      shipping_fee,

      coupon_code: usableCoupon?.coupon_code || null,
      user_coupon_id: usableCoupon?.user_coupon_id || null,
      coupon_discount,
      coupon_reason,

      used_mileage: mileage_to_use,
      mileage_balance: myBalance,

      discount_total,
      total_pay,
      total_mileage,
    },
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
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

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

// 2. 주문 
router.post("/prepare", async (req, res) => {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }
  
  const { all, cart_ids, coupon_code, use_mileage, buyer, receiver, dlv_memo } = req.body;

  const preview = await getPreview(userId, { all, cart_ids, coupon_code, use_mileage });
  if (!preview.items.length) return res.status(400).json({ message: "주문할 상품이 없습니다." });

  const o = preview.totals;

  const orderResult = await q(`
    INSERT INTO orders
      (user_id, status, subtotal, discount_total, shipping_fee, total_pay, total_mileage,
       coupon_code, coupon_discount, used_mileage,
       buyer_name, buyer_phone, buyer_cell, buyer_email,
       recv_name, recv_phone, recv_cell, recv_zip, recv_addr1, recv_addr2, dlv_memo, pay_method, pg_provider)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `, [
    userId, 'PENDING',
    o.subtotal, o.discount_total, o.shipping_fee, o.total_pay, o.total_mileage,
    o.coupon_code, o.coupon_discount, o.used_mileage,
    buyer?.name||null, buyer?.phone||null, buyer?.cell||null, buyer?.email||null,
    receiver?.name||null, receiver?.phone||null, receiver?.cell||null,
    receiver?.zip||null, receiver?.addr1||null, receiver?.addr2||null,
    dlv_memo||null, 'TOSS', 'TOSS'
  ]);
  const orderId = orderResult.insertId;

  for (const it of preview.items) {
    await q(`
      INSERT INTO order_items
        (order_id, product_table, product_id, pname, filename, options_json, option_label,
         unit_price, option_delta, quantity, line_total, mileage)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
    `, [
      orderId, it.product_table, it.product_id, it.pname, it.filename || null,
      JSON.stringify({}), it.option_label || null,
      it.unit_price, 0, it.quantity, it.line_total, it.mileage
    ]);
  }

  await q(
    `UPDATE orders
        SET buyer_json=?,
            receiver_json=?,
            items_json=?,
            totals_json=?
      WHERE order_id=?`,
    [
      JSON.stringify(buyer || {}),
      JSON.stringify(receiver || {}),
      JSON.stringify(preview.items || []),
      JSON.stringify(preview.totals || {}),
      orderId
    ]
  );

  // ⚠️ 여기서 coupon_redemptions / mileage_ledger(-) INSERT 하지 마세요 (결제 실패 대비)

  const pgOrderUID = makeOrderUID(orderId);
  await q(`UPDATE orders SET pg_order_uid=? WHERE order_id=?`, [pgOrderUID, orderId]);

  const orderName = preview.items.length === 1
    ? preview.items[0].pname
    : `${preview.items[0].pname} 외 ${preview.items.length - 1}건`;

  // 응답
  res.json({
    order_id: orderId,
    pg_order_uid: pgOrderUID,          // ← 이름 통일!
    amount: o.total_pay,
    orderName,
    successUrl: `${process.env.WEB_ORIGIN}/pay/success`,
    failUrl: `${process.env.WEB_ORIGIN}/pay/fail`,
    items: preview.items, 
    totals: preview.totals
  });
});

// 2-2. 장바구니 비우기
function parseJsonMaybe(value, fallback) {
  if (!value) return fallback; 

  // 이미 배열/객체면 그대로 사용 
  if (typeof value === "object") return value; 

  // 문자열일 때만 JSON.parse 
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error("JSON parse 실패:", value);
      return fallback;
    }
  }

  return fallback;
}

async function clearOrderCartItems(ord) {
  const items = parseJsonMaybe(ord.items_json, []);

  const cartIds = [
    ...new Set(
      items
        .map((it) => Number(it.cart_id))
        .filter(Boolean)
    )
  ];

  console.log("[clearOrderCartItems] user_id:", ord.user_id);
  console.log("[clearOrderCartItems] cartIds:", cartIds);

  if (!cartIds.length) return;

  await q(
    `
    DELETE FROM cart
    WHERE user_id = ?
      AND cart_id IN (${cartIds.map(() => "?").join(",")})
    `,
    [ord.user_id, ...cartIds]
  );
}

// 3. 결제 승인(confirm) API (Toss) 
// --- 모의 결제 승인: 실제 PG 호출 없이 주문을 PAID 처리 --- 
// --- 모의 결제 승인: PG 없이 주문을 PAID 처리 --- (수정본)
router.post("/confirm-mock", async (req, res) => {
  try {
    const { orderId, by = "pg" } = req.body;
    // orderId 는 pg_order_uid 또는 order_id 둘 다 허용
    let ord;
    if (by === "db") {
      [ord] = await q(`SELECT * FROM orders WHERE order_id = ?`, [orderId]);
    } else {
      [ord] = await q(`SELECT * FROM orders WHERE pg_order_uid = ?`, [orderId]);
    }

    if (!ord) return res.status(404).json({ message: "주문을 찾을 수 없습니다." });
    if (ord.status === "PAID") {
      await clearOrderCartItems(ord); 

      // 이미 결제 완료면 현재 스냅샷 반환
      return res.json({
        ok: true,
        order_id: ord.order_id,
        order_no: ord.order_no
      });
    }

    // 주문번호 생성(예: 20251014-AB12C)
    const ymd = new Date().toISOString().slice(0,10).replace(/-/g, "");
    const tail = crypto.randomBytes(3)
      .toString("base64")
      .replace(/[+/=]/g,"")
      .slice(0,5)
      .toUpperCase();
    const order_no = `${ymd}-${tail}`;

    await q(
      `UPDATE orders 
        SET status='PAID', paid_at=NOW(), order_no=?
        WHERE order_id=?`,
      [order_no, ord.order_id]
    );

    // 결제 완료된 장바구니 상품 삭제 
    await clearOrderCartItems(ord);

    return res.json({ 
      ok:true,
      order_id: ord.order_id, 
      order_no,
      message: "MOCK 결제 승인 완료"
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "모의 결제 승인 중 오류" });
  }
});

// 4. 주문 생성 API - POST /api/checkout/submit
router.post("/submit", async (req, res) => {
  const conn = db; // 트랜잭션 필요하면 pool.getConnection 사용
  try {
    const userId = req.user?.user_id || "guswl0817";
    const {
      all, cart_ids, coupon_code,
      buyer, receiver, pay_method, dlv_memo
    } = req.body;

    // 1) 프리뷰 로직 재사용(항상 서버 재계산!)
    // ...위 preview 쿼리와 동일하게 rows 조회
    // 여기서는 중복을 줄이려고 함수화하는 걸 추천

    // (간결화를 위해 재조회 코드 생략) => items, totals 구했다고 가정
    const { items, totals } = await getPreviewForSubmit(userId, { all, cart_ids, coupon_code });

    if (items.length === 0) return res.status(400).json({ message: "주문할 상품이 없습니다." });

    // 2) orders/ order_items INSERT (트랜잭션 권장)
    const orderResult = await q(`
      INSERT INTO orders
        (user_id, status, subtotal, discount_total, shipping_fee, total_pay, total_mileage, coupon_code,
         buyer_name, buyer_phone, buyer_cell, buyer_email,
         recv_name, recv_phone, recv_cell, recv_zip, recv_addr1, recv_addr2, dlv_memo, pay_method)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `, [
      userId, 'PENDING',
      totals.subtotal, totals.discount_total, totals.shipping_fee, totals.total_pay, totals.total_mileage, coupon_code || null,
      buyer?.name || null, buyer?.phone || null, buyer?.cell || null, buyer?.email || null,
      receiver?.name || null, receiver?.phone || null, receiver?.cell || null,
      receiver?.zip || null, receiver?.addr1 || null, receiver?.addr2 || null,
      dlv_memo || null, pay_method || null
    ]);

    const orderId = orderResult.insertId;

    // 아이템들 삽입
    for (const it of items) {
      await q(`
        INSERT INTO order_items
          (order_id, product_table, product_id, pname, filename,
           options_json, option_label, unit_price, option_delta, quantity, line_total, mileage)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
      `, [
        orderId, it.product_table, it.product_id, it.pname, it.filename || null,
        JSON.stringify(it.options_json || {}), it.option_label || null,
        it.unit_price, it.option_delta || 0, it.quantity, it.line_total, it.mileage
      ]);
    }

    // 3) 결제 연동 직전: 선택한 카트 비우기(선택)
    if (all === "1") {
      await q(`DELETE FROM cart WHERE user_id = ?`, [userId]);
    } else if (cart_ids) {
      const ids = cart_ids.split(",").map(s => +s).filter(Boolean);
      if (ids.length) {
        const placeholders = ids.map(()=>"?").join(",");
        await q(`DELETE FROM cart WHERE user_id = ? AND cart_id IN (${placeholders})`, [userId, ...ids]);
      }
    }

    res.json({ order_id: orderId, totals, items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "주문 생성 실패" });
  }

  // 주문처리 후 장바구니 비우기 
  router.post("/", async (req, res) => {
    const userId = req.session?.userId;
  
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }
  
    const {
      cartIds,
      receiverName,
      receiverPhone,
      receiverAddress,
      totalPrice,
      paymentMethod
    } = req.body;
  
    if (!cartIds || cartIds.length === 0) {
      return res.status(400).json({ message: "주문할 상품이 없습니다." });
    }
  
    const conn = await db.promise().getConnection();
  
    try {
      await conn.beginTransaction();
  
      // 1. 주문 기본 정보 저장
      const [orderResult] = await conn.query(
        `
        INSERT INTO orders
        (user_id, receiver_name, receiver_phone, receiver_address, total_price, payment_method)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          userId,
          receiverName,
          receiverPhone,
          receiverAddress,
          totalPrice,
          paymentMethod
        ]
      );
  
      const orderId = orderResult.insertId;
  
      // 2. 장바구니에서 주문할 상품 조회
      const [cartRows] = await conn.query(
        `
        SELECT *
        FROM cart
        WHERE user_id = ?
          AND cart_id IN (?)
        `,
        [userId, cartIds]
      );
  
      if (cartRows.length === 0) {
        throw new Error("주문할 장바구니 상품이 없습니다.");
      }
  
      // 3. 주문 상세 저장
      for (const item of cartRows) {
        await conn.query(
          `
          INSERT INTO order_items
          (
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
            total_price,
            mileage
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
          [
            orderId,
            item.product_table,
            item.product_id,
            item.pname || "",
            item.filename || null,
            item.options_json || null,
            item.option_label || null,
            item.unit_price || 0,
            item.option_delta || 0,
            item.cart_quantity || 1,
            item.total_price || 0,
            item.mileage || 0
          ]
        );
      }
  
      // 4. 주문 완료된 장바구니 상품 삭제
      await conn.query(
        `
        DELETE FROM cart
        WHERE user_id = ?
          AND cart_id IN (?)
        `,
        [userId, cartIds]
      );
  
      await conn.commit();
  
      res.json({
        ok: true,
        message: "주문이 완료되었습니다.",
        orderId
      });
  
    } catch (err) {
      await conn.rollback();
      console.error(err);
      res.status(500).json({ message: "주문 처리 중 오류가 발생했습니다." });
    } finally {
      conn.release();
    }
  });
});

export default router;