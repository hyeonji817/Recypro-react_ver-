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

