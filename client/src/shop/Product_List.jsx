import { Link } from "react-router-dom";
import "./Product_List.css";
import { useEffect, useState } from "react"; 

const Product_List = () => {
  const [productLists, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        const res = await fetch("http://localhost:5003/api/product_life");    // Product_Life.js (상품목록 페이지 라우터) 페이지 연동
        const data = await res.json();
        setProductsList(data);    // 서버로부터 불러들인 데이터를 저장
      } catch (err) {
        console.error("Failed to fetch best product:", err);
      }
    };
    fetchProductsList();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productLists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productLists.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div id="products_wrap">
		  <div className="products_body">
        <div id="big_section">
          <ul className="sub_category">
            <li>
              <a href="./Products1">생활</a>
            </li>
	          <li>
              <a href="./Products2">욕실</a>
            </li>
	          <li>
              <a href="./Products3">식품</a>
            </li>
	          <li>
              <a href="./Products4">주방</a>
            </li>
						<li>
              <a href="./Products5">반려동물</a>
            </li>
						<li>
              <a href="./Products6">사무</a>
            </li>
          </ul>   {/** sub_category end */}

	        {/** 상품정렬 */}
          <ul className="prd_basic col3">
          {currentItems.map((item, index) => (
            <li key={index}>
		        <div className="box ">
	            <div className="img">
		            <div className="prdimg">
                  <Link to={`/shop/product1/${encodeURIComponent(item.productId)}`}>
                    <img 
                      src={`http://localhost:5003/uploads/${String(item.filename).replace(/^\.\//,'')}`} 
                      alt={item.pname}
                      width="240" 
                      height="320"
                    />
                  </Link>
                </div>  {/** prdimg end */}
	            </div>  {/** img end */}

	            <div className="info">
		            <p className="name">
                  <Link to={`/shop/product1/${encodeURIComponent(item.productId)}`}>{item.pname}</Link>
                </p>    {/** name end */}
		            <div className="price">
			            <p className="sell sellY">
                    KRW {item.price}<span></span>
                  </p>  {/** sell sellY end */}
			            <div className="discount_section">
				            <p className="per">{item.discount_rate}%</p>
				            <p className="discount discountY">{item.discount_price}원</p>
			            </div> {/** discount_section end */}
		            </div>  {/** price end */}
	            </div>  {/** info end */}
            </div>  {/** box end */}
	        </li>
          ))}
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

export default Product_List;