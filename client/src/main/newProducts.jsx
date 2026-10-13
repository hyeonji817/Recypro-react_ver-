import { catalogUrl, loadCatalog } from "../api/catalog";
import "./newProducts.css";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper 스타일 (필수)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const NewProducts = () => {
  const [newArrivals, setNewArrivals] = useState([]); // 신상품 리스트들을 불러오기 위한 기능 메소드 구현
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    loadCatalog('new', controller.signal)
      .then(data => { setNewArrivals(data); setStatus(data.length ? 'ready' : 'empty'); })
      .catch(error => { if (error.name !== 'AbortError') { console.error(error); setStatus('error'); } });
    return () => controller.abort();
  }, []);
  

  return (
    <div className="newProducts_wrap">
      {/* NEW ARRIVALS */}
      <div className="main_new">
        <div className="title_section tac">
          <h2>NEW ARRIVALS</h2>
          {status === 'loading' && <p role="status">상품을 불러오는 중입니다.</p>}
          {status === 'empty' && <p>등록된 상품이 없습니다.</p>}
          {status === 'error' && <p role="alert">상품을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.</p>}
        </div>

        <div className="slide_wrap">  {/** 상품 이미지들을 가로로 여러 개 보여주는 캐러셀 형식으로 구성 */}
          <Swiper
            className="main_new_slide"
            spaceBetween={0} // 슬라이드 간의 간격 설정 : 54px만큼 띄워짐
            slidesPerView={3} // 한 번에 보이는 슬라이드 개수 : 3개 
            loop={true}   // 슬라이드 반복 가능 
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {newArrivals.map((item, index) => (
              <SwiperSlide key={index} className="prd_basic">
                <div className="box">
                  <div className="img">
                    <div className="prdimg">
                      <a href={item.href}>
                        <img 
                          src={catalogUrl("image", item.filename)}
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
                        KRW {item.price}<span>원</span>
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