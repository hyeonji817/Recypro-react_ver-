import "./thanksCustomer.css"; 
import basket from "../assets/shop/shopping_basket1.png";
import card from "../assets/shop/card.png";
import calendar from "../assets/shop/purchase_order.png";
import Button from "../pages/Button";

const thanksCustomer = () => {
  return (
    <div className="thanksCustomer_wrap">
      <div className="container4">
        <h1 className="display-3">주문 완료</h1>
      </div>
      
      <div className="cart_continue" id="progress">
        <ul>
          <li>
            <div className="basket">
              <img src={basket} alt="장바구니" />
            </div>

            <div className="first_continue">
              <h5>장바구니</h5>
            </div>
          </li>
          <li>
            <div className="card">
              <div className="card_icon">
                <img src={card} alt="주문/결제" />
              </div>

              <div className="second_continue">
                <h5>주문 / 결제</h5>
              </div>
            </div>
          </li>
          <li>
            <div className="order_complete">
              <div className="calendar_icon">
                <img src={calendar} alt="주문완료" />
              </div>

              <div className="last_continue">
                <h5>주문완료</h5>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="container5">
        <h2 className="alert alert-danger">주문해 주셔서 감사합니다.</h2>
      </div>

      <div className="container6">
        <p>주문은 2024년 11월 11일에 배송될 예정입니다.</p>
        <p>주문번호 : 12345</p>
      </div>

      <div className="container7">
        <p>
          <h2>
            <Button 
              text={"상품 목록"}
              type={"thanks"}
              className="thanksTo"
            />
          </h2>
        </p>
      </div>
    </div>
  );
};

export default thanksCustomer;