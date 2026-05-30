import "./mypage_orderDetail.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_OrderDetail = () => {

  return (
    <div className="mpOrder_Detail_wrapper">
      <div className="mpOrder_Detail_Header">
        <Header_loginOK />  
      </div>     {/** mpOrder_Detail_Header end */}

      <div className="mpOrder_Detail_Content">
        <div className="mpOrder_Detail_body">
          <h2 className="subtitle">MY PAGE</h2>     {/** subtitle end */}

          <div className="mpOrder_Detail_top">
            <div className="customer_section">
              <div className="name"><strong>곽현지</strong>님은 MEMBER</div>
              <a href="#" className="my_edit">정보 수정하기</a>
              <ul className="point_section">
                <li><a href="#"><strong>쿠폰</strong> 5 장</a></li>
                <li><a href="#"><strong>적립금</strong> 1,600 원</a></li>
                <li><a href="#"><strong>포인트</strong> 0 P</a></li>  
              </ul>       {/** point_section end */}  

              <ul className="my_page_tab">
                <li>
                  <a href="#">
                    ORDER<br />
                    <strong className="tab_sub">주문내역</strong>  
                  </a>  
                </li>  
                <li>
                  <a href="#">
                    WISH LIST <br />
                    <strong className="tab_sub">관심상품</strong>
                  </a>
                </li>
                <li>
                  <a href="#">
                    COUPON <br />
                    <strong className="tab_sub">쿠폰</strong>
                  </a>
                </li>
                <li>
                  <a href="#">
                    MILEAGE<br />
                    <strong className="tab_sub">적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="#">
                    DEPOSITS<br />
                    <strong className="tab_sub"></strong>
                  </a>
                  <a href="#" className="tab_sub">예치금</a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    SECRET MILEAGE<br />
                    <strong className="tab_sub"></strong>
                  </a>
                  <a href="#" className="tab_sub">스페셜 적립금</a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    Q&amp;A<br />
                    <strong className="tab_sub">내 상품문의</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    MYBOARD <br />
                    <strong className="tab_sub">내 상품평</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    WITHDRAW <br />
                    <strong className="tab_sub">회원 탈퇴</strong>
                  </a>
                </li>
              </ul>     {/** my_page_tab end */}

            </div>      {/** customer_section end */}  
          </div>    {/** mpOrder_Detail_top end */}  

          <div className="order_detail">
            <h3 className="title first">주문번호 : 20260430-0F8A9</h3>  
            <p className="title_count tar">
              <span className="box_btn small white">
                <a href="#">계산서출력</a>  
              </span>   {/** box_btn small white end */}  
            </p>   {/** title_count tar end */}
          </div>    {/** order_detail end */}

        </div>     {/** mpOrder_Detail_body end */}  
      </div>    {/** mpOrder_Detail_Content end */}

      <div className="mpOrder_Detail_Footer">
        <Footer />
      </div>     {/** mpOrder_Detail_Footer end */}
    </div>        /** mpOrder_Detail_wrapper end */
  );
}; 

export default Mp_OrderDetail;