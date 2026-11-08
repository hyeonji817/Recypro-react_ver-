import { ensureCouponBenefits, validateBirthDate, koreaDate } from './couponBenefits.js';
export function createRegistrationHandler(getPool,hashPassword) {
 return async(req,res)=>{
  const {id,password,name,email,gender,birth}=req.body||{};
  let birthday;
  try{birthday=validateBirthDate(birth);}catch(error){return res.status(400).json({error:error.message});}
  const normalizedGender=({'남':'남성','여':'여성','남성':'남성','여성':'여성'})[gender];
  if(typeof id!=='string'||!/^[A-Za-z0-9_-]{3,50}$/.test(id)||typeof password!=='string'||password.length<4||Buffer.byteLength(password,'utf8')>72||typeof name!=='string'||!name.trim()||name.length>50||typeof email!=='string'||email.length>100||!/^\S+@\S+\.\S+$/.test(email)||!normalizedGender)return res.status(400).json({error:'아이디·비밀번호·이름·이메일·성별을 확인해 주세요.'});
  let conn;
  try{
   const encrypted=await hashPassword(password);
   const today=koreaDate();
   const age=Number(today.slice(0,4))-Number(birthday.slice(0,4))-(today.slice(5)<birthday.slice(5)?1:0);
   conn=await getPool().promise().getConnection();await conn.beginTransaction();
   await conn.query('INSERT INTO user (id,password,name,age,gender,email) VALUES (?,?,?,?,?,?)',[id,encrypted,name.trim(),age,normalizedGender,email]);
   await conn.query('INSERT INTO coupon_benefit_profiles (user_id,birth_date,birth_registered_at) VALUES (?,?,NOW())',[id,birthday]);
   await conn.commit();
  }catch(error){if(conn)await conn.rollback();console.error('[register]',{code:error.code});return res.status(error.code==='ER_DUP_ENTRY'?409:503).json({error:error.code==='ER_DUP_ENTRY'?'이미 사용 중인 아이디입니다.':'회원가입을 처리할 수 없습니다. 서버 DB 업데이트 여부를 확인해 주세요.'});}
  finally{conn?.release();}
  let pending=false;
  try{await ensureCouponBenefits(getPool(),id);}catch(error){pending=true;console.error('[register/coupon]',{code:error.code});}
  return res.status(201).json({message:pending?'회원가입 완료. 쿠폰은 쿠폰함 접속 시 발급됩니다.':'회원가입과 가입 쿠폰 발급이 완료되었습니다.',coupons_pending:pending});
 };
}
