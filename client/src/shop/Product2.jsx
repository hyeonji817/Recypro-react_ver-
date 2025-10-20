import "./Product2.css";
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

const Product2 = () => {
  const { productId } = useParams();		// 상품명 호출
	console.log("productId param = ", productId);
	console.log("[Product2] productId =", productId);
	const nav = useNavigate();
	const [product, setProduct] = useState(null);		// 불러들일 상품 데이터 
	const [loading, setLoading] = useState(true);		
	const [error, setError] = useState("");		
	const [selected, setSelected] = useState({});		// 객체로 선언
	const [selectedColor, setSelectedColor] = useState("");
	const [qty, setQty] = useState(1);		// 계산 상태, 수량
	const groups = React.useMemo(() => product?.optionGroups ?? [], [product]);		// Product2 컴포넌트 내부 
};

export default Product2;