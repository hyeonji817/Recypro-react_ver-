import "./Products2.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Products_Bath from "./Products_Bath";
import Footer from "../main/Footer";

const Products2 = () => {
  return (
    <div className="Products2_wrap">
      <div className="Products2_Header">
        <Header_loginOK />
      </div>
      <div className="Products_Bath">
        <Products_Bath />
      </div>
      <div className="Products2_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Products2;