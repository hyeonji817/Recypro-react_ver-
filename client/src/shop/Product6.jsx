import "./Product6.css";
import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import axios from "axios";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import CouponBanner from "../assets/coupon_banner.jpg";

// Swiper 스타일 (필수)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Product6 = () => {
  const { productId } = useParams();    // 상품명 호출 
  const nav = useNavigate();
  const [product, setProduct] = useState(null);   // 불러들일 상품 데이터를 보관하는 상태 보관소 
  const [loading, setLoading] = useState(true);   // 로딩상태 
  const [error, setError] = useState("");         // 에러 
  const [selected, setSelected] = useState({});   // 선택항목 관련 데이터를 보관하는 상태 보관소 
  const [selectedColor, setSelectedColor] = useState("");     // 선택할 종류 및 색상
  const [qty, setQty] = useState(1);        // 계산상태, 수량 
  const groups = React.useMemo(() => product?.optionGroups ?? [], [product]);   
  console.log("productId param = ", productId);
  console.log("[Product6] productId = ", productId);

  useEffect(() => {
    let mounted = true; 
    (async() => {
      try {
        // 라우터 페이지(Product_Office.js) 연동 
        const res = await axios.get(`http://localhost:5003/api/product_office/${encodeURIComponent(productId)}`, { withCredentials: true });
        if (mounted) setProduct(res.data);
      } catch (err) {
        console.error(err);
        if (mounted) setError("상품 정보를 불러오지 못했습니다.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; }
  }, [productId]);

  // 현재 옵션들로부터 추가요금 합계 
  const optionDelta = React.useMemo(() => {
    return groups.reduce((sum, g) => {
      const selVal = selected[g.name];
      const found = (g.values || []).find(v => v.value === selVal);
      return sum + (found?.priceDelta || 0);
    }, 0);
  }, [selected, groups]);

  // 필수 옵션이 모두 선택되었는지 여부를 체크하는 함수 구현 
  const requiredSatisfied = groups.every(
    g => !g.required || selected[g.name]
  );

  // 선택한 옵션 라벨을 "색상 : OO / 종류 : OO" 형태로 표시 
  const selectedLabel = groups
  .map(g => {
    const val = (g.values || []).find(v => v.value === selected[g.name]);
    return val ? `${g.displayName || g.name}: ${val.label}` : null;
  })
  .filter(Boolean)
  .join(" / ");

  // 장바구니 페이지 이동 
  const handleAddToCart = async () => {
    if (!requiredSatisfied) {
      alert("필수 옵션을 모두 선택해 주세요.");
      return;
    }

    // 옵션 라벨(기존 계산한 selectedLabel + 색상 콤보)
    const colorPart = selectedColor ? (selectedLabel ? ` / 색상: ${selectedColor}` : `색상: ${selectedColor}`) : "";
    const optionLabel = `${selectedLabel || ""}${colorPart}`.trim();

    // 옵션 JSON (선택 목록 + 단일 색상까지 포함)
    const optionsPayload = {
      ...selected,
      ...(selectedColor ? { color: selectedColor } : {})
    };

    const payload = {
			productTable: "product_office",
			productId,
			qty,
			options: optionsPayload,
			optionLabel: optionLabel || null,
			unitPrice,                   // (할인가 또는 정상가) + 옵션가
			optionDelta: optionDelta || 0,
			totalPrice,                  // unitPrice * qty
			mileage: Math.floor((unitBase || 0) * 0.05)  // 적립금 계산(할인가 기준 5%)
		};

    try {
			await axios.post("http://localhost:5003/api/cart", payload, { withCredentials: true });
			// 장바구니 페이지로 이동
			nav("/cart");
		} catch (e) {
			console.error(e);
			if (e?.response?.status === 401) {
				alert("로그인이 필요합니다.");
				nav("/account/login");
				return;
			}
			alert("장바구니 담기 중 오류가 발생했습니다.");
		}
  };

  // 문자열, JSON 문자열, 배열 어떤 형태여도 배열로 정규화 
  const toArray = (v) => {
    if (Array.isArray(v)) return v; 
    if (v == null) return [];
    if (typeof v === "string") {
      try {
        // JSON 문자열일 경우 
        const parsed = JSON.parse(v);
        return Array.isArray(parsed) ? parsed : [v.trim()];
      } catch {
        // 그냥 콤마/슬래시 구분 문자열 등 
        return v.split(/[,|/]+/).map(s => s.trim()).filter(Boolean);
      }
    }
    // 객체 등 기타 타입은 문자열화 
    return [String(v)];
  };

  if (loading) return <div className="Product_wrap">Loading...</div>;
  if (error) return <div className="Product_wrap">{error}</div>;
  if (!product) return null;
	if (!productId) return <div className="Product_wrap">잘못된 페이지입니다.(상품 ID 없음)</div>;

  const {
    pname, price, discount_price, discount_rate,
    description, manufacturer, numberOfstock, category, filename, mileage, img_Desc,
		selectColor, productCount,
  } = product;

	// 단가(할인가 우선) + 옵션가 
	const unitBase = Number(discount_price || price || 0);
	const unitPrice = Math.max(0, unitBase + optionDelta);
	const totalPrice = unitPrice * qty;

  // selectColor 파싱 
  let colorOptions = [];
  try {
    if (selectColor) {
      // JSON 형식 우선 
      if (selectColor.trim().startsWith("{")) {
        const obj = JSON.parse(selectColor);
        colorOptions = Array.isArray(obj.color) ? obj.color : [];
      } else {
        // CSV 형식 
        colorOptions = selectColor.split(",").map(s => s.trim()).filter(Boolean);
      }
    }
  } catch (e) {
    console.warn("selectColor parse error:", e);
  }

  // 업로드 경로 통일: DB에는 "life/xxx.jpg" 저장했다고 가정
  const mainImg = `http://localhost:5003/uploads/${String(filename).replace(/^\.\//,'')}`;
	const DescImg = `http://localhost:5003/uploads/${String(img_Desc).replace(/^\.\//,'')}`;

  return (
    <div className="Product_wrap">
      <div className="Product_Header">
        <Header_loginOK />  
      </div>    {/** Product_Header end */}

      <div className="Product_body">
        <div className="detailPd_body">
          <div id="detail">
            <div className="detail_top_wrap">
              {/** 상품 이미지 */}
              <div className="prdimg">
                <div id="addimg" className="addimg">
									<div className="add_img">
										<img src={mainImg} alt={pname} />
									</div>

				          <div className="detail_info">
										<div className="img_wrapper" style={{ textAlign: "center" }}>
											<img src={DescImg} />
										</div>
										<div style={{ textAlign: "center" }}><br /></div>
									</div>  
			          </div>   {/** addimg end */}

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
              </div>      {/** prdimg end */} 

              {/** 상품 이미지 */}
              <div className="info_scroll">
                <form name="prdFrm" method="post" style={{ margin: "0px" }} acceptCharset="utf-8">
                  <div className="wrap_prd">
                    <div className="info">
                      <h3 className="name">{pname}</h3>
					            <p className="summary">{manufacturer} · {category}</p>
					            <div className="price">
                        <div className="top_price">
							            <span className="consumer consumerY">{price?.toLocaleString()} 원</span>
							            <span className="sell sellY">
								            <strong>{discount_price?.toLocaleString()}</strong>
							            </span>   {/** sell sellY end */}
						            </div>    {/** top_price end */}
						            <span className="discount discountY">
							            <strong>{discount_price?.toLocaleString()}</strong>
						            </span>   {/** discount discountY end */}
							          <span className="per">{discount_rate}%</span>
                      </div>   {/** price end */}

                      {/** 상품옵션리스트 */}
											{/* 옵션 예시 - 필요 시 DB에 옵션 컬럼/테이블 추가 */}
                      <div className="opt_list">
                        <div className="th">수량</div>
                        <div className="td">
                          <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
														{Array.from({ length: Math.min(10, numberOfstock || 1) }, 
														(_, i) => i + 1).map(v => (
															<option key={v} value={v}>{v}</option>
														))}
													</select>
                        </div>    {/** td end */}
                      </div>    {/** opt_list end */}

                      {/* 상품옵션리스트 */}
											{colorOptions.length > 0 && (
												<div className="opt_list">
													<div className="th">종류</div>
													<div className="td">
														<select
															name="option1"
															className="wing_multi_option pno4844 necessary_Y"
															value={selectColor}
															onChange={(e) => setSelectedColor(e.target.value)}
														>
															<option value="">::색상::</option>
																{colorOptions.map((c) => (
																	<option key={c} value={c}>{c}</option>
																))}
														</select>
													</div>
												</div>
											)}

                      {/** optionGroups가 있을 때만 노출 */}
											{(product.optionGroups ?? []).map(group => (
												<div className="opt_list" key={group.id}>
													<div className="th">{group.displayName || group.name}</div>
													<div className="td">
													<select
        										value={selected[group.name] || ""}
        										onChange={(e)=> setSelected(prev => ({ ...prev, [group.name]: e.target.value }))}
      										>
        										<option value="">
          										{group.required ? '선택하세요' : '선택 (옵션 없음 가능)'}
        										</option>
        										{group.values.map(v => (
          									<option key={v.id} value={v.value}>
            									{v.label}{v.priceDelta ? ` (+${v.priceDelta.toLocaleString()}원)` : ""}
          									</option>
        										))}
      											</select>
    											</div>
												</div>
											))}   

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
														{Math.floor((discount_price || 0) * 0.05).toLocaleString()} 원
									            {/** 800 원 */}
									            <div className="box_info">
										            <div className="info">
																	회원적립금 : {mileage} 원 <br />
											            {/** 회원적립금 : 315 원 */}<br />
										            </div>    {/** info end */}
									            </div>    {/** box_info end */}
								            </td>
							            </tr>
						            </tbody>
					            </table>      {/** list end */}

                      <div className="multi_opt">
                        <ul id="detail_multi_option" className="selected_list">
    											{requiredSatisfied ? (
      											<li className="selected_item" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        											<div className="sel_name" style={{ flex: 1 }}>
          											{pname}{selectedLabel ? ` (${selectedLabel})` : ""}
        											</div>

        											{/* 수량 컨트롤(선택박스와 연동) */}
        												<div className="sel_ctrl" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          												<button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
          												<input readOnly value={qty} style={{ width: 36, textAlign: "center" }} />
          												<button
            												type="button"
            												onClick={() => setQty(q => Math.min((numberOfstock || 99), q + 1))}
          												>+</button>
        												</div>
      											</li>
    													) : (
      											<li className="selected_item empty">필수 옵션을 모두 선택해 주세요.</li>
    											)}
  											</ul>    

                        <div className="opt_total">
    											<span className="title">총 상품금액(수량) : </span>
    												<strong>
      												<span id="detail_multi_option_prc">{totalPrice.toLocaleString()}</span> KRW
      											<span className="ea_total"> ({requiredSatisfied ? qty : 0}개)</span>
    											</strong>
  											</div>    {/** opt_total end */}
                      </div>     {/** multi_opt end */}

                      {/** 버튼 */}
					            {/** ★★★★ 모듈 ★★★★ */}
					            <div className="btn">
						            <span className="box_btn large buy block">
                          <a href="/orderList" onClick={(e)=>{ e.preventDefault(); alert("바로구매(추후연결)"); }}>BUY NOW</a>
                        </span>   {/** box_btn large buy block end */}
						            <span className="box_btn large cart block">
                          <a href="/cart" onClick={(e)=>{ e.preventDefault(); handleAddToCart(); }}>ADD TO BAG</a>
                        </span>   {/** box_btn large cart block end */}
						          </div>    {/** btn end */}
					            <div></div>

                      <div className="app_link">
                        <a href="#">
                          <img src={CouponBanner} border={0} />
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
                    </div>    {/** info end */}
                    {/** //상품정보 & 버튼 */}
                  </div>      {/** wrap_prd end */}  
                  <input type="hidden" name="opt_no" value="2" />
                </form>  
              </div>   {/** info_scroll end */}
            </div>   {/** detail_top_wrap end */}
          </div>     {/** detail end */}  
        </div>   {/** detailPd_body end */}  
      </div>      {/** Product_body end */}

      <div className="Product_Footer">
        <Footer />  
      </div>    {/** Product_Footer end */}
    </div>      /** Product_wrap end */
  );
};

export default Product6;