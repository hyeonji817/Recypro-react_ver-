import express from "express";
import { db } from "../server.js";    // 서버 DB 연결 
const router = express.Router();    // 라우터 설정 

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

/** 1) 욕실상품 목록 (최신 12개) */
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

/** 2) 욕실상품 상세 + 옵션그룹/옵션값 */
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    console.log("받은 productId:", productId);

    const productRows = await q(
      "SELECT * FROM product_bath WHERE productId LIKE ?",
      [`%${productId}%`]
    );

    console.log("조회 결과:", productRows);

    if (!productRows.length) {
      return res.status(404).json({ message: "Not found" });
    }

    const product = productRows[0];

    const groups = await q(
      "SELECT * FROM product_option_group WHERE product_id = ? ORDER BY sort_order, id",
      [product.productId]
    );

    const optionGroups = [];

    for (const g of groups) {
      const vals = await q(
        "SELECT * FROM product_option_value WHERE group_id = ? ORDER BY sort_order, id",
        [g.id]
      );

      optionGroups.push({
        id: g.id,
        name: g.name,
        displayName: g.display_name,
        required: !!g.required,
        values: vals.map((v) => ({
          id: v.id,
          label: v.label,
          value: v.value,
          priceDelta: v.price_delta || 0,
          stock: v.stock,
        })),
      });
    }

    // selectColor 컬럼 하위호환 처리
    if ((!groups || groups.length === 0) && product.selectColor) {
      try {
        let colorArray = [];

        // product.selectColor가 이미 객체일 수도 있고, 문자열일 수도 있음
        const rawValue = product.selectColor;

        if (Array.isArray(rawValue)) {
          colorArray = rawValue;
        } else if (typeof rawValue === "object") {
          if (Array.isArray(rawValue.color)) {
            colorArray = rawValue.color;
          } else if (Array.isArray(rawValue.kind)) {
            colorArray = rawValue.kind;
          } else {
            colorArray = Object.values(rawValue).flat();
          }
        } else {
          const raw = String(rawValue).trim();

          if (raw.startsWith("[")) {
            colorArray = JSON.parse(raw);
          } else if (raw.startsWith("{")) {
            const obj = JSON.parse(raw);
            colorArray = Array.isArray(obj.color)
              ? obj.color
              : Array.isArray(obj.kind)
              ? obj.kind
              : Object.values(obj).flat();
          } else {
            colorArray = raw
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
          }
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

    // 이게 반드시 있어야 함
    return res.json({
      ...product,
      optionGroups,
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({
      message: "Server error",
      detail: err.message,
    });
  }
});

export default router;