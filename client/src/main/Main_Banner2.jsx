import React from "react"; 
import pet_products from "../assets/petProducts.png"; 
import recypro_logo from "../assets/recypro_logo.png"; 
import "./Main_Banner2.css"; 

const Main_Banner2 = () => {

  return (
    <div className="main_Banner2_wrap">
      <div className="mid_bnr bnr_img">
        <a href="#">
          <img src={pet_products} border="0" width={2400} height={1200} alt="pet_products" />
        </a>
        {/** 워터마크 로고 */}
        <img src={recypro_logo} alt="Recypro Logo" className="watermark_logo" />
        {/** 텍스트 삽입 */}
        <div className="banner_text">
          재활용품으로 편리함을 제공할 수 있습니다. 
        </div>
      </div>
    </div>
  );
};

export default Main_Banner2;