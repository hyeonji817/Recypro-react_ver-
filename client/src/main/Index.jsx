import "./Index.css";
import "../js/Index.js";
import { useEffect } from "react";
import Header_loginOK from "./Header_loginOK.jsx";
import NewProducts from "./newProducts.jsx";
import Main_Banner1 from "./Main_Banner1.jsx";
import Main_Banner2 from "./Main_Banner2.jsx";
import Main_Bottom from "./Main_Bottom.jsx";
import BestProducts from "./BestProducts.jsx";
import Footer from "./Footer.jsx";

const Index = () => {
  return (
    <div className="loginOK_Wrap" id="wrap-center">
      <div className="Header">
        <Header_loginOK />
      </div>
      <div className="main_Banner1">
        <Main_Banner1 />
      </div>
      <div className="newProducts">
        <NewProducts />
      </div>
      <div className="main_Banner2">
        <Main_Banner2 />
      </div>
      <div className="bestProducts">
        <BestProducts />
      </div>
      <div className="main_Bottom">
        <Main_Bottom />
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Index;