import "./BestProducts.css";
// React : React를 사용하기 위한 기본 모듈 
// useEffect : 컴포넌트가 렌더링될 때 API 호출 등의 부수효과를 처리 
// useState : 컴포넌트의 상태 관리를 위해 사용됨. 
import React, { useEffect, useState } from "react"; 

const BestProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/best_products");   // best_Product.js (인기상품 페이지 연동 라우터) 페이지 연동
        const data = await res.json(); 
        setBestProducts(data);
      } catch (err) {
        console.error("Failed to fetch best products:", err);
      }
    };
    fetchBestProducts();
  }, []);

  return (
    <div className="best-products">
      <div className="main_best">
        <div className="title_section tac">
          <h2>BEST PRODUCT</h2>
        </div>
        <ul className="prd_basic col3">
          {bestProducts.map((item, index) => (
          <li key={index}>
            <div className="box ">
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
              </div>

              <div className="info">
                <p className="name">
                  <a href={item.href}>
                    {item.pname}
                  </a>
                </p>
                <div className="price">
                  <p className="consumer consumerY">
                    <span>KRW</span>
                    {item.price}
                  </p>
                  <p className="sell sellY" style={{ textDecoration: "line-through" }}>
                    <span>KRW</span>
                    {item.price}
                  </p>
                  <div className="discount_section">
                    <p className="per">{item.discount_rate}%</p>
                    <p className="discount discountY">{item.discount_price}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BestProducts;