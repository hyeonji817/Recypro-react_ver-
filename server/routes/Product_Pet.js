import express from "express"; 
import { db } from "../server";

const router = express.Router();    // 라우터 설정 

/** 콜백 기반 db.query -> Promise 래퍼 */
const q = (sql, params = []) => 
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
  });
});

/** 1) 반려동물 상품 목록 (최신 12개) */
router.get("/", async (req, res) => {
  try {
    const rows = await q(
      "SELECT * FROM product_pet ORDER BY productId DESC LIMIT 12"
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
    const productId = req.params.productId;     // 클라이언트에서 넘긴 값 

    // (A) 기본 상품 조회 - 상품 ID(PK)로 조회하는 경우 
    const productRows = await q(
      "SELECT * FROM product_pet WHERE productId = ?",
      [productId]
    );

    if (!productRows.length) 
      return res.status(404).json({ message: "Not found" });

    const product = productRows[0];

    // (B) 옵션 그룹들 
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

    // (D) selectColor 컬럼 하위호환 처리 (테이블 기반 옵션이 없을 때만)
    if ((!groups || groups.length === 0) && product.selectColor) {
      try {
        let colorArray = [];
        const raw = String(product.selectColor).trim();
        if (raw.startsWith("[")) {
          colorArray = JSON.parse(raw); // ["아이보리","민트",...]
        } else if (raw.startsWith("{")) {
          const obj = JSON.parse(raw);
          colorArray = Array.isArray(obj.color) ? obj.color : [];
        } else {
          colorArray = raw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
        if (colorArray.length > 0) {
          optionGroups.push({
            id: "legacy-color",
            name: "color",
            displayName: "종류",
            required: false,
            values: colorArray.map((c, i) => ({
              id: `legacy-${i}`,
              label: c,
              value: c,
              priceDelta: 0,
              stock: null,
            })),
          });
        }
      } catch (e) {
        console.warn("selectColor parse error:", e);
      }
    }

   // (E) 최종 응답 (항상 JSON)
   return res.json({ ...product, optionGroups });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Server error", detail: err.message });
  }
});

export default router;