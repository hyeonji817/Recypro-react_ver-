import "./userinfo.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const userinfo = () => {
  return (
    <div className="userinfo_wrapper">
      <div className="userinfo_Header">
        <Header_loginOK />
      </div>
      <div className="userinfo_title">
        <h2 className="title">회원정보</h2>
      </div>
      <div className="side_menubar">
        <ul>
          <li>
            <div className="user_check">
              <a href="#">회원정보조회</a>
            </div>
          </li>
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
            <div className="product_review">
              <a href="#">상품리뷰 확인</a>
            </div>
          </li>
        </ul>
      </div>

      <div className="check_userInfo">
        <table className="table" border="1">
          <thead>
            <tr>
              <th>회원정보 종류</th>
              <th>회원정보</th>
            </tr>
          </thead>
          <tbody>
            <tr className="white">
              <td>아이디</td>
              <td>witch0817</td>
            </tr>
            <tr className="light">
              <td>비밀번호</td>
              <td>audtn817</td>
            </tr>
            <tr className="light">
              <td>이름</td>
              <td>곽현지</td>
            </tr>
            <tr className="light">
              <td>나이</td>
              <td>31</td>
            </tr>
            <tr className="light">
              <td>성별</td>
              <td>여</td>
            </tr>
            <tr className="light">
              <td>이메일</td>
              <td>narimjoon@naver.com</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="userInfo_button">
        <Button 
          text={"뒤로가기"}
          type={"userInfo_back"}
        />
      </div>
    </div>
  );
};

export default userinfo;