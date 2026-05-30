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

            <table className="tbl_col prd">
              <caption className="hidden">주문상품</caption>  
              <colgroup>
                <col style={{ width: "100px" }} />
		            <col />
		            <col style={{ width: "15%" }} />
		            <col style={{ width: "12%" }} />
		            <col style={{ width: "5%" }} />
		            <col style={{ width: "12%" }} />
		            <col style={{ width: "10%" }} />
		            <col style={{ width: "10%" }} />
		            <col style={{ width: "10%" }} />
              </colgroup>

              <thead>
                <tr>
                  <th scope="col" colSpan={2}>상품명</th>
			            <th scope="col">옵션</th>
			            <th scope="col">가격</th>
			            <th scope="col">수량</th>
			            <th scope="col">총 금액</th>
			            <th scope="col">적립금</th>
			            <th scope="col">상태</th>
			            <th scope="col">후기작성</th>
                </tr>
              </thead>

              <tbody>
                <tr>
			            <td className="img">
                    <a href="#">
                      <img src="https://rolarola.wisacdn.com/_data/product/202503/19/decd0b2b8a2a1feb7a436ca0c942e65d.jpg" width="52" height="70" barder="0" />
                    </a>
                  </td>     {/** img end */}
			            <td className="tal"><a href="#">BASIC LINEN CARDIGAN PINK</a></td>
			            <td> 색상:핑크<br />사이즈:FREE  <div></div></td>
			            <td>69,000 원</td>
			            <td>1</td>
			            <td>69,000 원</td>
			            <td><img src="https://www.rolarola.com/_skin/rolarola_250716/img/shop/milage.gif" alt="적립금" /> 1,100 원</td>
			            <td>
				            배송완료
					          <br />
                    <span className="box_btn small white btn_delivery">
                      <a href="#" target="_blank">배송조회</a>
                    </span>
                    <br />
                    <a href="#" target="_blank">CJ대한통운<br />511753548344</a>
			            </td>
			            <td>
                    <span className="box_btn">
                      <a href="#" className="crema-new-review-link crema-applied" data-product-code="5214" data-install-method="hardcoded" data-observed-install="false" data-applied-widgets="[&quot;.crema-new-review-link&quot;]">후기작성</a>
                    </span>
                  </td>
		            </tr>

		            <tr>
			            <td className="img">
                    <a href="#">
                      <img src="https://www.rolarola.com/_image/_default/prd/noimg3.gif" width="70" height="70" border="0" />
                    </a>
                  </td>     {/** img end */}
			            <td className="tal"><a href="#">(사은품) 장원영 포토카드</a></td>   {/** tal end */}
			            <td> 멀티 ／ FREE  <div></div></td>
			            <td>0 원</td>
			            <td>1</td>
			            <td>0 원</td>
			            <td><img src="https://www.rolarola.com/_skin/rolarola_250716/img/shop/milage.gif" alt="적립금" /> 0 원</td>
			            <td>
				            배송완료
					          <br />
                    <span className="box_btn small white btn_delivery">
                      <a href="#" target="_blank">배송조회</a>
                    </span>
                    <br />
                    <a href="#" target="_blank">CJ대한통운<br />511753548344</a>
			            </td>
			            <td>
                    <span className="box_btn">
                      <a href="#" className="crema-new-review-link crema-applied" data-product-code="6351" data-install-method="hardcoded" data-observed-install="false" data-applied-widgets="[&quot;.crema-new-review-link&quot;]">후기작성</a>
                    </span>
                  </td>
		            </tr>
              </tbody>
            </table>     {/** tbl_col prd end */}

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