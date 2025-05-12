import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom";

const LogoutAction = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("http://localhost:5001/logout", {   // 서버 페이지(server.js)에 있는 logout API에게 값 전달 
      method: "POST",
      credentials: "include",   // 세션 쿠키를 포함 
    }).then((res) => {
      if (res.ok) {
        alert("로그아웃 되었습니다.");
        navigate("/");
      } else {
        alert("로그아웃 실패");
      }
    }).catch((err) => {
      console.error("Logout error", err);
    });
  }, [navigate]);

  return null;    // 록은 로딩 스피너 UI
};

export default LogoutAction;