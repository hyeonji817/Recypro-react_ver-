import "./Products3.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Products_Food from "./Products_Food";
import Footer from "../main/Footer";

const Products3 = () => {
  return (
    <div className="Products3_wrap">
      <div className="Products3_Header">
        <Header_loginOK />
      </div>
      <div className="Products_Food">
        <Products_Food />
      </div>
      <div className="Products3_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Products3;