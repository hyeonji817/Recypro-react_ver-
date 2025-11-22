import "./Products_Pet.css";
import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

const Products_Pet = () => {
	const [productPet, setProductPet] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 3; 

	useEffect(() => {
		const fetchProductPet = async () => {
			try {
        const res = await fetch("http://localhost:5003/api/product_pet");    // Product_Life.js (상품목록 페이지 라우터) 페이지 연동
        const data = await res.json();
        setProductPet(data);
      } catch (err) {
        console.error("Failed to fetch pet product:", err);
      }
		};
		fetchProductPet();
	}, []);

  const indexOfLastItem = currentPage * itemsPerPage; 
  const indexOfFirstItem = indexOfLastItem - itemsPetPage; 
  const currentItems = productPet.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productPet.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div id="productsPet_wrap">
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

	    {/** 상품정렬 */}
      <ul className="prd_basic col3">
				{productPet.map((item, index) => (
				<li key={index}>
		      <div className="box ">
	          <div className="img">
		          <div className="prdimg">
                <a href={item.href}>
                  <img 
										src={`http://localhost:5001/uploads/${item.filename}`} 
										alt={item.pname}
										width="240" 
										height="320" 
									/>
                </a>
              </div>  {/** prdimg end */}
	          </div>  {/** img end */}

	          <div className="info">
		          <p className="name">
                <a href={item.href}>
									{item.pname}
								</a>
              </p>    {/** name end */}
		          <div className="price">
								<p className="consumer consumerY">
                  <span>KRW</span>
									{item.price}
                </p>    {/** consumer consumerY end */}
			          <p className="sell sellY">
                  <span>KRW</span>
									{item.price}
                </p>  {/** sell sellY end */}
			          <div className="discount_section">
				          <p className="per">{item.discount_rate}%</p>
				          <p className="discount discountY">{item.discount_price}</p>
			          </div> {/** discount_section end */}
		          </div>  {/** price end */}
	          </div>  {/** info end */}
          </div>  {/** box end */}
	      </li>
				))}
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

export default Products_Pet;