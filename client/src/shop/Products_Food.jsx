import "./Product_List.css";
import axios from "axios";
import { useEffect, useState } from "react"; 
import eatsBetter from "../assets/1_eats_better_minimum.jpg"; 
import zeroSugarCookie from "../assets/2_zerosugarCookie.jpg"; 
import wheatChurros from "../assets/3_wheat_Churros.jpg";

const Products_Food = () => {

  return (
    <div id="productsFood_wrap">
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
                  <img src={eatsBetter} width="240" height="320" />
                </a>
              </div>  {/** prdimg end */}
            </div>  {/** img end */}

            <div className="info">
              <p className="name">
                <a href="#">비건 티쿠키</a>
              </p>    {/** name end */}
              <div className="price">
                <p className="consumer consumerY">
                  <span>KRW</span>2,700
                </p>    {/** consumer consumerY end */}
                <p className="sell sellY">
                  <span>KRW</span>2,700
                </p>  {/** sell sellY end */}
                <div className="discount_section">
                  <p className="per">10%</p>
                  <p className="discount discountY">2,430</p>
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
                  <img src={zeroSugarCookie} width="240" height="320" />
                </a>
              </div>  {/** prdimg end */}
            </div>  {/** img end */}

            <div className="info">
              <p className="name">
                <a href="#">잇츠베러 제로슈가 쿠키 황치즈향</a>
              </p>  {/** name end */}
              <div className="price">
                <p className="consumer consumerY">
                  <span>KRW</span>2,900
                </p>  {/** consumer consumerY end */}
                <p className="sell sellY">
                  <span>KRW</span>2,900
                </p>  {/** sell sellY end */}
                <div className="discount_section">
                  <p className="per">10%</p>
                  <p className="discount discountY">2,610</p>
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
                  <img src={wheatChurros} width="240" height="320" />
                </a>
              </div>  {/** prdimg end */}
            </div>  {/** img end */}

            <div className="info">
              <p className="name">
                <a href="#">잇츠베러 통밀츄러스 우리밀 크래커</a>
              </p> {/** name end */}
              <div className="price">
                <p className="consumer consumerY">
                  <span>KRW</span>2,900
                </p>    {/** consumer consumerY end */}
                <p className="sell sellY">
                  <span>KRW</span>2,900
                </p>    {/** sell sellY end */}
                <div className="discount_section">
                  <p className="per">10%</p>
                  <p className="discount discountY">2,610</p>
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