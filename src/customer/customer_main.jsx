import "./Customer_main.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";
import microphone from "../assets/shop/microphone.png";
import policy from "../assets/shop/privacy_policy.png";
import question1 from "../assets/shop/question_1.png";
import headset1 from "../assets/shop/headset_1.png";
import declare from "../assets/shop/claim.png"; 

const Customer_main = () => {
  return (
    <div className="CustomerMain_wrapper">
      <div className="Customer_Header">
        <Header_loginOK />
      </div>
      <div className="customer_title">
        <div className="container">
          <h1 className="display-3">고객센터</h1>
        </div>
      </div>
      <div className="sub_content">
        <div className="sub_content_in">
          <div className="sub_title" id="tc">
            <h2>고객센터에서 궁금하신 점을 찾아보세요</h2>
          </div>
          <div className="sub_title2" id="tc">
            <h3>궁금하신 점 또는 상품에 대한 질문 내용을 입력해 주시면 상세히 안내해 드립니다.</h3>
          </div>
          {/** 고객센터 문의 항목 */}
          <div className="consumer_info">
            <ul className="consumer_list1">
              <li>
                <div className="notice">
                  <a href="#">
                    <img src={microphone} title="공지사항" id="notice_misc" />
                  </a>
                  <div className="notice_text">공지사항</div>
                </div>
              </li>
              <li>
                <div className="privacy_law">
                  <a href="#">
                    <img src={policy} title="운영정책" id="policy" />
                  </a>
                  <div className="policy_text">운영정책</div>
                </div>
              </li>
            </ul>
            <ul className="consumer_list2">
              <li>
                <div className="question">
                  <a href="#">
                    <img src={question1} title="자주 묻는 질문" id="question" />
                  </a>
                  <div className="question_text">자주 묻는 질문</div>
                </div>
              </li>
              <li>
                <div className="consult">
                  <a href="#">
                    <img src={headset1} title="온라인 상담/문의" id="consult" />
                  </a>
                  <div className="consult_text">온라인 상담 / 문의</div>
                </div>
              </li>
              <li>
                <span className="claim">
                  <a href="#">
                    <img src={declare} title="신고하기" id="claim" />
                    <div className="claim_text">신고하기</div>
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer_main;