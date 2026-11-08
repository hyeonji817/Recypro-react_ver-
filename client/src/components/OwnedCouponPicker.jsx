import {useEffect,useState} from 'react';
import './OwnedCouponPicker.css';
const API=import.meta.env.VITE_API_URL||'';
export default function OwnedCouponPicker({subtotal,selectedId,onChange,disabled}){
 const [rows,setRows]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[retry,setRetry]=useState(0);
 useEffect(()=>{const abort=new AbortController();setLoading(true);setError('');if(!(subtotal>0)){setRows([]);setLoading(false);return()=>abort.abort();}
 fetch(`${API}/api/mpCoupon/available?subtotal=${encodeURIComponent(subtotal)}`,{credentials:'include',signal:abort.signal}).then(async res=>{const data=await res.json();if(!res.ok)throw Error(data.message||'쿠폰 조회 실패');return data;}).then(data=>setRows(Array.isArray(data.coupons)?data.coupons:[])).catch(e=>{if(e.name!=='AbortError')setError(e.message);}).finally(()=>{if(!abort.signal.aborted)setLoading(false);});return()=>abort.abort();},[subtotal,retry]);
 const amount=cp=>cp.benefit_effect==='SHIPPING'?'기본 배송비 무료':cp.discount_type==='PERCENT'?`${cp.discount_value}% 할인`:`${Number(cp.discount_value).toLocaleString('ko-KR')}원 할인`;
 return <fieldset className="owned-coupon-picker" disabled={disabled||loading}><legend>보유 쿠폰 선택</legend><p>주문당 1장만 사용할 수 있으며, 최종 금액은 서버에서 다시 확인합니다.</p>
 {loading?<p role="status">보유 쿠폰을 불러오는 중입니다.</p>:error?<p role="alert">{error} <button type="button" onClick={()=>setRetry(n=>n+1)}>다시 조회</button></p>:!rows.length?<p>보유한 쿠폰이 없습니다.</p>:rows.map(cp=><label key={cp.user_coupon_id} className={!cp.usable?'owned-coupon-disabled':''}><input type="radio" name="owned-coupon" value={cp.user_coupon_id} checked={String(selectedId||'')===String(cp.user_coupon_id)} disabled={!cp.usable} onChange={()=>onChange(cp)}/><span><strong>{cp.coupon_name}</strong><span>{amount(cp)} · 최소 {Number(cp.min_order_amount||0).toLocaleString('ko-KR')}원</span>{cp.max_discount_amount!=null&&cp.discount_type==='PERCENT'&&<span>최대 {Number(cp.max_discount_amount).toLocaleString('ko-KR')}원 할인</span>}<span>보유번호 {cp.user_coupon_id} · {cp.expired_at?`${cp.expired_at}까지`:'유효기간 제한 없음'}</span>{!cp.usable&&<span className="owned-coupon-reason">{cp.reason}</span>}</span></label>)}
 <label><input type="radio" name="owned-coupon" checked={!selectedId} onChange={()=>onChange(null)}/><span>쿠폰 사용 안 함</span></label></fieldset>;
}
