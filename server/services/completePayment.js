import crypto from "node:crypto";

const paymentError = (status, message) => Object.assign(new Error(message), { status });
const parseJson = (value, fallback) => {
  if (!value) return fallback;
  return typeof value === "string" ? JSON.parse(value) : value;
};

// 결제 상태, 쿠폰, 적립금 및 장바구니를 동일한 커넥션에서 원자적으로 처리한다.
export async function completeMockPayment(pool, { userId, orderId, by }) {
  if (!userId) throw paymentError(401, "로그인이 필요합니다.");
  if (!orderId || !["string", "number"].includes(typeof orderId)) {
    throw paymentError(400, "주문번호가 필요합니다.");
  }
  const conn = await pool.promise().getConnection();
  try {
    await conn.beginTransaction();
    // 같은 회원의 서로 다른 주문도 직렬화해 잔액의 중복 사용을 방지한다.
    const [[user]] = await conn.query("SELECT id FROM user WHERE id = ? FOR UPDATE", [userId]);
    if (!user) throw paymentError(401, "회원 정보를 찾을 수 없습니다.");
    const column = by === "db" ? "order_id" : "pg_order_uid";
    const [[order]] = await conn.query(
      `SELECT * FROM orders WHERE ${column} = ? AND user_id = ? FOR UPDATE`,
      [orderId, userId]
    );
    if (!order) throw paymentError(404, "주문을 찾을 수 없습니다.");
    // 과거 결제 주문에는 소급 적립하지 않는다. 재시도도 원장을 변경하지 않는다.
    if (order.status === "PAID") {
      await conn.commit();
      return { ok: true, order_id: order.order_id, order_no: order.order_no, message: "이미 결제 완료된 주문입니다." };
    }
    if (order.status !== "PENDING") {
      throw paymentError(409, "결제 대기 상태의 주문만 결제할 수 있습니다.");
    }

    const used = Number(order.used_mileage || 0);
    const earned = Number(order.total_mileage || 0);
    if (![used, earned].every(value => Number.isSafeInteger(value) && value >= 0)) {
      throw paymentError(409, "주문의 적립금 정보가 올바르지 않습니다.");
    }
    const [[summary]] = await conn.query(
      "SELECT COALESCE(SUM(delta), 0) AS balance FROM mileage_ledger WHERE user_id = ?", [userId]
    );
    // 이번 주문의 적립 예정액은 이번 주문의 결제에 사용할 수 없다.
    if (used > Number(summary.balance)) {
      throw paymentError(409, "적립금 잔액이 부족합니다. 주문서를 다시 확인해주세요.");
    }
    if (order.user_coupon_id) {
      const [result] = await conn.query(
        `UPDATE user_coupons SET used_at = NOW(), order_id = ?
         WHERE user_coupon_id = ? AND user_id = ? AND used_at IS NULL
           AND (expired_at IS NULL OR expired_at >= NOW())`,
        [order.order_id, order.user_coupon_id, userId]
      );
      if (result.affectedRows !== 1) throw paymentError(409, "사용할 수 없는 쿠폰입니다. 주문서를 다시 확인해주세요.");
    }
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const orderNo = order.order_no || `${date}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    if (used > 0) {
      await conn.query(
        "INSERT INTO mileage_ledger (user_id, order_id, delta, reason, memo) VALUES (?, ?, ?, ?, ?)",
        [userId, order.order_id, -used, "ORDER_USE", `상품 구매 적립금 사용 (${orderNo})`]
      );
    }
    if (earned > 0) {
      await conn.query(
        "INSERT INTO mileage_ledger (user_id, order_id, delta, reason, memo) VALUES (?, ?, ?, ?, ?)",
        [userId, order.order_id, earned, "ORDER_EARN", `상품 구매 적립 (${orderNo})`]
      );
    }
    await conn.query(
      "UPDATE orders SET status = 'PAID', paid_at = NOW(), order_no = ? WHERE order_id = ? AND user_id = ?",
      [orderNo, order.order_id, userId]
    );
    const items = parseJson(order.items_json, []);
    const cartIds = [...new Set(items.map(item => Number(item.cart_id)).filter(Number.isSafeInteger).filter(id => id > 0))];
    if (cartIds.length) {
      await conn.query(
        `DELETE FROM cart WHERE user_id = ? AND cart_id IN (${cartIds.map(() => "?").join(",")})`,
        [userId, ...cartIds]
      );
    }
    await conn.commit();
    return { ok: true, order_id: order.order_id, order_no: orderNo, message: "MOCK 결제 승인 완료" };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}
