import "./Index.css";
import "../js/Index.js";
import { useEffect } from "react";
import mainImage1 from "../assets/main1_2.png";
import mainImage2 from "../assets/main2_2.png";
import cherryBlossom from "../assets/cherryblossom.png";
import trash2 from "../assets/trash2.png";
import recycle from "../assets/recycle.png";  
import calender from "../assets/calender.png";
import box from "../assets/box.png"; 

const Index = () => {
  return (
    <div className="wrap_center" id="wrap-center">
      {/** 1st 배너 */}
      <div className="banner-container" id="banner-ct">
        <div id="intro_index">
          <div className="cont">
            <div className="banner1">
              <iframe
                src="https://player.vimeo.com/video/346223293?autoplay=1&byline=0&controls=0&loop=1&muted=1&portrait=0&sidedock=0&title=0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="video-frame"
              ></iframe>
            </div>
          </div>
        </div>
        <a href="./Home.jsx" className="link_intro"></a>
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