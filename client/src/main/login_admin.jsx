import "./login_admin.css";
import "../js/Index.js";
import Header_admin from "./Header_admin.jsx";
import Index from "./Index.jsx";
import Popular_pd from "./Popular_pd.jsx";
import Shop_event from "./shop_event.jsx";
import Footer from "./Footer.jsx";
import { useEffect } from "react";

const login_admin = () => {
  return (
    <div className="loginAdmin_wrapper" id="loginAdmin_wrapper">
      <div className="loginAdmin_Header">
        <Header_admin />
      </div>
      <div className="loginAdmin_banner">
        <Index />
      </div>
      <div className="popular_wrap">
        <Popular_pd />
      </div>
      <div className="shop_event_wrap">
        <Shop_event />
      </div>
      <div className="loginAdmin_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default login_admin;