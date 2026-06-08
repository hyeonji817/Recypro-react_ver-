import "./mypage_orderDetail.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const API = "http://localhost:5003"; 

const formatWon = (value) => Number(value || 0).toLocaleString(); 
const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("ko-KR");
};

const imgUrl = (path) => {
  if (!path) return "https://www.rolarola.com/_image/_default/prd/noimg3.gif";
  if (String(path).startsWith("http")) return path;
  return `${API}/uploads/${String(path).replace(/^\.\//, "")}`;
};

const statusText = (status) => {
  switch (status) {
    case "PAID":
      return "결제완료";
    case "PENDING":
      return "결제대기";
    case "CANCELLED":
      return "주문취소";
    case "FAILED":
      return "결제실패";
    default:
      return status || "-";
  }
};

const payMethodText = (method) => {
  switch (method) {
    case "TOSS":
      return "토스결제";
    case "CARD":
      return "카드결제";
    case "BANK":
      return "무통장입금";
    default:
      return method || "-";
  }
};

const Mp_OrderDetail = () => {
  const { order_id } = useParams(); 
  const navigate = useNavigate(); 

  const [order, setOrder] = useState(null); 
  const [summary, setSummary] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true); 

        const [orderRes, summaryRes] = await Promise.all([
          axios.get(`${API}/api/mypage/orders/${order_id}`, {
            withCredentials: true,
          }),
          axios.get(`${API}/api/mypage/summary`, {
            withCredentials: true,
          }),
        ]);

        setOrder(orderRes.data);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error(err); 
        setError(
          err.response?.data?.message || "주문 상세 정보를 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [order_id]);

  if (loading) {
    return <div>주문 정보를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>주문 정보가 없습니다.</div>;
  }

  const buyer = order.buyer || {};
  const receiver = order.receiver || {};
  const items = order.items || [];

  return (
    <div className="mpOrder_Detail_wrapper">
      <div className="mpOrder_Detail_Header">
        <Header_loginOK />  
      </div>     {/** mpOrder_Detail_Header end */}

      <div className="mpOrder_Detail_Content">
        <div className="mpOrder_Detail_body">
          <h2 className="subtitle">MY PAGE</h2>     {/** subtitle end */}

          <div className="mpOrder_Detail_top">
            <div className="customer_section">
              <div className="name">
                <strong>{summary?.user?.name || buyer.name || "회원"}</strong>님은{" "}
                {summary?.user?.grade || "MEMBER"}
              </div>    {/** name end */}

              <a href="#" className="my_edit">정보 수정하기</a>   {/** my_edit end */}

              <ul className="point_section">
                <li>
                  <a href="#">
                    <strong>쿠폰</strong> {summary?.counts?.coupons || 0} 장
                  </a>
                </li>
                <li>
                  <a href="#">
                    <strong>적립금</strong>{" "}
                    {formatWon(summary?.money?.mileage || 0)} 원
                  </a>
                </li>
                <li>
                  <a href="#">
                    <strong>포인트</strong> {formatWon(summary?.money?.points || 0)} P
                  </a>
                </li>  
              </ul>       {/** point_section end */}  

              <ul className="mpOrder_Detail_tab">
                <li><a href="/orders" className="tab_title">ORDER<br /><strong className="tab_sub">주문내역</strong></a></li>
                <li><a href="/wishlist" className="tab_title">WISH LIST<br /><strong className="tab_sub">관심상품</strong></a></li>
                <li><a href="/coupons" className="tab_title">COUPON<br /><strong className="tab_sub">쿠폰</strong></a></li>
                <li><a href="/mileage" className="tab_title">MILEAGE<br /><strong className="tab_sub">적립금</strong></a></li>
                <li><a href="/deposits" className="tab_title">DEPOSITS<br /><strong className="tab_sub">예치금</strong></a></li>
                <li><a href="/special-mileage" className="tab_title">SECRET MILEAGE<br /><strong className="tab_sub">스페셜 적립금</strong></a></li>
                <li><a href="#" className="tab_title">Q&amp;A<br /><strong className="tab_sub">내 상품문의</strong></a></li>
                <li><a href="#" className="tab_title">MYBOARD<br /><strong className="tab_sub">내 상품평</strong></a></li>
                <li><a href="/withdraw" className="tab_title">WITHDRAW<br /><strong className="tab_sub">회원 탈퇴</strong></a></li>
              </ul>     {/** my_page_tab end */}

            </div>      {/** customer_section end */}  
          </div>    {/** mpOrder_Detail_top end */}  

          <div className="order_detail" id="order_detail">
            <h3 className="title first">주문번호 : {order.order_no || order.order_id}</h3>  
            
            <p className="title_count tar">
              <span className="box_btn small white">
                <a href="#">계산서출력</a>  
              </span>   {/** box_btn small white end */}  
            </p>   {/** title_count tar end */}

            <table className="tbl_col prd">
              <caption className="hidden">주문상품</caption>  
              <colgroup>
                <col style={{ width: "100px" }} />
		            <col />
		            <col style={{ width: "15%" }} />
		            <col style={{ width: "12%" }} />
		            <col style={{ width: "5%" }} />
		            <col style={{ width: "12%" }} />
		            <col style={{ width: "10%" }} />
		            <col style={{ width: "10%" }} />
		            <col style={{ width: "10%" }} />
              </colgroup>

              <thead>
                <tr>
                  <th scope="col" colSpan={2}>상품명</th>
			            <th scope="col">옵션</th>
			            <th scope="col">가격</th>
			            <th scope="col">수량</th>
			            <th scope="col">총 금액</th>
			            <th scope="col">적립금</th>
			            <th scope="col">상태</th>
			            <th scope="col">후기작성</th>
                </tr>
              </thead>

              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.order_item_id}>
                      <td className="img">
                        <Link to={`/product/${encodeURIComponent(item.product_id)}`}>
                          <img
                            src={imgUrl(item.filename)}
                            width="70"
                            height="70"
                            alt={item.pname}
                          />
                        </Link>
                      </td>

                      <td className="tal">
                        <Link to={`/product/${encodeURIComponent(item.product_id)}`}>
                          {item.pname}
                        </Link>
                      </td>

                      <td>
                        {item.option_label || "-"}
                        <div></div>
                      </td>

                      <td>{formatWon(item.unit_price)} 원</td>
                      <td>{item.quantity}</td>
                      <td>{formatWon(item.line_total)} 원</td>

                      <td>
                        {formatWon(item.mileage)} 원
                      </td>

                      <td>
                        {statusText(order.status)}
                        <br />
                        <span className="box_btn small white btn_delivery">
                          <a href="#">배송조회</a>
                        </span>
                      </td>

                      <td>
                        <span className="box_btn">
                          <a href="#">후기작성</a>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>주문 상품이 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>     {/** tbl_col prd end */}

            {/** 주문자 정보 및 배송지 정보 */}
            <div className="area_left">
              <h3 className="title">주문자 정보</h3>
              <table className="tbl_order">
                <caption className="hidden">주문자 정보</caption>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col />
                </colgroup>  
                <tbody>
                  <tr>
                    <th scope="row">주문일자</th>
                    <td>{formatDate(order.paid_at || order.created_at)}</td>
                  </tr>
                  <tr>
                    <th scope="row">주문하시는 분</th>
                    <td>{buyer.name || "-"}</td>
                  </tr>
                  <tr>
                    <th scope="row">전화번호</th>
                    <td>{buyer.phone || "-"}</td>
                  </tr>
                  <tr>
                    <th scope="row">휴대전화번호</th>
                    <td>{buyer.cell || "-"}</td>
                  </tr>
                </tbody>
              </table>     {/** tbl_order end */}
              
              <h3 className="title">배송지 정보</h3>      {/** title end */}
              <table className="tbl_order">
                <caption className="hidden">배송지 정보</caption>   {/** hidden end */}
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">받으시는 분</th>
                    <td>{receiver.name || "-"}</td>
                  </tr>
                  <tr>
                    <th scope="row">전화번호</th>
                    <td>{receiver.phone || "-"}</td>
                  </tr>
                  <tr>
                    <th scope="row">휴대전화번호</th>
                    <td>{receiver.cell || "-"}</td>
                  </tr>
                  <tr>
                    <th scope="row">주소</th>
                    <td>
                      [{receiver.zip || "-"}]
                      <br />
                      {receiver.addr1 || ""} {receiver.addr2 || ""}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">배송시요청사항</th>
                    <td className="break">{order.dlv_memo || "-"}</td>  
                  </tr>  
                </tbody>  
              </table>       {/** tbl_order end */}
            </div>     {/** area_left end */}

            {/** 결제정보 및 결제수단 정보 */}
            <div className="area_right">
              <div className="box">
                <h3 className="title first">결제 정보</h3>     {/** title first end */}
                <table className="tbl_order2">
                  <caption className="hidden">결제 정보</caption>      {/** hidden end */}
                  <colgroup>
                    <col style={{ width: "50%"}} />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">상품합계금액</th>
                      <td>{formatWon(order.subtotal)} 원</td>
                    </tr>
                    <tr>
                      <th scope="row">배송비</th>
                      <td>{formatWon(order.shipping_fee)} 원</td>
                    </tr>
                    <tr>
                      <th scope="row">적립금 결제</th>
                      <td>- {formatWon(order.used_mileage)} 원</td>
                    </tr>
                    <tr>
                      <th scope="row">쿠폰할인 금액</th>
                      <td>- {formatWon(order.discount_total)} 원</td>
                    </tr>
                    <tr className="total_row">
                      <th scope="row" className="total">총 결제금액</th>
                      <td className="total">
                        <strong className="total_price">
                          {formatWon(order.total_pay)}
                        </strong>{" "}
                        원
                      </td>     {/** total end */}
                    </tr>   {/** total_row end */}
                    <tr className="total_row">
                      <th scope="row">총 적립금</th>
                      <td>{formatWon(order.total_mileage)} 원</td>  
                    </tr>       {/** total_row end */}  
                  </tbody>  
                </table>      {/** tbl_order2 end */}  

                <h3 className="title line">결제수단 정보</h3>      {/** title line end */}
                <table className="tbl_order2">
                  <caption className="hidden">결제수단 정보</caption>
                  <colgroup>
                    <col style={{ width: "25%" }} />
                    <col />
                  </colgroup>  
                  <tbody>
                    <tr>
                      <th scope="row">결제방법</th>
                      <td>{payMethodText(order.pay_method)}</td>
                    </tr>
                    <tr>
                      <th scope="row">거래정보</th>
	                    <td>
                        {order.pg_provider || order.pay_method || "-"}{" "}
                        <strong>[<a href="#">결제영수증</a>]</strong>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">입금일자</th>
                      <td>{formatDate(order.paid_at)}</td>
                    </tr>
                  </tbody>
                </table>      {/** tbl_order2 end */}
              </div>     {/** box end */}  
            </div>    {/** area_right end */}

            {/** 주문 1:1 문의 */}
            <div id="counsel">
              <h3 className="title">주문 1:1문의</h3>
              <table className="tbl_col">
                <caption className="hidden">1:1문의내역</caption>
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">번호</th>
                    <th scope="col">답변</th>
                    <th scope="col">분류</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5}>등록된 주문 문의가 없습니다.</td>
                  </tr>
                </tbody>  
              </table>     {/** tbl_col end */}  

              <div className="btn">
                <span className="box_btn white">
                  <button onClick={() => navigate(`/mypage/order-request/${order.order_id}`)}>
                    주문문의
                  </button>
                </span>
			          <span className="box_btn white">
                  <Link to={`/mypage/order-change/${order.order_id}`}>주문변경</Link>
                </span>
			          <span className="box_btn white">
                  <Link to={`/mypage/cancel-refund/${order.order_id}?type=CANCEL`}>
                    취소/환불신청
                  </Link>
                </span> 
			          <span className="box_btn white">
                  <a href="#">반품신청</a>
                </span>
			          <span className="box_btn fr">
                  <button type="button" onClick={() => navigate("/orders")}>
                    주문목록
                  </button>    
                </span>
              </div>     {/** btn end */}
            </div>      {/** #counsel end */}

          </div>    {/** order_detail end */}

        </div>     {/** mpOrder_Detail_body end */}  
      </div>    {/** mpOrder_Detail_Content end */}

      <div className="mpOrder_Detail_Footer">
        <Footer />
      </div>     {/** mpOrder_Detail_Footer end */}
    </div>        /** mpOrder_Detail_wrapper end */
  );
}; 

export default Mp_OrderDetail;