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
};

export default Product6;