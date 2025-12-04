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
                    <div className="price"></div>   {/** price end */}  
                  </div>    {/** info end */}
                </div>     {/** box end */}
              </li>
            );
          })}
          </ul>

	        <ul className="paging">
            <li></li>
            <li><strong>1</strong></li>
            <li><a href="?page=2&amp;cno1=1800">2</a></li>
            <li><a href="?page=3&amp;cno1=1800">3</a></li>
            <li><a href="?page=4&amp;cno1=1800">4</a></li>
            <li><a href="?page=5&amp;cno1=1800">5</a></li>
            <li><a href="?page=6&amp;cno1=1800">6</a></li>
            <li><a href="?page=7&amp;cno1=1800">7</a></li>
            <li><a href="?page=8&amp;cno1=1800">8</a></li>
            <li><a href="?page=9&amp;cno1=1800">9</a></li>
            <li><a href="?page=10&amp;cno1=1800">10</a></li>
            <li><a className="next moveto" href="?page=11&amp;cno1=1800">&gt;</a><a className="last moveto" href="?page=19&amp;cno1=1800">&gt;&gt;</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Products_Office;