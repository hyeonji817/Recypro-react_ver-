import "./BestProducts.css";
import React, { useEffect, useState } from "react";

const BestProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/best_products`);
        const data = await res.json();
        setBestProducts(data);
      } catch (err) {
        console.error("Failed to fetch best products:", err);
      }
    };

    fetchBestProducts();
  }, []);

  return (
    <section className="best-products">
      <div className="main_best">
        <div className="title_section tac">
          <h2>BEST PRODUCT</h2>
        </div>

        <ul className="prd_basic col3">
          {bestProducts.map((item, index) => (
            <li key={index}>
              <div className="box">
                <div className="img">
                  <div className="prdimg">
                    <a href={item.href || "#"}>
                      <img
                        src={`${API_URL}/uploads/${item.filename}`}
                        alt={item.pname}
                      />
                    </a>
                  </div>
                </div>

                <div className="info">
                  <p className="name">
                    <a href={item.href || "#"}>{item.pname}</a>
                  </p>

                  <div className="price">
                    <p className="sell_sellY" style={{ textDecoration: "line-through" }}>
                      <span>KRW </span>
                      {item.price}
                    </p>

                    <div className="discount_section">
                      <p className="per">{item.discount_rate}%</p>
                      <p className="discount discountY">
                        {item.discount_price}원
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BestProducts;