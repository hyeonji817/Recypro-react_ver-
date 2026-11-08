import {calculateShippingFee} from './shippingPolicy.js';
const fail=message=>Object.assign(Error(message),{status:409});
export async function loadOwnedCoupon(connection,userId,{user_coupon_id,coupon_code},lock=false){
 if(user_coupon_id!=null && (!/^\d+$/.test(String(user_coupon_id))||Number(user_coupon_id)<1))throw fail('보유 쿠폰 번호를 확인해 주세요.');
 const byId=user_coupon_id!=null;
 const [rows]=await connection.query(`SELECT uc.*,c.coupon_code,c.coupon_name,c.discount_type,c.discount_value,
  c.min_order_amount,c.max_discount_amount,c.target_type,c.is_active,e.effect AS benefit_effect,
  (uc.issued_at IS NULL OR uc.issued_at <= NOW()) AS has_started,
  (uc.expired_at IS NULL OR uc.expired_at >= NOW()) AS not_expired
  FROM user_coupons uc JOIN coupons c ON c.coupon_id=uc.coupon_id
  LEFT JOIN coupon_benefit_effects e ON e.coupon_id=c.coupon_id
  WHERE uc.user_id=? AND ${byId?'uc.user_coupon_id=?':'c.coupon_code=?'}
  ${byId?'':'AND uc.used_at IS NULL AND (uc.expired_at IS NULL OR uc.expired_at >= NOW()) AND (uc.issued_at IS NULL OR uc.issued_at <= NOW())'}
  ORDER BY uc.expired_at IS NULL,uc.expired_at,uc.user_coupon_id LIMIT 1 ${lock?'FOR UPDATE':''}`,[userId,byId?user_coupon_id:coupon_code]);
 const coupon=rows[0];
 if(coupon_code&&coupon&&coupon.coupon_code!==coupon_code)throw fail('선택한 쿠폰 정보가 일치하지 않습니다.');
 return coupon||null;
}
export function evaluateOwnedCoupon(coupon,subtotal){
 if(!Number.isSafeInteger(subtotal)||subtotal<=0)throw fail('주문 상품금액을 확인해 주세요.');
 if(!coupon)throw fail('본인이 보유한 쿠폰을 선택해 주세요.');
 if(coupon.used_at!=null)throw fail('이미 사용한 쿠폰입니다.');
 if(Number(coupon.is_active)!==1)throw fail('비활성화된 쿠폰입니다.');
 if(!Number(coupon.has_started))throw fail('아직 사용 기간이 시작되지 않은 쿠폰입니다.');
 if(!Number(coupon.not_expired))throw fail('사용 기간이 만료된 쿠폰입니다.');
 if(coupon.target_type==='OFFLINE')throw fail('오프라인 전용 쿠폰입니다.');
 if(subtotal<Number(coupon.min_order_amount||0))throw fail(`최소 ${Number(coupon.min_order_amount).toLocaleString('ko-KR')}원 이상 구매 시 사용할 수 있습니다.`);
 if(coupon.benefit_effect==='SHIPPING'){
  if(calculateShippingFee(subtotal)===0)throw fail('이미 무료배송이 적용되는 주문입니다.');
  return {coupon_discount:0,shipping_fee:0};
 }
 const value=Number(coupon.discount_value);
 if(!Number.isSafeInteger(value)||value<=0)throw fail('쿠폰 할인 조건을 확인해 주세요.');
 let discount;
 if(coupon.discount_type==='AMOUNT')discount=value;
 else if(coupon.discount_type==='PERCENT'&&value<=100){
  discount=Math.floor(subtotal*value/100);
  if(coupon.max_discount_amount!=null){const cap=Number(coupon.max_discount_amount);if(!Number.isSafeInteger(cap)||cap<0)throw fail('쿠폰 할인 한도가 올바르지 않습니다.');discount=Math.min(discount,cap);}
 }else throw fail('지원하지 않는 쿠폰 종류입니다.');
 discount=Math.max(0,Math.min(subtotal,discount));
 return {coupon_discount:discount,shipping_fee:calculateShippingFee(subtotal,discount)};
}
export async function validateOrderCoupon(connection,userId,order){
 if(!order.user_coupon_id){if(order.coupon_code||Number(order.coupon_discount||0)!==0)throw fail('주문의 쿠폰 정보를 다시 확인해 주세요.');return;}
 const coupon=await loadOwnedCoupon(connection,userId,{user_coupon_id:order.user_coupon_id,coupon_code:order.coupon_code},true);
 const expected=evaluateOwnedCoupon(coupon,Number(order.subtotal));
 if(Number(order.coupon_discount)!==expected.coupon_discount||Number(order.shipping_fee)!==expected.shipping_fee)throw fail('쿠폰 조건이 변경되었습니다. 주문서에서 쿠폰을 다시 적용해 주세요.');
 const total=Math.max(0,Number(order.subtotal)+expected.shipping_fee-expected.coupon_discount-Number(order.used_mileage||0));
 if(Number(order.total_pay)!==total)throw fail('주문의 결제금액을 다시 확인해 주세요.');
}
