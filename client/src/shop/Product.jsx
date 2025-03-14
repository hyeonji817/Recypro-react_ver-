import "./Product.css";
import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 서버에서 상품 정보를 가져옴 
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/api/product/${id}`);  // 서버 API 호출
        setProduct(response.data);  // 서버에서 받은 데이터로 상태 업데이트
      } catch (error) {
        if (error.response) {
          console.error("상품 정보를 불러오는 데 실패했습니다:", error.response.data);
        } else {
          console.error("상품 정보를 불러오는 데 실패했습니다:", error.message);
        }
      }
    };

    fetchProduct();   // 상품 정보 가져오기 호출 
  }, [id]);

  if (!product) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  console.log("검색한 상품 ID:", id);
  console.log("이미지 파일명:", product.filename);

  return (
    <div className="Product_wrap">
      <div className="Product_Header">
        <Header_loginOK />
      </div>
      <div className="product-detail">
        <div className="Product_title">
          <h2>상품 정보</h2>
        </div>
        <div className="row">
          {/* 상품 이미지 */}
          <div className="col-md-5">
            <span className="pd_img">
              <img
                alt="상품 이미지"
                src={`http://localhost:5001/uploads/shopdetail/${product.filename}`}
                style={{ width: "100%" }}
              />
            </span>
          </div>

          {/* 상품 정보 */}
          <div className="col-md-6">
            <div className="sub_explain">
              <span className="pname">
                <b>
                  <h3>{product.pname}</h3>
                </b>
              </span>
              <span className="desc">
                <h5>
                  <p>{product.description}</p>
                </h5>
              </span>
              <p>
                <b>상품 코드 : </b>
                <span className="badge badge-danger">{product.productId}</span>
              </p>
              <p>
                <b>제조사 : </b>
                {product.manufacturer}
              </p>
              <p>
                <b>분류 : </b>
                {product.category}
              </p>
              <p>
                <b>재고 수 : </b>
                {product.numberOfstock}
              </p>
              <h4>
                <b>가격 : {product.price} 원</b>
              </h4>
            </div>

            {/* 버튼 영역 */}
            <p className="button">
              <form name="addForm" action={`/addCart/${product.productId}`} method="post">
                <div className="product_bt">
                  <a
                    className="btn btn-default btn-lg"
                    style={{ backgroundColor: "#b6f5f5", marginRight: "3%" }}
                    href="/cart"
                  >
                    장바구니 담기
                  </a>
                  <a
                    href="/products"
                    className="btn btn-default btn-lg"
                    style={{ backgroundColor: "#b6f5f5", marginRight: "3%" }}
                  >
                    상품 목록
                  </a>
                  <a
                    href="/productReview"
                    className="btn btn-default btn-lg"
                    style={{ backgroundColor: "#b6f5f5" }}
                  >
                    리뷰확인
                  </a>
                </div>
              </form>

              <form name="addForm2" action={`/addOrder/${product.productId}`} method="post">
                <div className="product_bt" id="order">
                  <a
                    className="btn btn-default btn-lg"
                    style={{ backgroundColor: "#b6f5f5", marginBottom: "-20px;" , marginRight: "3%" }}
                    href="/order"
                  >
                    주문하기
                  </a>
                  <a
                    href="/orderList"
                    className="btn btn-default btn-lg"
                    style={{ backgroundColor: "#b6f5f5", marginBottom: "-120px;" }}
                  >
                    주문내역 조회
                  </a>
                </div>
              </form>
            </p>
          </div>
        </div>

        {/* 회원 이벤트 배너 */}
        <div className="membership">
          <div className="mb_title">
            <h2>Membership</h2>
          </div>
          <div className="membership_events" id="event">
            <ul>
              <li>
                <div className="coupon_give">
                  <div className="new_member_give">
                    <div className="new_member_give_title">
                      <h6>신규회원 즉시발급</h6>
                    </div>
                    <div className="pay">
                      <h5>10,000</h5>
                    </div>
                  </div>
                  <div className="direct_give">
                    <a href="#">
                      <h4>쿠폰 즉시발급</h4>
                    </a>
                  </div>
                  <div className="coupon_event">
                    <h6>
                      신규회원 <br /> 10,000 + 30% 할인쿠폰
                    </h6>
                  </div>
                </div>
              </li>
              {/* Other Membership Events */}
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product; 