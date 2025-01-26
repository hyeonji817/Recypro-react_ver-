import React, { useState } from "react";
import "./register.css";
import Button from "../pages/Button";

const Register = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "", 
    name: "",
    age: "",
    gender: "남성", 
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; 
    console.log(`Changing ${name} to ${value}`);    // 디버깅용 로그 
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 회원가입 처리 이벤트 기능
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      alert("유효한 이메일 주소를 입력하세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5003/api/account/register", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="wrapper_register">
      <div className="login">
        <h1 className="logo">
          <a href="../main/Home.jsx">리싸이프로</a>
        </h1>
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal" id="register">회원가입</h1>
          <div className="form-group">
            <label>ID</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="ID를 입력하세요"
              name="id"
              value={formData.id}
              onChange={handleChange}  
            />
          </div>
          
          <div className="form-group">
            <label>password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="비밀번호를 입력하세요"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
            
          <div className="form-group">
            <label>이름</label>
            <input
              type="text" 
              className="form-control" 
              placeholder="이름을 입력하세요"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>나이</label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="나이를 입력하세요"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="user-only">성별</label><br />
            <div className="gender-group">
              <label>
                <input 
                  type="radio"
                  name="gender"
                  value="남성"
                  checked={formData.gender === "남성"}
                  onChange={handleChange}
                />
                남성
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="여성"
                  checked={formData.gender === "여성"}
                  onChange={handleChange}
                />
                 여성
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="ex) abc@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <br />
          </div>
        </form>
        <div className="button_wrap">
          <Button
            className="register"
            text={"회원가입"}
            type={"submit"}
          />
          <Button 
            className="register_back"
            text={"뒤로가기"}
            type={"register_back"}
            onClick={() => window.history.back()}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;