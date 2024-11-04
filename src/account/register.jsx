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
          <div>
            <label>ID</label>
            <input /><br />

            <label>password</label>
            <input /><br />

            <label>이름</label>
            <input /><br />

            <label>나이</label>
            <input /><br />

            <label>성별</label><br />
            <input type="radio" name="gender" checked />남성
            <input type="radio" name="gender" />여성
            <br />
            <br />

            <label>이메일</label>
            <input type="email" name="email" id="email" placeholder="ex) abc@gmail.com" required/>
            <br />

            <Button
              text={"회원가입"}
              type={"register"}
            />
            <Button 
              text={"뒤로가기"}
              type={"register_back"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default register;