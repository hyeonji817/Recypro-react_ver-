import "./Products_Bath.css";
import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

const Products_Bath = () => {
  const [productBath, setProductBath] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 
  const indexOfLastItem = currentPage * itemsPerPage; 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  const currentItems = productBath.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productBath.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div id="productsBath_wrap">
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
                  <img src={gachisop} width="240" height="320" />
                </a>
              </div>  {/** prdimg end */}
            </div>  {/** img end */}

            <div className="info">
              <p className="name">
                <a href="#">유기농 설거지 비누</a>
              </p>    {/** name end */}
              <div className="price">
                <p className="consumer consumerY">
                  <span>KRW</span>3,000
                </p>    {/** consumer consumerY end */}
                <p className="sell sellY">
                  <span>KRW</span>3,000
                </p>  {/** sell sellY end */}
                <div className="discount_section">
                  <p className="per">10%</p>
                  <p className="discount discountY">2,700</p>
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
                  <img src={towel} width="240" height="320" />
                </a>
              </div>  {/** prdimg end */}
            </div>  {/** img end */}

            <div className="info">
              <p className="name">
                <a href="#">먼지 안 나는 무형광 수건</a>
              </p>  {/** name end */}
              <div className="price">
                <p className="consumer consumerY">
                  <span>KRW</span>5,900
                </p>  {/** consumer consumerY end */}
                <p className="sell sellY">
                  <span>KRW</span>5,900
                </p>  {/** sell sellY end */}
                <div className="discount_section">
                  <p className="per">10%</p>
                  <p className="discount discountY">5,310</p>
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
                  <img src={soapnet} width="240" height="320" />
                </a>
              </div>  {/** prdimg end */}
            </div>  {/** img end */}

            <div className="info">
              <p className="name">
                <a href="#">면 비누망</a>
              </p> {/** name end */}
              <div className="price">
                <p className="consumer consumerY">
                  <span>KRW</span>2,300
                </p>    {/** consumer consumerY end */}
                <p className="sell sellY">
                  <span>KRW</span>2,300
                </p>    {/** sell sellY end */}
                <div className="discount_section">
                  <p className="per">10%</p>
                  <p className="discount discountY">2,070</p>
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
                  <img src={cleanBall} width="240" height="320" />
                </a>
              </div>    {/** prdimg end */}
              {/** 상품품절 영역 */}
              <div className="soldout">SOLD OUT</div>
              {/** //상품품절 영역 */}
            </div>    {/** img end */}

            <div className="info">
              <p className="name">
                <a href="#">제주 시카 클렌징볼</a>
              </p>    {/** name end */}
              <div className="price">
                <p className="consumer consumerY">
                  <span>KRW</span>15,000
                </p>    {/** consumer consumerY end */}
                <p className="sell sellY">
                  <span>KRW</span>15,000
                </p>    {/** sell sellY end */}
                <div className="discount_section">
                  <p className="per">10%</p>
                  <p className="discount discountY">13,500</p>
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
                  <img src={solidToothPaste} width="240" height="320" />
                </a>
              </div>    {/** prdimg end */}
              {/** 상품품절 영역 */}
              <div className="soldout">SOLD OUT</div>
              {/** //상품품절 영역 */}
            </div>    {/** img end */}

            <div className="info">
              <p className="name">
                <a href="#">고체치약 10정입</a>
              </p>    {/** name end */}
              <div className="price">
                <p className="consumer consumerY">
                  <span>KRW</span>3,000
                </p>    {/** consumer consumerY end */}
                <p className="sell sellY">
                  <span>KRW</span>3,000
                </p>    {/** sell sellY end */}
                <div className="discount_section">
                  <p className="per">10%</p>
                  <p className="discount discountY">2,700</p>
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
                  <img src={grapefruitSoap} width="240" height="320" />
                </a>
              </div>    {/** prdimg end */}
              {/** 상품품절 영역 */}
              <div className="soldout">SOLD OUT</div>
              {/** //상품품절 영역 */}
            </div>    {/** img end */}

            <div className="info">
              <p className="name">
                <a href="#">올인원 온몸비누</a>
              </p>    {/** name end */}
              <div className="price">
                <p className="consumer consumerY">
                  <span>KRW</span>9,900
                </p>    {/** consumer consumerY end */}
                <p className="sell sellY">
                  <span>KRW</span>9,900
                </p>    {/** sell sellY end */}
                <div className="discount_section">
                  <p className="per">10%</p>
                  <p className="discount discountY">8,910</p>
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

export default Products_Bath;