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