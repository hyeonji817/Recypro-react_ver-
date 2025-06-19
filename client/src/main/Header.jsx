import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 
import Products from "./shop/Products";

const Header = () => {
  const nav = useNavigate(); 
  
  // 돋보기 기능 상태 추가 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="common_top">
      <div className="header_nav">
        <a className="logo" href="./Home.jsx">리싸이프로</a>
        <ul className="nav-right">
          <li>
            <a className="link" href="../shop/Products">상품</a>
            <ul className="submenu">
              <li>
                <a className="link">장바구니</a>
              </li>
              <li>
                <a className="link">리뷰</a>
              </li>
            </ul>
          </li>
          <li>
            <a className="link" href="../review">커뮤니티</a>
            <ul className="submenu">
              <li>
                <a className="link" href="../review">목록</a>
              </li>
              <li>
                <a className="link" href="../write">글쓰기</a>
              </li>
            </ul>
          </li>
          <li>
            <a className="link" href="../customer_main">고객센터</a>
            <ul className="submenu">
              <li>
                <a className="link" href="../customer_main">목록</a>
              </li>
              <li>
                <a className="link" href="../customer_notice">공지사항</a>
              </li>
              <li>
                <a className="link" href="../customer_policy">운영정책</a>
              </li>
              <li>
                <a className="link" href="../customer_question">Q&A</a>
              </li>
            </ul>
          </li>
          <li>
            <a className="link" href="/account/Login">로그인</a>
          </li>
          <li>
            <a className="link" href="/account/register">회원가입</a>
          </li>
          <li>
            <a className="link">검색하기
              {/** 검색하기 기능 */}
              <ul className="search-container">
              {isSearchOpen && (
                <input
                  type="text"
                  className="search-input"
                  placeholder="상품명을 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              )}
            <button
              className="search-toggle"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              🔍
            </button>
            </ul>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;