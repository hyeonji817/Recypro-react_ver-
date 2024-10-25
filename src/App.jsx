import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./main/home";
import Login from "./account/Login";
import Products from "./shop/Products";
import Mypage from "./mypage/Mypage";
import Review from "./review/Review";
import Customer_main from "./customer/Customer_main";
import Index_admin from "./admin_page/index_admin";

// 1. "/" : 계정, 상품, 게시판, 마이페이지, 고객센터 등을 조회하는 메인페이지
// 2. "/login" : 계정을 관리하는 Login 페이지
// 3. "/Products" : 상품을 판매 및 관리하는 상품리스트 페이지 
// 4. "/mypage" : 개인정보를 조회하는 마이페이지 
// 5. "/review" : 게시글 작성, 수정, 신고 등을 담당하는 게시판 페이지 
// 6. "/customer" : 고객센터 관리페이지 
// 7. "/index_admin" : 관리자페이지 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/review" element={<Review />} />
      <Route path="/customer_main" element={<Customer_main />} />
      <Route path="/index_admin" element={<Index_admin />} />
    </Routes>
  );
};

export default App;