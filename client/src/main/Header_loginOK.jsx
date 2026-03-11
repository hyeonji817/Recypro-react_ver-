import "./Header_loginOK.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import user from "../assets/user.png";

const Header_loginOK = () => {
  const nav = useNavigate(); 
  const [isReady, setIsReady] = useState(false);

  // 돋보기 기능 상태 추가 
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      nav(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);    // 페이지가 이동될 때, 최상단으로 위치잡게끔 구현하는 메소드 기능 
    // 렌더링 직후 isReady를 true로 설정 
    setIsReady(true);   // 실행시킴 
  }, []);

  // 준비 안 되었을 때는 아무것도 렌더링하지 않음 
  if (!isReady) return null; 

  return (
    <header className="common_top">
      <div className="header_nav">
        <Link 
          className="logo" 
          to="/home"
          onClick={() => {
            nav("/home");
            window.scrollTo(0, 0); // 수동으로 위치 이동
          }}
        >
          리싸이프로
        </Link>
        <ul className="nav-right">
          <li>
            <Link className="link" to="/shop/Products">상품</Link>
            <ul className="submenu">
              <li>
                <Link className="link" to="/cart">장바구니</Link>
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
          <li className="HO_user">
            <img src={user} alt="사용자" />
            <ul className="submenu">
              <li>
                <Link className="link" to="/cart">장바구니</Link>
              </li>
              <li>
                <Link className="link" to="/mypage">마이페이지</Link>
              </li>
              <li>
                <Link className="link" to="/logoutAction">로그아웃</Link>
              </li>
            </ul>
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
              {console.log("검색창 렌더링됨")}  
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="상품명을 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch}>검색</button>
              </div>
              </>
             )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header_loginOK;