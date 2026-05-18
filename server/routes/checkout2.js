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

