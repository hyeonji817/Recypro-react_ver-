import "./Product_List.css";
import axios from "axios";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";

const Product_List = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5003/api/Products")
    .then(res => setProducts(res.data))
    .catch(err => console.error('데이터 로드 실패:', err));
  }, []);

  return (
    <div className="Product_List_wrap">
      <div className="product-list">
        <h1>상품목록</h1>
        <div className="grid-container">
          {products.map(product => (
            <ProductItem key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product_List;