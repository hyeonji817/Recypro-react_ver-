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
      <div className="products_body">
        <div id="big_section">
          {/** 카테고리 */}
          <ul className="sub_category">
            <li>
              <a href="./Products1">생활</a>
            </li>
	          <li>
              <a href="./Products2">욕실</a>
            </li>
	          <li>
              <a href="./Products3">식품</a>
            </li>
	          <li>
              <a href="./Products4">주방</a>
            </li>
						<li>
              <a href="./Products5">반려동물</a>
            </li>
						<li>
              <a href="./Products6">사무</a>
            </li>
          </ul>      {/** sub_category end */}  

          {/** 상품정렬 */}
          <ul className="prd_basic col3">
            {currentItems.map((item, index) => (
              <li key={index}>
                <div className="box ">
                  <div className="img">
                    <div className="prdimg">
                      <Link to={`/shop/product1/${encodeURIComponent(item.productId)}`}>
                        <img 
                          src={`http://localhost:5003/uploads/${String(item.filename).replace(/^\.\//,'')}`} 
                          alt={item.pname}
                          width="240" 
                          height="320"
                        />
                      </Link>
                    </div>      {/** prdimg end */}
                  </div>       {/** img end */}  
                </div>      {/** box  end */}
              </li>
            ))}
          </ul>      {/** prd_basic col3 end */}
        </div>      {/** big_section end */}
      </div>     {/** products_body end */}
    </div>
  );
};

export default Product_List;