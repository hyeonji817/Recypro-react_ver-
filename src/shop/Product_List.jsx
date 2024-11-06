import "./Product_List.css";
import Button from "../pages/Button";
import soap from "../assets/shop/1_3-1_minimum.jpg";
import towel from "../assets/shop/3_towel_minimum.png";
import wash from "../assets/shop/8_wash-6_minimum.jpg";
import poobRefill from "../assets/shop/5_puppy_poobrefill_minimum.png";
import Net from "../assets/shop/9_cbag-1_minimum.jpg"; 
import plastic_diet from "../assets/shop/6_plastic_diet_minimum.png";
import memo_paper from "../assets/shop/memo_paper_minimum.jpg"; 
import soapnet from "../assets/shop/2_soapnet_minimum.png";
import puppygum from "../assets/shop/puppy_gum_minimum.jpg";
import pubbag from "../assets/shop/4_puppy_pubbag_minimum.png";
import coffeeholder from "../assets/shop/coffee_holder_minimum.png";
import cleanball from "../assets/shop/clean_ball_minimum.jpg";
import rabbit_tumblur from "../assets/shop/rabbit_tumblur_minimum.png";
import eatsbetter from "../assets/shop/eats_better_minimum.jpg"; 
import fingersnap from "../assets/shop/finger_snap_minimum.png";
import produceBag from "../assets/shop/7_cbag-3_minimum.jpg"; 
import { useBeforeUnload, useNavigate } from "react-router-dom";

const Product_List = () => {
  const nav = useNavigate();

  return (
    <div className="Product_List_wrap">
      <div className="productLists_title">
          <h1>상품목록</h1>
      </div>
      <div className="row" id="productLists">
        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={soap} alt="유기농 설거지 비누" />
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
              <img src={towel} alt="무형광 수건"/>
            </a>
            <h2>먼지 안 나는 수건</h2>
            <h5>
              <p>
                물기많은 긴 머리도 OK! 흡수력, 통풍이<br />
                우수한 우리나라 강화 소창 수건<br />
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">5,900원</h6>
            </span>
          </p>
        </div>

        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={rabbit_tumblur} alt="플라스틱 프리챌린지"/>
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
              <img src={wash} alt="국산 천연 일회용 수세미"/>
            </a>
            <h2>국산 천연 일회용 수세미</h2>
            <h5>
              <p>
                옥수수로 만들어진, 자연분해 일회용 수<br />
                세미. 지금까지의 수세미와는 다르다!<br />
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">10,000원</h6>
            </span>
          </p>
        </div>

        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={poobRefill} alt="풉백 생분해 리필"/>
            </a>
            <h2>풉백 생분해 리필</h2>
            <h5>
              <p>
                나도 반려동물도 환경도 모두가<br /> 
                건강해지는 진짜 생분해 봉투! 
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
              <img src={pubbag} alt="강아지 배변봉투 케이스"/>
            </a>
            <h2>애견 배변봉투 케이스 2종</h2>
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
              <img src={eatsbetter} alt="더스트백 3종 그물망 광목 천"/>
            </a>
            <h2>더스트백 그물망 광목 천</h2>
            <h5>
              <p>
                좋은 한 제품, 오래오래 튼튼한<br />
                2중 원단, 30년 장인과 만든 독<br />
                자적인 세이플래닛 원단
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">14,900원</h6>
            </span>
          </p>
        </div>

        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={puppygum} alt="못난이 채소 개껌"/>
            </a>
            <h2>강아지 개껌 간식</h2>
            <h5>
              <p>
                국내산 친환경 못난이 채소로 만<br />
                들어진 강아지 전용 간식이에요~♡<br />
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
              <img src={coffeeholder} alt="드링크 텀블러 백"/>
            </a>
            <h2>드링크 텀블러 백</h2>
            <h5>
              <p>
              손을 편리하게, 마음은 뿌듯하게! <br />
              간지나게 텀블러 가방 들고 다녀보아요
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
              <img src={cleanball} alt="제주 시카 클렌징볼"/>
            </a>
            <h2>제주 시카 클렌징볼</h2>
            <h5>
              <p>
                해조류 유래 성분으로 말랑, 탱탱한 제형<br />
                의 클렌징볼입니다!
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
              <img src={soapnet} alt="면 비누망"/>
            </a>
            <h2>면 비누망</h2>
            <h5>
              <p>
              면 비누망으로, 1장의 천연 비누를 <br /> 
              감싸는 그물망입니다. <br />
              편하게 보관하세요!
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">2,300원</h6>
            </span>
          </p>
        </div>

        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={eatsbetter} alt="이츠베러 티쿠키 썸머베리"/>
            </a>
            <h2>비건 티쿠키</h2>
            <h5>
              <p>
                상큼하고 쫄깃한 건크랜베리와 부<br />
                드러운 코코넛의 조화가 매력적인 <br />
                비건 티쿠키입니다☆
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
              <img src={plastic_diet} alt="다이어트 4종세트 키트"/>
            </a>
            <h2>다이어트 4종세트 키트</h2>
            <h5>
              <p>
                일회용 비닐백 대신 아윌비백 <br />
                유기농 면주머니☆ <br />
                휴대용 면주머니를 사용하자
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">22,500원</h6>
            </span>
          </p>
        </div>

        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={memo_paper} alt="비목재 메모패드"/>
            </a>
            <h2>비목재 메모패드</h2>
            <h5>
              <p>
                버려지는 사탕수수 부산물로 제작된<br />
                친환경 비접착식 메모지입니다.
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
              <img src={fingersnap} alt="손목 터널증후군 운동"/>
            </a>
            <h2>손목 터널증후군 운동</h2>
            <h5>
              <p>
                핑거매직 하나로 11가지 다양한<br />
                운동을 즐겨보세요! 손목 무리없<br />
                이 편하게 운동 가능!
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">14,940원</h6>
            </span>
          </p>
        </div>

        <div className="col-md-3" id="product_list">
          <div className="sub_explain">
            <a href="#">
              <img src={produceBag} alt="아윌비백"/>
            </a>
            <h2>재활용 프로듀스백 면 주머니</h2>
            <h5>
              <p>
                비닐봉지에 대처하는 미니멀라이<br />
                프 장바구니. 일회용 비닐봉지 <br /> 
                대신 편하게 쓰자
              </p>
            </h5>
          </div>
          <p className="sub">
            <a href="#" className="button-info">
              상세 정보 &raquo;
            </a>
            <span className="sub_menu">
              <h6 id="sub_menu">1,500원</h6>
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Product_List;