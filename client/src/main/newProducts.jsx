import "./newProducts.css"; 
import Products from "../shop/Products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper 스타일 (필수)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// 호출할 이미지 모음
import toothbrush from "../assets/toothbrush.jpg";
import tableProducts from "../assets/table_products.jpg"; 
import woodProducts from "../assets/woodProducts.jpg"; 
import bottles from "../assets/bottles2.jpg"; 
import fourClover from "../assets/fourClover.jpg";
import petWaterBowl from "../assets/pet_waterboul.jpg"; 
import wheatChurros from "../assets/wheat_Churros.jpg";

const newProducts = () => {
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
    <div className="newProducts_wrap">
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

export default newProducts;