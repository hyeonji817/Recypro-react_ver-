import "./customer_question.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";
import home from "../assets/shop/home.png"; 

const customer_question = () => {
  return (
    <div className="customer_Question_wrapper">
      <div className="cq_Header">
        <Header_loginOK />
      </div>
      <div className="cq_title">
        <div className="container">
          <h1 className="display-3">자주묻는질문</h1>
        </div>
      </div>
      <div className="side_path">
        <div className="home_icon">
          <img src={home} />
        </div>
        <span className="sub_path">
          home &gt; 고객센터 &gt; 공지사항 
        </span>
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th className="customer_Question_num">번호</th>
              <th className="customer_Question_title">제목</th>
              <th className="customer_Question_answer">답변</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="customer_Question_num2">1</td>
              <td className="customer_Question_title2">교환반품 및 환불은 어떻게 이용하나요?</td>
              <td className="customer_Question_answer2">
                <Button 
                  type={"Answer_View"}
                  text={"조회"}
                />
              </td>
            </tr>
            <tr>
              <td className="customer_Question_num2">2</td>
              <td className="customer_Question_title2">리싸이프로 회원가입 시 혜택과 등급별 혜택은 무엇인가요?</td>
              <td className="customer_Question_answer2">
                <Button 
                  type={"Answer_View"}
                  text={"조회"}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cq_button">
        <Button 
          type={"cq_home"}
          text={"고객센터 홈"}
        />
      </div>
    </div>
  );
};

export default customer_question;