import "./cart.css";
import Button from "../pages/Button";
import card from "../assets/shop/card.png";
import basket from "../assets/shop/shopping_basket1.png";
import purchase from "../assets/shop/purchase_order.png";
import Header_loginOK from "../main/Header_loginOK";

const cart = () => {
  return (
    <div className="cart_wrap">
      <div className="cart_Header">
        <Header_loginOK />
      </div>
      <div className="title">
        <div className="title-container">
          <h1 className="display-3">장바구니</h1>
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
            <div className="order_card">
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
                <img src={purchase} alt="구매" />
              </div>
              <div className="last_continue">
                <h5>주문완료</h5>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="container2">
        <div className="cart_table">
          <table className="table table-hover">
            <tr>
					    <th>상품</th>
					    <th>가격</th>
					    <th>수량</th>
					    <th>소계</th>
					    <th>비고</th>
				    </tr>
            <tr>
              <td>강화 소창 수건-먼지 안 나는 무형광</td>
              <td>5,900</td>
              <td>1</td>
              <td>5,900</td>
              <td>
                <Button 
                  text={"삭제"}
                  type={"cart_del"}
                  className="cart_del"
                />
              </td>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>총액</th>
              <th>5,900</th>
              <th></th>
            </tr>
          </table>
          <div className="btn-option">
            <Button 
              text={"쇼핑 계속하기"}
              type={"continue"}
              className="continue"
            />
            <Button 
              text={"주문하기"}
              type={"order"}
              className="order"
            />
            <Button 
              text={"삭제하기"}
              type={"delete"}
              className="delete"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart;