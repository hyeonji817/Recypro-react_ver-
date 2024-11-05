import "./Login.css";
import Button from "../pages/Button";

const Login = () => {
  return (
    <div className="wrapper_login">
      <div className="login">
        <h1 className="logo">
          <a href="../main/home.jsx">리싸이프로</a>
        </h1>
        <form>
          <br /><br /><br /><br />
          <h1 className="login_title">로그인</h1>
          <br />
        </form>
        <div className="login_body">
          <form>
            <div className="form-group">
              <input 
                type="text"
                name="id"
                id="id"
                className="form-control"
                placeholder="아이디"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <input 
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="비밀번호"
                required
              />
            </div>
            <Button 
              text={"로그인"}
              type={"login"}
            />
            <div className="text-center">
              <br />
              <a href="./register.jsx" className="d-block">회원가입하기</a>
              <a href="./find_id.jsx" className="d-block">아이디 찾기</a>
              <a href="./find_pw.jsx" className="d-block">비밀번호 찾기</a>
            </div>

            <div className="button-login">
              <a>
                <img 
                  src="//k.kakaocdn.net/14/dn/btqbjxsO6vP/KPiGpdnsubSq3a0PHEGUK1/o.jpg"
                  alt="카카오계정 로그인"
                />
              </a>
              <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;