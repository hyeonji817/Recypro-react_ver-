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
            <label className="col-sm-2"></label>
            <div className="col-sm-3">
              <input />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2"></label>
            <div className="col-sm-3">
              <input />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2"></label>
            <div className="col-sm-3">
              <input />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2"></label>
            <div className="col-sm-3">
              <input />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default shoppingInfo_cart;