import "./mylevel.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";
import flowchart from "../assets/shopdetail/flowchart.png";
import seed from "../assets/shopdetail/seed.jpg";

const mylevel = () => {
  return (
    <div className="mylevel_wrapper">
      <div className="mylevel_Header">
        <Header_loginOK />
      </div>
      <div className="mylevel_title">
        <div className="container">
          <h1 className="display-3">마이레벨</h1>
        </div>
      </div>
      <div className="flow_chart_icon">
        <a href="#">
          <img src={flowchart} />
        </a>
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
      <div className="mylevel_img">
        <img src={seed} />
        <div className="level_info">
          <h4>회원 ID : witch0817</h4>
          <br />
          <h4>나의 등급 : 씨앗 (lv.8)</h4>
          <br />
          <h4>받을 수 있는 혜택 : 미정</h4>
        </div>
      </div>
    </div>
  );
};

export default mylevel; 