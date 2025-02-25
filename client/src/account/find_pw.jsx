import { useState } from "react"; 
import axios from "axios"; 
import "./find_pw.css";
import logo from "../assets/recypro_logo.png";
import Button from "../pages/Button";

const FindPw = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); 
  const [foundPw, setFoundPw] = useState(""); 
  const [color, setColor] = useState("red");

  // 패스워드 찾기 요청 함수 
  const handleFindPw = async (e) => {
    e.preventDefault();     // 기본 제출 방지 
    console.log("요청 데이터:", id, name, email);   // 확인용 로그 

    // 입력 검증 
    if (!id.trim()) {
      setError("아이디를 입력해 주세요.");
      return;
    }
    if (!name.trim()) {
      setError("이름을 입력해 주세요.");
      return;
    }
    if (!email.trim()) {
      setError("이메일을 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5003/api/find_pw", {
        id,
        name,
        email,
      });

      console.log("서버 응답:", response.data);   // 서버 응답 확인용 로그 

      if (response.data.success && response.data.userPw) {
        setFoundPw(response.data.userPw);
        setError("");   // 오류 메시지 초기화 
      } else {
        setFoundPw("");
        setMessage("");
        setError(response.data.message || "비밀번호를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("비밀번호 찾기 요청 실패:", error);
      setFoundPw("");
      setMessage("");
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="wrapper_findPw">
      <div className="card align-middle">
        <div className="card-title">
          <h2 className="card-title">
            <img src={logo} alt="Recypro Logo"/>
          </h2>
        </div>

        <div className="card-body">
          <form className="form-signin" onSubmit={handleFindPw}>
            <input type="hidden" name="password" value={message} />

            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}

            <div className="user_id">
              <input 
                type="text" 
                name="id" 
                id="id" 
                className="form-control" 
        		    placeholder="아이디" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              /><br />
            </div>
            
            <div className="user_name">
              <input 
                type="text" 
                name="name" 
                id="name" 
                className="form-control" 
                placeholder="이름" 
                value={name}
                onChange={(e) => setName(e.target.value)}
        		    required
              /><br />
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
                required
              /><br />
            </div>
            <p className="checks" id="checks">
              {foundPw ? `임시 비밀번호: ${foundPw}` : ""}
            </p>
            
            <div className="Button_findPw">
              <Button 
                id="btn-Yes"
                text={"비밀번호찾기"}
                type={"find_pw"}
                onClick={handleFindPw}
              />
            </div>
          </form>
        </div>

        <div className="links">
          <a href="/find_id">아이디 찾기 </a> | 
          <a href="/login"> 로그인 </a> | 
          <a href="/register"> 회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default FindPw; 