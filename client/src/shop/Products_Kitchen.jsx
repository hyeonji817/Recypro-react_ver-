import "./Products_Kitchen.css";
import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

const Products_Kitchen = () => {
  const [productKitchen, setProductKitchen] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productKitchen.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productKitchen.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const fetchProductKitchen = async () => {
      try {
        const res = await fetch("http://localhost:5003/api/product_kitchen");    // Product_Kitchen.js (주방항목 페이지 라우터) 페이지 연동
        const data = await res.json();
        setProductKitchen(data);
      } catch (err) {
        console.error("Failed to fetch kitchen product:", err);
      }
    };
    fetchProductKitchen();
  });

  // 돋보기 기능 상태 추가 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 돋보기 검색 핸들러 추가 
  const filteredItems = productKitchen.filter(item => 
    item.pname.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <div id="productsKitchen_wrap">
      <div className="products_body">
        <div id="big_section">
          <li><Link to="/shop/products1">생활</Link></li>
          <li><Link to="/shop/products2">욕실</Link></li>
          <li><Link to="/shop/products3">식품</Link></li>
          <li><Link to="/shop/products4">주방</Link></li>
          <li><Link to="/shop/products5">반려동물</Link></li>
          <li><Link to="/shop/products5">사무</Link></li>  
        </div>      {/** big_section end */}

        {/** 상품정렬 */}
        <ul className="prd_basic col3">
        {currentItems.map((item) => {
          const detailPath = `/shop/product4/${encodeURIComponent(item.productId)}`;
          return (
            <li key={item.productId}>
              <div className="box">
                <div className="img">
                  <div className="prdimg">
                    {/* ⛔️ <a href={item}>  이런 게 [object Object]의 원인 */}
                    <Link to={detailPath}>
                      <img
                        src={`http://localhost:5003/uploads/${item.filename}`}
                        alt={item.pname}
                        width="240"
                        height="320"
                      />
                    </Link>
                  </div>    {/** prdimg end */}
                </div>    {/** img end */}

                <div className="info">
                  <p className="name">
                    {/* ⛔️ <Link to={item.href}> (DB href는 파라미터가 없음) */}
                    <Link to={detailPath}>{item.pname}</Link>
                  </p>    {/** name end */}
                  <div className="price">
                    <p className="sell sellY">
                      {item.price}<span>원</span>
                    </p>    {/** sell sellY end */}
                    <div className="discount_section">
                      <p className="per">{item.discount_rate}%</p>
                      <p className="discount discountY">{item.discount_price}원</p>
                    </div>      {/** discount_section end */}
                  </div>    {/** price end */}
                </div>      {/** info end */}
              </div>    {/** box end */}
            </li>
            );
          })}
        </ul>    {/** prd_basic col3 end */}

        {/** 페이지네이션 구현 */}
        <ul className="paging">
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(1); }}>
              &laquo;
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage((prev) => Math.max(prev - 1, 1)); }}>
              &lt;
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
          {currentPage === i + 1 ? (
            <strong>{i + 1}</strong>
          ) : (
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>
              {i + 1}
            </a>
          )}
          </li>
          ))}
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage((prev) => Math.min(prev + 1, totalPages)); }}>
              &gt;
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(totalPages); }}>
              &raquo;
            </a>
          </li>
        </ul>      {/** paging end */}
      </div>     {/** products_body end */}
    </div>     /** productsKitchen_wrap end */
  );
};

export default Products_Kitchen;