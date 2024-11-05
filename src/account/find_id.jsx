import "./find_id.css"; 
import logo from "../assets/recypro_logo.png";
import Button from "../pages/Button";

const find_id = () => {
  return (
    <div className="card align-middle">
      <div className="card-title">
        <h2 className="card-title">
          <img src={logo} />
        </h2>
      </div>

      <div className="card-body">
        <form className="form-signin">
          <p className="text2">이름</p>
          <input type="text" name="name" id="name" />
          <input type="email" name="email" id="email" />
          <p className="check" id="check">확인</p>
          <Button 
            text={"아이디찾기"}
            type={"find_id"}
          />
        </form>
      </div>

      <div className="links">
        <a>비밀번호 찾기</a>
        <a>로그인</a> | <a>회원가입</a>
      </div>
    </div>
  );
};

export default find_id;