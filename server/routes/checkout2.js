import express from "express"; 
import crypto from "crypto"; 
import { db } from "../server.js"; 

const router = express.Router(); 

const q = (sql, params=[]) => new Promise((res, rej) => {
  db.query(sql, params, (err, rows) => err ? rej(err) : res(rows)); 
});

const SHIPPING_THRESHOLD = 30000; 
const SHIPPING_FEE = 3000; 
const MILEAGE_RATE = 0.05; 

function makeOrderUID(orderId) {
  const rand = crypto.randomBytes(9).toString("base64").replace(/[+/]/g, "_");
  return `recypro_${orderId}_${rand}`;
}

function calcTotals(items) {
  const subtotal = items.reduce((s, it) => s + it.unit_price * it.cart_quantity, 0);
  const shipping_fee = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const coupon_discount = 0; 
  const used_mileage = 0; 
  const discount_total = coupon_discount + used_mileage; 
  const total_pay = Math.max(subtotal + shipping_fee - discount_total, 0);
  const total_mileage = items.reduce(
    (s, it) => s + Math.floor(it.unit_price * it.cart_quantity * MILEAGE_RATE), 0
  );

  return {
    subtotal, shipping_fee, coupon_discount, used_mileage,
    discount_total, total_pay, total_mileage,
    coupon_code: null, coupon_reason: "NO_COUPON", mileage_balance: 0
  };
}

// - Preview (선택 행만) - 
router.get("/preview", async (req, res) => {
  try {
    const userId = req.session?.user?.id || "guswl0817"; 
    const all = String(req.query.all||"") === "1"; 
    const cartIds = (req.query.cart_ids||"")
      .split(",").map(v=>Number(v)).filter(Boolean);
    
    let rows; 
    if (all) {
      rows = await q(`
        SELECT c.*, 
               CASE WHEN c.unit_price > 0 THEN c.unit_price
                    ELSE COALESCE(v.discount_price, v.price, 0) END AS unit_price,
               v.pname, v.filename, v.category
        FROM cart c
        JOIN v_product_catalog v
          ON v.product_table = c.product_table
         AND v.productId     = c.product_id
        WHERE c.user_id=?
        ORDER BY c.created_at DESC
      `, [userId]);
    } else if (cartIds.length) {
      rows = await q(`
        SELECT c.*, 
               CASE WHEN c.unit_price > 0 THEN c.unit_price
                    ELSE COALESCE(v.discount_price, v.price, 0) END AS unit_price,
               v.pname, v.filename, v.category
        FROM cart c
        JOIN v_product_catalog v
          ON v.product_table = c.product_table
         AND v.productId     = c.product_id
        WHERE c.user_id=? AND c.cart_id IN (${cartIds.map(()=>"?").join(",")})
        ORDER BY c.created_at DESC
      `, [userId, ...cartIds]);
    } else {
      return res.status(400).json({ message: "all=1 또는 cart_ids 필요" });
    }

    const items = rows.map(r => ({
      cart_id: r.cart_id,
      product_table: r.product_table,
      product_id: r.product_id,
      pname: r.pname,
      filename: r.filename,
      option_label: r.option_label,
      options_json: r.options_json,
      cart_quantity: r.cart_quantity,
      unit_price: r.unit_price,
      line_total: r.unit_price * r.cart_quantity,
      line_mileage: Math.floor(r.unit_price * r.cart_quantity * MILEAGE_RATE)
    }));

    const totals = calcTotals(items);
    return res.json({ items, totals });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: String(err?.message || err) });
  }
});

// - Prepare (선택행만 구현) - 
router.post("/prepare", async (req, res) => {
  try {
    const userId = req.session?.user?.id || "guswl0817";
    const cartIds = (req.body.cart_ids || req.body.cartIds || [])
      .toString().split(",").map(Number).filter(Boolean);
    if (!cartIds.length) return res.status(400).json({ message: "cart_ids required" });

    const rows = await q(`
      SELECT c.*,
             CASE WHEN c.unit_price > 0 THEN c.unit_price
                  ELSE COALESCE(v.discount_price, v.price, 0) END AS unit_price,
             v.pname, v.filename, v.category
      FROM cart c
      JOIN v_product_catalog v
        ON v.product_table = c.product_table
       AND v.productId     = c.product_id
      WHERE c.user_id=? AND c.cart_id IN (${cartIds.map(()=>"?").join(",")})
      ORDER BY c.created_at DESC
    `, [userId, ...cartIds]);

    if (!rows.length) return res.status(400).json({ message: "선택한 장바구니가 없습니다." });

    const items = rows.map(r => ({
      cart_id: r.cart_id,
      product_table: r.product_table,
      product_id: r.product_id,
      pname: r.pname,
      filename: r.filename,
      option_label: r.option_label,
      options_json: r.options_json,
      cart_quantity: r.cart_quantity,
      unit_price: r.unit_price,
      line_total: r.unit_price * r.cart_quantity,
      line_mileage: Math.floor(r.unit_price * r.cart_quantity * MILEAGE_RATE)
    }));

    const totals = calcTotals(items);

    const { buyer={}, receiver={}, coupon_code=null, pay_method="TOSS", dlv_memo="" } = req.body || {};

    const ins = await q(`
      INSERT INTO orders
        (user_id, status,
         subtotal, discount_total, shipping_fee, total_pay, total_mileage,
         coupon_code, coupon_discount, used_mileage, mileage_balance,
         buyer_json, receiver_json, items_json, totals_json,
         pay_method, dlv_memo, created_at)
      VALUES
        (?, 'PENDING',
         ?, ?, ?, ?, ?,
         ?, ?, ?, ?,
         ?, ?, ?, ?,
         ?, ?, NOW())
    `, [
      userId,
      totals.subtotal, totals.discount_total, totals.shipping_fee, totals.total_pay, totals.total_mileage,
      totals.coupon_code, totals.coupon_discount, totals.used_mileage, totals.mileage_balance,
      JSON.stringify(buyer), JSON.stringify(receiver), JSON.stringify(items), JSON.stringify({ ...totals, cartIds }),
      pay_method, dlv_memo
    ]);

    const order_id = ins.insertId;
    const pg_order_uid = makeOrderUID(order_id);
    await q(`UPDATE orders SET pg_order_uid=? WHERE order_id=?`, [pg_order_uid, order_id]);

    const firstName = items[0]?.pname || "선택 상품";
    const orderName = items.length > 1 ? `${firstName} 외 ${items.length - 1}개` : firstName;

    const successUrl = `${process.env.FRONT_BASE_URL}/pay/success`;
    const failUrl    = `${process.env.FRONT_BASE_URL}/pay/fail`;

    res.json({ order_id, pg_order_uid, orderName, items, totals, successUrl, failUrl, buyer, receiver });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: String(err?.message || err) });
  }
}); 

export default router; 