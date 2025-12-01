import "./Products6.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Products_Office from "./Products_Office";
import Footer from "../main/Footer";

const Products6 = () => {
  return (
    <div className="Products6_wrap">
      <div className="Products6_Header">
        <Header_loginOK />  
      </div>      {/** Products6_Header end */}
      <div className="Products6_Office">
        <Products6 />  
      </div>      {/** Products6_Office end */}
      <div className="Products6_Footer">
        <Footer />
      </div>      {/** Products6_Footer end */}
    </div>      /** Products6_wrap end */
  );
};

export default Products6;