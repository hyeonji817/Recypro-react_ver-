import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mypage_orders.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const formatWon = (value) => Number(value || 0).toLocaleString();

const mp_Orders = () => {

  return (
    <div className="mpOrders_wrapper">
      <div className="mpOrders_Header">
        <Header_loginOK />  
      </div>     {/** mpOrders_Header end */}

      <div className="mpOrders_Content">
        <div className="mpOrders_body">
          <h2 className="subtitle">MY PAGE</h2>      {/** subtitle end */}  

          <div className="mpOrders_top">
            <div className="customer_section">
              <div className="name">
                <strong>곽현지</strong>님은 MEMBER
              </div>      {/** name end */}

              <a href="/edit" className="my_edit">정보 수정하기</a>

              <ul className="point_section">
                <li><a href="/mypage/coupon_down_list.php"><strong>쿠폰</strong> 6 장</a></li>
			          <li><a href="/mypage/milage.php"><strong>적립금</strong> 3,030 원</a></li>
			          <li><a href="/mypage/emoney.php"><strong>포인트</strong> 0 P</a></li>
              </ul>     {/** point_section end */}

              <ul className="mpOrders_tab">
                <li><a href="/orders" className="tab_title">ORDER<br /><strong className="tab_sub">주문내역</strong></a></li>
                <li><a href="/wishlist" className="tab_title">WISH LIST<br /><strong className="tab_sub">관심상품</strong></a></li>
                <li><a href="/coupons" className="tab_title">COUPON<br /><strong className="tab_sub">쿠폰</strong></a></li>
                <li><a href="/mileage" className="tab_title">MILEAGE<br /><strong className="tab_sub">적립금</strong></a></li>
                <li><a href="/deposits" className="tab_title">DEPOSITS<br /><strong className="tab_sub">예치금</strong></a></li>
                <li><a href="/special-mileage" className="tab_title">SECRET MILEAGE<br /><strong className="tab_sub">스페셜 적립금</strong></a></li>
                <li><a href="#" className="tab_title">Q&amp;A<br /><strong className="tab_sub">내 상품문의</strong></a></li>
                <li><a href="#" className="tab_title">MYBOARD<br /><strong className="tab_sub">내 상품평</strong></a></li>
                <li><a href="/withdraw" className="tab_title">WITHDRAW<br /><strong className="tab_sub">회원 탈퇴</strong></a></li>  
              </ul>      
            </div>      {/** customer_section end */}  
          </div>      {/** mpOrders_top end */}

          <div id="order_list">
            <h3 className="title first">주문내역</h3>     {/** title first end */}
            <p className="title_count tar">주문번호를 클릭하시면 주문정보를 확인할 수 있습니다.</p>   {/** title_count tar end */}

            <div className="search"></div>      {/** search end */}

          </div>     {/** order_list end */}
        </div>     {/** mpOrders_body end */}
      </div>    {/** mpOrders_Content end */}

      <div className="mpOrders_Footer">
        <Footer />
      </div>     {/** mpOrders_Footer end */}
    </div>    /** mpOrders_wrapper end */
  );
};

export default mp_Orders;
