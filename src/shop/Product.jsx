import "./Product.css";
import soap from "../assets/shopdetail/3-1.jpg";
import star from "../assets/shop/star.png";
import shipment from "../assets/shipment.png"; 
import alarm from "../assets/shop/alarm.png"; 
import Button from "../pages/Button";
import Header_loginOK from "../main/Header_loginOK";

const Product = () => {
  return (
    <div className="Product_wrap">
      <div className="Product_Header">
        <Header_loginOK />
      </div>
      <div className="title">
        <div className="container-title">
          <h1 className="display-3">상품 정보</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <span className="pd_img">
              <img src={soap} alt="유기농 설거지 비누"/>
            </span>
          </div>
          <div className="col-md-6">
            <div className="sub_explain">
              <span className="pname">
                <b><h3>유기농 설거지 비누</h3></b>
              </span>
              <span className="desc">
                <h5>
                  매일 사용하는 세제를 바꾸는 것만으로도 <br />
                  자연과 나와 이웃이 행복해집니다.
                </h5>
              </span>
              <p>
                <b>상품 코드 : </b>
                <Button 
                  text={"가치솝"}
                  type={"badge-danger"}
                  className="badge-danger"
                />
              </p>
              <p>
                <b>제조사 : </b>
                라라어스
              </p>
              <p>
                <b>분류 : </b>
                욕실
              </p>
              <p>
                <b>재고 수 : </b>
                100
              </p>
              <h4>
                <b>가격 : </b> 3,000원
              </h4>
            </div>
            <p className="button" />
            <form>
              <div className="product_bt">
                <Button 
                  text={"장바구니 담기"}
                  type={"cart"}
                  className="cart_into"
                />
                <Button 
                  text={"상품 목록"}
                  type={"pdList"}
                  className="pd_list"
                />
                <Button 
                  text={"리뷰확인"}
                  type={"review_view"}
                  className="review_view"
                />
              </div>
            </form>
            <form>
              <div className="product_bt2" id="order">
                <Button 
                  text={"주문하기"}
                  type={"order"}
                  className="order"
                />
                <Button 
                  text={"주문내역 조회"}
                  type={"pd_orderlist"}
                  className="pd_orderlist"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
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
                  <a>
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
            <li>
              <div className="star">
                <a>
                  <img src={star} alt="별" />
                </a>
              </div>
              <a href="#">
                <span className="level">
                  <h4>등급별 혜택</h4>
                </span>
                <span className="level_event">
                  <h6>
                    할인/적립 <br />
                    무료배송 및 배송비 할인 <br />
                    생일쿠폰 지급 
                  </h6>
                </span>
              </a>
            </li>
            <li>
              <div className="free_shipment">
                <a href="#">
                  <span className="truck">
                    <img src={shipment} alt="배송" />
                  </span>
                  <span className="shipment_title">
                    <h4>무료배송</h4>
                  </span>
                  <span className="shipment_event">
                    <h6>
                      6만원 이상 <br />
                      구매 시, <br />
                      무료배송
                    </h6>
                  </span>
                </a>
              </div>
            </li>
            <li>
              <div className="new_event">
                <a href="#">
                  <span className="alarm_event">
                    <img src={alarm} alt="알림설정" />
                  </span>
                  <span className="new_update">
                    <h4>신상 UP TO</h4>
                  </span>
                  <span className="new_discount">
                    <h6>
                      매일 업데이트 <br />
                      30% 할인 지급
                    </h6>
                  </span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product; 