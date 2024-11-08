import "./find_id.css"; 
import logo from "../assets/recypro_logo.png";
import Button from "../pages/Button";

const find_id = () => {
  return (
    <div className="wrapper_findId">
      <div className="card align-middle">
        <div className="card-title">
          <h2 className="card-title">
            <img src={logo} />
          </h2>
        </div>

        <div className="card-body">
          <form className="form-signin">
            <p className="text2"></p>
            <div className="user_name">
              <input type="text" name="name" id="name" className="form-control" placeholder="이름" />
            </div>
            <div className="user_email">
              <input type="email" name="email" id="email" className="form-control" placeholder="이메일" />
            </div>
            
            <p className="check" id="check"></p>
            <Button 
              id="btn-Yes"
              text={"아이디찾기"}
              type={"find_id"}
            />
          </form>
        </div>

        <div className="links">
          <a>비밀번호 찾기</a> | <a>로그인</a> | <a>회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default find_id;