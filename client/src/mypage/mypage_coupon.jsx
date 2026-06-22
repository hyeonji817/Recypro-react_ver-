import "./mypage_coupon.css"; 
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const API = "http://localhost:5003";

const formatWon = (value) => Number(value || 0).toLocaleString();     // 가격 표시 

// 할인율 
const formatDiscount = (coupon) => {
  if (coupon.discount_type === "PERCENT") {
    return `${coupon.discount_value} %`;
  }

  return `${formatWon(coupon.discount_value)} 원`;
};

// 한도금액 
const formatLimit = (coupon) => {
  if (!coupon.min_order_amount) return "-";
  return `${formatWon(coupon.min_order_amount)} 원`;
};

// 쿠폰 사용유무 
const formatUsedAt = (coupon) => {
  if (coupon.used_at) return coupon.used_at;
  if (coupon.status === "EXPIRED") return "기간만료";
  return "미사용";
};

const Mp_Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [summary, setSummary] = useState({ total: 0, available: 0 });
  const [user, setUser] = useState({ user_id: "", grade: "MEMBER" });
  const [loading, setLoading] = useState(true);

  // 쿠폰 조회
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data } = await axios.get(`${API}/api/mpCoupon`, {
          withCredentials: true,
        });

        setCoupons(data.coupons || []);
        setSummary(data.summary || { total: 0, available: 0 });
        setUser(data.user || { user_id: "", grade: "MEMBER" });
      } catch (err) {
        console.error("[쿠폰 조회 실패]", err);
        alert(err?.response?.data?.message || "쿠폰 내역을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return (
      <div className="mpCoupon_wrapper">
        <Header_loginOK />
        <div className="mpCoupon_Content">
          <div className="mpCoupon_body">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="mpCoupon_wrapper">
      <div className="mpCoupon_Header">
        <Header_loginOK />
      </div>

      <div className="mpCoupon_Content">
        <div className="mpCoupon_body">
          <h2 className="subtitle">MY PAGE</h2>

          <div className="mpCoupon_top">
            <div className="customer_section">
              <div className="name">
                <strong>{user.user_id}</strong>님은 {user.grade || "MEMBER"}
              </div>

              <a href="#" className="my_edit">정보 수정하기</a>

              <ul className="point_section">
                <li><a href="#"><strong>쿠폰</strong> {summary.available} 장</a></li>
                <li><a href="#"><strong>적립금</strong> 0 원</a></li>
                <li><a href="#"><strong>포인트</strong> 0 P</a></li>
              </ul>

              <ul className="mpCoupon_tab">
                <li>
                  <a href="/orders" className="tab_title">
                    ORDER
                    <br />
                    <strong className="tab_sub">주문내역</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_wishList" className="tab_title">
                    WISH LIST
                    <br />
                    <strong className="tab_sub">관심상품</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_coupon" className="tab_title">
                    COUPON
                    <br />
                    <strong className="tab_sub">쿠폰</strong>
                  </a>
                </li>
                <li>
                  <a href="/mileage" className="tab_title">
                    MILEAGE
                    <br />
                    <strong className="tab_sub">적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="/deposits" className="tab_title">
                    DEPOSITS
                    <br />
                    <strong className="tab_sub">예치금</strong>
                  </a>
                </li>
                <li>
                  <a href="/special-mileage" className="tab_title">
                    SECRET MILEAGE
                    <br />
                    <strong className="tab_sub">스페셜 적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    Q&amp;A
                    <br />
                    <strong className="tab_sub">내 상품문의</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    MYBOARD
                    <br />
                    <strong className="tab_sub">내 상품평</strong>
                  </a>
                </li>
                <li>
                  <a href="/withdraw" className="tab_title">
                    WITHDRAW
                    <br />
                    <strong className="tab_sub">회원 탈퇴</strong>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="coupon" id="coupon">
            <h3 className="title">쿠폰내역</h3>

            <div className="box_mp">
              <p className="have">
                총 사용가능한 쿠폰
                <span>{summary.available}</span>
              </p>
            </div>

            <table className="tbl_col">
              <caption className="hidden">쿠폰내역</caption>
              <colgroup>
                <col style={{ width: "8%" }} />
                <col />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>

              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">쿠폰명</th>
                  <th scope="col">할인금액(%)</th>
                  <th scope="col">제한금액</th>
                  <th scope="col">발급일</th>
                  <th scope="col">제한일</th>
                  <th scope="col">사용일</th>
                </tr>
              </thead>

              <tbody>
                {coupons.length === 0 ? (
                  <tr>
                    <td colSpan={7}>보유한 쿠폰이 없습니다.</td>
                  </tr>
                ) : (
                  coupons.map((coupon) => (
                    <tr key={coupon.user_coupon_id}>
                      <td>{coupon.no}</td>
                      <td className="tal">{coupon.coupon_name}</td>
                      <td>{formatDiscount(coupon)}</td>
                      <td>{formatLimit(coupon)}</td>
                      <td>{coupon.issued_at || "-"}</td>
                      <td>{coupon.expired_at || "무제한"}</td>
                      <td>{formatUsedAt(coupon)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <ul className="paging">
              <li></li>
              <li><strong>1</strong></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mpCoupon_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Mp_Coupon;