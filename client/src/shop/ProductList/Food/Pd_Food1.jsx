import "./Pd_Food1.css";
import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import axios from "axios";
import Header_loginOK from "../../../main/Header_loginOK";
import Footer from "../../../main/Footer";

// 이미지 불러들이기 
import couponBanner from "../../../assets/coupon_banner.jpg";
import zeroSugarChocoCookie1 from "../../../assets/food/1. zeroSugar_ChocoCookie1.png";
import zeroSugarChocoCookie2 from "../../../assets/food/1. zeroSugar_ChocoCookie2.png";
import zeroSugarChocoCookie3 from "../../../assets/food/1. zeroSugar_ChocoCookie3.png";
import zeroSugarChocoCookie_Desc1 from "../../../assets/food/1. zeroSugar_ChocoCookie_Desc1.png";
import zeroSugarChocoCookie_Desc2 from "../../../assets/food/1. zeroSugar_ChocoCookie_Desc2.png";
import zeroSugarChocoCookie_Desc3 from "../../../assets/food/1. zeroSugar_ChocoCookie_Desc3.png";
import zeroSugarChocoCookie_Desc4 from "../../../assets/food/1. zeroSugar_ChocoCookie_Desc4.png";

const Pd_Food1 = () => {
  const images = [
    zeroSugarChocoCookie1,
    zeroSugarChocoCookie2,
    zeroSugarChocoCookie3
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
    
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
    
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="Pd_Food1_wrapper">
      <div className="Pd_Food1_Header">
        <Header_loginOK />  
      </div> {/** Pd_Food1_Header end */}
      <div className="Pd_Food1_Content">
         <div className="Pd_Food1_body">
           <div id="detail">
             <div className="detail_top_wrap">
               {/** 상품 이미지 */}
               <div className="prdimg">
                  <div className="carousel_container">
                    <button className="arrow left" onClick={handlePrev}>
                      &lt;
                    </button>
                    <div className="add_img">
                      <img src={images[currentIndex]} alt={`유기농 수건 ${currentIndex + 1}`} />
                    </div>
                    <button className="arrow right" onClick={handleNext}>
                      &gt;
                    </button>
                  </div>
           
                   <div className="detail_info">
                     <div className="img_wrapper" style={{ textAlign: "center" }}>	{/** 1st 이미지 (장원영 단독 착용사진) */}
                       <img src={zeroSugarChocoCookie_Desc1} />
                     </div>    {/** img_wrapper end */}
                     <div className="img_wrapper" style={{ textAlign: "center" }}>	{/** 2nd 이미지 (장원영 + 옷 단독 + 외국인 모델 착용사진) */}
                       <img src={zeroSugarChocoCookie_Desc2} />
                     </div>    {/** img_wrapper end */}
                     <div className="img _wrapper" style={{ textAlign: "center" }}>
                       <img src={zeroSugarChocoCookie_Desc3} />
                     </div>		{/** img_wrapper end */}
                     <div className="img _wrapper" style={{ textAlign: "center" }}>
                       <img src={zeroSugarChocoCookie_Desc4} />
                     </div>		{/** img_wrapper end */}
                     <div style={{ textAlign: "center" }}><br /></div>
                   </div>    {/** detail_info end */}
                 
                 <div className="related_wrap">
                   <div className="btn_bottom dn">
                     <span className="box_btn w141 left">
                       <a href="#">선택상품 장바구니</a>
                     </span>   {/** box_btn w141 left end */}
                     <span className="box_btn w141">
                       <a href="#">선택상품 구매</a>
                     </span>   {/** box_btn w141 end */}
                   </div>    {/** btn_bottom dn end */}
                 </div>    {/** related_wrap end */}
               </div>     {/** prdimg end */}
           
               {/** //상품 이미지 */}
               <div className="info_scroll">
                 <form name="prdFrm" method="post" style={{ margin: "0px" }} acceptCharset="utf-8">
                   <div className="wrap_prd">
                     {/** 상품정보 & 버튼 */}
                     <div className="info">
                       <h3 className="name">[지구pick] 잇츠베러 비건 제로슈가 더블초코 쿠키 </h3>
                       <p className="summary">제로슈가 쿠키</p>
                       <div className="price">
                         <div className="top_price">
                           <span className="consumer consumerY">2,900 원</span>
                           <span className="sell sellY">
                             <strong>2,610</strong>
                           </span>   {/** sell sellY end */}
                         </div>    {/** top_price end */}
                                 
                         <span className="discount discountY">
                           <strong>2,610</strong>
                         </span>   {/** discount discountY end */}
                         <span className="per">10%</span>
                       </div>    {/** price end */}
           
                       {/** 상품옵션리스트 */}
                       <div className="opt_list">
                         <div className="th">종류</div>
                         <div className="td">
                           <select name="option1" /** dataNecessary="Y" dataType="2A" dataName="색상"*/ className="wing_multi_option pno4844 necessary_Y" /** dataPno="4844" */>
                             <option value="">::종류::</option>
                             <option value="zeroSugar_ChocoCookie">제로슈가 초코쿠키</option>
                           </select>
                         </div>    {/** td end */}
                       </div>    {/** opt_list end */}
           
                       {/** 수량 */}
                       <div className="box_qty hidden">
                         <input type="text" name="buy_ea" value="1" className="form_input" />
                         <div className="btn_ea">
                           <a href="#" className="ea_up">+</a>
                           <a href="#" className="ea_down">-</a>
                         </div>    {/** btn_ea end */}
                       </div>    {/** box_qty hidden end */}
           
                       <table className="list">
                         <colgroup>
                           <col style={{ width: "30%" }} />
                           <col />
                         </colgroup>
                         <tbody>
                           <tr>
                             <th scope="row">MILEAGE</th>
                               <td>
                                 58 원
                                 <div className="box_info">
                                   <div className="info">
                                     회원적립금 : 58 원<br />
                                   </div>    {/** info end */}
                                 </div>    {/** box_info end */}
                               </td>
                             </tr>
                           </tbody>
                         </table>      {/** list end */}
                     
                         <div className="multi_opt">
                           <ul id="detail_multi_option" className="selected_list"></ul>
                             <div className="opt_total">
                               <span className="title">총 상품금액(수량) : </span>
                               <strong>
                                 <span id="detail_multi_option_prc">
                                   <span id="detail_multi_option_prc">0</span>
                                 </span>KRW
                                 <span className="ea_total">(0개)</span>
                               </strong>
                             </div>    {/** opt_total end */}
                           </div>    {/** multi_opt end */}
                     
                           {/** 버튼 */}
                           {/** ★★★★ 모듈 ★★★★ */}
                           <div className="btn">
                             <span className="box_btn large buy block">
                               <a href="#">BUY NOW</a>
                             </span>   {/** box_btn large buy block end */}
                             <span className="box_btn large cart block">
                               <a href="#">ADD TO BAG</a>
                             </span>   {/** box_btn large cart block end */}
                           </div>    {/** btn end */}
                           <div></div>

                           <div className="app_link">
                             <a href="#">
                               <img src={couponBanner} border={0} />
                             </a>
                           </div>    {/** app_link end */}
                           {/** //버튼 */}
                         </div>		{/** info end */}
                         {/** //상품정보 & 버튼 */}
                       </div>		{/** wrap_prd end */}
                     <input type="hidden" name="opt_no" value="2" />
                   </form>
                 </div>		{/** info_scroll end */}
               </div>		{/** detail_top_wrap end */}
               {/** // 상단 */}
             </div>	{/** detail end */}
         </div>   {/** Pd_Food1_body end */}        
      </div>    {/** Pd_Food1_Content end */}
      <div className="Pd_Food1_Footer">
        <Footer />  
      </div>   {/** Pd_Food1_Footer end */}
    </div>  /** Pd_Food1_wrapper end */
  );
};

export default Pd_Food1;