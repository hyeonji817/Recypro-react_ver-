// 기본 배송비. 적립금은 결제수단이므로 무료배송 판정 금액에서 차감하지 않는다.
export const SHIPPING_THRESHOLD = 80000;
export const SHIPPING_FEE = 3500;

export function calculateShippingFee(subtotal, couponDiscount = 0) {
  for (const value of [subtotal, couponDiscount]) {
    if (!Number.isSafeInteger(value) || value < 0) throw new RangeError('상품금액과 쿠폰 할인금액은 0 이상의 정수여야 합니다.');
  }
  if (couponDiscount > subtotal) throw new RangeError('쿠폰 할인금액은 상품금액을 초과할 수 없습니다.');
  if (subtotal === 0) return 0;
  return subtotal - couponDiscount >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}
