import "./mypage_cancelRefund.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_CancelRefund = () => {

  return (
    <div className="mpCancel_Refund_wrapper">
      <div className="mpCancel_Refund_Header">
        <Header_loginOK />  
      </div>      {/** mpCancel_Refund_Header end */}

      <div className="mpCancel_Refund_Content"></div>     {/** mpCancel_Refund_Content end */}

      <div className="mpCancel_Refund_Footer">
        <Footer />  
      </div>      {/** mpCancel_Refund_Footer end */}
    </div>       /** mpCancel_Refund_wrapper end */
  );
};

export default Mp_CancelRefund;