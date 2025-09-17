import "./Main_Banner1.css";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// 호출할 이미지 모음
import toothbrush from "../assets/toothbrush.jpg";
import tableProducts from "../assets/table_products.jpg"; 
import woodProducts from "../assets/woodProducts.jpg"; 
import bottles from "../assets/bottles2.jpg"; 

// Swiper 스타일 (필수)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Main_Banner1 = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  // 구현할 1st 배너 이미지 항목 데이터들 (호출용) 
  const mainVisuals = [
    {
      href: "../shop/Products",
      src: toothbrush,
      text: "그동안 재활용품을 어떻게 활용할지 막막했죠?"
    },
    {
      href: "../shop/Products",
      src: tableProducts,
      text: "이제부터는 그럴 걱정은 No!"
    },
    {
      href: "../shop/Products",
      src: woodProducts,
      text: "재활용품이 다시 재사용할 수 있는 상품으로 재탄생하여"
    },
    {
      href: "../shop/Products",
      src: bottles,
      text: "고객 여러분들의 일상을 책임집니다!"
    },
  ];

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/main_banner1", { // 여기서부터 credentials 까지는 새로 추가한 코드
          method: "GET", 
          credentials: "include", 
        });  // new_Product.js 페이지(신상품 라우터 페이지) 연동
        const data = await res.json();
        setNewArrivals(data);
      } catch (err) {
        console.error("Failed to fetch new arrivals:", err);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <div className="main_banner1_wrap">
      {/* Main Visual Swiper */}
      {/** Swiper 컴포넌트를 사용하여 메인 비주얼 슬라이더를 구현 */}
      <Swiper
        className="main_visual"
        modules={[Autoplay, Pagination, EffectFade]}  // 사용할 Swiper 모듈 명시, Autoplay : 자동 슬라이드 전환 | pagination : 하단의 페이지네이션 점들 (사용할 이미지 요소들을 말하는 건가) | EffectFade : 페이드 효과
        autoplay={{ delay: 3000, disableOnInteraction: false }}   // delay : 3000 => 3초마다 자동 슬라이드 진행 | disableOnInteraction: false => 사용자가 터치하거나 마우스로 조작해도 자동 슬라이드 중단 X 
        pagination={{ clickable: true }}  // 페이지네이션 점을 클릭할 수 있도록 설정 
        //effect="fade"  => effect와 loop 조합이 두 개 있다보니 충돌나서 그런듯
        slidesPerView={1}   // 한 번에 보여줄 슬라이드 수 : 1개 
        loop={true}   // 슬라이드가 끝나면 처음으로 돌아가는 무한 루프 설정 
        loopAdditionalSlides={2}  // 루프를 부드럽게 하기 위해 추가 복제 슬라이드 2개 생성 (루프 시 깜빡임 방지용)
      >
        {/** 슬라이드 이미지 리스트를 동적으로 렌더링하기 위한 JSX */}
        {mainVisuals.map((item, index) => (   // mainVisual이라는 배열을 순회하면서 각 항목(item)에 대해 <SwiperSlide> 생성 
          <SwiperSlide key={index}>   {/** key={index} : React에서 리스트 렌더링 시 필요함. 각 슬라이드의 고유 식별자 역할 (최적화에 도움) */}
            <a href={item.href}>
              <img src={item.src} alt={`main visual ${index + 1}`} /> {/** 실제로 보여줄 이미지 태그 항목. alt : 접근성 및 SEO를 위한 대체 텍스트 */}
              <div className="Banner_text">{item.text}</div>
            </a>
          </SwiperSlide>  // <SwiperSlide> : Swiper 라이브러리의 슬라이드 한 장. 해당 내부에 이미지나 콘텐츠를 넣어야 Swiper가 인식 
        ))}
      </Swiper>
    </div>
	 );
  };

export default Main_Banner1;