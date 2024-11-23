import "./coupon_list.css";
import Header_loginOK from "../main/Header_loginOK";

const coupon_list = () => {
  return (
    <div className="couponList_wrapper">
      <div className="couponList_Header">
        <Header_loginOK />
      </div>
      <div className="couponList_title">
        <div className="container">
          <h1 className="display-3">쿠폰함</h1>
        </div>
      </div>
      <div className="side_menubar">
        <ul>
          <li>
            <div className="user_modify">
              <a href="#">회원정보수정</a>
            </div>
          </li>
          <li>
            <div className="mylevel">
              <a href="#">마이레벨</a>
            </div>
          </li>
          <li>
            <div className="coupon_list">
              <a href="#">쿠폰함</a>
            </div>
          </li>
          <li>
            <div className="review_list">
              <a href="#">게시판 작성 내역</a>
            </div>
          </li>
          <li>
            <div className="orderlist">
              <a href="#">주문내역 조회</a>
            </div>
          </li>
          <li>
            <div className="product_review">
              <a href="#">상품리뷰 확인</a>
            </div>
          </li>
        </ul>
      </div>
      <table className="table" border="1">
        <thead>
          <tr>
            <th className="coupon_num">번호</th>
            <th className="coupon_type">쿠폰종류</th>
            <th className="coupon_period">유효기간</th>
            <th className="coupon_use">사용여부</th>
          </tr>
        </thead>
        <tbody>
          <tr className="white">
            <td className="coupon_num2">3</td>
            <td className="coupon_event">50% OFF 할인쿠폰 (생일 이벤트) 등급 무관하게 드려요!</td>
            <td className="coupon_period2">2024.08.17 ~ 2025.02.17 (6개월)</td>
            <td className="coupon_use2">N</td>
          </tr>
          <tr className="light">
            <td className="coupon_num2">2</td>
            <td className="coupon_event">10% OFF 할인쿠폰</td>
            <td className="coupon_period2">2024.11.23 ~ 2025.02.23</td>
            <td className="coupon_use2">Y</td>
          </tr>
          <tr className="light">
            <td className="coupon_num2">1</td>
            <td className="coupon_event">20% OFF 할인쿠폰</td>
            <td className="coupon_period2">2025.02.19 ~ 2025.05.19</td>
            <td className="coupon_use2">N</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default coupon_list;