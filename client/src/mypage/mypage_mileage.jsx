import { useEffect, useState } from "react";
import axios from "axios";
import "./mypage_mileage.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

function formatUsedMileage(amount) {
  const usedAmount = Math.abs(Number(amount) || 0);
  return `${usedAmount > 0 ? '− ' : ''}${usedAmount.toLocaleString('ko-KR')} 원`;
}

const API_URL = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 10;
const formatAmount = (value) => Number(value || 0).toLocaleString("ko-KR");

const Mp_Mileage = () => {
  const [user, setUser] = useState({ name: "", grade: "MEMBER" });
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [couponCount, setCouponCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    const options = { withCredentials: true, signal: controller.signal };
    axios.get(API_URL + "/api/mypage/mileage", options)
      .then(({ data }) => {
        setUser(data.user);
        setBalance(data.balance);
        setHistory(data.history);
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.response?.data?.message || "적립금 내역을 불러오지 못했습니다.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    axios.get(API_URL + "/api/mpCoupon", options)
      .then(({ data }) => setCouponCount(data.summary?.available ?? 0))
      .catch(() => { /* 쿠폰 조회 실패는 적립금 조회와 별도로 처리한다. */ });
    return () => controller.abort();
  }, []);

  const pageCount = Math.max(1, Math.ceil(history.length / PAGE_SIZE));
  const visibleHistory = history.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);


  return (
    <div className="mpMileage_wrapper">
      <div className="mpMileage_Header">
        <Header_loginOK />  
      </div>      {/** mpMileage_Header end */}

      <div className="mpMileage_Content">
        <div className="mpMileage_body">
          <h2 className="subtitle">MY PAGE</h2>

          <div className="mpMileage_top">
	          <div className="customer_section">
		          <div className="name"><strong>{user.name}</strong>님은 {user.grade || "MEMBER"}</div>
		          <a href="/member/edit_step1.php" className="my_edit">정보 수정하기</a>
		          <ul className="point_section">
                <li><a href="/mypage_coupon"><strong>쿠폰</strong> {couponCount ?? "-"} 장</a></li>
                <li><a href="/mypage_mileage"><strong>적립금</strong> {loading || error ? "-" : formatAmount(balance)} 원</a></li>
                <li><a href="#"><strong>포인트</strong> 0 P</a></li>
		          </ul>

              <ul className="mpMileage_tab">
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
                  <a href="/mypage_deposit" className="tab_title">
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
                  <a href="/mypage_qa" className="tab_title">
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

          <div className="milage_section">  
	          <h3 className="title first">적립금 내역</h3>
	          <div className="box_mp">
		          <p className="have">총 적립금<span>{loading || error ? "-" : formatAmount(balance)}</span></p>
	          </div>
	
            <table className="tbl_col">
	            <caption className="hidden">적립금 내역</caption>
              <colgroup>
                <col style={{ width: "12%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />                
                <col />
              </colgroup>

              <thead>
                <tr>
                  <th scope="col">적립/사용일</th>
                  <th scope="col">적립금액</th>
                  <th scope="col">사용금액</th>
                  <th scope="col">소계</th>
                  
                  <th scope="col">만료일</th>
                  
                  <th scope="col">내용</th>
                </tr>
              </thead>
              <tbody>
                {loading || error || history.length === 0 ? (
                  <tr><td colSpan={6} role="status">{loading ? "Loading..." : error || "적립금 내역이 없습니다."}</td></tr>
                ) : visibleHistory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.created_at || "-"}</td>
                    <td><strong>{item.earned > 0 ? "+ " : ""}{formatAmount(item.earned)} 원</strong></td>
                    <td><strong className="p_color">{formatUsedMileage(item.used)}</strong></td>
                    <td>{formatAmount(item.balance)} 원</td>
                    <td>{item.expired_at || "-"}</td>
                    <td className="tal">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

	          <ul className="paging">
              <li>{page > 1 && <a href="#" style={{ fontSize: 20, color: "inherit" }} onClick={(event) => { event.preventDefault(); setPage(page - 1); }} aria-label="이전 페이지">〈</a>}</li>
              <li><strong>{page}</strong></li>
              <li>{!loading && !error && page < pageCount && <a href="#" style={{ fontSize: 20, color: "inherit" }} onClick={(event) => { event.preventDefault(); setPage(page + 1); }} aria-label="다음 페이지">〉</a>}</li>
            </ul>
          </div>
		    </div>
      </div>     {/** mpMileage_Content end */}

      <div className="mpMileage_Footer">
        <Footer />  
      </div>      {/** mpMileage_Footer end */}
    </div>
  );
};

export default Mp_Mileage;