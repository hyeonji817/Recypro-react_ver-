import express from "express";
import { db } from "../server.js";    // 서버 DB 연결 
const router = express.Router();    // 라우터 설정 
const app = express(); 

/** 콜백 기반 db.query → Promise 래퍼 */
const q = (sql, params = []) => 
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

// displayName 매핑 (필요 시 확장)
const GROUP_LABEL = {
  color: "색상", 
  kind: "종류", 
  size: "사이즈",
};

/** 1) 생활상품 목록 (최신 12개) */
router.get("/", async (req, res) => {
  try {
    const rows = await q(
      "SELECT * FROM product_bath ORDER BY productId DESC LIMIT 12"
    );
    return res.json(rows);
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ message: "DB Error", detail: err.message });
  }
});

/** 2) 생활상품 상세 + 옵션그룹/옵션값 */
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;   // 클라이언트에서 넘긴 값 

    // (A) 기본 상품 조회 - 상품ID(PK)로 조회하는 경우 
    const productRows = await q(
      "SELECT * FROM product_bath WHERE productId = ?", 
    );

    if (!productRows.length) 
      return res.status(404).json({ message: "Not found" });

    const product = productRows[0];

    // (B) 옵션 그룹들 

    // (C) 각 그룹의 옵션값 

    // (D) selectColor 컬럼 하위호환 처리 

    // (E) 최종 응답 (항상 JSON)
  } catch (err) {
    console.error("Server error:", err); 
    return res.status(500).json({ message: "Server error", detail: err.message });
  }
});

export default router;