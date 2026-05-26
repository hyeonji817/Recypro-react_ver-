import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mypage_orders.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const formatWon = (value) => Number(value || 0).toLocaleString();

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const CDN = (path) =>
  `http://localhost:5003/uploads/${String(path || "").replace(/^\.\//, "")}`;

const Mp_Orders = () => {
  const [summary, setSummary] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMypageOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const [summaryRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:5003/api/mypage/summary", {
            withCredentials: true,
          }),
          axios.get("http://localhost:5003/api/mypage/orders", {
            withCredentials: true,
          }),
        ]);

        setSummary(summaryRes.data);
        setOrders(ordersRes.data || []);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          setError("로그인이 필요합니다.");
        } else {
          setError("주문내역을 불러오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMypageOrders();
  }, []);

  return (
    <div className="mpOrders_wrapper">
      <div className="mpOrders_Header">
        <Header_loginOK />  
      </div>     {/** mpOrders_Header end */}

      <div className="mpOrders_Content">
        <div className="mpOrders_body">
          <h2 className="subtitle">MY PAGE</h2>      {/** subtitle end */}  

          <div className="mpOrders_top">
            <div className="customer_section">
              <div className="name">
                <strong>{summary?.user?.name || summary?.user?.id || "회원"}</strong>님은{" "}
                {summary?.user?.grade || "MEMBER"}
              </div>      {/** name end */}

              <a href="/edit" className="my_edit">정보 수정하기</a>

              <ul className="point_section">
                <li>
                  <a href="/mypage/coupon_down_list.php">
                    <strong>쿠폰</strong> {summary?.counts?.coupons || 0} 장
                  </a>
                </li>
                <li>
                  <a href="/mypage/milage.php">
                    <strong>적립금</strong> {formatWon(summary?.money?.mileage)} 원
                  </a>
                </li>
                <li>
                  <a href="/mypage/emoney.php">
                    <strong>포인트</strong> {formatWon(summary?.money?.points)} P
                  </a>
                </li>
              </ul>     {/** point_section end */}

              <ul className="mpOrders_tab">
                <li><a href="/orders" className="tab_title">ORDER<br /><strong className="tab_sub">주문내역</strong></a></li>
                <li><a href="/wishlist" className="tab_title">WISH LIST<br /><strong className="tab_sub">관심상품</strong></a></li>
                <li><a href="/coupons" className="tab_title">COUPON<br /><strong className="tab_sub">쿠폰</strong></a></li>
                <li><a href="/mileage" className="tab_title">MILEAGE<br /><strong className="tab_sub">적립금</strong></a></li>
                <li><a href="/deposits" className="tab_title">DEPOSITS<br /><strong className="tab_sub">예치금</strong></a></li>
                <li><a href="/special-mileage" className="tab_title">SECRET MILEAGE<br /><strong className="tab_sub">스페셜 적립금</strong></a></li>
                <li><a href="#" className="tab_title">Q&amp;A<br /><strong className="tab_sub">내 상품문의</strong></a></li>
                <li><a href="#" className="tab_title">MYBOARD<br /><strong className="tab_sub">내 상품평</strong></a></li>
                <li><a href="/withdraw" className="tab_title">WITHDRAW<br /><strong className="tab_sub">회원 탈퇴</strong></a></li>  
              </ul>      
            </div>      {/** customer_section end */}  
          </div>      {/** mpOrders_top end */}

          <div id="order_list">
            <h3 className="title first">주문내역</h3>     {/** title first end */}
            <p className="title_count tar">주문번호를 클릭하시면 주문정보를 확인할 수 있습니다.</p>   {/** title_count tar end */}

            <div className="search"></div>      {/** search end */}

            {loading && (
            <p className="title_count tar">주문내역을 불러오는 중입니다.</p>
            )}

            {error && (
            <p className="title_count tar">{error}</p>
            )}

            {!loading && !error && orders.length === 0 && (
            <div className="order_empty">
              주문내역이 없습니다.
            </div>
            )}

            {!loading && !error && orders.length > 0 && (
            <table className="mpOrders_table">
              <thead>
                <tr>
                  <th>주문일자</th>
                  <th>주문번호</th>
                  <th>상품정보</th>
                  <th>결제금액</th>
                  <th>주문상태</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const firstItem = order.items?.[0];
                  const itemCount = order.items?.length || 0;

                  return (
                    <tr key={order.order_id}>
                      <td>{formatDate(order.paid_at || order.created_at)}</td>

                      <td>
                        <a href={`/orders/${order.order_id}`} className="order_no">
                          {order.order_no || order.order_id}
                        </a>
                      </td>

                      <td>
                        <div className="order_product">
                        {firstItem?.filename && (
                          <img
                            src={CDN(firstItem.filename)}
                            alt={firstItem.pname}
                            className="order_thumb"
                          />
                        )}

                        <div className="order_product_info">
                          <strong>
                            {firstItem?.pname || "상품 정보 없음"}
                            {itemCount > 1 && ` 외 ${itemCount - 1}건`}
                          </strong>

                          {firstItem?.option_label && (
                          <p>{firstItem.option_label}</p>
                          )}

                          <p>
                            수량 {firstItem?.quantity || 1}개 / 적립금{" "}
                            {formatWon(order.total_mileage)}원
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong>{formatWon(order.total_pay)}원</strong>
                    </td>

                    <td>
                      {order.status === "PAID" ? "결제완료" : order.status}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          </div>     {/** order_list end */}
        </div>     {/** mpOrders_body end */}
      </div>    {/** mpOrders_Content end */}

      <div className="mpOrders_Footer">
        <Footer />
      </div>     {/** mpOrders_Footer end */}
    </div>    /** mpOrders_wrapper end */
  );
};

export default Mp_Orders;
