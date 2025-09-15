import "./Main_Banner1.css";
import Products from "../shop/Products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// 호출할 이미지 모음
import toothbrush from "../assets/toothbrush.jpg";
import tableProducts from "../assets/table_products.jpg"; 
import woodProducts from "../assets/woodProducts.jpg"; 
import bottles from "../assets/bottles2.jpg"; 
import fourClover from "../assets/fourClover.jpg";
import petWaterBowl from "../assets/pet_waterBowl1.jpg"; 
import wheatChurros from "../assets/wheat_Churros.jpg";

// Swiper 스타일 (필수)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Main_Banner1 = () => {
  // 구현할 1st 배너 이미지 항목 데이터들 (호출용) 
  const mainVisuals = [
    {
      href: "../shop/Products",
      src: toothbrush,
    },
    {
      href: "../shop/Products",
      src: tableProducts,
    },
    {
      href: "../shop/Products",
      src: woodProducts,
    },
    {
      href: "../shop/Products",
      src: bottles,
    },
  ];

  // 신상품 페이지 관련 데이터들 (호출용)
  const newArrivals = [
    {
      href: "https://www.rolarola.com/shop/detail.php?pno=00C17237D011CCA999F55A43DB2CE040",
      img: fourClover,
      name: "업사이클 네잎클로버 키링",
      price: "8,000",
      discount: "7,200",
      soldout: false,
    },
    {
      href: "https://www.rolarola.com/shop/detail.php?pno=BDC363788B2B48C031BF406CF15AA252",
      img: petWaterBowl,
      name: "접이식 실리콘 휴대용 물컵",
      price: "4,000",
      discount: "3,600",
      soldout: false,
    },
    {
      href: "https://www.rolarola.com/shop/detail.php?pno=3D3D286A8D153A4A58156D0E02D8570C",
      img: wheatChurros,
      name: "통밀츄러스 우리밀 크래커",
      price: "2,900",
      discount: "2,610",
      soldout: true,
    },
  ];

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
            </a>
          </SwiperSlide>  // <SwiperSlide> : Swiper 라이브러리의 슬라이드 한 장. 해당 내부에 이미지나 콘텐츠를 넣어야 Swiper가 인식 
        ))}
      </Swiper>

      {/* NEW ARRIVALS */}
      <div className="main_new">
        <div className="title_section tac">
          <h2>NEW ARRIVALS</h2>
        </div>

        <div className="slide_wrap">  {/** 상품 이미지들을 가로로 여러 개 보여주는 캐러셀 형식으로 구성 */}
          <Swiper
            className="main_new_slide"
            spaceBetween={54} // 슬라이드 간의 간격 설정 : 54px만큼 띄워짐
            slidesPerView={3} // 한 번에 보이는 슬라이드 개수 : 3개 
            loop={true}   // 슬라이드 반복 가능 
            autoplay={{ delay: 4000, disableOnInteraction: false }}
          >
            {newArrivals.map((item, index) => (
              <SwiperSlide key={index} className="prd_basic">
                <div className="box">
                  <div className="img">
                    <div className="prdimg">
                      <a href={item.href}>
                        <img src={item.img} alt={item.name} width="285" height="380" />
                      </a>
                    </div>
                    {item.soldout && <div className="soldout">SOLD OUT</div>}
                  </div>

                  <div className="info">
                    <p className="name">
                      <a href={item.href}>{item.name}</a>
                    </p>
                    <div className="price">
                      <p className="consumer consumerY">
                        <span>KRW</span> {item.price}
                      </p>
                      <p className="sell_sellY" style={{ textDecoration: "line-through" }}>
                        <span>KRW</span> {item.price}
                      </p>
                      <div className="discount_section">
                        <p className="per">10%</p>
                        <p className="discount_discountY">{item.discount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
   );
  };

export default Main_Banner1;