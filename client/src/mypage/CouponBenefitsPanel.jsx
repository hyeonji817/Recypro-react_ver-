import {useEffect,useState} from 'react';
import './CouponBenefitsPanel.css';
const API=import.meta.env.VITE_API_URL||'';
export default function CouponBenefitsPanel(){
 const [info,setInfo]=useState(null),[birth,setBirth]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const load=async()=>{const res=await fetch(API+'/api/mpCoupon/benefits',{credentials:'include'});const data=await res.json();if(!res.ok)throw Error(data.message||'쿠폰 발급 정보를 불러오지 못했습니다.');setInfo(data);};
 useEffect(()=>{let live=true;load().catch(e=>{if(live)setError(e.message);});return()=>{live=false;};},[]);
 const save=async e=>{e.preventDefault();if(busy)return;setBusy(true);setError('');try{const res=await fetch(API+'/api/mpCoupon/birthday',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({birth})});const data=await res.json();if(!res.ok)throw Error(data.message);setInfo(data);window.location.reload();}catch(e){setError(e.message);}finally{setBusy(false);}};
 return <section className="coupon-benefits-panel" aria-label="자동 발급 쿠폰 안내"><h3>가입·생일·월별 쿠폰</h3><p>가입 쿠폰팩 총 20,000원은 기존 회원도 1회 지급 · 가입/월별 쿠폰은 발급 후 90일 유효</p><p>생일 당일 등급에 따라 3~10% 쿠폰 발급(NEW 제외), 발급 후 30일 유효<br/>매월 1일 기준 GOLD·PLATINUM은 기본 배송비 무료 쿠폰 1장 · 다른 할인 쿠폰과 동시 사용 불가</p>
 {info?.birth_date?<p>등록된 생일: {info.birth_date} · 정정은 고객센터에 문의해 주세요.</p>:<form onSubmit={save}><label htmlFor="coupon-birthday">생일 쿠폰을 받을 생년월일</label><input id="coupon-birthday" type="date" min="1900-01-01" value={birth} onChange={e=>setBirth(e.target.value)} required disabled={busy||!info}/><button disabled={busy||!info}>생일 등록</button><small>등록 후 직접 변경할 수 없습니다. 2월 29일생은 평년에 2월 28일에 발급됩니다.</small></form>}
 {error&&<p role="alert">{error}</p>}</section>;
}
