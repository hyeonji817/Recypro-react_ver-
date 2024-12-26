import "./customer_consult.css";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";
import home from "../assets/shop/home.png";
import microphone from "../assets/shop/microphone.png";
import privacy from "../assets/shop/privacy_policy.png";
import question1 from "../assets/shop/question_1.png";
import headset1 from "../assets/shop/headset_1.png";
import claim from "../assets/shop/claim.png";

const customer_consult = () => {
  return (
    <div className="customer_consult_wrapper">
      <div className="cc_Header">
        <Header_loginOK />
      </div>
      <div className="cc_title">
        <div className="container">
          <h1 className="display-3">고객센터 - 온라인 상담/문의</h1>
        </div>
      </div>

      {/** 사이드 경로 */}
      <div className="side_path">
        <div className="home_icon">
          <img src={home} />
        </div>
        <span className="sub_path">
          home &gt; 고객센터 &gt; 공지사항
        </span>
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
                    <img src={privacy} alt="" title="운영정책" id="policy" />
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

      {/** 문의글 작성 */}
      <div className="consult_write" id="consultant">
        <h1>문의글 작성</h1>
        <div className="write_area">
          <form name="cw_form" method="post" encType="multipart/form-data">
            <input type="hidden" name="id" value="" />
            <div className="form-group" id="write_consult">
              <input name="write_title" id="write_title" className="form-control" type="text" placeholder="제목" />
              <textarea name="write_content" id="write_content" type="text" placeholder="내용을 입력해주세요."></textarea>
              <a className="submit_write">
                <Button 
                  type={"cc_submit"}
                  text={"첨부파일"}
                />
              </a>
            </div>
          </form>
        </div>
      </div>

      {/** 버튼 영역 */}
      <div className="policy_button">
        <Button 
          type={"policy_register"}
          text={"신청하기"}
        />
        <Button 
          type={"customer_home"}
          text={"고객센터 홈"}
        />
        <Button 
          type={"quest_list"}
          text={"문의글 목록"}
        />
      </div>
    </div>
  );
};

export default customer_consult;