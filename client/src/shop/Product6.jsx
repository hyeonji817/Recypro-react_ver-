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
        const res = await axios.get(`http://localhost:5001/api/product_office/${encodeURIComponent(productId)}`, { withCredentials: true });
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
    const optionPayload = {
      ...selected,
      ...(selectedColor ? { color: selectedColor } : {})
    };

    // 선택한 옵션 라벨을 "색상: 핑크 / 종류: 라지" 형태로 표시 
    const selectedLabel = groups
    .map(g => {
      const val = (g.values || []).find(v => v.value === selected[g.name]);
      return val ? `${g.displayName || g.name}: ${val.label}` : null;
    })
    .filter(Boolean)
    .join(" / ");

    
  };
};

export default Product6;