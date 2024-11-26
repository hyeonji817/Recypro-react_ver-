import "./customer_declare.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";
import microphone from "../assets/shop/microphone.png";
import policy from "../assets/shop/privacy_policy.png";
import question1 from "../assets/shop/question_1.png"; 
import headset1 from "../assets/shop/headset_1.png"; 
import claim from "../assets/shop/claim.png"; 

const customer_declare = () => {
  return (
    <div className="customer_declare_wrapper">
      <div className="customer_declare_Header">
        <Header_loginOK />
      </div>

      {/** 제목 */}
      <div className="declare_title">
        <div className="container">
          <h1 className="display-3">신고하기 안내</h1>
        </div>
      </div>

      {/** 안내문 */}
      <div className="sub_content">
        <div className="sub_content_in">
          <div className="sub_title" id="tc">
            <h2>고객센터에서 궁금하신 점을 찾아보세요</h2>
          </div>
          <div className="sub_title2" id="tc">
            <h3>궁금하신 점 또는 상품에 대한 질문 내용을 입력해 주시면 상세히 안내해 드립니다.</h3>
          </div>
          <div className="consumer_info">
            <ul className="consumer_list1">
              <li>
                <div className="notice">
                  <a href="#">
                    <img src={microphone} alt="" title="공지사항" id="notice_misc" />
                  </a>
                  <div className="notice_text">공지사항</div>
                </div>
              </li>
              <li>
                <div className="privacy_law">
                  <a href="#">
                    <img src={policy} alt="" title="운영정책" id="policy" />
                  </a>
                  <div className="policy_text">운영정책</div>
                </div>
              </li>
            </ul>
            <ul className="consumer_list2">
              <li>
                <div className="question">
                  <a href="#">
                    <img src={question1} alt="" title="자주 묻는 질문" id="question" />
                  </a>
                  <div className="question_text">자주 묻는 질문</div>
                </div>
              </li>
              <li>
                <div className="consult">
                  <a href="#">
                    <img src={headset1} alt="" title="온라인 상담/문의" id="consult" />
                  </a>
                  <div className="consult_text">온라인 상담 / 문의</div>
                </div>
              </li>
              <li>
                <span className="claim">
                  <a href="#">
                    <img src={claim} alt="" title="신고하기" id="claim" />
                    <div className="claim_text">신고하기</div>
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/** 신고하기 기능 정의 */}
      <div className="declare">
        <h3>신고하기란?</h3>
        <p>
          신고하기 기능은 주로 게시판 페이지에서 사용되는 기능으로, <br /><br />
			    주로 비방글이나 불법 홍보 목적 및 악성 댓글 등을 방지하기 위해 <br /><br />
			    사용되는 운영정책 중 하나의 기능입니다. <br /><br />
			    악의적인 목적의 게시글을 발견했을 시, 신고가 가능하며 신고자의 익명처리가 <br /><br />
			    가능하므로 안심하고 신고하시면 됩니다.
        </p>
      </div>

      {/** 버튼 영역 */}
      <div className="declare_button">
        <Button 
          type={"customer_home"}
          text={"고객센터 홈"}
        />
      </div>
    </div>
  );
};

export default customer_declare;