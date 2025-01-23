import "./Index.css";
import "../js/Index.js";
// import "../js/banner.js";
import { useEffect } from "react";
import mainImage1 from "../assets/main1_2.png";
import mainImage2 from "../assets/main2_2.png";
import cherryBlossom from "../assets/cherryblossom.png";
import trash2 from "../assets/trash2.png";
import recycle from "../assets/recycle.png";  
import calender from "../assets/calender.png";
import box from "../assets/box.png"; 

const Index = () => {
  // 컴포넌트가 마운트된 후 배너 초기화 
  useEffect(() => {
    // DOMContentLoaded 이벤트 사용으로 초기화 보장 
    const handleLoad = () => {
      console.log("DOMContentLoaded 이벤트 호출됨");
      if (window.banner) {
        window.banner.rollInit(4000);
      }
    };
  
    window.onload = handleLoad;
  
    return () => {
      window.onload = null;
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

      {/** 2nd 배너 */}
      <div className="banner-container2" id="banner-container2"></div>
      <div className="mini_title">
        <h1 className="heading-4">
          <strong className="bold-text">
            &quot;더 이상 폐품은 No! &quot;
            <br />
            &quot;재활용품을 상품으로 재탄생&quot;
          </strong>
        </h1>
        <h5 className="content-section-desc left">
          &quot;일상에서 쓰레기 처리가 힘들었던 적 있나요?&quot;
          <br />
          &quot;리싸이프로는 그 모든 걱정을 덜어주고 다시 편하게 재사용하도록 도와줍니다. &quot;
        </h5>
      </div>

      <div className="mini-iconlist">
        <div className="grid-item">
          <img src={trash2} alt="로고 이미지1" className="grid-item" />
          <div className="grid-text">
            <h5 className="heading-7">재활용품을 버리실 건가요?</h5>
            <p>이제는 재활용품을 버리지 말고 다시 맘껏 쓰세요!</p>
          </div>
        </div>
        <div className="grid-item">
          <img src={recycle} alt="로고 이미지2" className="grid-item" />
          <div className="grid-text">
            <h5 className="heading-7">자원은 순환한다.</h5>
            <p>쓰던 물건도 다시 사용할 수 있게 만듭니다.</p>
          </div>
        </div>
        <div className="grid-item">
          <img src={calender} alt="로고 이미지3" className="grid-item" />
          <div className="grid-text">
            <h5 className="heading-7">언제든지 주문 가능합니다</h5>
            <p>주문하시면 최대 하루 이틀 이내에 물품이 도착하도록 최선을 다합니다.</p>
          </div>
        </div>
        <div className="grid-item">
          <img src={box} alt="로고 이미지4" className="grid-item" />
          <div className="grid-text">
            <h5 className="heading-7">택배는 안전하게 배송됩니다.</h5>
            <p>물품 파손없이 고객의 집에 안전하게 배송되니 안심하시고 받으시면 됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;