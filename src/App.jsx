import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./main/home";
import Login from "./account/Login";
import Register from "./account/register";
import FindId from "./account/find_id";
import FindPw from "./account/find_pw";
import Products from "./shop/Products";
import Product from "./shop/Product";
import Cart from "./shop/cart";
import ShoppingInfo_cart from "./shop/shoppingInfo_cart";
import OrderConfirmation from "./shop/orderConfirmation";
import ThanksCustomer from "./shop/thanksCustomer";
import Pd_orderList from "./shop/pd_orderList";
import Pd_write from "./shop/Product_write";
import Product_Review from "./shop/Product_Review";
import Product_reviewView from "./shop/Product_reviewView";
import Pd_modify from "./shop/pd_modify";
import Mypage from "./mypage/Mypage";
import Userinfo from "./mypage/userinfo";
import UpdateUser from "./mypage/updateUser";
import Mylevel from "./mypage/mylevel";
import Coupon_list from "./mypage/coupon_list";
import Review_history from "./mypage/review_history";
import ProductReview_history from "./mypage/productReview_history";
import Review from "./review/Review";
import Write from "./review/write";
import View from "./review/View";
import Modify from "./review/modify";
import Customer_main from "./customer/Customer_main";
import Customer_notice from "./customer/customer_notice";
import Customer_policy from "./customer/customer_policy";
import Customer_consult from "./customer/customer_consult";
import Index_admin from "./admin_page/index_admin";
import loginOK from "./main/loginOK";
import Event from "./main/event";
import Notfound from "./pages/Notfound";

// 1. "/" : 계정, 상품, 게시판, 마이페이지, 고객센터 등을 조회하는 메인페이지
// 2. "/login" : 계정을 관리하는 Login 페이지
// 3. "/Products" : 상품을 판매 및 관리하는 상품리스트 페이지 
// 4. "/mypage" : 개인정보를 조회하는 마이페이지 
// 5. "/review" : 게시글 작성, 수정, 신고 등을 담당하는 게시판 페이지 
// 6. "/customer" : 고객센터 관리페이지 
// 7. "/index_admin" : 관리자페이지 
function App() {
  const nav = useNavigate(); 

  const onClickButton = () => {
    nav("/home");
  };

  const onClickButton2 = () => {
    nav("/loginOK");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/find_id" element={<FindId />} />
        <Route path="/find_pw" element={<FindPw />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shoppingInfo_cart" element={<ShoppingInfo_cart />} />
        <Route path="/orderConfirmation" element={<OrderConfirmation />} />
        <Route path="/thanksCustomer" element={<ThanksCustomer />} />
        <Route path="/pd_orderList" element={<Pd_orderList />} />
        <Route path="/pd_write" element={<Pd_write />} />
        <Route path="/product_review" element={<Product_Review />} />
        <Route path="/product_reviewView" element={<Product_reviewView />} />
        <Route path="/pd_modify" element={<Pd_modify />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/userinfo" element={<Userinfo />} />
        <Route path="/updateuser" element={<UpdateUser />} />
        <Route path="/mylevel" element={<Mylevel />} />
        <Route path="/couponList" element={<Coupon_list />} />
        <Route path="/review_history" element={<Review_history />} />
        <Route path="/productReview_history" element={<ProductReview_history />} />
        <Route path="/review" element={<Review />} />
        <Route path="/write" element={<Write />} />
        <Route path="/view" element={<View />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/customer_main" element={<Customer_main />} />
        <Route path="/customer_notice" element={<Customer_notice />} />
        <Route path="/customer_policy" element={<Customer_policy />} />
        <Route path="/customer_consult" element={<Customer_consult />} />
        <Route path="/index_admin/:id" element={<Index_admin />} />
        <Route path="/loginOK" element={<loginOK />} />
        <Route path="/event" element={<Event />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;