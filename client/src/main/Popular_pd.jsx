import "./Popular_pd.css";
import React, { useEffect, useState } from "react"; 

const Popular_pd = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // API에서 인기 상품 데이터 가져오기 
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5003/api/popular_product');
        const data = await response.json(); // response 변수값을 json 파일로 변환 
        console.log("Fetched Products:", data);   // 데이터 확인 
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="popular-products">
      <h2>인기 상품</h2>
      {products.length === 0 ? (
      <p>로딩 중...</p>
      ) : (
      <div className="product-list">
        {products.map((product) => (
          <div className="product-item" key={product.productId}>
            <img src={`http://localhost:5003/uploads/${product.filename}`} alt={product.pname} />
            <h3 className="pd_name">{product.pname}</h3>
            <p className="pd_description">{product.description}</p>
            <div className="product-details">
              <a href="#" className="button-info">
                상세 정보 &raquo;
              </a>
              <p className="pd_price">{product.price} 원</p>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Popular_pd;