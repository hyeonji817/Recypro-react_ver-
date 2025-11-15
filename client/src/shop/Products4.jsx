import "./Products4.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Products_Kitchen from "./Products_Kitchen";
import Footer from "../main/Footer";

const Products4 = () => {
  return (
    <div className="Products4_wrap">
      <div className="Products4_Header">
        <Header_loginOK />
      </div>
      <div className="Products_Kitchen">
        <Products_Kitchen />
      </div>
      <div className="Products4_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Products4;