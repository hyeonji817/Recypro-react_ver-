import "./NewProducts.css";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper 스타일 (필수)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const NewProducts = () => {
  const [newArrivals, setNewArrivals] = useState([]); // 신상품 리스트들을 불러오기 위한 기능 메소드 구현

  useEffect(() => {
      const fetchNewArrivals = async () => {
        try {
          const res = await fetch("http://localhost:5001/api/newProducts", { // 여기서부터 credentials 까지는 새로 추가한 코드
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
    <div className="newProducts_wrap">
      {/* NEW ARRIVALS */}
      <div className="main_new">
        <div className="title_section tac">
          <h2>NEW ARRIVALS</h2>
        </div>

        <div className="slide_wrap">  {/** 상품 이미지들을 가로로 여러 개 보여주는 캐러셀 형식으로 구성 */}
          <Swiper
            className="main_new_slide"
            spaceBetween={20} // 슬라이드 간의 간격 설정 : 54px만큼 띄워짐
            slidesPerView={3} // 한 번에 보이는 슬라이드 개수 : 3개 
            loop={true}   // 슬라이드 반복 가능 
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidedPerView: 2 },
              1024: { slidePerView: 3 },
            }}
          >
            {newArrivals.map((item, index) => (
              <SwiperSlide key={index} className="prd_basic">
                <div className="box">
                  <div className="img">
                    <div className="prdimg">
                      <a href={item.href}>
                        <img 
                          src={`http://localhost:5001/uploads/${item.filename}`}
                          alt={item.name}
                          width="285"
                          height="380"
                        />
                      </a>
                    </div>
                    {/** {item.soldout && <div className="soldout">SOLD OUT</div>} */}
                  </div>

                  <div className="info">
                    <p className="name">
                      <a href={item.href}>{item.pname}</a>
                    </p>
                    <div className="price">
                      <p className="sell_sellY" style={{ textDecoration: "line-through" }}>
                        {item.price}<span>원</span>
                      </p>
                      <div className="discount_section">
                        <p className="per">{item.discount_rate}%</p>
                        <p className="discount_discountY">{item.discount_price}원</p>
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

export default NewProducts;