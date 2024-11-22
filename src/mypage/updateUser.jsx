import "./updateUser.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const updateUser = () => {
  return (
    <div className="updateUser_wrapper">
      <div className="updateUser_Header">
        <Header_loginOK />
      </div>
      <div className="updateUser_form">
        <fieldset>
          <div className="updateUser_title">
            <legend>회원정보 수정</legend>
          </div>
          <br />

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

          <div className="update_userInfo">
            <form method="post">
              <div className="form-group">
                <h5 className="tap1">아이디</h5>
                <div className="tap2">
                  <input type="text" name="id" className="form-control" value="witch0817" readOnly/>
                </div>
              </div>
              <div className="form-group">
                <h5 className="tap1">비밀번호</h5>
                <div className="tap2">
                  <input type="password" name="password" id="password1" className="form-control" placeholder="비밀번호를 입력하세요" required/><br />
                </div>
              </div>
              <div className="form-group">
                <h5 className="tap1" id="pwd">변경할 비밀번호</h5>
                <div className="tap2">
                  <input type="password" name="password2" id="password2" className="form-control" placeholder="비밀번호를 입력하세요" /><br />
                </div>
              </div>
              <div className="form-group">
                <h5 className="tap1" id="pwd">변경할 비밀번호 재입력</h5>
                <div className="tap2" id="pwd_reply">
                  <input type="password" name="password3" id="password3" className="form-control" placeholder="비밀번호를 다시 입력하세요" />
                  <a className="form-button">
                    <Button
                      text={"확인"}
                      type={"updateUser_confirm"}
                    />
                  </a>
                </div>
              </div>
              <div className="form-group">
                <h5 className="tap1">이름</h5>
                <div className="tap2">
                  <input type="text" name="name" className="form-control" value="곽현지" />
                </div>
              </div>
              <div className="form-group">
                <h5 className="tap1">나이</h5>
                <div className="tap2">
                  <input type="text" name="age" className="form-control" value="28" readOnly />
                </div>
              </div>
              <div className="form-group">
                <h5 className="tap1">성별</h5>
                <div className="tap2">
                  <label className="male">
                    <input type="radio" name="gender" value="남" />
                    <span className="male_check">
                      <span>남자</span>
                    </span>
                  </label>
                  <label className="female">
                    <input type="radio" name="gender" value="여" />
                    <span className="female_check">여자</span>
                  </label> 
                </div>
              </div>
              <div className="form-group">
                <h5 className="tap1">이메일</h5>
                <div className="tap2">
                  <input type="text" name="email" id="email_text"
						        className="form-control" value="narimjoon@naver.com" />
                </div>
              </div>
              <div className="form-modify">
                <label>
                  <Button 
                    text={"회원정보수정하기"}
                    type={"userInfo_change"}
                  />
                </label>
                <Button 
                  text={"뒤로가기"}
                  type={"updateUser_back"}
                  className="btn btn-default btn-lg"
                />
              </div>
            </form>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default updateUser;