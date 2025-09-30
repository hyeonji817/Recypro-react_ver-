import "./Product_List.css";
import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

const Products_Life = () => {
  const [productLife, setProductsLife] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  useEffect(() => {
    const fetchProductLife = async () => {
      try {
        const res = await fetch("http://localhost:5003/api/product_life");    // Products.js (상품목록 페이지 라우터) 페이지 연동
        const data = await res.json();
        setProductsLife(data);
      } catch (err) {
        console.error("Failed to fetch best product:", err);
      }
    };
    fetchProductLife();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productLife.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productLife.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div id="productsLife_wrap">
      <div className="products_body">
              <div id="big_section">
                <ul className="sub_category">
                  <li><Link to="/shop/products1">생활</Link></li>
                  <li><Link to="/shop/products2">욕실</Link></li>
                  <li><Link to="/shop/products3">식품</Link></li>
                  <li><Link to="/shop/products4">주방</Link></li>
                  <li><Link to="/shop/products5">반려동물</Link></li>
                  <li><Link to="/shop/products6">사무</Link></li>
                </ul>   {/** sub_category end */}
      
            {/** 상품정렬 */}
            <ul className="prd_basic col3">
            {currentItems.map((item) => {
              const detailPath = `/shop/product1/${encodeURIComponent(item.productId)}`;
              return (
                <li key={item.productId}>
                  <div className="box">
                    <div className="img">
                      <div className="prdimg">
                        {/* ⛔️ <a href={item}>  이런 게 [object Object]의 원인 */}
                        <Link to={detailPath}>
                          <img
                            src={`http://localhost:5001/uploads/${item.filename}`}
                            alt={item.pname}
                            width="240"
                            height="320"
                          />
                        </Link>
                      </div>
                    </div>

	                  <div className="info">
                      <p className="name">
                      {/* ⛔️ <Link to={item.href}> (DB href는 파라미터가 없음) */}
                        <Link to={detailPath}>{item.pname}</Link>
                      </p>
                      <div className="price">
                        <p className="sell sellY">
                          {item.price}<span>원</span>
                        </p>
                        <div className="discount_section">
                          <p className="per">{item.discount_rate}%</p>
                          <p className="discount discountY">{item.discount_price}원</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })} 
            </ul>
      
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
            </ul>
          </div>
        </div>
</div>
  );
};

export default Products_Life;