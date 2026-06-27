import React, { useEffect, useState } from "react"; 
import { useSearchParams, useNavigate } from "react-router-dom";
import "./orderList.css";
import axios from "axios"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import PaymentModal from "../components/PaymentModal";

const CDN = (path) => `http://localhost:5003/uploads/${String(path || "").replace(/^\.\//,'')}`;

const OrderList = () => {
  const [sp] = useSearchParams();
  const [items, setItems] = useState([]);
  const [tot, setTot] = useState(null);
  const [loading, setLoading] = useState(true);

  const [buyer, setBuyer] = useState({ name:"", phone:"", cell:"", email:"" });
  const [recv,  setRecv]  = useState({ name:"", phone:"", cell:"", zip:"", addr1:"", addr2:"" });
  const [coupon, setCoupon] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const USE_MOCK_PAY = true;    // <- 실제 PG 붙일 땐 false
  const [mockOpen, setMockOpen] = useState(false);
  const [prepared, setPrepared] = useState(null); // prepare 응답 저장
  const [availableCoupons, setAvailableCoupons] = useState([]);     // 쿠폰 

  const fetchPreview = async (nextCoupon = coupon, nextMileage = 0) => {
    const params = {};
  
    if (sp.get("all") === "1") params.all = "1";
    if (sp.get("cart_ids")) params.cart_ids = sp.get("cart_ids");
  
    if (nextCoupon) params.coupon_code = nextCoupon;
    if (nextMileage) params.use_mileage = nextMileage;
  
    const { data } = await axios.get("http://localhost:5003/api/checkout/preview", {
      params,
      withCredentials: true,
    });
  
    setItems(data.items || []);
    setTot(data.totals || {});
  };

  useEffect(() => {
    (async () => {
      try {
        const params = {};
        if (sp.get("all") === "1") params.all = 1;
        if (sp.get("cart_ids")) params.cart_ids = sp.get("cart_ids");
        const { data } = await axios.get("http://localhost:5003/api/checkout/preview", {
          params, withCredentials: true
        });
        setItems(data.items || []);
        setTot(data.totals || {});
      } catch (e) {
        console.error(e);
        alert(e?.response?.data?.message || "주문서 불러오기 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, [sp]);

  // 1) 카카오 우편번호 스크립트 로드
  useEffect(() => {
    // 이미 로드되어 있으면 패스
    if (document.getElementById("daum-postcode-script")) return;

    const script = document.createElement("script");
    script.id = "daum-postcode-script";
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 페이지 이동 시 굳이 제거 안 해도 되지만, 깔끔히 정리하고 싶다면:
      // document.getElementById("daum-postcode-script")?.remove();
    };
  }, []);

  // Toss SDK 로드
  useEffect(() => {
    if (document.getElementById("toss-payments-sdk")) return;
    const s = document.createElement("script");
    s.id = "toss-payments-sdk";
    s.src = "https://js.tosspayments.com/v1";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // 사용가능한 쿠폰 조회 
  useEffect(() => {
    if (!tot?.subtotal) return;
  
    const fetchAvailableCoupons = async () => {
      try {
        const { data } = await axios.get("http://localhost:5003/api/mpCoupon/available", {
          params: {
            subtotal: tot.subtotal,
          },
          withCredentials: true,
        });
  
        setAvailableCoupons(data.coupons || []);
      } catch (err) {
        console.error("[사용 가능 쿠폰 조회 실패]", err);
      }
    };
  
    fetchAvailableCoupons();
  }, [tot?.subtotal]);


  // 도로명/지번 + 건물명 등 추가 표기 조립
  const buildAddress = (data) => {
    let addr = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

    // 도로명 타입일 때 (법정동/건물명 추가)
    if (data.userSelectedType === "R") {
      let extras = [];
      if (data.bname && /[동|로|가]$/g.test(data.bname)) extras.push(data.bname);
      if (data.buildingName && data.apartment === "Y") extras.push(data.buildingName);
      if (extras.length > 0) addr += ` (${extras.join(", ")})`;
    }
    return addr;
  };

  // 우편번호 찾기 열기
  const openPostcode = (e) => {
    e?.preventDefault?.();
    if (!window.daum || !window.daum.Postcode) {
      alert("우편번호 스크립트를 아직 불러오는 중이에요. 잠시 후 다시 시도해 주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        const zonecode = data.zonecode;            // 5자리 우편번호
        const addr1 = buildAddress(data);          // 도로명/지번 주소(+추가표기)
        setRecv((r) => ({ ...r, zip: zonecode, addr1, addr2: r.addr2 || "" }));

        // 상세주소로 포커스 이동(사용자 편의)
        setTimeout(() => {
          const el = document.querySelector('input[name="addressee_addr2"]');
          el && el.focus();
        }, 0);
      },
    }).open();
  };

  // 공통 onChange: buyer/recv/기타를 name으로 구분
  const onInput = (e) => {
    const { name, value, type, checked } = e.target;
    const v = type === "checkbox" ? checked : value;

    // buyer.*
    if (name.startsWith("buyer_") || name === "sms") {
      setBuyer((b) => ({
        ...b,
        // sms 체크박스도 buyer에 넣고 싶다면: sms: name==="sms" ? v : b.sms
        [name.replace(/^buyer_/, "")]: v, // buyer_name -> name 등
      }));
      return;
    }

    // recv(배송지).*
    if (
      name === "addressee_name" ||
      name === "addressee_phone" ||
      name === "addressee_cell" ||
      name === "addressee_zip" ||
      name === "addressee_addr1" ||
      name === "addressee_addr2" ||
      name === "dlv_memo"
    ) {
      setRecv((r) => ({ ...r, [name.replace(/^addressee_/, "").replace("dlv_", "memo")]: v }));
      return;
    }

    // 동의 체크박스(reconfirm)는 기존 로직 유지
  };

  // “주문인 정보와 동일” 체크 시 값 복사
  const copyBuyerToRecv = (e) => {
    const checked = e.target.checked;
    if (!checked) return; // 체크 해제면 아무 것도 안 함
    setRecv((r) => ({
      ...r,
      name:  buyer.name  || "",
      phone: buyer.phone || "",
      cell:  buyer.cell  || "",
    }));
  };

  const submitOrder = async () => {
    try {
      // 1) 주문 준비(서버 금액 재계산 + PENDING 주문 생성)
      const payload = {
        all: sp.get("all")==="1" ? "1" : undefined,
        cart_ids: sp.get("cart_ids") || undefined,
        coupon_code: coupon || undefined,
        buyer,
        receiver: recv,
        pay_method: "TOSS",
        dlv_memo: recv.memo || ""
      };
      const { data } = await axios.post(
        "http://localhost:5003/api/checkout/prepare",
        payload,
        { withCredentials: true }
      );

      // 2) 모의 결제창 열기 
      setPrepared(data);
      setMockOpen(true);

      // data: { order_id, pg_order_uid, amount, orderName, successUrl, failUrl }

      /** if (USE_MOCK_PAY) {
         // 2-A) 모의 결제 승인
         const { data: ok } = await axios.post(
          "http://localhost:5003/api/checkout/confirm-mock",
          { orderId: data.pg_order_uid }, // 또는 { orderId: data.order_id, by: "db" }
          { withCredentials: true }
        );

        // 3) 주문완료로 이동 (state도 같이 넘겨서 즉시 표시, 새로고침 대비해 쿼리스트링도 첨부)
        navigate(`/orderOk?order_id=${data.order_id}`, {
          state: {
            order_id: data.order_id,
            order_no: ok.order_no,
            // 백엔드가 prepare 시점에 저장해둔 스냅샷을 그대로 쓰도록,
            // 아래 둘을 서버에서 prepare 응답에 포함시키거나, orderOK에서 재조회하게 둘 수 있음.
            totals: data.totals,  // prepare에서 함께 보냈다면
            items: data.items,    // prepare에서 함께 보냈다면
            buyer: payload.buyer
          },
          replace: true
        });
        return;
      }
  
      // 2) Toss 결제 요청(redirect 방식) (실제 결제)
      const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
      const tossPayments = window.TossPayments(clientKey);
  
      await tossPayments.requestPayment({
        method: "CARD", // 또는 "TOSS", "VIRTUAL_ACCOUNT" 등
        amount: data.amount,
        orderId: data.pg_order_uid,     // ★ PG용 주문 고유값
        orderName: data.orderName,      // 예) "리싸이프로 주문 3건"
        successUrl: data.successUrl,    // 예) http://localhost:5174/pay/success
        failUrl: data.failUrl,          // 예) http://localhost:5174/pay/fail
        customerEmail: buyer.email,
        customerName: buyer.name,
        customerMobilePhone: buyer.cell?.replaceAll("-", "") || "",
      }); */
  
      // redirect 방식이라 여기 이후 코드는 실행되지 않음.
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "주문/결제 요청 실패");
    }
  }; 

  if (loading) return <div className="orderList_Wrapper">Loading...</div>;

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
                <span className="box_btn small"><a href="/cart"> 장바구니 가기</a></span>
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
                  {items.length === 0 ? (
                    <tr><td colSpan={7} className="tac">주문할 상품이 없습니다.</td></tr>
                  ) : items.map(it => (
                    <tr key={it.cart_id}>
                      <td className="img">
                        <img src={CDN(it.filename)} width={52} height={70} />
                      </td>
                      <td className="tal">{it.pname}</td>
                      <td className="tal">{it.option_label || "-"}</td>
                      <td>{it.unit_price.toLocaleString()} 원</td>
                      <td>{it.quantity}</td>
                      <td>{it.line_total.toLocaleString()} 원</td>
                      <td>{it.mileage.toLocaleString()} 원</td>
                    </tr>
                  ))}
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
                          <input type="text" name="milage_prc" value="0" className="form_input tar" /> 
                          <p className="mileage">사용 가능 적립금 : <strong className="own_mileage">2,000</strong> 원</p>
                        </td>
                      </tr>
        
                      {/** 쿠폰사용 */}  
                      <tr>
                        <th scope="row">전체상품 쿠폰</th>
                        <td>
                        <ul className="coupon_list">
                          {availableCoupons.length === 0 ? (
                            <li>
                              <p className="name">사용 가능한 쿠폰이 없습니다.</p>
                              <p className="content"></p>
                            </li>
                          ) : (
                            availableCoupons.map((cp) => (
                              <li key={cp.user_coupon_id}>
                                <span className="check">
                                  <input
                                    type="radio"
                                    name="coupon"
                                    value={cp.coupon_code}
                                    disabled={!cp.usable}
                                    checked={coupon === cp.coupon_code}
                                    onChange={async (e) => {
                                      const nextCoupon = e.target.value;
                                      setCoupon(nextCoupon);

                                      try {
                                        await fetchPreview(nextCoupon, 0);
                                      } catch (err) {
                                        console.error("[쿠폰 적용 preview 실패]", err);
                                        alert(err?.response?.data?.message || "쿠폰 적용 실패");
                                      }
                                    }}
                                  />
                                </span>

                                <p className="name">{cp.coupon_name}</p>

                                <p className="content">
                                  최소주문금액 : {Number(cp.min_order_amount || 0).toLocaleString()} 원 이상
                                  {" / "}
                                  할인액(율) :{" "}
                                  {cp.discount_type === "PERCENT"
                                    ? `${cp.discount_value}%`
                                    : `${Number(cp.discount_value || 0).toLocaleString()}원`}
                                  {" / "}
                                  사용기간 : ~ {cp.expired_at || "무제한"}
                                  {cp.max_discount_amount ? (
                                    <>
                                      <br />
                                      최대할인금액 {Number(cp.max_discount_amount).toLocaleString()} 원
                                    </>
                                  ) : null}
                                  {!cp.usable ? (
                                    <>
                                      <br />
                                      최소주문금액 조건 미충족
                                    </>
                                  ) : null}
                                </p>
                              </li>
                            ))
                          )}

                            <li>
                              <span className="check">
                                <input
                                  type="radio"
                                  id="no_cpn"
                                  name="coupon"
                                  value=""
                                  checked={coupon === ""}
                                  onChange={async () => {
                                    setCoupon("");

                                    try {
                                      await fetchPreview("", 0);
                                    } catch (err) {
                                      console.error("[쿠폰 해제 preview 실패]", err);
                                      alert("쿠폰 해제 실패");
                                    }
                                  }}
                                />
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
                          <input 
                            type="text" 
                            name="buyer_name" 
                            value={buyer.name}
                            id="order_buyer_name" 
                            className="form_input" 
                            onChange={onInput}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><label htmlFor="buyer_phone">전화번호</label></th>
                        <td>
                          <input 
                            type="text" 
                            name="buyer_phone" 
                            id="buyer_phone" 
                            value={buyer.phone} 
                            className="form_input remove_dash" 
                            onChange={onInput}
                          />
                        </td>
                      </tr>
                      <tr className="phone_call">
                        <th scope="row"><label htmlFor="buyer_cell">휴대전화번호</label></th>
                        <td>
                          <input 
                            type="text" 
                            name="buyer_cell" 
                            id="buyer_cell" 
                            value={buyer.cell} 
                            className="form_input remove_dash" 
                            onChange={onInput}
                          />
                          <input 
                            type="checkbox" 
                            name="sms" 
                            id="sms" 
                            value="Y" 
                            onChange={onInput} 
                          />
                          <label htmlFor="sms" className="msg">주문관련 SMS를 수신합니다.</label>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><label htmlFor="order_buyer_email">이메일</label></th>
                        <td>
                          <input 
                            type="text" 
                            name="buyer_email" 
                            value={buyer.email} 
                            id="order_buyer_email" 
                            className="form_input mail3" 
                            onChange={onInput}
                          />
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
                        <td className="delivery_add">
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
                          <input 
                            type="text" 
                            name="addressee_name" 
                            value={recv.name} 
                            id="order_addressee_name" 
                            className="form_input" 
                            onChange={onInput}
                          />
                        </td>
                      </tr>

                      <tr>
                        <th scope="row"><label htmlFor="addressee_phone">전화번호</label></th>
                        <td>
                          <input 
                            type="text" 
                            name="addressee_phone" 
                            id="addressee_phone" 
                            className="form_input remove_dash" 
                            value={recv.phone}
                            onChange={onInput}
                          />
                        </td>
                      </tr>

                      <tr>
                        <th scope="row"><label htmlFor="addressee_cell">휴대전화번호</label></th>
                        <td>
                          <input 
                            type="text" 
                            name="addressee_cell" 
                            id="addressee_cell" 
                            className="form_input remove_dash" 
                            value={recv.cell}
                            onChange={onInput}
                          />
                        </td>
                      </tr>

                      <tr>
                        <th scope="row"><label htmlFor="order_addressee_zip">주소</label></th>
                        <td className="address">
                          <p className="zip">
                            <input 
                              type="text" 
                              name="addressee_zip" 
                              value={recv.zip} 
                              id="order_addressee_zip" 
                              className="form_input input_zipcode" 
                              onChange={onInput}
                            />
                            <span className="box_btn white">
                              <a href="#" className="address_num" onClick={openPostcode}><p>우편번호 찾기</p></a>
                            </span>
                          </p>    {/** zip end */}
                          <p>
                            <input 
                              type="text" 
                              name="addressee_addr1" 
                              value={recv.addr1} 
                              onChange={onInput}
                              className="form_input" 
                            />
                            <input 
                              type="text" 
                              name="addressee_addr2" 
                              value={recv.addr2} 
                              className="form_input" 
                              onChange={onInput}
                            />
                          </p>
                        </td>   {/** address end */}
                      </tr>
        
                      <tr>
                        <th scope="row"><label htmlFor="order_dlv_memo">배송시요청사항</label></th>
                        <td>
                          <textarea 
                            type="text" 
                            name="dlv_memo" 
                            value={recv.memo || ""} 
                            id="order_dlv_memo" 
                            className="form_input block" 
                            onChange={onInput}
                          />
                        </td>
                      </tr>
                      {/** ADDINFO_DONE */}
                    </tbody>
                  </table>
                </div>    {/** area_left end */}

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
                            <td>{(tot?.subtotal||0).toLocaleString()} 원</td>
                          </tr>
                          <tr className="total">
                            <th scope="row">배송비 </th>
                            <td>(+) {(tot?.shipping_fee||0).toLocaleString()} 원</td>
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
                              (-) <span className="total_sale_prc">{(tot?.discount_total||0).toLocaleString()}</span> 원
                              <div id="discount_info" className="view_info">
                                <div className="order_area_event_prc" style={{ display: "none" }}>
                                  이벤트 할인금액<br />
                                  <span className="order_saleinfo_event_prc">0</span> 원
                                </div>    
                                <div className="order_area_timesale">
                                  타임세일금액<br />
                                  <span className="order_saleinfo_timesale">0</span> 원
                                </div>    
                                <div className="order_area_member_prc" style={{ display: "none" }}>
                                  회원할인금액<br />
                                  <span className="order_saleinfo_member_prc">0</span> 원
                                </div>    
                                <div className="order_area_cpn_prc">
                                  쿠폰할인금액<br />
                                  <span className="order_saleinfo_cpn_prc">1,000</span> 원
                                </div>    
                                <div className="order_area_prd_prc" style={{ display: "none" }}>
                                  상품금액별할인금액<br />
                                  <span className="order_saleinfo_prd_prc">0</span> 원
                                </div>   
                                <div className="order_area_prdcpn_prc" style={{ display: "none" }}>
                                  상품별쿠폰 할인금액<br />
                                  <span className="order_saleinfo_prdcpn_prc">0</span> 원
                                </div>    
                                <div className="order_area_sbscr_prc" style={{ display: "none" }}>
                                  정기배송 할인금액<br />
                                  <span className="order_saleinfo_sbscr_prc">0</span> 원
                                </div>    
                              </div>  
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
                              <span className="total_milage">{(tot?.total_mileage||0).toLocaleString()}</span> 원
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
                                <span className="order_info_sale_prc">{(tot?.total_pay||0).toLocaleString()}</span> 원
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
                              (결제 전 토스 앱 &gt; 토스페이 &gt; 쿠폰/혜택 받기 <br /> &gt; 결제 시 적용)
                            </p>
                          </div>    {/** field end */}
                        </div>    {/** event_pay end */}
        
                        <div className="reconfirm">
                          <label>
                            <input 
                              name="reconfirm" 
                              id="reconfirm" 
                              type="checkbox" 
                              value="Y" checked={agreed}
                              onChange={
                                (e)=>setAgreed(e.target.checked)
                              } 
                            /> 
                            결제정보를 확인하였으며,<br />구매진행에 동의합니다.
                          </label>
                        </div>    {/** reconfirm end */}

                      {/* 주문 버튼 (동의 전) */}
                      <div id="order1" className={agreed ? "" : "disabled"}>
                        <span className="box_btn huge block">
                          <button
                            type="button"
                            className="order_submit_btn"
                            onClick={() => {
                              if (!agreed) {
                                alert("결제정보 확인 및 구매진행 동의를 체크해 주세요.");
                                return;
                              }
                              submitOrder();
                            }}
                          >
                            주문하기
                          </button>
                        </span>
                      </div>
                    </div>    {/** method end */}

                    {/* 동의 후 결제 안내 + 결제 버튼 */}
                      {agreed && (
                        <div id="order2" className="show">
                          <p className="total_info">총 결제 금액 <br />
                            <strong>
                              <span className="order_info_sale_prc">{(tot?.total_pay||0).toLocaleString()}</span>
                            </strong> 원 결제를 합니다.
                          </p>
                          <p className="msg">‘결제하기’ 버튼을 누르면 <br /> 결제창으로 연결됩니다.</p>
                          <span className="box_btn w150 large">
                            <input type="button" value="결제하기" onClick={submitOrder} />
                          </span>
                        </div>
                      )}
                    </div>    {/** box end */}
                  </div>    {/** inner end */}
                </div>    {/** area_right end */}
              </div>    {/** ord_info end */}

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

      {/* ✅ 결제 모달 바인딩은 이 아래에 */}
      <PaymentModal
        open={mockOpen}
        amount={prepared?.amount || tot?.total_pay || 0}
        orderName={prepared?.orderName || "주문 결제"}
        buyer={buyer}
        onClose={() => setMockOpen(false)}
        onSuccess={async () => {
          try {
            // 모의 승인 → PAID 전환
            const { data: ok } = await axios.post(
              "http://localhost:5003/api/checkout/confirm-mock",
              { orderId: prepared.pg_order_uid },
              { withCredentials: true }
            );

            // 주문완료 페이지 이동
            navigate(`/orderOk?order_id=${prepared.order_id}`, {
              state: {
                order_id: prepared.order_id,
                order_no: ok.order_no,
                totals: prepared.totals,
                items: prepared.items,
                buyer,
              },
              replace: true,
            });
          } catch (e) {
            console.error(e);
            alert(e?.response?.data?.message || "모의 결제 승인 실패");
          }
        }}
        onFail={(e) => {
          console.error(e);
          alert("결제를 진행할 수 없습니다.");
        }}
      />
    </div>
  );
};

export default OrderList;