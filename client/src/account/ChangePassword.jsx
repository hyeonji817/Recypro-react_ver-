import React, { useState } from "react"; 
import axios from "axios";
import logo from "../assets/recypro_logo.png";
import "./ChangePassword.css";
import Button from "../pages/Button";

const ChangePw = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); 
  const [message, setMessage] = useState("");
  
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5003/api/ChangePassword", {
        currentPassword,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "비밀번호 변경 실패");
    }
  };

  return (
    <div className="wrapper_ChangePw">
      <div className="card align-middle">
        <div className="card-title">
          <h2 className="card-title">
            <img src={logo} alt="Recypro Logo" />
          </h2>
        </div>

        <div className="card-body">
          <div style={{ width: "300px", margin: "50px auto", textAlign: "center" }}>
            <h2>비밀번호 변경</h2>
            <form className="form-signin" onSubmit={handleChangePassword}>
              <div>
                <input 
                  type="password"
                  name="password"
                  id="password"
                  placeholder="현재 비밀번호"
                  className="form-control" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <input 
                  type="password"
                  name="password"
                  id="password"
                  placeholder="새 비밀번호"
                  className="form-control" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <input 
                  type="password"
                  name="password"
                  id="password"
                  placeholder="새 비밀번호 확인"
                  className="form-control" 
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                id="btn-Yes"
                text={"변경하기"}
                type={"ChangePw"}
                onClick={handleChangePassword}
              />
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePw;