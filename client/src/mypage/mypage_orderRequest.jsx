import "./mypage_orderRequest.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_OrderRequest = () => {

  return (
    <div className="mpOrder_Request_wrapper">
      <div className="mpOrder_Request_Header">
        <Header_loginOK />  
      </div>      {/** mpOrder_Request_Header end */}

      <div className="mpOrder_Request_Content"></div>     {/** mpOrder_Request_Content end */}

      <div className="mpOrder_Request_Footer">
        <Footer />  
      </div>      {/** mpOrder_Request_Footer end */}
    </div>       /** mpOrder_Request_wrapper end */
  );
};

export default Mp_OrderRequest;