import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import "./mypage_deposit.css";

const API_URL = import.meta.env.VITE_API_URL || "";
const formatAmount = value => Number(value || 0).toLocaleString("ko-KR");
const PAGE_SIZE = 10;
const TYPES = { CREDIT: "지급", USE: "사용", RESTORE: "복원", REFUND: "계좌 환불" };
const STATUS = { PENDING: "처리 대기", PROCESSING: "처리 중", COMPLETED: "환불 완료", CANCELLED: "신청 취소", REJECTED: "반려" };

export default function Mp_Deposit() {
  const [user, setUser] = useState({ name: "", grade: "MEMBER" });
  const [balance, setBalance] = useState(0);
  const [couponCount, setCouponCount] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [tab, setTab] = useState("history");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const locked = useRef(false);
  const formRef = useRef(null);
  const requestButton = useRef(null);
  const [form, setForm] = useState({ amount: "", bank: "", holder: "", account: "", agreed: false });
  const available = data?.summary.available || 0;
  const history = data?.history || [];
  const refunds = data?.refunds || [];
  const rows = tab === "history" ? history : refunds;
  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const visible = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function fetchDeposit(signal) {
    const response = await axios.get(API_URL + "/api/mypage/deposit", { withCredentials: true, signal });
    const next = response.data;
    if (!next?.summary || !Array.isArray(next.history) || !Array.isArray(next.refunds) ||
      !["available", "pending", "credited", "used"].every(key => Number.isSafeInteger(next.summary[key]) && next.summary[key] >= 0)) {
      throw new Error("예치금 응답을 확인할 수 없습니다.");
    }
    setData(next);
  }

  useEffect(() => {
    const controller = new AbortController();
    const options = { withCredentials: true, signal: controller.signal };
    fetchDeposit(controller.signal).catch(err => {
      if (!controller.signal.aborted) setError(err.response?.data?.message || "예치금 내역을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    axios.get(API_URL + "/api/mypage", options).then(({data}) => setUser(data)).catch(() => {});
    axios.get(API_URL + "/api/mypage/mileage", options).then(({data}) => setBalance(data.balance)).catch(() => {});
    axios.get(API_URL + "/api/mpCoupon", options).then(({data}) => setCouponCount(data.summary?.available ?? 0)).catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => { if (open) formRef.current?.querySelector("input")?.focus(); }, [open]);
  function closeForm() { setOpen(false); requestButton.current?.focus(); }
  function changeField(event) {
    const { name, value, checked, type } = event.target;
    setForm(previous => ({ ...previous, [name]: type === "checkbox" ? checked : value }));
  }
  async function mutate(url, payload) {
    if (locked.current) return;
    locked.current = true;
    setBusy(true); setNotice("");
    try {
      await axios.post(API_URL + url, payload, { withCredentials: true });
      setNotice("요청이 접수되었습니다.");
      closeForm(); setPage(1); setTab("refunds");
      setForm({ amount: "", bank: "", holder: "", account: "", agreed: false });
      try { await fetchDeposit(); setError(""); }
      catch { setData(null); setError("요청은 접수되었지만 잔액을 갱신하지 못했습니다. 페이지를 새로고침해 주세요."); }
    } catch (err) {
      setNotice(err.response?.data?.message || "처리 결과를 확인하지 못했습니다. 새로고침 후 신청 내역을 먼저 확인해 주세요.");
    } finally { locked.current = false; setBusy(false); }
  }
  function submit(event) {
    event.preventDefault();
    const amount = Number(form.amount);
    if (!Number.isSafeInteger(amount) || amount <= 0 || amount > available) return setNotice("사용 가능 잔액 이내의 정수 금액을 입력해 주세요.");
    if (!form.bank.trim() || !form.holder.trim() || !/^\d{6,20}$/.test(form.account) || !form.agreed) return setNotice("은행, 예금주, 숫자로 된 계좌번호와 동의 여부를 확인해 주세요.");
    mutate("/api/mypage/deposit/refunds", { amount, bank: form.bank.trim(), holder: form.holder.trim(), account: form.account });
  }

  return <div className="mpDeposit_wrapper">
    <div className="mpDeposit_Header"><Header_loginOK /></div>
    <div className="mpDeposit_Content"><div className="mpDeposit_body">
          <h2 className="subtitle">MY PAGE</h2>

          <div className="mpDeposit_top">
	          <div className="customer_section">
		          <div className="name"><strong>{user.name}</strong>님은 {user.grade || "MEMBER"}</div>
		          <a href="/member/edit_step1.php" className="my_edit">정보 수정하기</a>
		          <ul className="point_section">
                <li><a href="/mypage_coupon"><strong>쿠폰</strong> {couponCount ?? "-"} 장</a></li>
                <li><a href="/mypage_mileage"><strong>적립금</strong> {loading || error ? "-" : formatAmount(balance)} 원</a></li>
                <li><a href="#"><strong>포인트</strong> 0 P</a></li>
		          </ul>

              <ul className="mpDeposit_tab">
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
                  <a href="/mypage_deposit" aria-current="page" className="tab_title">
                    DEPOSITS<br />
                    <strong className="tab_sub"></strong>
                  </a>
                  <a href="/mypage_deposit" className="tab_sub">예치금</a>
                </li>
                <li>
                  <a href="/mypage_specialMileage" className="tab_title">
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


      <section className="deposit_section" aria-labelledby="deposit-title">
        <h3 className="title first" id="deposit-title">예치금 내역</h3>
        <div className="box_mp deposit_summary">
          {[["사용 가능 예치금", "available"], ["환불 처리 중", "pending"], ["누적 지급 예치금", "credited"], ["누적 사용 예치금", "used"]].map(([label, key]) =>
            <p className="have" key={key}>{label}<span>{loading || error ? "-" : formatAmount(data?.summary[key])} 원</span></p>)}
        </div>
        <div className="deposit_toolbar"><p>예치금은 주문 결제 시 현금처럼 사용할 수 있습니다.</p>
          <button type="button" ref={requestButton} className="deposit_primary" disabled={loading || !!error || busy || available <= 0} aria-expanded={open} aria-controls="deposit-refund-form" onClick={() => { setNotice(""); setOpen(!open); }}>계좌 환불 신청</button>
        </div>
        <p role="status" className="deposit_notice">{notice}</p>
        {open && <form ref={formRef} id="deposit-refund-form" className="deposit_form" onSubmit={submit}>
          <h4>예치금 계좌 환불 신청</h4><p>신청한 금액은 처리 완료 또는 신청 취소 전까지 사용할 수 없습니다.</p>
          <fieldset disabled={busy}><legend className="hidden">환불 금액 및 계좌 정보</legend>
            <label>환불 신청 금액 <input name="amount" type="number" min="1" max={available} step="1" value={form.amount} onChange={changeField} required /> 원</label>
            <label>은행 <input name="bank" value={form.bank} maxLength={30} onChange={changeField} placeholder="은행명" required /></label>
            <label>예금주 <input name="holder" value={form.holder} maxLength={50} onChange={changeField} placeholder="본인 명의 예금주" required /></label>
            <label>계좌번호 <input name="account" inputMode="numeric" pattern="[0-9]{6,20}" maxLength={20} value={form.account} onChange={changeField} placeholder="하이픈 없이 숫자만 입력" autoComplete="off" required /></label>
            <label className="deposit_agreement"><input name="agreed" type="checkbox" checked={form.agreed} onChange={changeField} required /> 본인 명의 계좌이며, 환불 처리를 위한 계좌정보 제공에 동의합니다.</label>
            <div className="deposit_actions"><button type="button" onClick={closeForm}>닫기</button><button className="deposit_primary" type="submit">{busy ? "접수 중..." : "환불 신청하기"}</button></div>
          </fieldset>
        </form>}
        <div className="deposit_tabs" aria-label="예치금 내역 종류">
          <button type="button" aria-pressed={tab === "history"} onClick={() => { setTab("history"); setPage(1); }}>지급·사용 내역</button>
          <button type="button" aria-pressed={tab === "refunds"} onClick={() => { setTab("refunds"); setPage(1); }}>계좌 환불 신청 내역</button>
        </div>
        <div className="deposit_table_scroll"><table className="tbl_col">
          <caption className="hidden">{tab === "history" ? "예치금 지급 및 사용 내역" : "계좌 환불 신청 내역"}</caption>
          <thead><tr>{(tab === "history" ? ["처리일", "구분", "금액", "처리 후 잔액", "관련 주문", "내용"] : ["신청일", "환불 금액", "환불 계좌", "처리 상태", "처리일", "신청 취소"]).map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
          <tbody>{loading || error || rows.length === 0 ? <tr><td colSpan={6} role="status">{loading ? "내역을 불러오는 중입니다." : error || "내역이 없습니다."}</td></tr> : visible.map(item => tab === "history" ?
            <tr key={item.id}><td>{item.created_at}</td><td>{TYPES[item.type] || item.type}</td><td><strong className={item.amount < 0 ? "p_color" : ""}>{item.amount > 0 ? "+ " : ""}{formatAmount(item.amount)} 원</strong></td><td>{formatAmount(item.balance)} 원</td><td>{item.order_id ? <a href={"/mypage/orders/" + encodeURIComponent(item.order_id)}>{item.order_no || item.order_id}</a> : "-"}</td><td>{item.description}</td></tr> :
            <tr key={item.id}><td>{item.created_at}</td><td>{formatAmount(item.amount)} 원</td><td>{item.bank} {item.masked_account}</td><td>{STATUS[item.status] || item.status}{item.reason && <small>{item.reason}</small>}</td><td>{item.processed_at || "-"}</td><td>{item.status === "PENDING" ? <button type="button" disabled={busy || !!error} onClick={() => mutate("/api/mypage/deposit/refunds/" + encodeURIComponent(item.id) + "/cancel", {})}>신청 취소</button> : "-"}</td></tr>)}</tbody>
        </table></div>
        <nav className="deposit_paging" aria-label="내역 페이지"><button type="button" disabled={page <= 1 || busy} onClick={() => setPage(page - 1)} aria-label="이전 페이지">〈</button><strong aria-current="page">{page}</strong><button type="button" disabled={page >= pageCount || busy} onClick={() => setPage(page + 1)} aria-label="다음 페이지">〉</button></nav>
        <aside className="deposit_guide"><h4>예치금 이용 안내</h4><ul>
          <li>예치금은 주문 취소·반품 환불금 및 초과 입금액 등으로 지급되며, 구매 혜택인 적립금과 별도로 관리됩니다.</li>
          <li>주문서에서 사용할 예치금을 입력하고, 남은 금액은 다른 결제수단으로 결제할 수 있습니다.</li>
          <li>주문 취소 시 사용한 예치금은 복원되며, 다른 결제수단의 결제금은 해당 수단으로 환불됩니다.</li>
          <li>계좌 환불 신청 금액은 사용 가능 잔액에서 제외됩니다. 처리 대기 상태에서 신청을 취소하면 다시 사용할 수 있습니다.</li>
          <li>계좌정보 오류 또는 반려 사유는 환불 신청 내역에서 확인해 주세요.</li>
        </ul></aside>
      </section>
    </div></div><div className="mpDeposit_Footer"><Footer /></div>
  </div>;
}
