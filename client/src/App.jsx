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
import FindId from "./account/find_id";
import FindPw from "./account/find_pw";
import ChangePassword from "./account/ChangePassword";

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

import ProductLife1 from "./shop/productList/Life/Pd_Life1";
import ProductLife2 from "./shop/productList/Life/Pd_Life2";
import ProductLife3 from "./shop/productList/Life/Pd_Life3";
import ProductLife4 from "./shop/productList/Life/Pd_Life4";
import ProductLife5 from "./shop/productList/Life/Pd_Life5";
import ProductLife6 from "./shop/productList/Life/Pd_Life6";
import ProductLife7 from "./shop/productList/Life/Pd_Life7";

import ProductBath1 from "./shop/productList/Bath/Pd_Bath1";
import ProductBath2 from "./shop/productList/Bath/Pd_Bath2";
import ProductBath3 from "./shop/productList/Bath/Pd_Bath3";
import ProductBath4 from "./shop/productList/Bath/Pd_Bath4";
import ProductBath5 from "./shop/productList/Bath/Pd_Bath5";
import ProductBath6 from "./shop/productList/Bath/Pd_Bath6";
import ProductBath7 from "./shop/productList/Bath/Pd_Bath7";
import ProductBath8 from "./shop/productList/Bath/Pd_Bath8";
import ProductBath9 from "./shop/productList/Bath/Pd_Bath9";

import ProductFood1 from "./shop/productList/Food/Pd_Food1";
import ProductFood2 from "./shop/productList/Food/Pd_Food2";
import ProductFood3 from "./shop/productList/Food/Pd_Food3";
import ProductFood4 from "./shop/productList/Food/Pd_Food4";
import ProductFood5 from "./shop/productList/Food/Pd_Food5";
import ProductFood6 from "./shop/productList/Food/Pd_Food6";

import ProductKitchen1 from "./shop/productList/Kitchen/Pd_Kitchen1";
import ProductKitchen2 from "./shop/productList/Kitchen/Pd_Kitchen2";
import ProductKitchen3 from "./shop/productList/Kitchen/Pd_Kitchen3";
import ProductKitchen4 from "./shop/productList/Kitchen/Pd_Kitchen4";
import ProductKitchen5 from "./shop/productList/Kitchen/Pd_Kitchen5";
import ProductKitchen6 from "./shop/productList/Kitchen/Pd_Kitchen6";
import ProductKitchen7 from "./shop/productList/Kitchen/Pd_Kitchen7";
import ProductKitchen8 from "./shop/productList/Kitchen/Pd_Kitchen8";

import ProductPet1 from "./shop/productList/Pet/Pd_Pet1";
import ProductPet2 from "./shop/productList/Pet/Pd_Pet2";
import ProductPet3 from "./shop/productList/Pet/Pd_Pet3";
import ProductPet4 from "./shop/productList/Pet/Pd_Pet4";
import ProductPet5 from "./shop/productList/Pet/Pd_Pet5";
import ProductPet6 from "./shop/productList/Pet/Pd_Pet6";

import ProductOffice1 from "./shop/productList/Office/Pd_Office1";
import ProductOffice2 from "./shop/productList/Office/Pd_Office2";
import ProductOffice3 from "./shop/productList/Office/Pd_Office3";
import ProductOffice4 from "./shop/productList/Office/Pd_Office4";
import ProductOffice5 from "./shop/productList/Office/Pd_Office5";

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
import Customer_GiftCard from "./customer/customer_GiftCard";
import Customer_question from "./customer/customer_question";
import Customer_consult from "./customer/customer_consult";
import Customer_declare from "./customer/customer_declare";
import Index_admin from "./admin_page/index_admin";
import LoginOK from "./main/loginOK";
import Login_admin from "./main/login_admin";
import Sidebar from "./admin_page/sidebar";
import Event from "./main/event";
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
        <Route path="/account/Login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/find_id" element={<FindId />} />
        <Route path="/find_pw" element={<FindPw />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
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

        <Route path="/productlife1/:productId" element={<ProductLife1 />} />
        <Route path="/productlife2/:productId" element={<ProductLife2 />} />
        <Route path="/productlife3/:productId" element={<ProductLife3 />} />
        <Route path="/productlife4/:productId" element={<ProductLife4 />} />
        <Route path="/productlife5/:productId" element={<ProductLife5 />} />
        <Route path="/productlife6/:productId" element={<ProductLife6 />} />
        <Route path="/productlife7/:productId" element={<ProductLife7 />} />

        <Route path="/productbath1/:productId" element={<ProductBath1 />} />
        <Route path="/productbath2/:productId" element={<ProductBath2 />} />
        <Route path="/productbath3/:productId" element={<ProductBath3 />} />
        <Route path="/productbath4/:productId" element={<ProductBath4 />} />
        <Route path="/productbath5/:productId" element={<ProductBath5 />} />
        <Route path="/productbath6/:productId" element={<ProductBath6 />} />
        <Route path="/productbath7/:productId" element={<ProductBath7 />} />
        <Route path="/productbath8/:productId" element={<ProductBath8 />} />
        <Route path="/productbath9/:productId" element={<ProductBath9 />} />

        <Route path="/productfood1/:productId" element={<ProductFood1 />} />
        <Route path="/productfood2/:productId" element={<ProductFood2 />} />
        <Route path="/productfood3/:productId" element={<ProductFood3 />} />
        <Route path="/productfood4/:productId" element={<ProductFood4 />} />
        <Route path="/productfood5/:productId" element={<ProductFood5 />} />
        <Route path="/productfood6/:productId" element={<ProductFood6 />} />

        <Route path="/productkitchen1/:productId" element={<ProductKitchen1 />} />
        <Route path="/productkitchen2/:productId" element={<ProductKitchen2 />} />
        <Route path="/productkitchen3/:productId" element={<ProductKitchen3 />} />
        <Route path="/productkitchen4/:productId" element={<ProductKitchen4 />} />
        <Route path="/productkitchen5/:productId" element={<ProductKitchen5 />} />
        <Route path="/productkitchen6/:productId" element={<ProductKitchen6 />} />
        <Route path="/productkitchen7/:productId" element={<ProductKitchen7 />} />
        <Route path="/productkitchen8/:productId" element={<ProductKitchen8 />} />

        <Route path="/productpet1/:productId" element={<ProductPet1 />} />
        <Route path="/productpet2/:productId" element={<ProductPet2 />} />
        <Route path="/productpet3/:productId" element={<ProductPet3 />} />
        <Route path="/productpet4/:productId" element={<ProductPet4 />} />
        <Route path="/productpet5/:productId" element={<ProductPet5 />} />
        <Route path="/productpet6/:productId" element={<ProductPet6 />} />

        <Route path="/productoffice1/:productId" element={<ProductOffice1 />} />
        <Route path="/productoffice2/:productId" element={<ProductOffice2 />} />
        <Route path="/productoffice3/:productId" element={<ProductOffice3 />} />
        <Route path="/productoffice4/:productId" element={<ProductOffice4 />} />
        <Route path="/productoffice5/:productId" element={<ProductOffice5 />} />

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
        <Route path="/customer_Giftcard" element={<Customer_GiftCard />} />
        <Route path="/customer_question" element={<Customer_question />} />
        <Route path="/customer_consult" element={<Customer_consult />} />
        <Route path="/customer_declare" element={<Customer_declare />} />
        <Route path="/index_admin/:id" element={<Index_admin />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/main/loginOK" element={<LoginOK />} />
        <Route path="/login_admin" element={<Login_admin />} />
        <Route path="/event" element={<Event />} />
        <Route path="/logoutAction" element={<LogoutAction />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;