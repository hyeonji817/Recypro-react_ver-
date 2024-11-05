import "./find_pw.css";
import logo from "../assets/recypro_logo.png";
import Button from "../pages/Button";

const find_pw = () => {
  return (
    <div className="wrapper_findPw">
      <div className="card align-middle">
        <div className="card-title">
          <h2 className="card-title">
            <img src={logo}/>
          </h2>
        </div>

        <div className="card-body">
          <form className="form-signin">
            <input type="text" name="id" id="id" className="form-control" 
        		placeholder="아이디" required/><br />
            <input type="text" name="name" id="name" className="form-control" placeholder="이름" 
        		required/><br />
            <input type="email" name="email" id="email" className="form-control" 
        		placeholder="이메일" required/><br />
            <p className="checks" id="checks"></p>
            <Button 
              id="btn-Yes"
              text={"비밀번호찾기"}
              type={"find_pw"}
            />
          </form>
        </div>

        <div className="links">
          <a>아이디 찾기</a> | <a>로그인</a> | <a>회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default find_pw; 