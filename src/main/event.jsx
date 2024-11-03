import "./event.css";
import dollar from "../assets/shopdetail/dollar.jpg";
import recycle from "../assets/shopdetail/recycle_2.jpg";

const event = () => {
  return (
    /** 신규회원 특별 혜택 레이아웃 */
    <div className="wrapper_event">
      <div className="special_event">
        <h4>New Membership Benefits</h4>
        <h2>11월 겨울맞이 <span className="mint">신규회원</span> <br />
        특별한 혜택!
        </h2>

        <div className="give_coupon">
          <a>
            신규가입 시 할인쿠폰 증정!
          </a>
        </div>
        <h5>2024.11.08 ~ 11.30까지</h5>
      </div>
      
      <div className="special_event2">
        <div className="special_event2_notice">
          <h3>
            _<br /><br />
            마지막 계절을 맞아 <br />
            리싸이프로 <span className="new_event">신규 가입하는 고객님께</span> <br />
            <span className="new_event">특별한 혜택</span>을 드립니다★
            <br />
            <br />
            11월 기간동안 회원가입 하시면 <br />
            <span className="new_event">최대 30% 할인쿠폰</span>을 드려요!
            <br />
            <br />
          </h3>
        </div>
      </div>

      <div className="give_conponList">
        <div className="couponList_title">
          <h3>[BENEFIT]</h3>
        </div>

        <div className="first_coupon">
          <div className="coupon_title1">
            <h3>리싸이프로</h3>
          </div>

          <div className="coupon_img1">
            <span className="recycle">
              <img src={recycle} alt="리싸이클"/>
            </span>
            <span className="dollar">
              <img src={dollar} alt="달러"/>
            </span>
            <div className="_10percent_off">
              <h3>10% OFF</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="second_coupon">
        <div className="coupon_title2">
          <h3>리싸이프로</h3>
        </div>

        <div className="coupon_img2">
          <span className="recycle">
            <img src={recycle} alt="리싸이클"/>
          </span>
          <span className="dollar">
            <img src={dollar} alt="달러" />
          </span>
          <div className="_20percent_off">
            <h3>20% OFF</h3>
          </div>
        </div>
      </div>

      <div className="third_coupon">
        <div className="coupon_title3">
          <h3>리싸이프로</h3>
        </div>

        <div className="coupon_img3">
          <span className="recycle">
            <img src={recycle} alt="리싸이클"/>
          </span>
          <span className="dollar">
            <img src={dollar} alt="달러"/>
          </span>
          <div className="_30percent_off">
            <h3>30% OFF</h3>
          </div>
        </div>
      </div>

      <div className="ten_thousands_coupon">
        <div className="coupon_title4">
          <h3>리싸이프로</h3>
        </div>

        <div className="dollar2">
          <img src={dollar} alt="달러" />
          <h6>적립금</h6>
        </div>

        <div className="count_money">
          <h3>10,000</h3>
        </div>
      </div>
    </div>
  );
};

export default event;