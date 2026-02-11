import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import axios from "axios";
import cart_del from "../assets/cart_del.png"; 
import cart_wish from "../assets/cart_wish.png";

const CDN = (path) => `http://localhost:5003/uploads/${String(path || "").replace(/^\.\//,'')}`;

const Cart = () => {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate(); 
	const totalQty = rows.reduce((s, r) => s + (r.cart_quantity || 0), 0);
	const totalPay = rows.reduce((s, r) => s + (r.total_price || 0), 0);
	const totalMileage = rows.reduce((s, r) => s + (r.mileage || 0), 0);
	const [checked, setChecked] = useState({});
	
	const toggle = (id) => setChecked(prev => ({...prev, [id]: !prev[id]}));
	const goOrderAll = () => navigate("/orderList?all=1");
	const goOrderSelected = () => {
		const ids = Object.entries(checked).filter(([,v])=>v).map(([id])=>id);
		if (ids.length === 0) return alert("선택된 상품이 없습니다.");
		navigate(`/orderList?cart_ids=${ids.join(",")}`);
	};

	const handleOrderSelected = () => {
		const selectedIds = rows.filter(r => r.checked).map(r => r.cart_id);
		if (!selectedIds.length) return alert("선택된 상품이 없습니다.");
		navigate(`/order2?ids=${selectedIds.join(",")}`);
	};

	// 장바구니 조회
	const fetchCart = async () => {
		try {
			const { data } = await axios.get("http://localhost:5003/api/cart", { withCredentials: true });
      setRows(data || []);
		} catch (e) {
			console.error(e);
      alert(e?.response?.data?.message || "장바구니 조회 중 오류");
		} finally {
			setLoading(false);
		}
	};

	// 수량변경 이벤트 기능 
	const updateQty = async (row, nextQty) => {
    if (nextQty < 1) return;
    try {
      await axios.put(`http://localhost:5003/api/cart/${row.cart_id}/qty`,
        { qty: nextQty, unitPrice: row.unit_price },
        { withCredentials: true }
      );
      fetchCart();
    } catch (e) {
      console.error(e);
      alert("수량 변경 실패");
    }
  };

  return (
    <div className="cart_wrap">
      <div className="cart_Header">
        <Header_loginOK />
      </div>
      <div id="cart_Content">    {/** 구 id명 : cnt */}
		    <div className="cart_body">   {/** 구 클래스명 : cntbody */}
		      {/** 서브 타이틀 텍스트(일반페이지) 사용자코드 */}
          <h2 className="subtitle">SHOPPING CART</h2>
		        {/** //서브 타이틀 텍스트(일반페이지) 사용자코드 */}
		        {/** 서브 타이틀 텍스트(게시판) 사용자코드 */}
		        {/** //서브 타이틀 텍스트(게시판) 사용자코드 */}
		        {/** 마이페이지 메뉴 */}
		        {/** //마이페이지 메뉴 */}
            <div id="cart">
	            <form name="cartFrm" method="post" target="hidden1750057345" style={{ margin: 0 }}>
			          <input type="hidden" name="exec_file" value="" />
			          <input type="hidden" name="exec" value="" />
			          <input type="hidden" name="is_quickcart" value="" />
		            <ul className="cart_step tar">
			            <li className="first"><span>01.</span> 장바구니</li>
			            <li>02</li>
			            <li>03</li>
		            </ul>
	
                <table className="cart_tbl_col prd">
	                <caption className="hidden">장바구니</caption>
	                <colgroup>
		                <col style={{ width: "5%" }} />
		                <col style={{ width: "12%" }} />
		                <col />
		                <col style={{ width: "12%" }} />
		                <col style={{ width: "9%" }} />
		                <col style={{ width: "10%" }} />
		                <col style={{ width: "9%" }} />
		                <col style={{ width: "9%" }} />
		                <col style={{ width: "9%" }} />
	                </colgroup>

	                <thead>
		                <tr>
			                <th scope="col"></th>
			                <th scope="col" colSpan={2}>PRODUCT</th>
			                <th scope="col">PRICE</th>
			                <th scope="col">QTY</th>
			                <th scope="col">ADD PRICE</th>
			                <th scope="col">TOTAL PRICE</th>
			                <th scope="col">MILEAGE</th>
			                <th scope="col">WISH / DEL</th>
		                </tr>
	                </thead>

	                <tbody>
		                <tr>
										<td>
											<input type="checkbox" name="cno[]" id="cno" value="858892" className="con_858892" />
										</td>
										<td>
											<a href="#">
												<img src={beepBeep_Toy1} width={75} height={100} border={0} />
												{/** <img src="https://rolarola.wisacdn.com/_data/product/202503/19/decd0b2b8a2a1feb7a436ca0c942e65d.jpg" width={75} height={100} border={0} /> */}
											</a>
										</td>
										<td className="tal">
											<div className="cart_name"><a href="#">[지구pick] 바잇미 업사이클 봉봉그린 반려동물 삑삑이 장난감</a></div>
											<div className="cart_opt">
					 							종류 : 토끼<br /> <div></div>
											</div>
										</td>
										<td className="tac">7,900 원</td>
										<td className="qty">
										<div className="box_qty">
											<input type="text" name="buy_ea[]" value="1" id="buy_ea858892" className="form_input" />
											<div className="btn_ea left">
												<a href="#" className="ea_down"></a>
											</div>
											<div className="btn_ea right">
												<a href="#" className="ea_up"></a>
											</div>
										</div>
										<p className="btn_edit"><a href="#">변경</a></p>
									</td>
									<td>0 원</td>
									<td className="cart_prc is_sale">
										<p className="before">7,900 원</p>
										<p className="after">7,110 원</p>
									</td>
									<td>158 원</td>
									<td className="delete_wish">
										<a href="#">
											<img src="https://www.rolarola.com/_skin/rolarola_250716/img/shop/cart_del.png" alt="삭제" />
										</a>
										<a href="#" className="wish_">
											<img src="https://www.rolarola.com/_skin/rolarola_250716/img/shop/cart_wish.png" alt="관심상품" />
										</a>
									</td>
			                {/** <td colSpan={9} className="empty">장바구니가 비었습니다.</td> */}
		                </tr>
	                </tbody>
                </table>

								<div className="area_right">
									<div className="box">
										<table className="tbl_order2">
											<caption className="hidden">총 주문 가격</caption>
											<colgroup>
												<col style={{ width: "50%" }} />
												<col />
											</colgroup>
			
											<tbody>
												<tr>
													<th scope="row">주문수량 합계:</th>
													<td><span className="total_prd_prc">7,900</span> 원</td>
												</tr>
												<tr>
													<th scope="row">배송비:</th>
													<td>
														<span id="dlv_prc_cart" className="dlv_prc_cart">0</span> 원	
													</td>
												</tr>
												<tr>
													<th scope="row">적립금:</th>
													<td><span className="total_total_milage">158</span> 원</td>
												</tr>
												<tr>
													<th scope="row" className="total">총 결제금액:</th>
													<td className="total">
														<strong>
															<span id="total_order_price_cartlist" className="price total_order_price_cartlist">
																7,110
															</span> 원 
														</strong>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
		
		            {/** 장바구니 버튼 */}
		          <div className="area_left">
			          <div className="btn">
				          <div className="left_btn">
					          <span className="box_btn w150 gray3">
                      <a href="#">선택 삭제</a>
                    </span>
					          <span className="box_btn w150 gray3">
                      <a href="#">장바구니 비우기</a>
                    </span>
					          <span className="box_btn w150 gray3">
                      <a href="#">견적서출력</a>
                    </span>
				          </div>

				          <div className="right_btn">
					          <span className="box_btn w150 gray3">
                      <a href="#">쇼핑 계속하기</a>
                    </span>
					          <span className="box_btn w150 gray3">
                      <a href="#">선택상품 주문하기</a>
                    </span>
					          <span className="box_btn w150 gray3">
                      <a href="#">전체상품 주문하기</a>
                    </span>
				          </div>
			          </div>  {/** btn(구) end */}

			          <div className="msg_box">
				          <h4>SHOPPING GUIDE</h4>
				          <dl className="msg">
					          <dd>- 배송비는 3만원이상 무료배송 적용 됩니다.</dd>
					          <dd>- 상품 쿠폰 및 적립금 사용은 [주문서 작성/결제]에서 적용됩니다.</dd>
					          <dd>- 장바구니는 접속 종료 후 장바구니는 회원에 한해 7일(168시간)동안 보관됩니다.시간만 보관됩니다. 더 오래 보관 하시려면 관심상품에 담아주세요</dd>
				          </dl>
			          </div>
		          </div>

		          {/** //장바구니 버튼 */}
		          <div className="pay">
			          <div>
		              <div id="naver_checkout_buttons">
		                <div id="NC_ID_1750057343580394" className="npay_storebtn_bx npay_type_A_1">	
                      <div id="NPAY_BUTTON_BOX_ID" className="npay_button_box ">		
                        <div className="npay_button">			
                          <div className="npay_text">
                            <span className="npay_blind">NAVER 네이버 ID로 간편구매 네이버페이</span>
                          </div>				
                          <table className="npay_btn_list" cellSpacing={0} cellPadding={0}>
                            <tbody>
                              <tr>    
                                <td className="npay_btn_item">        
                                  <a id="NPAY_BUY_LINK_IDNC_ID_1750057343580394" href="#" className="npay_btn_link npay_btn_pay btn_gray" style={{ boxSizing : "content-box" }} title="새창">
                                    <span className="npay_blind">네이버페이 구매하기</span
                                  ></a>    
                                </td>
                              </tr>
                            </tbody>
                          </table>		
                        </div>		
                        
                        <div id="NPAY_EVENT_ID" className="npay_event">			
                          <a id="NPAY_PROMOTION_PREV_IDNC_ID_1750057343580394" href="#" className="npay_more npay_more_prev">
                            <span className="npay_blind">이전</span>
                          </a>			
                          <p id="NPAY_PROMOTION_IDNC_ID_1750057343580394" className="npay_event_text">
                            <strong className="event_title">Npay 10주년</strong>
                            <a className="event_link" href="#" target="_blank" title="새창">
                              AI가 들려주는 당신만의 소비일기 감상해보세요
                            </a>
                          </p>			
                          <a id="NPAY_PROMOTION_NEXT_IDNC_ID_1750057343580394" href="#" className="npay_more npay_more_next">
                            <span className="npay_blind">다음</span>
                          </a>		
                        </div>	
                      </div>
                    </div>
		              </div>
		            </div>
			          <div></div>
		          </div>

	            <input type="hidden" name="cart_rows" value="0" />
              <input type="hidden" id="partner_data" name="partner_data" value="" />
            </form>
          </div>{/** mkt script '모비온' scr_cart start */}
          {/** Enliple Tracker Start */}
		    </div>
	    </div>
      <div className="cart_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;