import "./Home.css";
import Header from "./Header";
import Index from "./Index";
import Popular_pd from "./Popular_pd";
import Shop_event from "./shop_event";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="wrapper">
      <Header />
      {/* 배너 컴포넌트 */}
      <Index />

      {/* 인기 상품 섹션 */}
      <Popular_pd />

      {/* 쇼핑 이벤트 섹션 */}
      <Shop_event />
      <Footer />
    </div>
  );
};

export default Home;