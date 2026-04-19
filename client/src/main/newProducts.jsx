import "./NewProducts.css";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const NewProducts = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await fetch("http://localhost:5103/api/newProducts", {
          method: "GET",
          credentials: "include",
        });
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
      <div className="main_new">
        <div className="title_section tac">
          <h2>NEW ARRIVALS</h2>
        </div>

        <div className="slide_wrap">
          <Swiper
            className="main_new_slide"
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {newArrivals.map((item, index) => (
              <SwiperSlide key={index} className="prd_basic">
                <div className="box">
                  <div className="img">
                    <div className="prdimg">
                      <a href={item.href}>
                        <img
                          src={`http://localhost:5103/uploads/${item.filename}`}
                          alt={item.pname}
                        />
                      </a>
                    </div>
                  </div>

                  <div className="info">
                    <p className="name">
                      <a href={item.href}>{item.pname}</a>
                    </p>

                    <div className="price">
                      <p
                        className="sell_sellY"
                        style={{ textDecoration: "line-through" }}
                      >
                        KRW {item.price}
                      </p>

                      <div className="discount_section">
                        <p className="per">{item.discount_rate}%</p>
                        <p className="discount_discountY">
                          {item.discount_price}원
                        </p>
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