import React from "react";
import picnic from "../assets/picnic.jpg"; 
import recypro_logo from "../assets/recypro_logo.png";
import "./Main_Bottom.css"; 

const Main_Bottom = () => {

  return (
    <div className="main_Bottom_wrap">
      <div className="bottom_bnr bnr_img">
		    <a href="#">
          <img src={picnic} border="0" alt={"리싸이프로는 편의를 제공합니다."} width={2400} height={1700} className="background-image"/>
        </a>
        {/** 워터마크 로고 */}
        <img src={recypro_logo} alt="Recypro Logo" className="watermark_logo" />
        {/** 텍스트 삽입 */}
        <div className="banner_text">
          재활용품으로 탄생한 물품으로 
          일상의 즐거움을 즐길 수 있습니다
        </div>
	    </div>
    </div>
  );
};

export default Main_Bottom;