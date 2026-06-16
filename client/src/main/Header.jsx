import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
// import Products from "./shop/Products";

const Header = () => {
  const nav = useNavigate(); 
  
  // 돋보기 기능 상태 추가 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
      nav(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);   // 검색창 닫기 
      setSearchQuery("");     // 입력 후 초기화 (선택)     
  };

  useEffect(() => {
    console.log("현재 isSearchOpen:", isSearchOpen);
  }, [isSearchOpen]);  

  return (
    <header className="common_top">
      <div className="header_nav">
        <Link className="logo" to="/home">리싸이프로</Link>
        <ul className="nav-right">
          <li>
            <Link className="link" to="/shop/Products">상품</Link>
            <ul className="submenu">
              <li>
                <Link className="link" to="/shop/Products1">생활</Link>
              </li>
              <li>
                <Link className="link" to="/shop/Products2">욕실</Link>
              </li>
              <li>
                <Link className="link" to="/shop/Products3">식품</Link>
              </li>
              <li>
                <Link className="link" to="/shop/Products4">주방</Link>
              </li>
              <li>
                <Link className="link" to="/shop/Products5">반려동물</Link>
              </li>
              <li>
                <Link className="link" to="/shop/Products6">사무</Link>
              </li>
              <li>
                <Link className="link" to="/shop/Product_Review">리뷰</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="link" to="/customer_main">고객센터</Link>
            <ul className="submenu">
              <li>
                <Link className="link" to="/customer_main">공지사항</Link>
              </li>
              <li>
                <Link className="link" to="/customer_policy">운영정책</Link>
              </li>
              <li>
                <Link className="link" to="/customer_question">Q&A</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="link" to="/login">로그인</Link>
          </li>
          <li>
            <Link className="link" to="/account/register">회원가입</Link>
          </li>

          <li className="search-wrap">
            <button 
              className="search-toggle" 
              onClick={(e) => {
                e.stopPropagation(); // 다른 클릭 이벤트 방지
                console.log("🔍 버튼 클릭됨!");
                setIsSearchOpen(prev => {
                  console.log("이전 상태:", prev);
                  return !prev;
                });
              }}
            >
              🔍
            </button>
            {isSearchOpen && (
              <>
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="상품명을 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button className="search-btn" onClick={handleSearch}><p>검색</p></button>
              </div>
              </>
             )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;