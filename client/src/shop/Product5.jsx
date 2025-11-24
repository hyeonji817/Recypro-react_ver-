import "./Product5.css";
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

const Product5 = () => {
  const { productId } = useParams();		// 상품명 호출
	console.log("productId param = ", productId);
	console.log("[Product5] productId =", productId);
	const nav = useNavigate();
	const [product, setProduct] = useState(null);		// 불러들일 상품 데이터 
	const [loading, setLoading] = useState(true);		
	const [error, setError] = useState("");		
	const [selected, setSelected] = useState({});		// 객체로 선언
	const [selectedColor, setSelectedColor] = useState("");
	const [qty, setQty] = useState(1);		// 계산 상태, 수량
	const groups = React.useMemo(() => product?.optionGroups ?? [], [product]);		// Product5 컴포넌트 내부

	useEffect(() => {
		let mounted = true; 
		(async() => {
			try {
				// 라우터 페이지(Product_Food.js) 연동
				const res = await axios.get(`http://localhost:5003/api/product_pet/${encodeURIComponent(productId)}`, { withCredentials: true });
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

	// 필수 옵션이 모두 선택되었는지
	const requiredSatisfied = groups.every(
		g => !g.required || selected[g.name]
	);

	
};

export default Product5;