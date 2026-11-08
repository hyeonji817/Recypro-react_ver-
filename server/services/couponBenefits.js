import { getMembershipGrade } from './membershipGrade.js';
const DAY=86400000;
const KST=9*3600000;
export const BENEFIT_POLICY=Object.freeze({welcomeDays:90,monthlyDays:90,birthdayDays:30});
export const birthdayRates=Object.freeze({NEW:0,BRONZE:3,SILVER:5,GOLD:5,PLATINUM:7,VIP:7,QUEEN:10});
const sqlDate=date=>date.toISOString().slice(0,19).replace('T',' ');
export function koreaDate(now=new Date()) { return new Date(now.getTime()+KST).toISOString().slice(0,10); }
export function validateBirthDate(input,now=new Date()) {
 if(typeof input!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(input)) throw Object.assign(Error('생년월일을 YYYY-MM-DD 형식으로 입력해 주세요.'),{status:400});
 const date=new Date(input+'T00:00:00Z');
 if(!Number.isFinite(+date)||date.toISOString().slice(0,10)!==input||input>koreaDate(now)||input<'1900-01-01') throw Object.assign(Error('올바른 생년월일을 확인해 주세요.'),{status:400});
 return input;
}
export function birthdayMatches(birth,today) {
 if(!birth) return false;
 const md=String(birth).slice(5,10);
 const year=Number(today.slice(0,4));
 const leap=year%4===0&&(year%100!==0||year%400===0);
 return md===today.slice(5)||(md==='02-29'&&!leap&&today.slice(5)==='02-28');
}
const wrap=conn=>({promise:()=>conn});
// Date 객체 대신 DATE_FORMAT 문자열을 사용하여 서버 시간대에 따른 생일 이동을 막는다.
export async function ensureCouponBenefits(pool,userId,now=new Date()) {
 const conn=await pool.promise().getConnection();
 try {
  await conn.beginTransaction();
  const [[user]]=await conn.query('SELECT id, withdrawn_at FROM user WHERE id = ? FOR UPDATE',[userId]);
  if(!user||user.withdrawn_at!=null) throw Object.assign(Error('이용할 수 없는 계정입니다.'),{status:401});
  await conn.query('INSERT INTO coupon_benefit_profiles (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id)',[userId]);
  const [[profile]]=await conn.query("SELECT DATE_FORMAT(birth_date,'%Y-%m-%d') AS birth_date FROM coupon_benefit_profiles WHERE user_id = ?",[userId]);
  const today=koreaDate(now);
  const grants=[];
  for(const [value,min] of [[2000,20000],[3000,30000],[5000,50000],[10000,100000]]) grants.push({key:'WELCOME:'+value,code:'CB_JOIN_'+value,name:'리싸이프로 가입 축하 '+value.toLocaleString('ko-KR')+'원 쿠폰',type:'AMOUNT',value,min,days:90});
  if(birthdayMatches(profile.birth_date,today)) {
   const membership=await getMembershipGrade(wrap(conn),userId,now);
   const rate=birthdayRates[membership.grade];
   if(rate) grants.push({key:'BIRTHDAY:'+today.slice(0,4),code:'CB_BIRTH_'+rate+'_'+today.slice(0,4),name:'리싸이프로 생일 축하 '+rate+'% 쿠폰',type:'PERCENT',value:rate,min:0,days:30});
  }
  // 월초 등급을 사용하므로 월중 등급 상승/하락으로 중복 발급되지 않는다.
  const monthStart=new Date(today.slice(0,7)+'-01T03:00:00+09:00');
  const monthlyGrade=await getMembershipGrade(wrap(conn),userId,monthStart);
  if(now>=monthStart&&['GOLD','PLATINUM'].includes(monthlyGrade.grade)) grants.push({key:'MONTHLY_SHIPPING:'+today.slice(0,7),code:'CB_MONTH_SHIP_'+today.slice(0,7).replace('-',''),name:'리싸이프로 '+today.slice(0,7)+' 월별 기본 배송비 무료 쿠폰',type:'AMOUNT',value:0,min:1,days:90,effect:'SHIPPING'});
  let issued=0;
  for(const grant of grants) {
   const [[existing]]=await conn.query('SELECT user_coupon_id FROM coupon_benefit_issues WHERE user_id = ? AND benefit_key = ?',[userId,grant.key]);
   if(existing) continue;
   // 쿠폰 코드 고유키와 회원 행 잠금으로 여러 프로세스에서도 재발급을 막는다.
   await conn.query(`INSERT INTO coupons (coupon_code,coupon_name,discount_type,discount_value,min_order_amount,max_discount_amount,target_type,is_active)
    VALUES (?,?,?,?,?,NULL,'ONLINE',1) ON DUPLICATE KEY UPDATE coupon_id = LAST_INSERT_ID(coupon_id)`,[grant.code,grant.name,grant.type,grant.value,grant.min]);
   const [[coupon]]=await conn.query('SELECT coupon_id, discount_type, discount_value, min_order_amount, is_active FROM coupons WHERE coupon_code = ?',[grant.code]);
   if(!coupon||coupon.discount_type!==grant.type||Number(coupon.discount_value)!==grant.value||Number(coupon.min_order_amount)!==grant.min||Number(coupon.is_active)!==1) throw Error('자동발급 쿠폰 정의가 일치하지 않습니다.');
   if(grant.effect) await conn.query("INSERT INTO coupon_benefit_effects (coupon_id,effect) VALUES (?,'SHIPPING') ON DUPLICATE KEY UPDATE effect = VALUES(effect)",[coupon.coupon_id]);
   const expires=new Date(now.getTime()+grant.days*DAY);
   const [result]=await conn.query(`INSERT INTO user_coupons (user_id,coupon_id,issued_at,expired_at)
    VALUES (?,?,TIMESTAMPADD(SECOND,TIMESTAMPDIFF(SECOND,UTC_TIMESTAMP(),NOW()),?),TIMESTAMPADD(SECOND,TIMESTAMPDIFF(SECOND,UTC_TIMESTAMP(),NOW()),?))`,[userId,coupon.coupon_id,sqlDate(now),sqlDate(expires)]);
   await conn.query('INSERT INTO coupon_benefit_issues (user_id,benefit_key,user_coupon_id) VALUES (?,?,?)',[userId,grant.key,result.insertId]);
   issued++;
  }
  await conn.commit();
  return {issued,birth_date:profile.birth_date,birth_date_locked:Boolean(profile.birth_date),policy:BENEFIT_POLICY};
 } catch(error) {await conn.rollback();throw error;} finally {conn.release();}
}
export async function saveCouponBirthday(pool,userId,birth,now=new Date()) {
 const value=validateBirthDate(birth,now);
 const conn=await pool.promise().getConnection();
 try {
  await conn.beginTransaction();
  const [[user]]=await conn.query('SELECT id,withdrawn_at FROM user WHERE id = ? FOR UPDATE',[userId]);
  if(!user||user.withdrawn_at!=null) throw Object.assign(Error('로그인이 필요합니다.'),{status:401});
  await conn.query('INSERT INTO coupon_benefit_profiles (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id)',[userId]);
  const [result]=await conn.query('UPDATE coupon_benefit_profiles SET birth_date = ?, birth_registered_at = NOW() WHERE user_id = ? AND birth_date IS NULL',[value,userId]);
  if(result.affectedRows!==1) throw Object.assign(Error('이미 등록된 생일은 고객센터를 통해 정정해 주세요.'),{status:409});
  await conn.commit();
 } catch(error) {await conn.rollback();throw error;} finally {conn.release();}
 return ensureCouponBenefits(pool,userId,now);
}
export function couponBenefitsMiddleware(getPool) {
 return async(req,res,next)=>{
  const id=req.session?.user?.id||req.session?.userId||req.session?.user_id;
  if(!id) return next();
  try{req.couponBenefits=await ensureCouponBenefits(getPool(),id);next();}
  catch(error){console.error('[coupon-benefits]',{code:error.code});res.status(error.status||503).json({message:error.status?error.message:'쿠폰 발급 정보를 확인할 수 없습니다. DB 쿠폰 업데이트 적용 여부를 확인해 주세요.'});}
 };
}
export async function isShippingCoupon(pool,couponId) {
 const [rows]=await pool.promise().query('SELECT effect FROM coupon_benefit_effects WHERE coupon_id = ?',[couponId]);
 return rows[0]?.effect==='SHIPPING';
}
export function startCouponBenefitJob(pool) {
 let running=false;
 const run=async()=>{
  if(running)return;running=true;
  try{let last='';for(;;){const [users]=await pool.promise().query('SELECT id FROM user WHERE withdrawn_at IS NULL AND id > ? ORDER BY id LIMIT 100',[last]);if(!users.length)break;for(const user of users)await ensureCouponBenefits(pool,user.id);last=users.at(-1).id;}}
  catch(error){console.error('[coupon-benefits/job]',{code:error.code,message:'자동발급 실패. 쿠폰 DB 마이그레이션 및 연결을 확인하세요.'});}finally{running=false;}
 };
 const initial=setTimeout(run,1000);initial.unref();
 const interval=setInterval(run,3600000);interval.unref();
 return()=>{clearTimeout(initial);clearInterval(interval);};
}
