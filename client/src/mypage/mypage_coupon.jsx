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

          <div className="mpCoupon_top"></div>      {/** mpCoupon_top end */}  

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