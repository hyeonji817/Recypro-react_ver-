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

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        const res = await fetch("http://localhost:5003/api/product_list");
        const data = await res.json();
        setProductsList(data);
      } catch (err) {
        console.error("Failed to fetch best product:", err);
      }
    };
    fetchProductsList();
  }, []);
  
  return (
    <div className="Product_List_wrap">
      
    </div>
  );
};

export default Product_List;