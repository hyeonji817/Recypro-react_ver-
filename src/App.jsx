import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./main/home";
import Login from "./account/Login";
import Register from "./account/register";
import find_id from "./account/find_id";
import Products from "./shop/Products";
import Mypage from "./mypage/Mypage";
import Review from "./review/Review";
import Customer_main from "./customer/Customer_main";
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
        <Route path="/find_id" element={<find_id />} />
        <Route path="/products" element={<Products />} />
        <Route path="/mypage/:id" element={<Mypage />} />
        <Route path="/review" element={<Review />} />
        <Route path="/customer_main" element={<Customer_main />} />
        <Route path="/index_admin/:id" element={<Index_admin />} />
        <Route path="/loginOK" element={<loginOK />} />
        <Route path="/event" element={<Event />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;