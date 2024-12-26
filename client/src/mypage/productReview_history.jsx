import "./productReview_history.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const productReview_history = () => {
  return (
    <div className="productReview_history_wrapper">
      <div className="pr_history_Header">
        <Header_loginOK />
      </div>
      <div className="pr_history_title">
        <div className="container">
          <h1 className="display-3">상품리뷰 작성 내역</h1>
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
      <div className="pdRv_list">
        <table className="table" border="1">
          <thead>
            <tr>
              <th className="pdRv_num">번호</th>
              <th className="pdRv_title">제목</th>
              <th className="pdRv_productName">상품명</th>
              <th className="pdRv_userId">사용자 ID명</th>
              <th className="pdRv_date">작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr className="light">
              <td>1</td>
              <td>깔끔해서 좋아요</td>
              <td>강화 소창 수건 - 먼지 안 나는 무형광</td>
              <td>witch0817</td>
              <td>2024-11-23</td>
            </tr>
            <tr className="light">
              <td>2</td>
              <td>저한테 잘 맞아요</td>
              <td>유기농 설거지 비누</td>
              <td>witch0817</td>
              <td>2024-11-23</td>
            </tr>
            <tr className="light">
              <td>3</td>
              <td>엄청 예뻐요</td>
              <td>토끼 커플텀블러-플라스틱 프리챌린지</td>
              <td>witch0817</td>
              <td>2024-11-23</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pdRv_button">
        <Button 
          type={"pdRv_back"}
          text={"뒤로가기"}
        />
      </div>
    </div>
  );
};

export default productReview_history;