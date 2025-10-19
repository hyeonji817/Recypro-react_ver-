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

    // (B) 옵션 그룹들 - 상품 PK를 저장했다면 productId(PK)로, 상품명 저장했다면 pname으로 조회
    const groups = await q(
      "SELECT * FROM product_option_group WHERE product_id = ? ORDER BY sort_order, id", 
      [productId]
    );

    // (C) 각 그룹의 옵션값 
    const optionGroups = [];
    for (const g of groups) {
      const vals = await q(
        "SELECT * FROM product_option_value WHERE group_id = ? ORDER BY sort_order, id",
        [g.id]
      );
      optionGroups.push({
        id: g.id,
        name: g.name,                  // 예: 'color'
        displayName: g.display_name,   // 예: '종류'
        required: !!g.required,
        values: vals.map((v) => ({
          id: v.id,
          label: v.label,              // 예: '아이보리'
          value: v.value,              // 예: 'ivory'
          priceDelta: v.price_delta || 0,
          stock: v.stock,              // null이면 공통/무제한 처리
        })),
      });
    }

    // (D) selectColor 컬럼 하위호환 처리 

    // (E) 최종 응답 (항상 JSON)
  } catch (err) {
    console.error("Server error:", err); 
    return res.status(500).json({ message: "Server error", detail: err.message });
  }
});

export default router;