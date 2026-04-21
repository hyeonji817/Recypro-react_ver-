import "./Products_Office.css";
import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

const Products_Office = () => {
  const [productOffice, setProductOffice] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchProductOffice = async () => {
      try {
        const res = await fetch("http://localhost:5003/api/product_office");    // Product_Office.js (상품목록 페이지 라우터) 페이지 연동
        const data = await res.json();    // fetch에 연결된 주소의 페이지(Product_Office.js)로부터 데이터값을 가져옴
        setProductOffice(data);
      } catch (err) {
        console.error("Failed to fetch office product:", err);
      }
    };
    fetchProductOffice();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productOffice.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productOffice.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div id="productsOffice_wrap">
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
            const detailPath = `/shop/product6/${encodeURIComponent(item.productId)}`;
            return (
              <li key={item.productId}>
                <div className="box">
                  <div className="img">
                    <div className="prdimg">
                      <Link to={detailPath}>
                        <img
                          src={`http://localhost:5003/uploads/${item.filename}`}
                          alt={item.pname}
                          width={240}
                          height={320}
                        />
                      </Link>  
                    </div>    {/** prdimg end */}  
                  </div>     {/** img end */}  

                  <div className="info">
                    <p className="name">
                      <Link to={detailPath}>{item.pname}</Link>  
                    </p>    {/** name end */}
                    <div className="price">
                      <p className="sell sellY">
                        {item.price}<span>원</span>
                      </p>    {/** sell sellY end */}
                      <div className="discount_section">
                        <p className="per">{item.discount_rate}%</p>
                        <p className="discount discountY">{item.discount_price}원</p>
                      </div>    {/** discount_section end */}
                    </div>   {/** price end */}  
                  </div>    {/** info end */}
                </div>     {/** box end */}
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

export default Products_Office;