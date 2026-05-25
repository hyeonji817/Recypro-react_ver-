import "./App.css";
import { Routes, Route, Router, Link, useNavigate } from "react-router-dom";
import Home from "./main/Home";
import Index from "./main/Index";
import Main_Banner1 from "./main/Main_Banner1";
import NewProducts from "./main/newProducts";
import Main_Banner2 from "./main/Main_Banner2";
import Main_Bottom from "./main/Main_Bottom";
import BestProducts from "./main/BestProducts";

import Login from "./account/Login";
import Register from "./account/register";
//import FindId from "./account/find_id";
//import FindPw from "./account/find_pw";

import Products from "./shop/Products";
import Products1 from "./shop/Products1";
import Products2 from "./shop/Products2";
import Products3 from "./shop/Products3";
import Products4 from "./shop/Products4";
import Products5 from "./shop/Products5";
import Products6 from "./shop/Products6";

import Product_List from "./shop/Product_List";
import ProductsLife from "./shop/Products_Life";
import ProductsBath from "./shop/Products_Bath";
import ProductsFood from "./shop/Products_Food";
import ProductsKitchen from "./shop/Products_Kitchen";
import ProductsPet from "./shop/Products_Pet";
import ProductsOffice from "./shop/Products_Office";

import Product from "./shop/Product";
import Product1 from "./shop/Product1";
import Product2 from "./shop/Product2";
import Product3 from "./shop/Product3";
import Product4 from "./shop/Product4";
import Product5 from "./shop/Product5";
import Product6 from "./shop/Product6";

import OrderList from "./shop/orderList";
import Cart from "./shop/cart";
import ProductPay from "./shop/Product_payment";
import OrderOK from "./shop/orderOK";

import Pd_write from "./shop/Product_write";
import Product_Review from "./shop/Product_Review";
import Mypage from "./mypage/Mypage";
import Mypage_Orders from "./mypage/mypage_orders"; 

import Customer_main from "./customer/Customer_main";
import Customer_notice from "./customer/customer_notice";
import Customer_policy from "./customer/customer_policy";
import Customer_GiftCardPolicy from "./customer/customer_GiftCardPolicy";
import Customer_question from "./customer/customer_question";
import CustomerQA_write from "./customer/customerQA_write";
import Customer_Subqa from "./customer/customer_Subq&a";
import Customer_guide from "./customer/customer_guide";
import Customer_privacy from "./customer/customer_privacy";

import LogoutAction from "./account/logoutAction";
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
        <Route path="/index" element={<Index />} />
        <Route path="/main_banner1" element={<Main_Banner1 />} />
        <Route path="/newProducts" element={<NewProducts />} />
        <Route path="/main_banner2" element={<Main_Banner2 />} />
        <Route path="/main_bottom" element={<Main_Bottom />} />
        <Route path="/bestProducts" element={<BestProducts />} />

        <Route path="/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        {/** <Route path="/find_id" element={<FindId />} />
        <Route path="/find_pw" element={<FindPw />} /> */}

        <Route path="/shop/Products" element={<Products />} />
        <Route path="/shop/Products1" element={<Products1 />} />
        <Route path="/shop/Products2" element={<Products2 />} />
        <Route path="/shop/Products3" element={<Products3 />} />
        <Route path="/shop/Products4" element={<Products4 />} />
        <Route path="/shop/Products5" element={<Products5 />} />
        <Route path="/shop/Products6" element={<Products6 />} />

        <Route path="/shop/Product_List" element={<Product_List />} />
        <Route path="/shop/Products_Life" element={<ProductsLife />} />
        <Route path="/shop/Products_Bath" element={<ProductsBath />} />
        <Route path="/shop/Products_Food" element={<ProductsFood />} />
        <Route path="/shop/Products_Kitchen" element={<ProductsKitchen />} />
        <Route path="/shop/Products_Office" element={<ProductsOffice />} />
        <Route path="/shop/Products_Pet" element={<ProductsPet />} />
        
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop/product1/:productId" element={<Product1 />} />
        <Route path="/shop/product2/:productId" element={<Product2 />} />
        <Route path="/shop/product3/:productId" element={<Product3 />} />
        <Route path="/shop/product4/:productId" element={<Product4 />} />
        <Route path="/shop/product5/:productId" element={<Product5 />} />
        <Route path="/shop/product6/:productId" element={<Product6 />} />

        <Route path="/orderList" element={<OrderList />} />
        <Route path="/orderOk" element={<OrderOK />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productPay" element={<ProductPay />} />

        <Route path="/pd_write" element={<Pd_write />} />
        <Route path="/shop/Product_Review" element={<Product_Review />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/orders" element={<Mypage_Orders />} />

        <Route path="/customer_main" element={<Customer_main />} />
        <Route path="/customer_notice" element={<Customer_notice />} />
        <Route path="/customer_policy" element={<Customer_policy />} />
        <Route path="/customer_GiftCardPolicy" element={<Customer_GiftCardPolicy />} />
        <Route path="/customer_question" element={<Customer_question />} />
        <Route path="/customerQA_write" element={<CustomerQA_write />} />
        <Route path="/customer_subqa" element={<Customer_Subqa />} />
        <Route path="/customer_guide" element={<Customer_guide />} />
        <Route path="/customer_privacy" element={<Customer_privacy />} />
        
        <Route path="/logoutAction" element={<LogoutAction />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;