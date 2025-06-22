import "./Products_Kitchen.css";
import { useEffect, useState } from "react"; 

const Products_Kitchen = () => {
  const [productKitchen, setProductKitchen] = useState([]);

  useEffect(() => {
    const fetchProductKitchen = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/product_kitchen");    // Product_Kitchen.js (주방항목 페이지 라우터) 페이지 연동
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
        {productKitchen.map((item, index) => (
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

	    <ul className="list_sns rola tac">
		    <li className="sns_child0"><a href="https://www.facebook.com/rolarola.official/" target="_blank"></a></li>
		    <li className="sns_child1"><a href="https://www.youtube.com/channel/UCK1MhHpLHBBBQpO-FGnQ72A" target="_blank"></a></li>
		    <li className="sns_child2"><a href="https://www.instagram.com/rolarola.official/" target="_blank"></a></li>
	    </ul>

	    <ul className="list_sns rlol tac">
		    <li className="sns_child0"><a href="https://www.instagram.com/rlol.official/" target="_blank"></a></li>
		    <li className="sns_child1"><a href="https://www.youtube.com/channel/UCK1MhHpLHBBBQpO-FGnQ72A" target="_blank"></a></li>
	    </ul>
    </div>
  </div>
</div>
  );
};

export default Products_Kitchen;