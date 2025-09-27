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
              <li>
                <div className="box ">
                  <div className="img">
                    <div className="prdimg">
                      <a href="#">
                        <img src={plasticDiet} width="240" height="320" />
                      </a>
                    </div>  {/** prdimg end */}
                  </div>  {/** img end */}
      
                  <div className="info">
                    <p className="name">
                      <a href="#">플라스틱 다이어트 4종세트 키트</a>
                    </p>    {/** name end */}
                    <div className="price">
                      <p className="consumer consumerY">
                        <span>KRW</span>22,500
                      </p>    {/** consumer consumerY end */}
                      <p className="sell sellY">
                        <span>KRW</span>22,500
                      </p>  {/** sell sellY end */}
                      <div className="discount_section">
                        <p className="per">10%</p>
                        <p className="discount discountY">20,250</p>
                      </div> {/** discount_section end */}
                    </div>  {/** price end */}
                  </div>  {/** info end */}
                </div>  {/** box end */}
              </li>
      
              <li>
                <div className="box ">
                  <div className="img">
                    <div className="prdimg">
                      <a href="#">
                        <img src={lineFriends} width="240" height="320" />
                      </a>
                    </div>  {/** prdimg end */}
                  </div>  {/** img end */}
      
                  <div className="info">
                    <p className="name">
                      <a href="#">라인프렌즈 법랑머그컵 (B급)</a>
                    </p>  {/** name end */}
                    <div className="price">
                      <p className="consumer consumerY">
                        <span>KRW</span>4,800
                      </p>  {/** consumer consumerY end */}
                      <p className="sell sellY">
                        <span>KRW</span>4,800
                      </p>  {/** sell sellY end */}
                      <div className="discount_section">
                        <p className="per">10%</p>
                        <p className="discount discountY">4,320</p>
                      </div>    {/** discount_section end */}
                    </div>  {/** price end */}
                  </div>  {/** info end */}
                </div>  {/** box  end */}
              </li>
      
              <li>
                <div className="box ">
                  <div className="img">
                    <div className="prdimg">
                      <a href="#">
                        <img src={forestKeyRing} width="240" height="320" />
                      </a>
                    </div>  {/** prdimg end */}
                  </div>  {/** img end */}
      
                  <div className="info">
                    <p className="name">
                      <a href="#">나무를 심는 업사이클 숲 키링</a>
                    </p> {/** name end */}
                    <div className="price">
                      <p className="consumer consumerY">
                        <span>KRW</span>8,000
                      </p>    {/** consumer consumerY end */}
                      <p className="sell sellY">
                        <span>KRW</span>8,000
                      </p>    {/** sell sellY end */}
                      <div className="discount_section">
                        <p className="per">10%</p>
                        <p className="discount discountY">7,200</p>
                      </div>    {/** discount_section end */}
                    </div>    {/** price end */}
                  </div>    {/** info end */}
                </div>    {/** box  end */}
              </li>
      
              <li>
                <div className="box ">
                  <div className="img">
                    <div className="prdimg">
                      <a href="#">
                        <img src={cbag} width="240" height="320" />
                      </a>
                    </div>    {/** prdimg end */}
                    {/** 상품품절 영역 */}
                    <div className="soldout">SOLD OUT</div>
                    {/** //상품품절 영역 */}
                  </div>    {/** img end */}
      
                  <div className="info">
                    <p className="name">
                      <a href="#">아윌비백 재활용 프로듀스백 면주머니</a>
                    </p>    {/** name end */}
                    <div className="price">
                      <p className="consumer consumerY">
                        <span>KRW</span>1,500
                      </p>    {/** consumer consumerY end */}
                      <p className="sell sellY">
                        <span>KRW</span>1,500
                      </p>    {/** sell sellY end */}
                      <div className="discount_section">
                        <p className="per">10%</p>
                        <p className="discount discountY">1,350</p>
                      </div>    {/** discount_section end */}
                    </div>    {/** price end */}
                  </div>    {/** info end */}
                </div>    {/** box  end */}
              </li>
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

export default Products_Life;