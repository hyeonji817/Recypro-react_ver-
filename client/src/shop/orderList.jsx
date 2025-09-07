import React, { useEffect, useState } from "react"; 
import "./orderList.css";
import axios from "axios"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import beepBeep_Toy1 from "../assets/pet/1. beepBeep_Toy1.jpg";

const OrderList = () => {
  return (
    <div className="orderList_Wrapper">
      <div className="orderList_Header">
        <Header_loginOK />
      </div>
      <div className="orderList_Content">
        <div className="orderList_body">
          <h2 className="subtitle" id="subtitle">주문서</h2>
          <div id="order">
            <form name="ordFrm" method="post" style={{ margin: "0px" }}>
              <div className="print_receipt">
                <span>※ 상품의 옵션 및 수량 변경은 상품상세 또는 장바구니에서 가능합니다.  </span>
                <span className="box_btn small"><a href="#"> 장바구니 가기</a></span>
                <span className="box_btn small white"><a href="#"> 견적서 출력</a></span>
              </div>    {/** print_receipt end */}

              {/** 주문상품정보 */}
              <table className="tbl_col prd">
                <caption className="hidden">주문상품</caption>
                <colgroup>
                  <col style={{ width: "100px" }} />
                  <col />
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>

                <thead>
                  <tr>
                    <th scope="col" colSpan={2}>상품명</th>
                    <th scope="col">옵션</th>
                    <th scope="col">가격</th>
                    <th scope="col">수량</th>
                    <th scope="col">총 금액</th>
                    <th scope="col">적립금</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="img">
                      <a href="#">
                        <img src={beepBeep_Toy1} width={52} height={70} />
                      </a>
                    </td>

                    <td className="tal"><a href="#">[지구pick] 바잇미 업사이클 봉봉그린 반려동물 삑삑이 장난감</a></td>
                    <td className="tal"> 종류 : 토끼<br /> <div></div></td>
                    <td>7,110 원</td>
                    <td>1</td>
                    <td>7,110 원</td>
                    <td>158 원</td>
                  </tr>
                </tbody>
              </table>

              {/** //주문상품정보 */}
              <div className="ord_info">
                <div className="area_left">
                  {/** 사은품 */}
                  <div id="gift_area"></div>
                  {/** /사은품 */}
                  <h3 className="title">할인 / 혜택 사용</h3>
                  <table className="tbl_order">
                    <caption className="hidden">할인 / 혜택 사용</caption>
                    <colgroup>
                      <col style={{ width: "18%" }} />
                      <col />
                    </colgroup>

                    <tbody>
                      <tr>
                        <th scope="row">적립금 사용</th>
                        <td>
                          <input type="text" name="milage_prc" value="0" className="form_input tar" /> 사용 가능 적립금 : <strong className="own_mileage">2,000</strong> 원
                        </td>
                      </tr>
        
                      {/** 쿠폰사용 */}  
                      <tr>
                        <th scope="row">전체상품 쿠폰</th>
                        <td>
                          <ul className="coupon_list">
                            <li>
                              <span className="check">
                                <input type="hidden" id="coupon_stype_1038523" value="1" />
                                <input type="hidden" name="coupon_pay_type" value="1" />
                                <input type="radio" name="coupon" id="coupon" value="1038523" />
                              </span>   {/** check end */}
                              <p className="name">[온라인전용] 멤버십_5천 원 할인 쿠폰</p>
                              <p className="content">
                                최소주문금액 : 30,000 원 이상
                                / 할인액(율) : 5,000원 
                                / 사용기간 :  ~ 2025-07-31
                              </p>    {/** content end */}
                            </li>

                            <li>
                              <span className="check">
                                <input type="hidden" id="coupon_stype_848011" value="1" />
                                <input type="hidden" name="coupon_pay_type" value="1" />
                                <input type="radio" name="coupon" id="coupon" value="848011" />
                              </span>   {/** check end */}
                              <p className="name">[온라인전용] 멤버십_10% 할인 쿠폰</p>
                              <p className="content">
                                최소주문금액 : 10,000 원 이상
                                / 할인액(율) : 10% 
                                / 사용기간 :  ~ 2025-07-31
                                <br />최대할인금액 1,000,000 원
                              </p>    {/** content end */}
                            </li>

                            <li>
                              <span className="check">
                                <input type="radio" id="no_cpn" name="coupon" value="" />
                              </span>
                              <p className="name">사용안함</p>
                              <p className="content"></p>
                            </li>
                          </ul>   {/** coupon_list end */}
                        </td>
                      </tr>
                      {/** // 쿠폰사용 */}
                    </tbody>
                  </table>    {/** tbl_order end */}
    
                  <h3 className="title">주문자 입력</h3>
                  <table className="tbl_order">
                    <caption className="hidden">주문자 입력</caption>
                    <colgroup>
                      <col style={{ width: "18%" }} />
                      <col />
                    </colgroup>

                    <tbody>
                      <tr>
                        <th scope="row"><label htmlFor="order_buyer_name">주문하시는 분</label></th>
                        <td>
                          <input type="text" name="buyer_name" value="곽현지" id="order_buyer_name" className="form_input" />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><label htmlFor="buyer_phone">전화번호</label></th>
                        <td>
                          <input type="text" name="buyer_phone" id="buyer_phone" value="" className="form_input remove_dash" />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><label htmlFor="buyer_cell">휴대전화번호</label></th>
                        <td>
                          <input type="text" name="buyer_cell" id="buyer_cell" value="01094398468" className="form_input remove_dash" />
                          <input type="checkbox" name="sms" id="sms" value="Y" checked="" />
                          <label htmlFor="sms" className="msg">주문관련 SMS를 수신합니다.</label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><label htmlFor="order_buyer_email">이메일</label></th>
                        <td>
                          <input type="text" name="buyer_email" value="narimjoon@naver.com" id="order_buyer_email" className="form_input mail3" />
                        </td>
                      </tr>
                      {/** 주문서 - 회원주문일때, 회원정보 수정 링크 */}
                      <tr>
                        <td colSpan={2} className="edit">
                          회원정보가 변경되셨다면 다음 버튼을 누르고 수정해 주세요. 
                          <span className="box_btn small">
                            <a href="#">회원정보수정</a>
                          </span>   {/** box_btn small end */}
                        </td>   {/** edit end */}
                      </tr>
                      {/** //주문서 - 회원주문일때, 회원정보 수정 링크 */}
                    </tbody>
                  </table>

                  <div className="title_delivery">
                    <h3 className="title">배송지 정보</h3>
                    <label className="msg">
                      <input type="checkbox" name="save_addr" value="Y" /> 
                      현재 배송지 정보를 회원정보로 저장
                    </label>    {/** msg end */}
                  </div>    {/** title_delivery end */}

                  <table className="tbl_order">
                    <caption className="hidden">배송지 정보</caption>
                    <colgroup>
                      <col style={{ width: "18%" }} />
                      <col />
                    </colgroup>

                    <tbody>
                      <tr>
                        <th scope="row">기존 배송지</th>
                        <td>
                          <select name="old_addr_sel">
                            <option value="">새로운주소 입력</option>
                            <option value="곽현지&lt;wisamall&gt;&lt;wisamall&gt;01094398468&lt;wisamall&gt;08786&lt;wisamall&gt;서울특별시 관악구 청룡3길 10(봉천동)&lt;wisamall&gt;영빌딩 603호&lt;wisamall&gt;&lt;wisamall&gt;&lt;wisamall&gt;&lt;wisamall&gt;곽현지&lt;wisamall&gt;15760&lt;wisamall&gt;Y" selected="">[기본 배송지] 곽현지 : 서울특별시 관악구 청룡3길 10(봉천동) 영빌딩 603호</option>
                          </select>
                          <label className="msg">
                            <input type="checkbox" name="copy_info" /> 주문인 정보와 동일
                          </label>    {/** msg end */}
                        </td>
                      </tr>

                      <tr>
                        <th scope="row"><label htmlFor="order_addressee_name">받으시는 분</label></th>
                        <td>
                          <input type="text" name="addressee_name" value="" id="order_addressee_name" className="form_input" />
                        </td>
                      </tr>

                      <tr>
                        <th scope="row"><label htmlFor="addressee_phone">전화번호</label></th>
                        <td>
                          <input type="text" name="addressee_phone" id="addressee_phone" className="form_input remove_dash" />
                        </td>
                      </tr>

                      <tr>
                        <th scope="row"><label htmlFor="addressee_cell">휴대전화번호</label></th>
                        <td>
                          <input type="text" name="addressee_cell" id="addressee_cell" className="form_input remove_dash" />
                        </td>
                      </tr>

                      <tr>
                        <th scope="row"><label htmlFor="order_addressee_zip">주소</label></th>
                        <td className="address">
                          <p className="zip">
                            <input type="text" name="addressee_zip" value="" id="order_addressee_zip" className="form_input input_zipcode" />
                            <span className="box_btn white"><a href="#"> 우편번호 찾기</a></span>
                          </p>    {/** zip end */}
                          <p>
                            <input type="text" name="addressee_addr1" value="" className="form_input" />
                            <input type="text" name="addressee_addr2" value="" className="form_input" />
                          </p>
                        </td>   {/** address end */}
                      </tr>
        
                      <tr>
                        <th scope="row"><label htmlFor="order_dlv_memo">배송시요청사항</label></th>
                        <td>
                          <textarea type="text" name="dlv_memo" value="" id="order_dlv_memo" className="form_input block"></textarea>
                        </td>
                      </tr>
                      {/** ADDINFO_DONE */}
                    </tbody>
                  </table>
                </div>    {/** area_left end */}
              </div>    {/** ord_info end */}

              <div className="area_right">
                <div className="inner">
                  <div className="box">
                    <h3 className="title first">결제 정보</h3>
                    <table className="tbl_order2">
                      <caption className="hidden">결제 가격정보</caption>
                      <colgroup>
                        <col style={{ width: "60%" }} />
                        <col />
                      </colgroup>

                      <tbody>
                        <tr>
                          <th scope="row">상품합계 금액</th>
                          <td>7,110 원</td>
                        </tr>
                        <tr className="total">
                          <th scope="row">배송비 </th>
                          <td>
                            (+) <span id="delivery_prc2">3,000</span> 원
                          </td>
                        </tr>   {/** total end */}
                      </tbody>
                    </table>

                    <table className="tbl_order2 sale">
                      <caption className="hidden">결제 할인정보</caption>
                      <colgroup>
                        <col style={{ width: "50%" }} />
                        <col />
                      </colgroup>

                      <tbody>
                        <tr className="total order_area_total_sale_prc">
                          <th scope="row">
                            할인 금액 합계 <a className="i_info p_cursor"></a>
                          </th>
                          <td>
                            (-) <span className="total_sale_prc">0</span> 원
                            <div id="discount_info" className="view_info">
                              <div className="order_area_event_prc" style={{ display: "none" }}>
                                이벤트 할인금액<br />
                                <span className="order_saleinfo_event_prc">0</span> 원
                              </div>    {/** order_area_event_prc end */}
                              <div className="order_area_timesale">
                                타임세일금액<br />
                                <span className="order_saleinfo_timesale">0</span> 원
                              </div>    {/** order_area_timesale end */}
                              <div className="order_area_member_prc" style={{ display: "none" }}>
                                회원할인금액<br />
                                <span className="order_saleinfo_member_prc">0</span> 원
                              </div>    {/** order_area_member_prc end */}
                              <div className="order_area_cpn_prc">
                                쿠폰할인금액<br />
                                <span className="order_saleinfo_cpn_prc">1,000</span> 원
                              </div>    {/** order_area_cpn_prc end */}
                              <div className="order_area_prd_prc" style={{ display: "none" }}>
                                상품금액별할인금액<br />
                                <span className="order_saleinfo_prd_prc">0</span> 원
                              </div>    {/** order_area_prd_prc end */}
                              <div className="order_area_prdcpn_prc" style={{ display: "none" }}>
                                상품별쿠폰 할인금액<br />
                                <span className="order_saleinfo_prdcpn_prc">0</span> 원
                              </div>    {/** order_area_prdcpn_prc end */}
                              <div className="order_area_sbscr_prc" style={{ display: "none" }}>
                                정기배송 할인금액<br />
                                <span className="order_saleinfo_sbscr_prc">0</span> 원
                              </div>    {/** order_saleinfo_sbscr_prc end */}
                            </div>    {/** view_info end */}
                          </td>
                        </tr>   {/** total order_area_total_sale_prc end */}

                        <tr className="use_milage_field total_sale">
                          <th scope="row">적립금 사용</th>
                          <td>(-) <span className="use_milage_prc">0</span> 원</td>
                        </tr>
                        <tr className="use_emoney_field total_sale">
                          <th scope="row">예치금 사용</th>
                          <td>(-) <span className="use_emoney_prc">0</span> 원</td>
                        </tr>   {/** use_emoney_field total_sale end */}
                      </tbody>
                    </table>

                    <table className="tbl_order2">
                      <caption className="hidden">결제정보</caption>
                      <colgroup>
                        <col style={{ width: "60%" }} />
                        <col />
                      </colgroup>

                      <tbody>
                        <tr className="total order_area_total_milage">
                          <th scope="row">
                            총 적립금 <a className="i_info p_cursor"></a>
                          </th>
                          <td>
                            <span className="total_milage">158</span> 원
                            <div id="milage_info" className="view_info">
                              <div className="order_area_prd_milage">
                                상품 적립금<br />
                                <span className="order_saleinfo_prd_milage">0</span> 원
                              </div>    {/** order_area_prd_milage end */}
                              <div className="order_area_member_milage">
                                회원 적립금<br />
                                <span className="order_saleinfo_member_milage">158</span> 원
                              </div>    {/** order_area_member_milage end */}
                              <div className="order_area_event_milage">
                                이벤트 적립금<br />
                                <span className="order_saleinfo_event_milage">0</span> 원
                              </div>    {/** order_area_event_milage end */}
                            </div>    {/** view_info end */}
                          </td>
                        </tr>   {/** total order_area_total_milage end */}

                        <tr>
                          <th scope="row">총 결제 금액</th>
                          <td>
                            <strong className="total_price">
                              <span className="order_info_sale_prc">10,110</span> 원
                            </strong>   {/** total_price end */}
                          </td>
                        </tr>
                      </tbody>
                    </table>    {/** tbl_order2 end */}

                    <h3 className="title line">결제수단</h3>
                    <div className="method">
                      <div className="">
                        <label className="pay_label">
                          <input type="radio" name="pay_type" id="pay_type22" value="22" /> 
                          <img src="https://x175-engine.mywisa.com/wm_engine_SW/_engine/card.tosspayment/image/tosspayment.png" height={18} />
                        </label>    {/** pay_label end */}
                      </div>
                      <div className="">
                        <label className="pay_label">
                          <input type="radio" name="pay_type" id="pay_type17" value="17" /> 
                          <span id="payco_btn_area">
                            <img src="https://static-bill.nhnent.com//payco/checkout/img/v2/btn_type/EASYPAY_A1.png" width={103} height={14} style={{ width: "auto", verticalAlign: "middle" }} />
                          </span>
                        </label>	  {/** pay_label end */}
                      </div>
                      <p className="order_cancel_msg">
                        * 주문신청 후 <strong className="point_color">3</strong>
                        일 이내에 입금 확인이 되지 않으면 자동취소 됩니다.
                      </p>    {/** order_cancel_msg end */}
                      <div className="event_pay">
                        <h3>결제프로모션</h3>
                        <div className="field">
                          <p className="th">Toss Pay</p>
                          <p className="td">토스페이 결제 시 10% 추가할인<br />
                            (결제 전 토스 앱 &gt; 토스페이 &gt; 쿠폰/혜택 받기 &gt; 결제 시 적용)
                          </p>
                        </div>    {/** field end */}
                      </div>    {/** event_pay end */}
        
                      <div className="reconfirm">
                        <label>
                          <input name="reconfirm" id="reconfirm" type="checkbox" value="Y" /> 
                          결제정보를 확인하였으며,<br />구매진행에 동의합니다.
                        </label>
                      </div>    {/** reconfirm end */}
                      <div id="order1">
                        <span className="box_btn huge block"><a href="/orderOk">주문하기</a></span>
                      </div>    {/** order1 end */}
                    </div>    {/** method end */}

                    <div id="order2">
                      <p className="total_info">
                        총 결제 금액 
                        <strong>
                          <span className="order_info_sale_prc">29,000</span>
                        </strong>
                         원 결제를 합니다.
                      </p>    {/** total_info end */}
                      <p className="msg">&apos;결제하기&apos; 버튼을 누르면 결제창으로 연결됩니다.</p>
                      <span className="box_btn w150 large">
                        <input type="submit" value="결제하기" />
                      </span>   {/** box_btn w150 large end */}
                      <span className="box_btn w150 large white"><a href="#">취소</a></span>
                    </div>    {/** order2 end */}
                  </div>    {/** box end */}
                </div>    {/** inner end */}
              </div>    {/** area_right end */}

              <input type="hidden" name="total_order_price" value="45000" />
              <input type="hidden" name="event_total_prc" value="45000" /> {/** 이벤트할인 2006-05-18 */}
              <input type="hidden" name="member_total_prc" value="45000" /> {/** 회원할인 2006-05-18 */}
              <input type="hidden" name="usable_milage" value="2000" />
              <input type="hidden" name="delivery_prc" value="2500" /> {/** 배송비 2006-05-16 */}
              <input type="hidden" name="cart_where" value="" /> {/** 장바구니조건값 2006-05-16 */}
            </form>
          </div>    {/** order end */}
        </div>    {/** orderList_body end */}
      </div> {/** orderList_Content end */}
      <div className="orderList_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default OrderList;