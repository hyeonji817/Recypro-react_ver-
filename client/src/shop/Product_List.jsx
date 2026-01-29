import { Link } from "react-router-dom";
import "./Product_List.css";
import { useEffect, useState } from "react"; 

const Product_List = () => {
  const [productLists, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage; 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productLists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productLists.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="Product_List_wrap">
      
    </div>
  );
};

export default Product_List;