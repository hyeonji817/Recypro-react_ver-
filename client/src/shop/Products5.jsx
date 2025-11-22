import "./Products5.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Products_Pet from "./Products_Pet";
import Footer from "../main/Footer";

const Products5 = () => {
  return (
    <div className="Products5_wrap">
      <div className="Products5_Header">
        <Header_loginOK />  
      </div>      {/** Products5_Header end */}
      <div className="Products5_Pet"></div>         {/** Products5_Pet end */}
      <div className="Products5_Footer">
        <Footer />
      </div>      {/** Products5_Footer end */}
    </div>    /** Products5_wrap end */
  );
};

export default Products5; 