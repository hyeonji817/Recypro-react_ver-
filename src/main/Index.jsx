import "./Index.css";
import "../js/Index.js";
// import "../js/banner.js";
import { useEffect } from "react";
import mainImage1 from "../assets/main1_2.png";
import mainImage2 from "../assets/main2_2.png";
import cherryBlossom from "../assets/cherryblossom.png";

const Index = () => {
  // 컴포넌트가 마운트된 후 배너 초기화 
  useEffect(() => {
    // DOMContentLoaded 이벤트 사용으로 초기화 보장 
    const handleLoad = () => {
      if (window.banner) {
        window.banner.rollInit(4000); // 배너 초기화 호출 
      }
    };
    window.addEventListener("DOMContentLoaded", handleLoad);

    return () => {
      window.removeEventListener("DOMContentLoaded", handleLoad);
    };
  }, []);

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
              <p className="text">
                재활용 상품으로 <br /> 환경을 보존하자
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;