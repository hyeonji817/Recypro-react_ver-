import { useNavigate } from "react-router-dom"; 
import "./ProductItem.css"; 

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  console.log(product);     // 어떤 데이터가 넘어오는지 확인하기 

  return (
    <div className="wrapper_pdItem">
      <div className="product-item" onClick={() => navigate(`/product/${product.productId}`)}>
        <img src={`http://localhost:5003/uploads/shop/${product.filename}`} alt={product.pname} />
        <h2>{product.pname}</h2>
        <p>{product.description}</p>
        <div className="product_details">
          <a href="./Product.jsx" className="button-info">
            상세정보 &raquo;
          </a>
          <span className="price">
            {product.price ? `${product.price.toLocaleString()}원` : '가격 정보 없음'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;