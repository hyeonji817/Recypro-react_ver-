const fail=(status,message)=>Object.assign(Error(message),{status});
const sqlDate=date=>date.toISOString().slice(0,19).replace('T',' ');
export function calculatePurchaseMileage(subtotal,couponDiscount=0,usedMileage=0){
 for(const value of [subtotal,couponDiscount,usedMileage])if(!Number.isSafeInteger(value)||value<0)throw fail(400,'적립금 계산 금액은 0 이상의 정수여야 합니다.');
 if(couponDiscount>subtotal)throw fail(400,'쿠폰 할인금액을 확인해 주세요.');
 return Math.floor(Math.max(0,subtotal-couponDiscount-usedMileage)/100);
}
export function reviewMileage(photoCount){if(!Number.isInteger(photoCount)||photoCount<0||photoCount>3)throw fail(400,'사진은 최대 3장까지 첨부해 주세요.');return photoCount?1500:500;}
export async function registerPendingMileage(conn,order){
 const amount=calculatePurchaseMileage(Number(order.subtotal),Number(order.coupon_discount||0),Number(order.used_mileage||0));
 if(Number(order.total_mileage)!==amount)throw fail(409,'적립 기준이 변경되었습니다. 주문서를 다시 작성해 주세요.');
 await conn.query('INSERT INTO mileage_purchase_rewards (order_id,user_id,amount) VALUES (?,?,?) ON DUPLICATE KEY UPDATE order_id=VALUES(order_id)',[order.order_id,order.user_id,amount]);
}
// 호출자는 항상 회원 행을 먼저 잠근다. 기존 원장에 없는 과거 구매분은 소급 지급하지 않는다.
export async function settleMileageLocked(conn,userId,now=new Date()){
 const [rewards]=await conn.query(`SELECT r.*,o.status AS order_status,
  (d.delivered_at IS NOT NULL AND d.delivered_at <= DATE_SUB(?,INTERVAL 7 DAY)) AS is_due
  FROM mileage_purchase_rewards r JOIN orders o ON o.order_id=r.order_id
  LEFT JOIN mileage_delivery_confirmations d ON d.order_id=r.order_id
  WHERE r.user_id=? AND r.status IN ('PENDING','GRANTED') FOR UPDATE`,[sqlDate(now),userId]);
 for(const row of rewards){
  const cancelled=['CANCELLED','REFUNDED'].includes(row.order_status);
  if(cancelled){
   const [[used]]=await conn.query("SELECT COALESCE(SUM(CASE WHEN reason='ORDER_USE' AND delta<0 THEN -delta WHEN reason='ORDER_RESTORE' AND delta>0 THEN -delta ELSE 0 END),0) AS amount FROM mileage_ledger WHERE user_id=? AND order_id=?",[userId,row.order_id]);
   if(Number(used.amount)>0)await conn.query('INSERT INTO mileage_ledger (user_id,order_id,delta,reason,memo) VALUES (?,?,?,?,?)',[userId,row.order_id,Number(used.amount),'ORDER_RESTORE','전체 취소·환불 사용 적립금 반환']);
   if(row.status==='GRANTED'&&Number(row.amount)>0)await conn.query('INSERT INTO mileage_ledger (user_id,order_id,delta,reason,memo) VALUES (?,?,?,?,?)',[userId,row.order_id,-Number(row.amount),'ORDER_EARN_REVERSE','취소·환불 구매 적립금 회수']);
   await conn.query('UPDATE mileage_purchase_rewards SET status=? WHERE order_id=?',[row.status==='GRANTED'?'REVERSED':'CANCELLED',row.order_id]);
  }else if(row.order_status==='PAID'&&row.status==='PENDING'&&Number(row.is_due)){
   let ledger=null;
   if(Number(row.amount)>0){const [result]=await conn.query('INSERT INTO mileage_ledger (user_id,order_id,delta,reason,memo) VALUES (?,?,?,?,?)',[userId,row.order_id,Number(row.amount),'ORDER_EARN','배송완료 7일 경과 구매 적립 1%']);ledger=result.insertId;}
   await conn.query("UPDATE mileage_purchase_rewards SET status='GRANTED',ledger_id=? WHERE order_id=?",[ledger,row.order_id]);
  }
 }
 const [reviews]=await conn.query("SELECT r.* FROM mileage_review_rewards r JOIN orders o ON o.order_id=r.order_id WHERE r.user_id=? AND r.reversed_at IS NULL AND o.status IN ('CANCELLED','REFUNDED') FOR UPDATE",[userId]);
 for(const review of reviews){await conn.query('INSERT INTO mileage_ledger (user_id,order_id,delta,reason,memo) VALUES (?,?,?,?,?)',[userId,review.order_id,-Number(review.amount),'REVIEW_REVERSE','취소·환불 상품 리뷰 적립금 회수']);await conn.query('UPDATE mileage_review_rewards SET reversed_at=NOW() WHERE order_item_id=?',[review.order_item_id]);}
 const [[balance]]=await conn.query('SELECT COALESCE(SUM(delta),0) AS balance FROM mileage_ledger WHERE user_id=?',[userId]);
 return Number(balance.balance);
}
export async function syncMileage(pool,userId,now=new Date()){
 const conn=await pool.promise().getConnection();try{await conn.beginTransaction();const [[user]]=await conn.query('SELECT id,withdrawn_at FROM user WHERE id=? FOR UPDATE',[userId]);if(!user||user.withdrawn_at!=null)throw fail(401,'로그인이 필요합니다.');const balance=await settleMileageLocked(conn,userId,now);await conn.commit();return balance;}catch(error){await conn.rollback();throw error;}finally{conn.release();}
}
export async function confirmDelivery(pool,orderId,adminId,now=new Date()){
 if(!/^\d+$/.test(String(orderId)))throw fail(400,'주문번호를 확인해 주세요.');
 const conn=await pool.promise().getConnection();try{
  await conn.beginTransaction();const [[owner]]=await conn.query('SELECT user_id FROM orders WHERE order_id=?',[orderId]);if(!owner)throw fail(404,'주문이 없습니다.');
  await conn.query('SELECT id FROM user WHERE id=? FOR UPDATE',[owner.user_id]);
  const [[order]]=await conn.query('SELECT status FROM orders WHERE order_id=? FOR UPDATE',[orderId]);if(order.status!=='PAID')throw fail(409,'결제완료 주문만 배송완료 처리할 수 있습니다.');
  await conn.query('INSERT INTO mileage_delivery_confirmations (order_id,user_id,delivered_at,confirmed_by) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE order_id=VALUES(order_id)',[orderId,owner.user_id,sqlDate(now),adminId]);
  await conn.commit();return {message:'배송완료가 기록되었습니다. 구매 적립금은 기록 시각부터 7일 후 지급됩니다.'};
 }catch(error){await conn.rollback();throw error;}finally{conn.release();}
}
export function mileageMiddleware(getPool){return async(req,res,next)=>{const id=req.session?.user?.id||req.session?.userId||req.session?.user_id;if(!id)return next();try{await syncMileage(getPool(),id);next();}catch(error){console.error('[mileage]',{code:error.code});res.status(error.status||503).json({message:error.status?error.message:'적립금 정보를 확인할 수 없습니다. DB 업데이트 여부를 확인해 주세요.'});}};}
export function startMileageJob(pool){let running=false;const run=async()=>{if(running)return;running=true;try{let last='';for(;;){const [rows]=await pool.promise().query('SELECT id FROM user WHERE withdrawn_at IS NULL AND id>? ORDER BY id LIMIT 100',[last]);if(!rows.length)break;for(const row of rows)await syncMileage(pool,row.id);last=rows.at(-1).id;}}catch(error){console.error('[mileage/job]',{code:error.code});}finally{running=false;}};const initial=setTimeout(run,1500);initial.unref();const interval=setInterval(run,3600000);interval.unref();return()=>{clearTimeout(initial);clearInterval(interval);};}
