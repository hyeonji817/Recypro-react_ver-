import "./Popular_pd.css";
import soap from "../assets/popular/1_3-1_minimum.jpg";
import puppygum from "../assets/popular/puppy_gum_minimum.jpg";
import pubbag from "../assets/popular/puppy_pubbag_minimum.png";
import coffeeholder from "../assets/popular/coffee_holder_minimum.png";
import cleanball from "../assets/popular/clean_ball_minimum.jpg";
import rabbit_tumbler from "../assets/popular/rabbit_tumbler_minimum.png";
import eatsbetter from "../assets/popular/eats_better_minimum.jpg"; 
import fingersnap from "../assets/popular/finger_snap_minumum.png";

const Popular_pd = () => {
  return (
    /** 인기 상품리스트 */
    <div className="popular">
      <div className="row" id="productLists">
        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={soap} alt="유기농 설거지 비누"/>
            </a>
            <h2>유기농 설거지 비누</h2>
            <h5>
              <p>
                매일 사용하는 세제를 바꾸는 것<br />
                만으로도 자연과 나와 이웃이 행<br />
                복해집니다.
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">3,000원</h6>
            </span>
          </p>
        </div>
        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={puppygum} alt="강아지 개껌 간식"/>
            </a>
            <h2>강아지 개껌 간식</h2>
            <h5>
              <p>
                국내산 친환경 못난이 채소로 만<br />
                들어진 강아지 전용 간식이에요<br />
                ~♡
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">29,800원</h6>
            </span>
          </p>
        </div>
        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={rabbit_tumbler} alt="플라스틱 프리챌린지"/>
            </a>
            <h2>플라스틱 프리챌린지</h2>
            <h5>
              <p>
                귀여운 토끼캐릭터가 그려진 통<br />
                통한 텀블러☆ 마음이 따뜻해지<br />
                는 은은한 파스텔 색상
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">8,900원</h6>
            </span>
          </p>
        </div>
        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={cleanball} alt="제주 시카 클렌징볼"/>
            </a>
            <h2>제주 시카 클렌징볼</h2>
            <h5>
              <p>
                해조류 유래 성분으로 말랑, 탱<br />
                탱한 제형의 클렌징볼입니다!<br />
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">15,000원</h6>
            </span>
          </p>
        </div>
        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={coffeeholder} alt="드링크백 텀블러 백"/>
            </a>
            <h2>드링크백 텀블러 백</h2>
            <h5>
              <p>
                손을 편리하게, 마음은 뿌듯하<br />
                게! 간지나게 텀블러 가방 들고<br />
                다녀보아요
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">3,500원</h6>
            </span>
          </p>
        </div>
        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={pubbag} alt="강아지 배변봉투 케이스"/>
            </a>
            <h2>강아지 배변봉투 케이스 2종</h2>
            <h5>
              <p>
                나도 반려동물도 편해지는 요긴<br />
                한 산책용 파우치☆ 이제는 휴대<br />
                용 파우치처럼 편해요!
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">9,500원</h6>
            </span>
          </p>
        </div>
        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={eatsbetter} alt="비건 티쿠키"/>
            </a>
            <h2>비건 티쿠키</h2>
            <h5>
              <p>
                상큼하고 쫄깃한 건크랜베리와<br />
                부드러운 코코넛의 조화가 매력<br />
                적인 비건 티쿠키입니다☆
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">2,700원</h6>
            </span>
          </p>
        </div>
        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={fingersnap} alt="손목 터널증후군 운동"/>
            </a>
            <h2>손목 터널증후군 운동</h2>
            <h5>
              <p>
                핑거매직 하나로 11가지 다양한<br />
                운동을 즐겨보세요! 손목 무리없<br />
                이 편하게 운동가능!
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">14,980원</h6>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popular_pd;