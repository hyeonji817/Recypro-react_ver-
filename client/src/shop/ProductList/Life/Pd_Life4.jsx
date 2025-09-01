import "./Pd_Life4.css"; 
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
import duckKeyRing1 from "../../../assets/life/4. duck_KeyRing1.jpg"; 
import duckKeyRing2 from "../../../assets/life/4. duck_KeyRing2.jpg"; 
import duckKeyRing3 from "../../../assets/life/4. duck_KeyRing3.jpg"; 
import duckKeyRing4 from "../../../assets/life/4. duck_KeyRing4.jpg"; 
import duckKeyRing5 from "../../../assets/life/4. duck_KeyRing5.jpg"; 
import duckKeyRing6 from "../../../assets/life/4. duck_KeyRing6.jpg"; 
import duckKeyRing7 from "../../../assets/life/4. duck_KeyRing7.jpg"; 
import duckKeyRing8 from "../../../assets/life/4. duck_KeyRing8.jpg"; 

import duckKeyRing_Desc1 from "../../../assets/life/4. duck_KeyRing_Desc1.jpg"; 
import duckKeyRing_Desc2 from "../../../assets/life/4. duck_KeyRing_Desc2.jpg"; 
import duckKeyRing_Desc3 from "../../../assets/life/4. duck_KeyRing_Desc3.jpg"; 
import duckKeyRing_Desc4 from "../../../assets/life/4. duck_KeyRing_Desc4.jpg"; 
import duckKeyRing_Desc5 from "../../../assets/life/4. duck_KeyRing_Desc5.jpg"; 
import duckKeyRing_Desc6 from "../../../assets/life/4. duck_KeyRing_Desc6.jpg"; 
import duckKeyRing_Desc7 from "../../../assets/life/4. duck_KeyRing_Desc7.jpg"; 
import duckKeyRing_Desc8 from "../../../assets/life/4. duck_KeyRing_Desc8.jpg"; 

const Pd_Life4 = () => {
  const images = [
    duckKeyRing1, 
    duckKeyRing2, 
    duckKeyRing3, 
    duckKeyRing4, 
    duckKeyRing5, 
    duckKeyRing6, 
    duckKeyRing7, 
    duckKeyRing8
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="Pd_Life4_wrapper">
      <div className="Pd_Life4_Header">
        <Header_loginOK />  
      </div>     {/** Pd_Life4_Header */}

      <div className="Pd_Life4_Content">
      <div className="Pd_Life4_body">
           <div id="detail">
             <div className="detail_top_wrap">
               {/** 상품 이미지 */}
               <div className="prdimg">
                <div className="carousel_container">
                  <button className="arrow left" onClick={handlePrev}>
                    &lt;
                  </button>
                  <div className="add_img">
                    <img src={images[currentIndex]} alt={`오리키링 ${currentIndex + 1}`} />
                  </div>
                  <button className="arrow right" onClick={handleNext}>
                    &gt;
                  </button>
                </div>
           
                <div className="detail_info">
                  <div className="img_wrapper" style={{ textAlign: "center" }}>	
                    <img src={duckKeyRing_Desc1} /> 
                    <p style={{ textAlign: "center" }}>(윗줄) 아이보리 / 핑크 / 라벤더 / 블루<br />(아랫줄) 민트 / 진보라 / 차콜</p>
                  </div>    
                  <div className="img_wrapper" style={{ textAlign: "center" }}>	
                    <img src={duckKeyRing_Desc2} />
                    <p style={{ textAlign: "center" }}>아이보리</p>
                  </div>   
                  <div className="img _wrapper" style={{ textAlign: "center" }}>
                    <img src={duckKeyRing_Desc3} />
                    <p style={{ textAlign: "center" }}>분홍</p>
                  </div>	
                  <div className="img _wrapper" style={{ textAlign: "center" }}>
                    <img src={duckKeyRing_Desc4} />
                    <p style={{ textAlign: "center" }}>라벤더</p>
                  </div>		
                  <div className="img_wrapper" style={{ textAlign: "center" }}>	
                    <img src={duckKeyRing_Desc5} />
                    <p style={{ textAlign: "center" }}>진보라</p>
                  </div>    
                  <div className="img_wrapper" style={{ textAlign: "center" }}>	
                    <img src={duckKeyRing_Desc6} />
                    <p style={{ textAlign: "center" }}>민트</p>
                  </div>   
                  <div className="img _wrapper" style={{ textAlign: "center" }}>
                    <img src={duckKeyRing_Desc7} />
                    <p style={{ textAlign: "center" }}>블루</p>
                  </div>	
                  <div className="img _wrapper" style={{ textAlign: "center" }}>
                    <img src={duckKeyRing_Desc8} />
                    <p style={{ textAlign: "center" }}>차콜</p>
                  </div>		
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
                       <h3 className="name">[지구pick] 스모어웨이브 공정무역 키링 - 오리  </h3>
                       <p className="summary">오리 키링</p>
                       <div className="price">
                         <div className="top_price">
                           <span className="consumer consumerY">9,900 원</span>
                           <span className="sell sellY">
                             <strong>8,910</strong>
                           </span>   {/** sell sellY end */}
                         </div>    {/** top_price end */}
                                 
                         <span className="discount discountY">
                           <strong>8,910</strong>
                         </span>   {/** discount discountY end */}
                         <span className="per">10%</span>
                       </div>    {/** price end */}
           
                       {/** 상품옵션리스트 */}
                       <div className="opt_list">
                         <div className="th">종류</div>
                         <div className="td">
                           <select name="option1" /** dataNecessary="Y" dataType="2A" dataName="색상"*/ className="wing_multi_option pno4844 necessary_Y" /** dataPno="4844" */>
                             <option value="">::색상::</option>
                             <option value="ivory">아이보리</option>
                             <option value="mint">민트</option>
                             <option value="라벤더::0::0::9508::cpx0::">라벤더</option>
                             <option value="charcol">차콜</option>
                             <option value="violet">진보라</option>
                             <option value="blue">블루</option>
                             <option value="pink">핑크</option>
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
                                 495 원
                                 <div className="box_info">
                                   <div className="info">
                                     회원적립금 : 495 원<br />
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
           
                           <div className="count_share tar dn">
                             <div className="sns">
                               <a><span className="kakao">kakao</span></a>
                               <a><span className="kakaostory">kakaostory</span></a>
                               <a href="#" className="facebook"></a>
                               <a href="#" target="_blank" className="insta_share"></a>
                               <span className="wish ">
                                 <a href="#"></a>
                               </span>
                             </div>    {/** sns end */}
                                   
                             <div className="count_box">
                               <p className="count">
                                 <a className="p_cursor">REVIEW (<span>5</span>)</a>
                                 <a className="p_cursor right">Q&amp;A (<span>0</span>)</a>
                               </p>
                             </div>    {/** count_box end */}
                           </div>    {/** count_share tar dn end */}
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
         </div>   {/** Pd_Life4_body end */}   
      </div>    {/** Pd_Life4_Content */}

      <div className="Pd_Life4_Footer">
        <Footer />  
      </div>     {/** Pd_Life4_Footer */}
    </div>
  );
};

export default Pd_Life4;