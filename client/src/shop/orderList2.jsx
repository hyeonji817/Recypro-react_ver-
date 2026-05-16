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
        const { data } = await axios.get("http://localhost:5101/api/checkout/preview", {
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
  }, [sp])
};

export default OrderList2;