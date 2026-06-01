import "./mypage_orderChange.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_OrderChange = () => {

  return (
    <div className="mpOrder_Change_wrapper">
      <div className="mpOrder_Change_Header">
        <Header_loginOK />  
      </div>     {/** mpOrder_Change_Header end */}

      <div className="mpOrder_Change_Content"></div>    {/** mpOrder_Change_Content end */}

      <div className="mpOrder_Change_Footer">
        <Footer />  
      </div>     {/** mpOrder_Change_Footer end */}
    </div>      /** mpOrder_Change_wrapper end */
  );
};

export default Mp_OrderChange;