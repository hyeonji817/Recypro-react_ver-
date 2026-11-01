import express from "express";
const TABLES = [
  "product_life",
  "product_bath",
  "product_food",
  "product_kitchen",
  "product_pet",
  "product_office",
];
export function createProductInquiryRouter(getDb) {
  const router = express.Router();
  const q = (sql, params = []) =>
    new Promise((resolve, reject) =>
      getDb().query(sql, params, (err, rows) =>
        err ? reject(err) : resolve(rows),
      ),
    );
  const handle = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res)).catch(next);
  router.use((req, res, next) => {
    const id =
      req.session?.userId ||
      req.session?.user?.id ||
      req.session?.user_id?.id ||
      req.session?.user_id;
    if (typeof id !== "string" && typeof id !== "number")
      return res.status(401).json({ message: "로그인이 필요합니다." });
    req.inquiryUser = id;
    next();
  });
  router.get(
    "/products",
    handle(async (req, res) => {
      const term = String(req.query.search || "").trim();
      if (term.length < 2 || term.length > 100)
        return res
          .status(400)
          .json({ message: "상품명은 2~100자로 검색해 주세요." });
      const rows = await q(
        "SELECT product_table, productId AS product_id, pname FROM v_product_catalog WHERE LOCATE(?, pname) > 0 ORDER BY pname LIMIT 30",
        [term],
      );
      res.json(rows);
    }),
  );
  router.get(
    "/",
    handle(async (req, res) => {
      const page = Number(req.query.page || 1),
        status = req.query.status || "all",
        search = String(req.query.search || "").trim();
      if (
        !Number.isSafeInteger(page) ||
        page < 1 ||
        page > 100000 ||
        !["all", "waiting", "answered"].includes(status) ||
        search.length > 100
      )
        return res
          .status(400)
          .json({ message: "조회 조건이 올바르지 않습니다." });
      const where = ["user_id = ?"],
        params = [req.inquiryUser];
      if (status !== "all")
        where.push(
          status === "answered" ? "answer IS NOT NULL" : "answer IS NULL",
        );
      if (search) {
        where.push("(LOCATE(?, title) > 0 OR LOCATE(?, product_name) > 0)");
        params.push(search, search);
      }
      const condition = where.join(" AND ");
      const [count] = await q(
        `SELECT COUNT(*) AS total FROM product_inquiries WHERE ${condition}`,
        params,
      );
      const total = Number(count.total),
        pages = Math.max(1, Math.ceil(total / 10)),
        current = Math.min(page, pages);
      const items = await q(
        `SELECT inquiry_id, product_table, product_id, product_name, title, content, is_secret, answer, answered_at, created_at FROM product_inquiries WHERE ${condition} ORDER BY created_at DESC, inquiry_id DESC LIMIT 10 OFFSET ?`,
        [...params, (current - 1) * 10],
      );
      res.json({ items, total, page: current, pages });
    }),
  );
  function body(req, res) {
    const { title, content, is_secret } = req.body || {};
    if (
      typeof title !== "string" ||
      !title.trim() ||
      title.trim().length > 100 ||
      typeof content !== "string" ||
      !content.trim() ||
      content.trim().length > 5000 ||
      typeof is_secret !== "boolean"
    ) {
      res.status(400).json({
        message: "제목(1~100자), 내용(1~5000자), 비밀글 여부를 확인해 주세요.",
      });
      return null;
    }
    return [title.trim(), content.trim(), is_secret ? 1 : 0];
  }
  router.post(
    "/",
    handle(async (req, res) => {
      const values = body(req, res);
      if (!values) return;
      const { product_table, product_id } = req.body;
      if (
        !TABLES.includes(product_table) ||
        typeof product_id !== "string" ||
        !product_id ||
        product_id.length > 100
      )
        return res.status(400).json({ message: "상품을 선택해 주세요." });
      const [product] = await q(
        "SELECT pname FROM v_product_catalog WHERE product_table = ? AND productId = ? LIMIT 1",
        [product_table, product_id],
      );
      if (!product)
        return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
      const result = await q(
        "INSERT INTO product_inquiries (user_id, product_table, product_id, product_name, title, content, is_secret) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [req.inquiryUser, product_table, product_id, product.pname, ...values],
      );
      res.status(201).json({
        inquiry_id: result.insertId,
        message: "상품문의가 등록되었습니다.",
      });
    }),
  );
  router.use("/:id", (req, res, next) => {
    if (!/^[1-9]\d{0,14}$/.test(req.params.id))
      return res.status(400).json({ message: "잘못된 문의 번호입니다." });
    next();
  });
  router.put(
    "/:id",
    handle(async (req, res) => {
      const values = body(req, res);
      if (!values) return;
      const result = await q(
        "UPDATE product_inquiries SET title = ?, content = ?, is_secret = ? WHERE inquiry_id = ? AND user_id = ? AND answer IS NULL",
        [...values, req.params.id, req.inquiryUser],
      );
      if (!result.affectedRows)
        return res.status(409).json({
          message:
            "수정 가능한 본인 문의가 없습니다. 답변 완료 문의는 수정할 수 없습니다.",
        });
      res.json({ message: "문의가 수정되었습니다." });
    }),
  );
  router.delete(
    "/:id",
    handle(async (req, res) => {
      const result = await q(
        "DELETE FROM product_inquiries WHERE inquiry_id = ? AND user_id = ?",
        [req.params.id, req.inquiryUser],
      );
      if (!result.affectedRows)
        return res
          .status(404)
          .json({ message: "본인 문의를 찾을 수 없습니다." });
      res.json({ message: "문의가 삭제되었습니다." });
    }),
  );
  router.use((err, req, res, next) => {
    console.error("[product-inquiries]", err.code || err.message);
    res.status(500).json({
      message:
        "상품문의 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    });
  });
  return router;
}
