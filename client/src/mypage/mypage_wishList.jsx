import "./mypage_wishList.css"; 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const formatWon = (value) => Number(value || 0).toLocaleString();

const getDetailPath = (productTable, productId) => {
  const encodedId = encodeURIComponent(productId);

  switch (productTable) {
    case "product_life":
      return `/product_life/${encodedId}`;
    case "product_bath":
      return `/product_bath/${encodedId}`;
    case "product_food":
      return `/product_food/${encodedId}`;
    case "product_kitchen":
      return `/product_kitchen/${encodedId}`;
    case "product_pet":
      return `/product_pet/${encodedId}`;
    case "product_office":
      return `/product_office/${encodedId}`;
    default:
      return `/product/${encodedId}`;
  }
};

const Mp_WishList = () => {
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="mpWishList_wrapper">
      <div className="mpWishList_Header">
        <Header_loginOK />  
      </div>     {/** mpWishList_Header end */}

      <div className="mpWishList_Content">
        <div className="mpWishList_body">
          <h2 className="subtitle">MY PAGE</h2>     {/** subtitle end */}

          <div className="mpWishList_top">
            <div className="customer_section">
              <div className="name"><strong>곽현지</strong>님은 MEMBER</div>      {/** name end */}

              <a href="#" className="my_edit">정보 수정하기</a>       {/** my_edit end */}

              <ul className="point_section">
                <li>
                  <a href="#"><strong>쿠폰</strong> 0 장</a>
                </li>
                <li>
                  <a href="#"><strong>적립금</strong> 0 원</a>
                </li>
                <li>
                  <a href="#"><strong>포인트</strong> 0 P</a>  
                </li>    
              </ul>       {/** point_section end */}

              <ul className="mpWishList_tab">
                <li>
                  <a href="/orders" className="tab_title">
                    ORDER
                    <br />
                    <strong className="tab_sub">주문내역</strong>
                  </a>
                </li>
                <li>
                  <a href="/wishlist" className="tab_title">
                    WISH LIST
                    <br />
                    <strong className="tab_sub">관심상품</strong>
                  </a>
                </li>
                <li>
                  <a href="/coupons" className="tab_title">
                    COUPON
                    <br />
                    <strong className="tab_sub">쿠폰</strong>
                  </a>
                </li>
                <li>
                  <a href="/mileage" className="tab_title">
                    MILEAGE
                    <br />
                    <strong className="tab_sub">적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="/deposits" className="tab_title">
                    DEPOSITS
                    <br />
                    <strong className="tab_sub">예치금</strong>
                  </a>
                </li>
                <li>
                  <a href="/special-mileage" className="tab_title">
                    SECRET MILEAGE
                    <br />
                    <strong className="tab_sub">스페셜 적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    Q&amp;A
                    <br />
                    <strong className="tab_sub">내 상품문의</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    MYBOARD
                    <br />
                    <strong className="tab_sub">내 상품평</strong>
                  </a>
                </li>
                <li>
                  <a href="/withdraw" className="tab_title">
                    WITHDRAW
                    <br />
                    <strong className="tab_sub">회원 탈퇴</strong>
                  </a>
                </li>        
              </ul>      {/** mpWishList_tab end */} 
            </div>     {/** customer_section end */}  
          </div>    {/**  mpWishList_top end */}  

          <div className="wishList_section">
            <h3>관심상품</h3>  


          </div>      {/** wishList_section end */}
        </div>     {/** mpWishList_body end */}
      </div>    {/** mpWishList_Content end */}

      <div className="mpWishList_Footer">
        <Footer />  
      </div>     {/** mpWishList_Footer end */}
    </div>      /** mpWishList_wrapper end */
  );
};

export default Mp_WishList;