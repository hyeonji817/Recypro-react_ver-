import "./Index.css";
// import { Carousel } from 'react-bootstrap';

const Index = () => {
  return (
    <div className="wrap_center" id="wrap-center">
      <div className="banner-container" id="banner-container">
        <div className="img_wrap">
          <ul className="rolling_imgs">
            <li>
              <img src="./../assets/main1_2.png"/>
              <p className="text">재활용품 쇼핑몰</p>
            </li>
            <li>
              <img src="./../assets/main2_2.png"/>
              <p className="text">지구지킴의 선두주자!</p>
            </li>
            <li>
              <img src="./../assets/cherryblossom_2.png"/>
              <p className="text">
                재활용 상품으로 <br /> 환경을 보존하자
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;