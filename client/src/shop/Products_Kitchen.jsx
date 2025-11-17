import "./Products_Kitchen.css";
import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

const Products_Kitchen = () => {
  const [productKitchen, setProductKitchen] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productKitchen.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productKitchen.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const fetchProductKitchen = async () => {
      try {
        const res = await fetch("http://localhost:5003/api/product_kitchen");    // Product_Kitchen.js (주방항목 페이지 라우터) 페이지 연동
        const data = await res.json();
        setProductKitchen(data);
      } catch (err) {
        console.error("Failed to fetch kitchen product:", err);
      }
    };
    fetchProductKitchen();
  });

  // 돋보기 기능 상태 추가 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 돋보기 검색 핸들러 추가 
  const filteredItems = productKitchen.filter(item => 
    item.pname.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <div id="productsKitchen_wrap">
      <div className="products_body">
        <div id="big_section">
          <li><Link to="/shop/products1">생활</Link></li>
          <li><Link to="/shop/products2">욕실</Link></li>
          <li><Link to="/shop/products3">식품</Link></li>
          <li><Link to="/shop/products4">주방</Link></li>
          <li><Link to="/shop/products5">반려동물</Link></li>
          <li><Link to="/shop/products5">사무</Link></li>  
        </div>      {/** big_section end */}

        {/** 상품정렬 */}
        <ul className="prd_basic col3"></ul>    {/** prd_basic col3 end */}

        <ul className="paging"></ul>      {/** paging end */}
      </div>     {/** products_body end */}
    </div>     /** productsKitchen_wrap end */
  );
};

export default Products_Kitchen;