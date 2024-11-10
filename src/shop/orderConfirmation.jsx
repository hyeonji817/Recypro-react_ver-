import "./orderConfirmation.css";
import Button from "../pages/Button";
import basket from "../assets/shop/shopping_basket1.png";
import card from "../assets/shop/card.png";
import calendar from "../assets/shop/purchase_order.png";

const OrderConfirmation = () => {
  return (
    <div className="orderConfirm_wrap">
      <div className="container2">
        <h1 className="display-3">주문 정보</h1>
      </div>

      <div className="cart_continue" id="progress">
        <ul>
          <li>
            <div className="basket2">
              <div className="basket_icon">
                <img src={basket} />
              </div>
              <div className="first_continue">
                <h5>장바구니</h5>
              </div>
            </div>
          </li>
          <li>
            <div className="card">
              <div className="card_icon">
                <img src={card} />
              </div>
              <div className="second_continue">
                <h5>주문 / 결제</h5>
              </div>
            </div>
          </li>
          <li>
            <div className="order_complete">
              <div className="calendar_icon">
                <img src={calendar} />
              </div>
              <div className="last_continue">
                <h5>주문완료</h5>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="container col-8 alert alert-info">
        <div className="text-center">
          <h1>영수증</h1>
        </div>

        <div className="row justify-content-between">
          <div className="col-4">
            <strong><br />배송 내역</strong><br /><br />
            성명 : 곽현지<br />
            우편번호 : 12345<br />
            주소 : 관악구<br />
          </div>

          <div className="col-4">
            <p>
              <em><br />배송일 : 2024.11.10</em>
            </p>
          </div>
        </div>

        <div className="table">
          <table className="table table-hover">
            <tr>
              <th className="text-center">물품</th>
              <th className="text-center">수량</th>
              <th className="text-center">가격</th>
              <th className="text-center">소계</th>
            </tr>
            <tr>
              <td className="text-center"><em>강화 소창 수건-먼지 안 나는 무형광</em></td>
              <td className="text-center"><em>1</em></td>
              <td className="text-center"><em>5,900</em></td>
              <td className="text-center"><em>5,900 원</em></td>
            </tr>
          </table>
          <div className="order_button">
            <Button 
              text={"이전"}
              type={"orderBack"}
            />
            <Button 
              text={"등록"}
              type={"orderEnroll"}
            />
            <Button 
              text={"결제"}
              type={"orderBuy"}
            />
            <Button 
              text={"취소"}
              type={"orderCancel"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;