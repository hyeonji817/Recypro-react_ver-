import "./register.css";
import Button from "../pages/Button";

const register = () => {
  return (
    <div className="wrapper_register">
      <div className="login">
        <h1 className="logo">
          <a href="../main/Home.jsx">리싸이프로</a>
        </h1>
        <form>
          <h1 className="h3 mb-3 font-weight-normal" id="register">회원가입</h1>
          <div className="form-group">
            <label>ID</label>
            <input type="text" className="form-control" placeholder="ID를 입력하세요"/><br />
          </div>
          
          <div className="form-group">
            <label>password</label>
            <input type="password" className="form-control" placeholder="비밀번호를 입력하세요"/><br />
          </div>
            
          <div className="form-group">
            <label>이름</label>
            <input type="text" className="form-control" placeholder="이름을 입력하세요"/><br />
          </div>

          <div className="form-group">
            <label>나이</label>
            <input type="number" className="form-control" placeholder="나이를 입력하세요"/><br />
          </div>

          <div className="form-group">
            <label className="user-only">성별</label><br />
            <div className="gender-group">
              <label>
                <input type="radio" name="gender" className="male" defaultChecked />남성
              </label>
              <label>
                <input type="radio" name="gender" className="female" />여성
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input type="email" className="form-control" placeholder="ex) abc@gmail.com" required/>
            <br />
          </div>
            
          <Button
            text={"회원가입"}
            type={"register"}
          />
          <Button 
            text={"뒤로가기"}
            type={"register_back"}
          />
          
        </form>
      </div>
    </div>
  );
};

export default register;