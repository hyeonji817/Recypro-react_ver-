import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({    // 서버 페이지에 전달할 폼값명 
    id: "",
    password: "",
    name: "",
    age: "",
    gender2: "",
    email: "",
    nickname: "",
    phone: "",
    birth: "",
    gender: "",
    zip: "",
    addr1: "",
    addr2: "",
    agree_terms: false,
    agree_privacy: false,
    agree_sms: false,
    agree_email: false,
  });

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // 폼(input 요소들)의 상태를 변경할 때 사용하는 함수
  const handleChange = (e) => {
    // 사용자가 변경한 '<input>' 요소의 속성들을 꺼냄 
    // e.target : 이벤트가 발생한 input 요소 
    // name : input의 name 속성 
    // value : 텍스트나 숫자 input에 입력한 값 
    // type : input의 타입 
    // checked : 체크박스일 경우 'true' 또는 'false' 
    const { name, value, type, checked } = e.target;
  
    if (name === "all_check") {
      // 전체동의일 경우 모든 체크박스 항목을 한꺼번에 갱신
      setFormData((prev) => ({
        ...prev,
        agree_terms: checked,   // 해당 항목이 자동 체크표시됨 
        agree_privacy: checked,
        agree_sms: checked,
        agree_email: checked,
      }));
    } else {
      // 개별 항목 변경
      setFormData((prev) => ({
        ...prev,    // prev : 이전 formData 상태 
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };  

  const handleSubmit = async (e) => {   // 폼값(데이터값)을 전송하는 이벤트 함수(메소드) 
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/account/register`, {   // 값 전달할 페이지 지정 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("회원가입 완료!");
        navigate("/login");     // 로그인 페이지로 이동
      } else {
        const data = await res.json();
        alert(`회원가입 실패: ${data.message || data.error || "입력 내용을 확인해 주세요."}`);
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류 발생");
    }
  };

  return (
    <div className="wrapper_register">
      <div className="register">
        <h1 className="logo">
          <Link to="/home" className="recypro">리싸이프로</Link>
          {/** <a href="../main/Home.jsx">리싸이프로</a> */}
        </h1>
        
        {/** 중간내용 */}
        <div className="registerJoin">
          <div className="registerBody">
          <h2 className="subtitle">회원정보 입력</h2>

          <div id="join_input">
            <form name="joinFrm" method="post" onSubmit={handleSubmit}>
              <input type="hidden" name="exec_file" value="" />
              <input type="hidden" name="member_id_checked" value="0" />
              <input type="hidden" name="nick_checked" value="0" />
              <input type="hidden" name="namecheck_num" value="" />
              <input type="hidden" name="ipin_num" value="" />
              <input type="hidden" name="member_type" value="1" />
              <input type="hidden" name="reg_data" value="" />

              <fieldset>
                <div className="all_chk">
                  <p className="check">
                    <label>
                      <input type="checkbox" name="all_check" value="Y" className="all_check" />전체동의
                    </label>
                  </p>    {/** check end */}
                </div>    {/** all_chk end */}
                <legend>이용 약관</legend>
                <div className="box join_box join_box0">
                  <label>
                    <input type="checkbox" name="agree_terms" checked={formData.agree_terms} onChange={handleChange} value="Y" className="join_check" />이용약관
                  </label>
                  <div className="cont_box">
                    <iframe name=""></iframe>
                  </div>    {/** cont_box end */}
                </div>      {/** box join_box join_box0 */}

                <div className="box join_box join_box1">
                  <label>
                    <input type="checkbox" name="agree_privacy" checked={formData.agree_privacy} onChange={handleChange} value="Y" className="join_check" />개인정보처리방침
                  </label>
                  <div className="cont_box">
                    <table className="tbl_row">
                      <caption className="hidden">개인정보 수집·이용 동의</caption>
                      <colgroup>
                        <col style={{ width: "20%" }} />
                        <col />
                      </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">수집하는 개인정보 항목</th>
                        <td>이름 , 로그인ID , 비밀번호 , 자택 전화번호 , 자택 주소 , 휴대전화번호 , 이메일</td>
                      </tr>
                      <tr>
                        <th scope="row">수집 및 이용목적</th>
                        <td>회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 불량회원의 부정 이용 방지와 비인가 사용 방지 , 가입 의사 확인 , 불만처리 등 민원처리 , 고지사항 전달</td>
                      </tr>
                      <tr>
                        <th scope="row">보유 및 이용기간</th>
                        <td>
                          회원탈퇴 단, 관계 법령에 따라 개인정보를 보존해야 하는 경우, 회사는 해당 법령에서 정한 기간동안 보관합니다.<br />
                          ※ 동의를 거부할 수 있으나 거부 시 회원가입이 불가능합니다.
                        </td>
                        </tr>
                      </tbody>
                    </table>  
                  </div>     {/** cont_box end */}
              </div>    {/** box join_box join_box1 end */}
            </fieldset>

            <input type="hidden" name="setOpenSSL" value="Y" checked="" />
            <fieldset>
              <legend>기본정보입력 <span><strong>*</strong> 필수 입력 항목</span></legend>
              <div className="box">
                <div className="required">
                  <label htmlFor="join_id">아이디</label>
                  <div className="input_area">
                    <input type="text" name="id" value={formData.id} maxLength={16} onChange={handleChange} placeholder="아이디" id="join_id" className="form_input block" />
                  </div>    {/** input_area end */}
                  <div className="msg">
                    <p className="form_result form_result_member_id warning"></p>
                  </div>    {/** msg end */}
                </div>    {/** required end */}
    
                <div className="required">
                  <label htmlFor="join_email">이메일</label>
                  <div className="input_area">
                    <input type="email" name="email" value={formData.email} id="join_email" className="form_input block" />
                    <div className="auto_complete_email auto_complete_dialog"></div>
                  </div>    {/** input_area end */}
                  <div className="msg">
                    <p className="form_result form_result_email warning"></p>
                  </div>  {/** msg end */}
                </div>    {/** required end */}

                <div className="pw1 required">
                  <label htmlFor="join_pw">비밀번호</label>
                  <div className="input_area">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="비밀번호" id="join_pw" className="form_input block" />
                    <div className="msg block">
                      <p className="form_result form_result_pwd1 warning"></p>
                    </div>    {/** msg block end */}
                  </div>    {/** input_area end */}

                  <div className="msg">
                    <div className="password_security_lev password_security_1" style={{ display: "none" }}>
                      비밀번호 안전도 <strong>낮음</strong> 
                      <span></span>
                      <p>안전도가 높은 비밀번호를 권장합니다.</p>
                    </div>    {/** password_security_lev password_security_1 end */}

                    <div className="password_security_lev password_security_2" style={{ display: "none" }}>
                      비밀번호 안전도 <strong>중간</strong> 
                      <span></span>
                      <p>안전도가 높은 비밀번호를 권장합니다.</p>
                    </div>    {/** password_security_lev password_security_2 end */}

                    <div className="password_security_lev password_security_3" style= {{ display: "none" }}>
                      비밀번호 안전도 <strong>높음</strong> 
                      <span></span>
                      <p>안전도가 높은 비밀번호를 권장합니다.</p>
                    </div>    {/** password_security_lev password_security_3 end */}
                  </div>    {/** msg end */}
                </div>    {/** pw1 required end */}

                <div className="pw2 required">
                  <label htmlFor="join_pw2">비밀번호 확인</label>
                  <div className="input_area">
                    <input type="password" name="password" id="join_pw2" className="form_input block" />
                    <div className="msg block">
                      <p className="form_result form_result_pwd2 warning"></p>
                    </div>    {/** msg block end */}
                  </div>    {/** input_area end */}
                </div>    {/** pw2 required end */}
              </div>    {/** box end */}

              <div className="box">
                <div className="required">
                  <label htmlFor="join_name">이름</label>
                  <div className="input_area">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="이름" id="join_name" className="form_input block" />
                  </div>    {/** input_area end */}
                  <div className="msg">
                    <p className="form_result form_result_name warning"></p>
                  </div>    {/** msg end */}
                </div>    {/** required end */}

                <div className="">
                  <label htmlFor="join_nick">닉네임</label>
                  <div className="input_area">
                    <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="닉네임" maxLength={12} id="join_nick" className="form_input block" />
                  </div>    {/** input_area end */}
                  <div className="msg">
                    <p className="form_result form_result_nick warning"></p>
                  </div>    {/** msg end */}
                </div>    {/** "" end */}

                <div className="required">
                  <label htmlFor="join_cell">휴대전화번호</label>
                  <div className="input_area">
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} id="join_cell" className="form_input block remove_dash" placeholder="(-) 없이 번호만 입력" />
                  </div>
                </div>    {/** required end */}

                <div className="birth"><label htmlFor="join_birth_date">생년월일</label><div className="input_area"><input id="join_birth_date" name="birth" type="date" min="1900-01-01" value={formData.birth} onChange={handleChange} required className="form_input block" /></div><p>생일 쿠폰 발급에 사용됩니다. 등록 후 정정은 고객센터에 문의해 주세요.</p></div>

                <div className="">
                  <label>성별</label>
                  <div className="input_area radio_chg">
                    <input type="radio" name="gender" value="남성" checked={formData.gender === "남성"} onChange={handleChange} id="sex_male" />
                    <label htmlFor="sex_male">남</label>
                    <input type="radio" name="gender" value="여성" checked={formData.gender === "여성"} onChange={handleChange} id="sex_female" />
                    <label htmlFor="sex_female">여</label>
                  </div>    {/** input_are radio_chg end */}

                  <div className="msg">
                    <p className="form_result form_result_sex warning"></p>
                  </div>    {/** msg end */}
                </div>    {/** "" end */}

                <div className="addr required">
                  <label htmlFor="join_address">주소</label>
                  <div className="input_area">
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="우편번호" id="join_address" className="form_input block" readOnly="" />
                    <span className="box_btn gray2">
                      <a href="#" className="check">우편번호 찾기</a>
                    </span>
                    <input type="text" name="addr1" value={formData.addr1} onChange={handleChange} placeholder="주소1" maxLength={50} className="form_input block" readOnly="" />
                    <input type="text" name="addr2" value={formData.addr2} onChange={handleChange} placeholder="주소2" maxLength={100} className="form_input block" />
                  </div>    {/** input_area end */}

                  <div className="msg">
                    <p className="form_result form_result_addr warning"></p>
                  </div>    {/** msg end */}
                </div>    {/** addr required end */}
              </div>    {/** box end */}

              <div className="box">
                <div className="required">
                  <label className="vt">이벤트 정보 수신</label>
                  <div className="input_area check_chg">
                    <input type="checkbox" name="agree_sms" checked={formData.agree_sms} onChange={handleChange} value="Y" id="join_sms" />
                    <label htmlFor="join_sms">SMS 정보 수신 <strong>(문자메시지/ 카카오톡)</strong></label>
                    <input type="checkbox" name="agree_email" checked={formData.agree_email} onChange={handleChange} value="Y" id="join_mailing" />
                    <label htmlFor="join_mailing">이메일 정보 수신</label>
                    <p className="event_info">
                      <strong>쇼핑몰에서 제공하는 신상품 소식/할인쿠폰을 무상으로 보내드립니다.<br />
                      단, 상품 구매 정보는 수신동의 여부 관계없이 발송됩니다.<br />
                      제공 동의를 하지 않으셔도 서비스 이용에는 문제가 없습니다.</strong>
                    </p>    {/** event_info end */}
                  </div>    {/** input_area check_chg end */}
                </div>    {/** required end */}
              </div>     {/** box end */}
            </fieldset>

            <div className="btn">
              <span className="box_btn w150 large strong">
                <input type="submit" value="확인" />
              </span>
              <span className="box_btn w150 large white strong"><a href="/">취소</a></span>
            </div>    {/** btn end */}
          </form>
          
          <form id="ssl_tmp" method="post">
            <input type="hidden" name="exec_file" />
            <input type="hidden" name="setOpenSSL" value="Y" />
            <input type="hidden" name="data" />
          </form>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
