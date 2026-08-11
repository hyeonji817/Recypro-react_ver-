import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"; // 상단 import 추가
import { useEffect, useState } from "react";
import axios from "axios";
import "./SearchResult.css";

const SearchResult = () => {    // 프론트에서 전체 상품 리스트를 받아온 뒤 JS의 '.filter()'로 검색어를 포함한 상품만 필터링하는 구조
  const { search } = useLocation();   // 현재 URL의 쿼리 문자열을 가져오기 위한 코드 
  const query = new URLSearchParams(search).get("q");   // 원하는 쿼리값 추출

  // 상태(state)를 관리하기 위해 사용하는 useState() 훅을 이용한 예시
  // 검색된 상품 목록(배열)을 저장하는 상태
  // 검색 결과가 담길 데이터를 서버에서 받아오고 그걸 화면에 렌더링하기 위해 저장
  // setFilteredProducts : 서버에서 데이터를 받아오면 그걸 이 함수로 업데이트
  const [filteredProducts, setFilteredProducts] = useState([]);    
  // 데이터를 불러오는 중인지 여부를 나타내는 상태 
  // API 요청 중에는 로딩 메시지를 띄우고 완료되면 본문을 보여주기 위해 사용 
  // setLoading : 데이터를 다 받았거나 에러가 나면 false로 변경
  const [loading, setLoading] = useState(true);
  // 데이터 요청 중, 발생한 에러 메시지를 저장하는 상태 
  // 서버 요청이 실패했을 때 사용자에게 에러 메시지를 보여주기 위해 사용 
  // setError : 에러가 발생하면 해당 메시지를 저장 
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;   // 배포용 주소링크 

  // 검색어 강조 (자동검색어 추천)
  const highlight = (text) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));   // query 기준으로 문자열을 잘라서 배열로 만듦. 쿼리와 일치하는 부분은 배열 내에서 따로 분리
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? <mark key={i}>{part}</mark> : part   // 렌더링 시 검색어만 강조되어 출력
    );
  };


  useEffect(() => {
    if (!query) return;
    axios.get(`${API_URL}/api/search?q=${encodeURIComponent(query)}`)   // 검색어 포함된 API 호출
      .then((res) => {
        setFilteredProducts(res.data);
      })
      .catch((err) => {
        console.error("상품 검색 실패:", err);
        setError("상품 정보를 불러오는 데 실패했습니다.");
      })
      .finally(() => setLoading(false));
  }, [query]);
  

  return (
    <div className="search-result-wrapper">
      <h2 className="search-result-title">🔍 ‘{query}’ 검색 결과</h2>

      {loading && <p>불러오는 중...</p>}
      {error && <p className="error-msg">{error}</p>}

      {!loading && !error && (
        filteredProducts.length === 0 ? (
          <p className="no-result">검색 결과가 없습니다.</p>
        ) : (
          <ul className="product-list">
            {filteredProducts.map(product => (
              <li className="product-item" key={product.productId}>
                {/* 상품명을 클릭하면 상세 페이지로 이동 */}
                <Link to={`/product/${product.productId}`} className="product-name">
                  {highlight(product.pname)}
                </Link>
                <div className="product-price">
                  {product.price.toLocaleString()}원
                </div>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default SearchResult;
