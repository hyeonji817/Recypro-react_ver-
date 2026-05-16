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


};

export default OrderList2;