import "./mypage_orderDetail.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_OrderDetail = () => {

  return (
    <div className="mpOrder_Detail_wrapper">
      <div className="mpOrder_Detail_Header">
        <Header_loginOK />  
      </div>     {/** mpOrder_Detail_Header end */}

      <div className="mpOrder_Detail_Content"></div>    {/** mpOrder_Detail_Content end */}

      <div className="mpOrder_Detail_Footer">
        <Footer />
      </div>     {/** mpOrder_Detail_Footer end */}
    </div>        /** mpOrder_Detail_wrapper end */
  );
}; 

export default Mp_OrderDetail;