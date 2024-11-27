import "./loginOK.css";
import "../js/Index.js";
import Header_loginOK from "./Header_loginOK.jsx";
import Index from "./Index.jsx";
import Popular_pd from "./Popular_pd.jsx";
import Shop_event from "./shop_event.jsx";
import Footer from "./Footer.jsx";
import { useEffect } from "react";
import cherryBlossom from "../assets/cherryblossom.png";

const LoginOK = () => {
  return (
    <div className="wrap_center" id="wrap-center">
      <div className="loginOK_Header">
        <Header_loginOK />
      </div>
      <div className="loginOK_banner">
        <Index />
      </div>
      <div className="popular_wrap">
        <Popular_pd />
      </div>
      <div className="shop_event_wrap">
        <Shop_event />
      </div>
      <div className="loginOK_footer">
        <Footer />
      </div>
    </div>
  );
};

export default LoginOK;