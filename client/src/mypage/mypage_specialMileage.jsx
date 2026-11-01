import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import "./mypage_specialMileage.css";
const API_URL = import.meta.env.VITE_API_URL || "";
const formatAmount = value => Number(value || 0).toLocaleString("ko-KR");
const options = { withCredentials: true };
export default function Mp_SpecialMileage() {
  const [user, setUser] = useState({name: "", grade: "MEMBER"});
  const [balance, setBalance] = useState(null);
  const [couponCount, setCouponCount] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [page, setPage] = useState(1);
  const locked = useRef(false);
  const list = useRef(null);
  async function refresh(signal) {
    const {data} = await axios.get(API_URL + "/api/mypage/mypage_specialMileage", {...options, signal});
    if (!Array.isArray(data.history) || !data.history.every(item => item.id != null && Number.isSafeInteger(item.amount) && item.amount > 0)) throw new Error("응답 오류");
    setHistory(data.history); setError("");
  }
  async function refreshBalance(signal) {
    try { const {data} = await axios.get(API_URL + "/api/mypage/mileage", {...options, signal}); setBalance(data.balance); }
    catch { setBalance(null); }
  }
  useEffect(() => {
    const c = new AbortController();
    refresh(c.signal).catch(err => {if (!c.signal.aborted) setError(err.response?.data?.message || "등록 내역을 불러오지 못했습니다.");}).finally(() => {if (!c.signal.aborted) setLoading(false);});
    refreshBalance(c.signal);
    axios.get(API_URL + "/api/mypage", {...options, signal:c.signal}).then(({data}) => setUser(data)).catch(() => {});
    axios.get(API_URL + "/api/mpCoupon", {...options, signal:c.signal}).then(({data}) => setCouponCount(data.summary?.available ?? 0)).catch(() => {});
    return () => c.abort();
  }, []);
  async function submit(event) {
    event.preventDefault();
    if (locked.current) return;
    const normalized = code.trim().toUpperCase();
    if (!/^[A-Z0-9-]{8,64}$/.test(normalized)) {setNotice("쿠폰번호는 8~64자의 영문, 숫자, 하이픈으로 입력해 주세요."); return;}
    locked.current = true; setBusy(true); setNotice("");
    try {
      const {data} = await axios.post(API_URL + "/api/mypage/special-mileage/redeem", {code:normalized}, options);
      setNotice(data.message); setCode(""); setPage(1);
      try {await refresh();} catch {setError("등록은 완료되었지만 내역을 갱신하지 못했습니다. 다시 조회해 주세요.");}
      await refreshBalance();
    } catch (err) {
      setNotice(err.response?.data?.message || "등록 결과를 확인하지 못했습니다. 중복 등록 전에 내역을 확인해 주세요.");
      try {await refresh(); await refreshBalance();} catch {setError("등록 내역을 갱신하지 못했습니다. 다시 조회해 주세요.");}
    } finally {locked.current=false; setBusy(false);}
  }
  return <div className="mpSpecial_wrapper special_wrapper">
    <div className="mpSpecial_Header"><Header_loginOK /></div>
    <div className="mpSpecial_Content"><div className="mpSpecial_body">
          <h2 className="subtitle">MY PAGE</h2>

          <div className="mpSpecial_top">
	          <div className="customer_section">
		          <div className="name"><strong>{user.name}</strong>님은 {user.grade || "MEMBER"}</div>
		          <a href="/edit" className="my_edit">정보 수정하기</a>
		          <ul className="point_section">
                <li><a href="/mypage_coupon"><strong>쿠폰</strong> {couponCount ?? "-"} 장</a></li>
                <li><a href="/mypage_mileage"><strong>적립금</strong> {balance === null ? "-" : formatAmount(balance)} 원</a></li>
                <li><a href="#"><strong>포인트</strong> 0 P</a></li>
		          </ul>

              <ul className="mpSpecial_tab">
                <li>
                  <a href="/orders" className="tab_title">
                    ORDER<br />
                    <strong className="tab_sub">주문내역</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_wishList" className="tab_title">
                    WISH LIST<br />
                    <strong className="tab_sub">관심상품</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_coupon" className="tab_title">
                    COUPON<br />
                    <strong className="tab_sub">쿠폰</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_mileage" className="tab_title">
                    MILEAGE<br />
                    <strong className="tab_sub">적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_deposit"  className="tab_title">
                    DEPOSITS<br />
                    <strong className="tab_sub"></strong>
                  </a>
                  <a href="/mypage_deposit" className="tab_sub">예치금</a>
                </li>
                <li>
                  <a href="/mypage_specialMileage" aria-current="page" className="tab_title">
                    SECRET MILEAGE<br />
                    <strong className="tab_sub"></strong>
                  </a>
                  <a href="/mypage_specialMileage" className="tab_sub">스페셜 적립금</a>
                </li>
                <li>
                  <a href="/mypage_q%26a" className="tab_title">
                    Q&amp;A<br />
                    <strong className="tab_sub">내 상품문의</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    MYBOARD<br />
                    <strong className="tab_sub">내 상품평</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    WITHDRAW<br />
                    <strong className="tab_sub">회원 탈퇴</strong>
                  </a>
                </li>
              </ul>
	          </div>
          </div>



      <section className="deposit_section special_section" aria-labelledby="special-title">
        <h3 className="title first" id="special-title">쿠폰번호 등록</h3>
        <form onSubmit={submit}>
          <div className="special_register">
            <label htmlFor="special-code">발급받은 쿠폰번호를 입력하세요.</label>
            <input id="special-code" value={code} onChange={e=>setCode(e.target.value)} placeholder="발급받은 쿠폰번호" autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={64} required disabled={busy} aria-describedby="special-notice" />
          </div>
          <div className="special_actions">
            <button type="submit" className="deposit_primary" disabled={busy || loading || !!error}>{busy ? "등록 중..." : "확인"}</button>
            <button type="button" onClick={()=>{list.current?.scrollIntoView({behavior:"smooth", block:"start"}); list.current?.focus({preventScroll:true});}}>스페셜 쿠폰 리스트</button>
          </div>
          <p className="deposit_notice" role="status" id="special-notice">{notice}</p>
        </form>
        <div className="special_list_heading"><h3 ref={list} tabIndex={-1}>스페셜 적립금 등록 내역</h3><button type="button" disabled={busy || loading} onClick={async()=>{setLoading(true); try {await refresh(); await refreshBalance();} catch {setError("내역을 불러오지 못했습니다.");} finally {setLoading(false);}}}>다시 조회</button></div>
        <div className="deposit_table_scroll"><table className="tbl_col">
          <caption className="hidden">스페셜 적립금 쿠폰 등록 내역</caption>
          <thead><tr>{["등록일", "쿠폰명", "지급 적립금", "처리 상태"].map(t=><th key={t} scope="col">{t}</th>)}</tr></thead>
          <tbody>{loading || error || !history.length ? <tr><td colSpan={4} role="status">{loading ? "내역을 불러오는 중입니다." : error || "등록한 스페셜 쿠폰이 없습니다."}</td></tr> : history.slice((page-1)*10,page*10).map(item=><tr key={item.id}><td>{item.created_at}</td><td>{item.title}</td><td><strong>+ {formatAmount(item.amount)} 원</strong></td><td>적립 완료</td></tr>)}</tbody>
        </table></div>
        <nav className="deposit_paging" aria-label="등록 내역 페이지"><button type="button" disabled={loading || !!error || page<=1} onClick={()=>setPage(page-1)} aria-label="이전 페이지">〈</button><strong aria-current="page">{page}</strong><button type="button" disabled={loading || !!error || page*10>=history.length} onClick={()=>setPage(page+1)} aria-label="다음 페이지">〉</button></nav>
        <aside className="deposit_guide"><h4>스페셜 적립금 이용 안내</h4><ul>
          <li>이벤트 등을 통해 발급받은 쿠폰번호를 등록하면 안내된 금액이 기존 적립금에 합산됩니다.</li>
          <li>쿠폰별 등록 기간과 발급 대상이 다르며, 같은 쿠폰은 회원당 한 번만 등록할 수 있습니다.</li>
          <li>지급된 적립금은 주문서의 적립금 사용 항목에서 사용할 수 있습니다.</li>
          <li>스페셜 쿠폰은 할인쿠폰과 별도로 관리됩니다. 지급 금액과 사용 내역은 <a href="/mypage_mileage">적립금 내역</a>에서도 확인할 수 있습니다.</li>
          <li>등록 기간은 쿠폰번호를 등록할 수 있는 기간입니다. 현재 지급된 적립금에는 별도 소멸일이 없습니다.</li>
        </ul></aside>
      </section>
    </div></div><div className="mpSpecial_Footer"><Footer /></div>
  </div>;
}
