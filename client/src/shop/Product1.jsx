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

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
				// 라우터 페이지(Product_Life.js) 연동
        const res = await axios.get(`http://localhost:5003/api/product_life/${encodeURIComponent(productId)}`, { withCredentials: true });
        // if (mounted) setProduct(res.data);
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

	// 선택한 옵션 라벨을 "색상: 핑크 / 종류: 라지" 형태로 표시
	const selectedLabel = groups
	.map(g => {
    const val = (g.values || []).find(v => v.value === selected[g.name]);
    return val ? `${g.displayName || g.name}: ${val.label}` : null;
  })
  .filter(Boolean)
  .join(" / ");

	if (loading) return <div className="Product_wrap">Loading...</div>;
  if (error) return <div className="Product_wrap">{error}</div>;
  if (!product) return null;

	const {
    pname, price, discount_price, discount_rate,
    description, manufacturer, numberOfstock, category, filename, mileage, img_Desc,
		selectColor, productCount,
  } = product;

	// 단가(할인가 우선) + 옵션가
	const unitBase = Number(discount_price || price || 0);
	const unitPrice = Math.max(0, unitBase + optionDelta);
	const totalPrice = unitPrice * qty;	
};

export default Product1;
