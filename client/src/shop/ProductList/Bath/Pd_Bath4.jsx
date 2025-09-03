import "./Pd_Bath4.css";
import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import axios from "axios";
import Header_loginOK from "../../../main/Header_loginOK";
import Footer from "../../../main/Footer";

// 이미지 불러들이기 
import couponBanner from "../../../assets/coupon_banner.jpg";
import toothBrush_Pouch1 from "../../../assets/bath/4. toothBrush_Pouch1.jpg"; 
import toothBrush_Pouch2 from "../../../assets/bath/4. toothBrush_Pouch2.jpg"; 
import toothBrush_Pouch3 from "../../../assets/bath/4. toothBrush_Pouch3.jpg"; 
import toothBrush_PouchDesc from "../../../assets/bath/4. toothBrush_PouchDesc1.jpg";

const Pd_Bath4 = () => {
  const images = [
    toothBrush_Pouch1,
    toothBrush_Pouch2,
    toothBrush_Pouch3
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
    
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
    
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="Pd_Bath4_wrapper">
      <div className="Pd_Bath4_Header">
        <Header_loginOK />  
      </div> {/** Pd_Bath4_Header end */}
      <div className="Pd_Bath4_Content">
         <div className="Pd_Bath4_body">
           <div id="detail">
             <div className="detail_top_wrap">
               {/** 상품 이미지 */}
               <div className="prdimg">
                  <div className="carousel_container">
                    <button className="arrow left" onClick={handlePrev}>
                      &lt;
                    </button>
                    <div className="add_img">
                      <img src={images[currentIndex]} alt={`칫솔 파우치 ${currentIndex + 1}`} />
                    </div>
                    <button className="arrow right" onClick={handleNext}>
                      &gt;
                    </button>
                  </div>
           
                   <div className="detail_info">
                     <div className="img_wrapper" style={{ textAlign: "center" }}>	{/** 1st 이미지 (장원영 단독 착용사진) */}
                       <img src={toothBrush_PouchDesc} />
                     </div>    {/** img_wrapper end */}
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
                       <h3 className="name">[지구샵] 칫솔파우치 </h3>
                       <p className="summary">칫솔파우치</p>
                       <div className="price">
                         <div className="top_price">
                           <span className="consumer consumerY">3,500 원</span>
                           <span className="sell sellY">
                             <strong>3,150</strong>
                           </span>   {/** sell sellY end */}
                         </div>    {/** top_price end */}
                                 
                         <span className="discount discountY">
                           <strong>3,150</strong>
                         </span>   {/** discount discountY end */}
                         <span className="per">10%</span>
                       </div>    {/** price end */}
           
                       {/** 상품옵션리스트 */}
                       <div className="opt_list">
                         <div className="th">종류</div>
                         <div className="td">
                           <select name="option1" /** dataNecessary="Y" dataType="2A" dataName="색상"*/ className="wing_multi_option pno4844 necessary_Y" /** dataPno="4844" */>
                             <option value="">::종류::</option>
                             <option value="toothBrush_Pouch">칫솔파우치</option>
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
                                 158 원
                                 <div className="box_info">
                                   <div className="info">
                                     회원적립금 : 158 원<br />
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
         </div>   {/** Pd_Bath4_body end */}     
      </div>    {/** Pd_Bath4_Content end */}
      <div className="Pd_Bath4_Footer">
        <Footer />  
      </div>   {/** Pd_Bath4_Footer end */}
    </div>  /** Pd_Bath4_wrapper end */
  );
};

export default Pd_Bath4;