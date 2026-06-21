import "./mypage_coupon.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_Coupon = () => {

  return (
    <div className="mpCoupon_wrapper">
      <div className="mpCoupon_Header">
        <Header_loginOK />  
      </div>     {/** mpCoupon_Header end */}

      <div className="mpCoupon_Content"></div>    {/** mpCoupon_Content end */}

      <div className="mpCoupon_Footer">
        <Footer />  
      </div>     {/** mpCoupon_Footer end */}
    </div>        /** mpCoupon_wrapper end */
  );
};

export default Mp_Coupon;