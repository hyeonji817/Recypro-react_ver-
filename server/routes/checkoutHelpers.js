export const SHIPPING_THRESHOLD = 30000; 
export const SHIPPING_FEE = 3000; 
export const MILEAGE_RATE = 0.05; 

export function calcTotals(items) {
  const subtotal = items.reduce((sum, it) => sum + it.unit_price * it.cart_quantity, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE; 
  const total_mileage = items.reduce((s,it)=>s+Math.floor(it.unit_price * it.cart_quantity * MILEAGE_RATE), 0);
  return { subtotal, shipping_fee: shipping, discount_total: 0, total_pay: subtotal + shipping, total_mileage };
}

export function makeOrderUID(orderId) {
  const rand = crypto.randomBytes(9).toString("base64").replace(/[+/]/g, "_");
  return `recypro_${orderId}_${rand}`;
}