import { useState } from "react"; 
import axios from "axios";
import "./find_id.css"; 
import logo from "../assets/recypro_logo.png";
import Button from "../pages/Button";

const FindId = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState("");   // 아이디 찾기 결과 메시지  
  const [error, setError] = useState("");     // 오류 메시지 

  // 아이디 찾기 요청 함수 
  const handleFindId = async (e) => {
    e.preventDefault();   // 기본 제출 방지 

    // 입력 검증 
    if (!name.trim()) {
      setError("이름을 입력해 주세요."); 
      return;
    }

    if (!email.trim()) {
      setError("이메일을 입력해 주세요."); 
      return;
    }

    try {
      const response = await axios.post("http://localhost:5003/api/find_id", {
        name,
        email,
      });

      if (response.data.success) {
        setMessage(`내 아이디: ${response.data.userId}`);
        setError("");   // 오류 메시지 초기화 
      } else {
        setMessage("");   // 기존 메시지 초기화 
        setError(response.data.message); 
      }
    } catch (error) {
      setMessage("");
      setError("서버 오류가 발생했습니다.");
    }
  };

  

  return (
    <div className="wrapper_findId">
      <div className="card align-middle">
        <div className="card-title">
          <h2 className="card-title">
            <img src={logo} alt="Recypro Logo" />
          </h2>
        </div>

        <div className="card-body">
          <form className="form-signin" onSubmit={handleFindId}>
            {message && <p className="text2">{message}</p>}
            {error && <p className="error-test">{error}</p>}

            <div className="user_name">
              <input 
                type="text" 
                name="name" 
                id="name" 
                className="form-control" 
                placeholder="이름" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="user_email">
              <input 
                type="email" 
                name="email" 
                id="email" 
                className="form-control" 
                placeholder="이메일" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <p className="check" id="check">내 아이디 :</p>
            <div className="Button_findId">
              <Button 
                id="btn-Yes"
                text={"아이디찾기"}
                type={"find_id"}
              />
            </div>
          </form>
        </div>

        <div className="links">
          <a href="/find_pw">비밀번호 찾기</a> | 
          <a href="/login"> 로그인</a> | 
          <a href="/register"> 회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default FindId;