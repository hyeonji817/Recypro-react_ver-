import "./shop_event.css";
import Button from "../pages/Button";
import event from "./event";
import gift from "../assets/shop/gift.png";
import wallet from "../assets/shop/wallet_1.png";
import kakaotalk from "../assets/shop/kakaotalk.png";
import { useBeforeUnload, useNavigate } from "react-router-dom";

const Shop_event = () => {
  const nav = useNavigate();

  return (
    <div className="coupon">
      <ul>
        <li>
          <span className="gift">
            <img src={gift} alt="선물 아이콘" />
          </span>
          <span className="wallet">
            <img src={wallet} alt="지갑 아이콘" />
          </span>
        </li>
        <li>
          <div className="event_title">
            <h2>즐거운 쇼핑 Tip ★</h2>
          </div>
          <div className="event_info">
            <Button 
              onClick={() => nav("/event")}  /** 임의로 구현 */
              text={"더 많은 혜택 보러가기"}
              type={"event"}
            />
          </div>
        </li>
        <li>
          <div className="kakaotalk_plus">
            <div className="kakaotalk_title">
              <h5>카카오톡 플러스 친구 추가 혜택 ★</h5>
            </div>
            <div className="kakaotalk_icon">
              <img src={kakaotalk} alt="카카오톡 아이콘" />
            </div>
            <span className="kakaotalk_info">
              <h5>20% 할인쿠폰 증정!</h5>
            </span>
            <div className="kakaotalk_go">
              <a href="#">
                <h6>카카오톡 플친 바로가기</h6>
              </a>
            </div>
          </div>
        </li>
        <li>
          <div className="join_event">
            <div className="join_event_title">
              <h5>리싸이프로 신규가입 혜택★</h5>
            </div>
            <div className="join_info">
              <h4>10,000원 + 각종 할인쿠폰 증정!</h4>
            </div>
            <div className="join_go">
              <a href="#">
                <h6>회원가입 하러가기 ▷</h6>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Shop_event;