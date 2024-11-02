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
      <Index />
      <Popular_pd />
      <Shop_event />
      <Footer />
    </div>
  );
};

export default Home;