import "./Mypage.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const Mypage = () => {
  return (
    <div className="Mypage_wrapper">
      <div className="mypage_Header">
        <Header_loginOK />
      </div>
      <div className="mypage_title">
        <div className="container">
          <h1 className="display-3">마이페이지</h1>
        </div>
      </div>
      <div className="mypage_side_menubar">
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
    </div>
  );
};

export default Mypage;