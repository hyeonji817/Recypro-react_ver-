import "./Home.css";
import Header from "./Header";
import NewProducts from "./newProducts";
import Main_Banner1 from "./Main_Banner1";
import Main_Banner2 from "./Main_Banner2";
import Main_Bottom from "./Main_Bottom";
import BestProducts from "./BestProducts";

import Footer from "./Footer";

const Home = () => {
  return (
    <div className="wrap_Home">
      <div className="Header">
        <Header />
      </div>
      <div className="main_Banner1">
        <Main_Banner1 />
      </div> 
      <div className="newProducts">
        <NewProducts />
      </div>
      <div className="main_Banner2">
        <Main_Banner2 />
      </div>
      <div className="bestProducts">
        <BestProducts />
      </div>
      <div className="main_Bottom">
        <Main_Bottom />
      </div> 
      <div className="Footer">
        <Footer />
      </div>    
    </div>
  );
};

export default Home;