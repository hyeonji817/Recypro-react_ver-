import React, { useEffect, useState } from "react"; 
import "./cart.css";
import Button from "../pages/Button";
import card from "../assets/shop/card.png";
import basket from "../assets/shop/shopping_basket1.png";
import purchase from "../assets/shop/purchase_order.png";
import Header_loginOK from "../main/Header_loginOK";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // 로그인한 사용자 ID 기준으로 장바구니 목록 가져오기 
    axios.get("http://localhost:5003/cart", { withCredentials: true })
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.error("장바구니 불러오기 오류:", err);
      });
  }, []);

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
          <table className="cart-table">
            <thead>
              <tr>
                <th>상품명</th>
                <th>판매가</th>
                <th>수량</th>
                <th>합계</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                <tr key={item.cart_id}>
                  <td>{item.productId} - {item.pname}</td>
                  <td>{item.price}</td>
                  <td>{item.cart_quantity}</td>
                  <td>{(item.price * item.cart_quantity).toLocaleString()}원</td>
                  <td>
                    <Button 
                      type={"cart_del"}
                      text={"삭제"}
                      className="cart_del"
                    />
                  </td>
                </tr>
              })}
            </tbody>
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

export default Cart;