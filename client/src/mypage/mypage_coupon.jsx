import "./mypage_coupon.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_Coupon = () => {

  return (
    <div className="mpCoupon_wrapper">
      <div className="mpCoupon_Header">
        <Header_loginOK />  
      </div>     {/** mpCoupon_Header end */}

      <div className="mpCoupon_Content">
        <div className="mpCoupon_body">
          <h2 className="subtitle">MY PAGE</h2>       {/** subtitle end */}

          <div className="mpCoupon_top">
            <div className="customer_section">
              <div className="name"><strong>곽현지</strong>님은 MEMBER</div>      {/** name end */}  

              <a href="#" className="my_edit">정보 수정하기</a>     {/** my_edit end */}

              <ul className="point_section">
                <li><a href="#"><strong>쿠폰</strong> 0 장</a></li>
                <li><a href="#"><strong>적립금</strong> 0 원</a></li>
                <li><a href="#"><strong>포인트</strong> 0 P</a></li>  
              </ul>     {/** point_section end */}
              
              <ul className="mpCoupon_tab">
                <li>
                  <a href="/orders" className="tab_title">
                    ORDER
                    <br />
                    <strong className="tab_sub">주문내역</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_wishList" className="tab_title">
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
              </ul>      {/** mpCoupon_tab end */}
            </div>    {/** customer_section end */}
          </div>      {/** mpCoupon_top end */}  

          <div className="coupon" id="coupon"></div>    {/** coupon end */}
        </div>       {/** mpCoupon_body end */}  
      </div>    {/** mpCoupon_Content end */}

      <div className="mpCoupon_Footer">
        <Footer />  
      </div>     {/** mpCoupon_Footer end */}
    </div>        /** mpCoupon_wrapper end */
  );
};

export default Mp_Coupon;