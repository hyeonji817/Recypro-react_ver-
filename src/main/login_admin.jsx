import "./login_admin.css";
import "../js/Index.js";
import Header_admin from "./Header_admin.jsx";
import Popular_pd from "./Popular_pd.jsx";
import Shop_event from "./shop_event.jsx";
import Footer from "./Footer.jsx";
import { useEffect } from "react";
import mainImage1 from "../assets/main1_2.png";
import mainImage2 from "../assets/main2_2.png";
import cherryBlossom from "../assets/cherryblossom.png";

const login_admin = () => {
  return (
    <div className="wrap_center" id="wrap-center">
      <div className="banner-container" id="banner-container">
        <div className="img_wrap">
          <ul className="rolling_imgs">
            <li className="currentroll">
              <img src={mainImage1} alt="배너 이미지 1" />
              <p className="text">재활용품 쇼핑몰</p>
            </li>
            <li className="nextroll">
              <img src={mainImage2} alt="배너 이미지 2" />
              <p className="text">지구지킴의 선두주자!</p>
            </li>
            <li>
              <img src={cherryBlossom} alt="배너 이미지 3" />
              <p className="text">재활용 상품으로 <br /> 환경을 보존하자</p>  
            </li> 
          </ul>
        </div>
      </div>
      <div className="popular_wrap">
        <Popular_pd />
      </div>
      <div className="shop_event_wrap">
        <Shop_event />
      </div>
    </div>
  );
};

export default login_admin;