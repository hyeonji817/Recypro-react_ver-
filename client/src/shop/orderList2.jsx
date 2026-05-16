import React, { useEffect, useState } from "react"; 
import { useSearchParamas, useNavigate } from "react-router-dom"; 
import "./orderList2.css";
import axios from "axios"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import PaymentModal from "../components/PaymentModal";
import beepBeep_Toy1 from "../assets/pet/1. beepBeep_Toy1.jpg";

const CDN = (path) => `http://localhost:5003/uploads/${String(path || "").replace(/^\.\//,'')}`;

const OrderList2 = () => {
  const [sp] = useSearchParams();
  const [items, setItems] = useState([]);
  const [tot, setTot] = useState(null);
  const [loading, setLoading] = useState(true);

  const [buyer, setBuyer] = useState({ name: "", phone: "", cell: "", email: "" });
  const [recv,  setRecv]  = useState({ name:"", phone:"", cell:"", zip:"", addr1:"", addr2:"" });
  const [coupon, setCoupon] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const USE_MOCK_PAY = true;    // <- 실제 PG 붙일 땐 false
  const [mockOpen, setMockOpen] = useState(false);
  const [prepared, setPrepared] = useState(null); // prepare 응답 저장

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

  // 1. 카카오 우편번호 스크립트 로드 
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

  // 2. Toss SDK 로드 
  useEffect(() => {
    if (document.getElementById("toss-payments-sdk")) return; 
    const s = document.createElement("script");
    s.id = "toss-payments-sdk";
    s.src = "https://js.tosspayments.com/v1";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // 3. 도로명/지번 + 건물명 등 추가 표기 조립 
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

  // 4. 우편번호 찾기 열기 
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
      // 팝업(기본). 바닥에 임베드하고 싶으면 아래처럼 사용:
      // width: '100%', height: '100%', onresize: (size) => {...}
    }).open();
  };

  // 5. 공통 onChange: buyer/recv/기타를 name으로 구분 
  const onInput = (e) => {
    const { name, value, type, checked } = e.target; 
    const v = type === "checkbox" ? checked : value; 

    // buyer.*
    if (name.startWith("buyer_") || name === "sms") {
      setBuyer((b) => ({
        ...b, 
        // sms 체크박스도 buyer에 넣고 싶다면: sms: name==="sms" ? v : b.sms
        [name.replace(/^buyer_/, "")]: v,     // buyer_name -> name 등 
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

  // 6. '주문인 정보와 동일' 체크 시 값 복사 
  const copyBuyerToRecv = (e) => {
    const checked = e.target.checked; 
    if (!checked) return; 
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
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "주문/결제 요청 실패");
    }
  };

  if (loading) return <div className="orderList_Wrapper">Loading...</div>;

  return (
    <div className="orderList2_Wrapper">
      <div className="orderList2_Header">
        <Header_loginOK />
      </div>     {/** orderList2_Header end */}

      <div className="orderList2_Content">
        <div className="orderList2_body">
          <h2 className="subtitle" id="subtitle">주문서</h2>      {/** subtitle end */}
          <div id="order">
            <form name="ordFrm" method="post" style={{ margin: "0px" }}>
              <div className="print_receipt">
                <span>※ 상품의 옵션 및 수량 변경은 상품상세 또는 장바구니에서 가능합니다.  </span>
                <span className="box_btn small"><a href="#"> 장바구니 가기</a></span>
                <span className="box_btn small white"><a href="#"> 견적서 출력</a></span>
              </div>     {/** print_receipt end */}

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

              

            </form>     {/** form end */}
          </div>      {/** order end */}  
        </div>     {/** orderList2_body end */}
      </div>    {/** orderList2_Content end */}

      <div className="orderList2_Footer">
        <Footer />
      </div>     {/** orderList2_Footer end */}
    </div>      /** orderList2_Wrapper end */
  );
};

export default OrderList2;