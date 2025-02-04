import "./Login.css";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import Button from "../pages/Button";

const Login = () => {
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("로그인 요청 보냄:", formData); 

    try {
      const response = await fetch("http://localhost:5003/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("서버 응답 수신:", response);

      const data = await response.json();
      console.log("서버 응답 데이터:", data);

      if (!response.ok) {
        setErrorMessage(data.message || "로그인 실패"); 
      } else {
        alert(data.message); 
        // 토큰 저장 (ex) 로컬 스토리지)
        localStorage.setItem("token", data.token);

        // navigate를 useEffect에서 실행 
        setTimeout(() => {
          window.location.href = "/main/loginOK";
        }, 100);
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error); 
      setErrorMessage("서버와의 통신에 문제가 발생했습니다.");
    }
  };

  return (
    <div className="wrapper_login">
      <div className="login">
        <h1 className="logo">
          <a href="../main/home.jsx">리싸이프로</a>
        </h1>
        <form onSubmit={handleSubmit}>
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
                value={formData.id}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Button 
              text={"로그인"}
              type={"login"}
              className="login-button" 
              onClick={handleSubmit}
            />
            <div className="text-center">
              <br />
              <a href="./register.jsx" className="d-block">회원가입하기</a>
              <a href="/find_id.jsx" className="d-block">아이디 찾기</a>
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