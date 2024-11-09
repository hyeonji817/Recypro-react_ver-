import "./shoppingInfo_cart.css";
import Button from "../pages/Button";
import card from "../assets/shop/card.png";
import basket from "../assets/shop/shopping_basket1.png";
import purchase from "../assets/shop/purchase_order.png";

const shoppingInfo_cart = () => {
  return (
    <div className="shoppingInfo_wrap">
      <div className="title">
        <div className="title-container">
          <h1 className="display-3">배송정보</h1>
        </div>
      </div>
      <div className="cart_continue" id="progress">
        <ul>
          <li>
            <div className="basket">
              <div className="basket_icon">
                <img src={basket} alt="장바구니" />
              </div>
              <div className="first_continue">
                <h5>장바구니</h5>
              </div>
            </div>
          </li>
          <li>
            <div className="card">
              <div className="card_icon">
                <img src={card} alt="결제" />
              </div>
              <div className="second_continue">
                <h5>주문 / 결제</h5>
              </div>
            </div>
          </li>
          <li>
            <div className="order_complete">
              <div className="calendar_icon">
                <img src={purchase} alt="주문완료" />
              </div>
              <div className="last_continue">
                <h5>주문완료</h5>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="container">
        <form className="form-horizontal">
          <div className="form-group row">
            <label className="col-sm-2">id명</label>
            <div className="col-sm-3">
              <input name="shopping_userId" value="" className="form-control" placeholder="id명" readOnly />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2">상품명</label>
            <div className="col-sm-3" name="shopping_productId">
              <input name="shopping_productId" className="form-control" id="shopping_productId" value="" placeholder="상품명" readOnly />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2">성명</label>
            <div className="col-sm-3">
              <input type="text" name="shopping_name" className="form-control" placeholder="성명" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2">주문일</label>
            <div className="col-sm-3">
              <input type="text" name="shopping_date" className="form-control" value="" placeholder="yyyy/mm/dd" readOnly />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2">국가명</label>
            <div className="col-sm-3">
              <input type="text" name="shopping_country" className="form-control"
              placeholder="국가명" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2">우편번호</label>
            <div className="col-sm-3">
              <input type="text" name="shopping_zipCode" className="form-control"
              placeholder="우편번호" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2">주소</label>
            <div className="col-sm-3">
              <input type="text" name="shopping_addressName" className="form-control"
              placeholder="주소" />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-offset2 col-sm-10">
              <div className="button">
                <span className="button_back">
                  <Button 
                    text={"이전"}
                    type={"back"}
                    className="button_back"
                  />
                </span>
                <span className="button_enroll">
                  <Button 
                    text={"등록"}
                    type={"enroll"}
                    className="button_enroll"
                  />
                </span>
                <span className="button_cancel">
                  <Button 
                    text={"취소"}
                    type={"cancel"}
                    className="button_cancel"
                  />
                </span>
                <span className="button_coupon2">
                  <Button 
                    text={"쿠폰받기"}
                    type={"coupon2"}
                    className="button_coupon2"
                  />
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default shoppingInfo_cart;