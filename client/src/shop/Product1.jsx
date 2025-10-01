import "./Product1.css";
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


const Product1 = () => {
  const { productId } = useParams(); 		// 상품명 호출
	console.log("productId param = ", productId);
	console.log("[Product1] productId =", productId);
	const nav = useNavigate(); 
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true); 
	const [error, setError] = useState("");
	const [selected, setSelected] = useState({});		// 객체로 선언, optionGroups.map()에서 selected[group.name]을 접근하기 때문에, selected가 객체여야 동작함.
	const [selectedColor, setSelectedColor] = useState("");
	// 계산 상태
	const [qty, setQty] = useState(1);		// 수량 
	// Product1 컴포넌트 내부 (state 선언들 아래 아무 곳)
	const groups = React.useMemo(() => product?.optionGroups ?? [], [product]);

  
};

export default Product1;
