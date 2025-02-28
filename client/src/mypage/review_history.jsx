import "./review_history.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const review_history = () => {
  return (
    <div className="reviewHistory_wrapper">
      <div className="reviewHistory_Header">
        <Header_loginOK />
      </div>
      <div className="reviewHistory_title">
        <div className="container">
          <h1 className="display-3">게시판 작성 내역</h1>
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
      <div className="rv_list">
        <table className="table" border="1">
          <thead>
            <tr>
              <th className="rv_num">번호</th>
              <th className="rv_title">제목</th>
              <th className="rv_user">작성자</th>
              <th className="rv_date">작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>안녕하세요</td>
              <td>guswl0817</td>
              <td>2024-11-23</td>
            </tr>
            <tr>
              <td>2</td>
              <td>단골될게요!</td>
              <td>guswl0817</td>
              <td>2024-11-23</td>
            </tr>
            <tr>
              <td>3</td>
              <td>좋아요</td>
              <td>guswl0817</td>
              <td>2024-11-23</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="rv_button">
        <Button 
          type={"reviewBack"}
          text={"뒤로가기"}
        />
      </div>
    </div>
  );
};

export default review_history;