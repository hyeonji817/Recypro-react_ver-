import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../pages/Button";

const Login = () => {
  // formData 및 상태 선언
const [formData, setFormData] = useState({ id: "", password: "" });
const [errorMessage, setErrorMessage] = useState("");
const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 세션 쿠키 포함
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.message || "로그인 실패");
    } else {
      alert(data.message);
      localStorage.setItem("token", data.token); // 필요 시 JWT 저장
      alert("로그인 성공!");

      if (formData.id === "admin" && formData.password === "1234") {
        navigate("/login_admin");
      } else {
        navigate("/index");
      }
    }
  } catch (err) {
    console.error("서버 오류:", err);
    setErrorMessage("서버 통신 오류");
  }
};


  return (
    <div className="wrapper_login">
      <div className="login">
        <h1 className="logo">
          <Link className="logo" to="/home">리싸이프로</Link>
        </h1>
        
        {/** 추가된 내용 */}
        <div id="login" className="box_member login">
	        <div className="login_wrap">
		        <div className="login_box">
			        <div className="tabcnt_member tabcnt_member0" style={{ display: "block" }}>	
				        <form method="post" onSubmit={handleSubmit} style= {{ margin: "0px" }}>
                  <input type="hidden" name="exec_file" value="member/login.exe.php" />
                  <input type="hidden" name="rURL" value="https://www.rolarola.com/main/index.php" />
                  <input type="hidden" name="urlfix" value="Y" />

					        <fieldset>
						        <legend className="hidden">회원 로그인</legend>
						        <div className="fld top">
							        <label htmlFor="login_id">ID</label>
							        <input 
                        type="text" 
                        name="id" 
                        value={formData.id} 
                        onChange={handleChange} 
                        maxLength={50} 
                        id="login_id" 
                        className="form_input member block" 
                      />
							        <div className="auto_complete auto_complete_member_id"></div>
					  	      </div>    {/** fld top end */}

						        <div className="fld">
							        <label htmlFor="login_pwd">PASSWORD</label>
							        <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        id="login_pwd" 
                      className="form_input member block" />
							        <span className="show_icon"></span>
						        </div>    {/** fld end */}

						        <div className="savessl">
							        <input type="checkbox" name="setOpenSSL" id="member_ssl" checked="" />
                      <label htmlFor="member_ssl">보안접속</label>
							        <input type="checkbox" name="id_save" value="Y" id="member_id_save" />
                      <label htmlFor="member_id_save">아이디저장</label>
							        <input type="checkbox" name="pw_save" value="Y" id="member_pwd_save" />
                      <label htmlFor="member_pwd_save">비밀번호저장</label>
						        </div>  {/** savessl end */}

						        <div className="login_btn_wrap">
							        <span className="box_btn block black2">
                        <input type="submit" value="LOG IN" />
                      </span>
							        <span className="box_btn w144 gray3"></span>
						        </div>    {/** login_btn_wrap end */}

						        <div className="joinfind">
                      <p><Link to="/account/register">CREATE ACCOUNT</Link></p>
							        <p><a href="#">FIND ID</a></p>
                      <p><a href="#">FIND PASSWORD</a></p>
						        </div>    {/** joinfind end */}
					        </fieldset>
				        </form>

				        <div className="sns_wrap">
					        <div className="simple">
						        <a href="#" className="kakao">카카오로 시작하기</a>
						        <a href="#" className="naver">네이버로 시작하기</a>
						        <a href="#" className="apple">애플로 시작하기</a>
					        </div>    {/** simple end */}
				        </div>    {/** sns_wrap end */}
			        </div>      {/** tabcnt_member tabcnt_member0 end */}

			        <div className="tabcnt_member tabcnt_member1 tab_order" style={{ display: "none" }}>
				        <form method="post" action="https://www.rolarola.com/mypage/order_detail.php" style={{ margin: "0px" }}>
                  <input type="hidden" name="exec" value="orderDetail" />

					        <fieldset>
						        <legend className="hidden">비회원 주문조회</legend>
						        <div className="fld top">
							        <label htmlFor="login_order_no">ORDER NO</label>
							        <input type="text" name="ono" id="login_order_no" className="form_input member block" />
						        </div>    {/** fld top end */}
						        <div className="fld">
							        <label htmlFor="login_phone">PHONE NO</label>
							        <input type="text" name="phone" id="login_phone" className="form_input member block" />
						        </div>    {/** fld end */}
						        <div className="savessl dn">
							        <input type="checkbox" name="setOpenSSL" id="nonmember_ssl" checked="" /> 
                      <label htmlFor="nonmember_ssl">보안접속</label>
						        </div>    {/** savessl dn end */}
						        <div className="login_btn_wrap">
							        <span className="box_btn block black2">
                        <input type="submit" value="OK" />
                      </span>
						        </div>    {/** login_btn_wrap end */}
					        </fieldset>
				        </form>
			        </div>    {/** tabcnt_member tabcnt_member1 tab_order end */}
			
			        <ul className="tab_member">
				        <li className="first">
                  <a className="active">회원 로그인</a>
                </li>
				        <li><a href="#">비회원 주문조회</a></li>
			        </ul>
		        </div>    {/** login_box end */}
	        </div>    {/** login_wrap end */}
        </div>    {/** box_member login end */}

        {/** <div className="button-login">
          <a>
            <img 
              src="//k.kakaocdn.net/14/dn/btqbjxsO6vP/KPiGpdnsubSq3a0PHEGUK1/o.jpg"
              alt="카카오계정 로그인"
            />
          </a>
          <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        </div> */}
      </div>
    </div>
  );
};

export default Login;