import React, { useEffect, useState } from "react";
import "./Mypage.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const formatWon = (value) => Number(value || 0).toLocaleString();

const Mypage = () => {
  const [summary, setSummary] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/mypage/summary", { credentials: "include" }).then((res) => res.json()),
      fetch("/api/mypage/orders", { credentials: "include" }).then((res) => res.json()),
    ])
      .then(([summaryData, orderData]) => {
        setSummary(summaryData);
        setOrders(Array.isArray(orderData) ? orderData : []);
      })
      .catch((err) => console.error("마이페이지 데이터 불러오기 실패:", err));
  }, []);

  const user = summary?.user || {};
  const counts = summary?.counts || {};
  const money = summary?.money || {};

  return (
    <div className="Mypage_wrapper">
      <div className="mypage_Header">
        <Header_loginOK />
      </div>

      <div id="mypage_Content">
        <div className="mypage_body">
          <h2 className="subtitle">MY PAGE</h2>

          <div className="mypage_top">
            <div className="customer_section">
              <div className="name">
                <strong>{user.name || user.id}</strong>님은 {user.grade || "MEMBER"}
              </div>

              <a href="/edit" className="my_edit">정보 수정하기</a>

              <ul className="point_section">
                <li><a href="/coupons"><strong>쿠폰</strong> {counts.coupons || 0} 장</a></li>
                <li><a href="/mileage"><strong>적립금</strong> {formatWon(money.mileage)} 원</a></li>
                <li><a href="/points"><strong>포인트</strong> {formatWon(money.points)} P</a></li>
              </ul>

              <ul className="my_page_tab">
                <li><a href="/orders" className="tab_title">ORDER<br /><strong className="tab_sub">주문내역</strong></a></li>
                <li><a href="/mypage_wishList" className="tab_title">WISH LIST<br /><strong className="tab_sub">관심상품</strong></a></li>
                <li><a href="/mypage_coupon" className="tab_title">COUPON<br /><strong className="tab_sub">쿠폰</strong></a></li>
                <li><a href="/mileage" className="tab_title">MILEAGE<br /><strong className="tab_sub">적립금</strong></a></li>
                <li><a href="/deposits" className="tab_title">DEPOSITS<br /><strong className="tab_sub">예치금</strong></a></li>
                <li><a href="/special-mileage" className="tab_title">SECRET MILEAGE<br /><strong className="tab_sub">스페셜 적립금</strong></a></li>
                <li><a href="#" className="tab_title">Q&amp;A<br /><strong className="tab_sub">내 상품문의</strong></a></li>
                <li><a href="#" className="tab_title">MYBOARD<br /><strong className="tab_sub">내 상품평</strong></a></li>
                <li><a href="/withdraw" className="tab_title">WITHDRAW<br /><strong className="tab_sub">회원 탈퇴</strong></a></li>
              </ul>
            </div>
          </div>

          <div id="mypage">
            <div className="my_order">
              {orders.length === 0 ? (
                <p className="empty">주문내역이 존재하지 않습니다.</p>
              ) : (
                orders.map((order) => (
                  <div key={order.order_id} className="order_item">
                    <a href={`/order/${order.order_id}`}>
                      {order.order_no || `주문번호 ${order.order_id}`}
                    </a>
                    <span>{order.status}</span>
                    <span>{formatWon(order.total_pay)}원</span>
                  </div>
                ))
              )}
              <p>* 주문번호를 클릭하시면 주문정보를 확인하실 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mypage_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Mypage;