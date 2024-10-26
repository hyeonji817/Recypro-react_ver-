import "./Index.css";
import { Carousel } from 'react-bootstrap';

const Index = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img 
          className="d-block w-100"
          src="./assets/main1_2.png"
          alt="재활용품 쇼핑몰"
        />
        <Carousel.Caption>
          <p>재활용품 쇼핑몰</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
          className="d-block w-100"
          src="./assets/main2_2.png"
          alt="지구지킴의 선두주자!"
        />
        <Carousel.Caption>
          <p>지구지킴의 선두주자!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
          className="d-block w-100"
          src="./assets/cherryblossom_2.png"
          alt="재활용 상품으로 환경을 보존하자"
        />
        <Carousel.Caption>
          <p>재활용 상품으로 </p>
          <p>환경을 보존하자</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Index;