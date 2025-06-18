import "./Product_List.css";
import axios from "axios";
import { useEffect, useState } from "react"; 
// 이미지 
import plasticDiet from "../assets/1-1_plastic_diet.png";
import lineFriends from "../assets/1-2_linefriends_MugCup.jpg";
import forestKeyRing from "../assets/1-3_forestKeyRing.jpg";
import cbag from "../assets/1-4_cbag-1.jpg";

const Products_Life = () => {
  /** const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/Products", {
      withCredentials: true
    })
    .then(res => setProducts(res.data))
    .catch(err => console.error('데이터 로드 실패:', err));
  }, []); */

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
              {/** <div className="total_sort dn">
                <p className="total">상품이 모두 <strong>272</strong>개 있습니다.</p>
                <div className="sort">
                  <select>
                    <option value="">:: 상품정렬 ::</option>
                    <option value="/shop/big_section.php?sort=1&amp;cno1=1800" selected="">신상품순</option>
                    <option value="/shop/big_section.php?sort=2&amp;cno1=1800">상품명순</option>
                    <option value="/shop/big_section.php?sort=4&amp;cno1=1800">높은가격순</option>
                    <option value="/shop/big_section.php?sort=5&amp;cno1=1800">낮은가격순</option>
                  </select>
                </div>
              </div> */} {/** total_sort dn end */}
      
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