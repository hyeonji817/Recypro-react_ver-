import "./Products.css";
import Header_loginOK from "../main/Header_loginOK";
import Product_List from "./Product_List";
import Footer from "../main/Footer";

const Products = () => {
  return (
    <div className="Products_wrap">
      <div className="Products_Header">
        <Header_loginOK />
      </div>
      <div className="Product_List">
        <Product_List />
      </div>
      <div className="Products_Footer">
        <Footer />
      </div>
    </div>
    

  );
};

export default Products;