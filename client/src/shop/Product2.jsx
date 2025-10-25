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

	// 문자열, JSON 문자열, 배열 어떤 형태여도 배열로 정규화
	const toArray = (v) => {
  	if (Array.isArray(v)) return v;
  	if (v == null) return [];
  	if (typeof v === "string") {
    	try {
      	// JSON 문자열이면
      	const parsed = JSON.parse(v);
      	return Array.isArray(parsed) ? parsed : [v.trim()];
    	} catch {
      	// 그냥 콤마/슬래시 구분 문자열 등
      	return v.split(/[,|/]+/).map(s => s.trim()).filter(Boolean);
    	}
  	}
  	// 객체 등 기타 타입은 일단 문자열화
  	return [String(v)];
	};

	if (loading) return <div className="Product_wrap">Loading...</div>;
  if (error) return <div className="Product_wrap">{error}</div>;
  if (!product) return null;
	if (!productId) return <div className="Product_wrap">잘못된 페이지입니다.(상품 ID 없음)</div>;

	const {
    pname, price, discount_price, discount_rate,
    description, manufacturer, numberOfstock, category, filename, mileage, img_Desc,
		selectColor, productCount,
  } = product;

	// 단가(할인가 우선) + 옵션가 
	const unitBase = Number(discount_price || price || 0);
	const unitPrice = Math.max(0, unitBase + optionDelta);
	const totalPrice = unitPrice * qty;

	// selectColor 파싱 
	let colorOptions = [];
	try {
		if (selectColor) {
			// JSON 형식 우선 
			if (selectColor.trim().startWith("{")) {
				const obj = JSON.parse(selectColor);
				colorOptions = Array.isArray(obj.color) ? obj.color : [];
			} else {
				// CSV 형식 
				colorOptions = selectColor.split(",").map(s => s.trim()).filter(Boolean);
			}
		}
	} catch (e) {
		console.warn("selectColor parse error:", e);
	}

	// 업로드 경로 통일: DB에는 "life/xxx.jpg" 저장했다고 가정
  const mainImg = `http://localhost:5003/uploads/${String(filename).replace(/^\.\//,'')}`;
	const DescImg = `http://localhost:5003/uploads/${String(img_Desc).replace(/^\.\//,'')}`;

	return (
		<div className="Product_wrap">
			<div className="Product_Header">
				<Header_loginOK />
			</div>		{/** Product_Header end */}
			<div className="Product_body">
				<div className="detailPd_body">
					<div id="detail">
						<div className="detail_top_wrap">
							{/** 상품 이미지 */}
							<div className="prdimg">
								<div className="addimg" id="addimg">
									<div className="add_img">
										<img src={mainImg} alt={pname} />
									</div>			{/** add_img end */}
									
								</div>		{/** addimg end */}
							</div>			{/** prdimg end */}
						</div>			{/** detail_top_wrap end */}
					</div>		{/** detail end */}
				</div>		{/** detailPd_body end */}
			</div>		{/** Product_body end */}
			<div className="Product_Footer">
				<Footer />	
			</div>	{/** Product_Footer end */}
		</div>		/** Product_wrap end */
	);
};

export default Product2;