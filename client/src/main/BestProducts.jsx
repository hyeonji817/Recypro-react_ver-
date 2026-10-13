import { catalogUrl, loadCatalog } from "../api/catalog";
import "./BestProducts.css";
import React, { useEffect, useState } from "react";

const BestProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    loadCatalog('best', controller.signal)
      .then(data => { setBestProducts(data); setStatus(data.length ? 'ready' : 'empty'); })
      .catch(error => { if (error.name !== 'AbortError') { console.error(error); setStatus('error'); } });
    return () => controller.abort();
  }, []);

  return (
    <section className="best-products">
      <div className="main_best">
        <div className="title_section tac">
          <h2>BEST PRODUCT</h2>
          {status === 'loading' && <p role="status">상품을 불러오는 중입니다.</p>}
          {status === 'empty' && <p>등록된 상품이 없습니다.</p>}
          {status === 'error' && <p role="alert">상품을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.</p>}
        </div>

        <ul className="prd_basic col3">
          {bestProducts.map((item, index) => (
            <li key={index}>
              <div className="box">
                <div className="img">
                  <div className="prdimg">
                    <a href={item.href || "#"}>
                      <img
                        src={catalogUrl("image", item.filename)}
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