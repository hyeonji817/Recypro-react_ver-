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

  useEffect(() => {
		let mounted = true; 
		(async () => {
			try {
				// 라우터 페이지(Product_Bath.js) 연동 
				const res = await axios.get(`http://localhost:5001/api/product_bath/${encodeURIComponent(productId)}`, { withCredentials: true });
				console.log(res.data);	
				if (mounted) setProduct(prev => ({ ...res.data, optionGroups: res.data?.optionGroups ?? [] }));
			} catch (err) {
				console.error(err);
				if (mounted) setError("상품 정보를 불러오지 못했습니다.");
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => { mounted = false; };
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

	// 선택한 옵션 라벨을 "색상 : OO / 종류 : OO" 형태로 표시 
	const selectedLabel = groups 
	.map(g => {
		const val = (g.values || []).find(v => v.value === selected[g.name]);
		return val ? `${g.displayName || g.name}: ${val.label}` : null;
	})
	.filter(Boolean)
	.join(" / ");

	// 장바구니 페이지 이동 (2025.10.07 신규추가) (장바구니 페이지로 이동하면서 해당 이동하려는 페이지에 데이터값 전달)
	const handleAddToCart = async () => {
		if (!requiredSatisfied) {
			alert("필수 옵션을 모두 선택해 주세요.");
			return;
		}

		// 옵션 라벨(기존 계산한 selectedLabel + 색상 콤보)
		const colorPart = selectedColor ? (selectedLabel ? ` / 색상: ${selectedColor}` : `색상: ${selectedColor}`) : "";
  	const optionLabel = `${selectedLabel || ""}${colorPart}`.trim();

		// 옵션 JSON (선택 목록 + 단일 색상까지 포함)
		const optionsPayload = {
			...selected,
			...(selectedColor ? { color: selectedColor } : {})
		};

		const payload = {
			productTable: "product_bath",
			productId,
			qty,
			options: optionsPayload,
			optionLabel: optionLabel || null,
			unitPrice,                   // (할인가 또는 정상가) + 옵션가
			optionDelta: optionDelta || 0,
			totalPrice,                  // unitPrice * qty
			mileage: Math.floor((unitBase || 0) * 0.05)  // 적립금 계산(할인가 기준 5%)
		};

		try {
			await axios.post("http://localhost:5001/api/cart", payload, { withCredentials: true });
			// 장바구니 페이지로 이동
			nav("/cart");
		} catch (e) {
			console.error(e);
			if (e?.response?.status === 401) {
				alert("로그인이 필요합니다.");
				nav("/account/login");
				return;
			}
			alert("장바구니 담기 중 오류가 발생했습니다.");
		}
	};
};

export default Product2;