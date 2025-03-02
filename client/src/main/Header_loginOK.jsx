import "./Header_loginOK.css";
import user from "../assets/user.png";

const Header_loginOK = () => {
  return (
    <header className="common_top2">
      <div className="header_nav">
        <a className="logo" href="#">리싸이프로</a>
        <ul className="nav-right">
          <li>
            <a className="link" href="./shop/Products.jsx">상품</a>
          </li>
          <li>
            <a className="link" href="./review/Review.jsx">게시판</a>
            <ul className="submenu">
              <li>
                <a className="link" href="./review/Review.jsx">목록</a>
              </li>
              <li>
                <a className="link" href="./review/write.jsx">글쓰기</a>
              </li>
            </ul>
          </li>
          <li>
            <a className="link" href="./customer/Customer_main.jsx">고객센터</a>
            <ul className="submenu">
              <li>
                <a className="link" href="./customer/customer_notice.jsx">공지사항</a>
              </li>
              <li>
                <a className="link" href="./customer/customer_policy.jsx">운영정책</a>
              </li>
              <li>
                <a className="link" href="./customer/customer_question.jsx">자주묻는질문</a>
              </li>
              <li>
                <a className="link" href="./customer/customer_consult.jsx">온라인 문의</a>
              </li>
              <li>
                <a className="link" href="./customer/customer_declare.jsx">신고하기</a>
              </li>
            </ul>
          </li>
          <li>
            <img src={user} alt="사용자" />
            <ul className="submenu">
              <li>
                <a className="link" href="#">장바구니</a>
              </li>
              <li>
                <a className="link" href="#">마이페이지</a>
              </li>
              <li>
                <a className="link" href="#">로그아웃</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header_loginOK;