import { useEffect, useState } from "react";
import "./Products1.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Products_Life from "./Products_Life";
import Footer from "../main/Footer";

const Products1 = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);    // 페이지가 이동될 때, 최상단으로 위치잡게끔 구현하는 메소드 기능
    // 렌더링 직후 isReady를 true로 설정
    setIsReady(true);   // 실행시킴
  }, []);

  // 준비 안 됐을 때는 아무것도 렌더링하지 않음
  if (!isReady) return null;

  return (
    <div className="Products1_wrap">
      <div className="Products1_Header">
        <Header_loginOK />
      </div>
      <div className="Products_Life">
        <Products_Life />
      </div>
      <div className="Products1_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Products1;