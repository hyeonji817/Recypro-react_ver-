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