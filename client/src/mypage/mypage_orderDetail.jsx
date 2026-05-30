import "./mypage_orderDetail.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const API = "http://localhost:5003"; 

const formatWon = (value) => Number(value || 0).toLocaleString(); 
const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("ko-KR");
};

const imgUrl = (path) => {
  if (!path) return "https://www.rolarola.com/_image/_default/prd/noimg3.gif";
  if (String(path).startsWith("http")) return path;
  return `${API}/uploads/${String(path).replace(/^\.\//, "")}`;
};

const statusText = (status) => {
  switch (status) {
    case "PAID":
      return "결제완료";
    case "PENDING":
      return "결제대기";
    case "CANCELLED":
      return "주문취소";
    case "FAILED":
      return "결제실패";
    default:
      return status || "-";
  }
};

const payMethodText = (method) => {
  switch (method) {
    case "TOSS":
      return "토스결제";
    case "CARD":
      return "카드결제";
    case "BANK":
      return "무통장입금";
    default:
      return method || "-";
  }
};

const Mp_OrderDetail = () => {
  const { orderId } = useParams(); 
  const navigate = useNavigate(); 

  const [order, setOrder] = useState(null); 
  const [summary, setSummary] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true); 

        const [orderRes, summaryRes] = await Promise.all([
          axios.get(`${API}/api/mypage/orders/${orderId}`, {
            withCredentials: true,
          }),
          axios.get(`${API}/api/mypage/summary`, {
            withCredentials: true,
          }),
        ]);

        setOrder(orderRes.data);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error(err); 
        setError(
          err.response?.data?.message || "주문 상세 정보를 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (loading) {
    return <div>주문 정보를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>주문 정보가 없습니다.</div>;
  }

  const buyer = order.buyer || {};
  const receiver = order.receiver || {};
  const items = order.items || [];

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

              <ul className="mpOrder_Detail_tab">
                <li><a href="/orders" className="tab_title">ORDER<br /><strong className="tab_sub">주문내역</strong></a></li>
                <li><a href="/wishlist" className="tab_title">WISH LIST<br /><strong className="tab_sub">관심상품</strong></a></li>
                <li><a href="/coupons" className="tab_title">COUPON<br /><strong className="tab_sub">쿠폰</strong></a></li>
                <li><a href="/mileage" className="tab_title">MILEAGE<br /><strong className="tab_sub">적립금</strong></a></li>
                <li><a href="/deposits" className="tab_title">DEPOSITS<br /><strong className="tab_sub">예치금</strong></a></li>
                <li><a href="/special-mileage" className="tab_title">SECRET MILEAGE<br /><strong className="tab_sub">스페셜 적립금</strong></a></li>
                <li><a href="#" className="tab_title">Q&amp;A<br /><strong className="tab_sub">내 상품문의</strong></a></li>
                <li><a href="#" className="tab_title">MYBOARD<br /><strong className="tab_sub">내 상품평</strong></a></li>
                <li><a href="/withdraw" className="tab_title">WITHDRAW<br /><strong className="tab_sub">회원 탈퇴</strong></a></li>
              </ul>     {/** my_page_tab end */}

            </div>      {/** customer_section end */}  
          </div>    {/** mpOrder_Detail_top end */}  

          <div className="order_detail" id="order_detail">
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
                      <img src="https://rolarola.wisacdn.com/_data/product/202503/19/decd0b2b8a2a1feb7a436ca0c942e65d.jpg" width="52" height="70" border="0" />
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

            {/** 주문자 정보 및 배송지 정보 */}
            <div className="area_left">
              <h3 className="title">주문자 정보</h3>
              <table className="tbl_order">
                <caption className="hidden">주문자 정보</caption>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col />
                </colgroup>  
                <tbody>
                  <tr>
                    <th scope="row">주문일자</th>
                    <td>2026/04/30</td>
                  </tr>
                  <tr>
                    <th scope="row">주문하시는 분</th>
                    <td>곽현지</td>
                  </tr>
                  <tr>
                    <th scope="row">전화번호</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">휴대전화번호</th>
                    <td>01094398468</td>
                  </tr>
                </tbody>
              </table>     {/** tbl_order end */}
              
              <h3 className="title">배송지 정보</h3>      {/** title end */}
              <table className="tbl_order">
                <caption className="hidden">배송지 정보</caption>   {/** hidden end */}
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">받으시는 분</th>
                    <td>곽현지</td>
                  </tr>
                  <tr>
                    <th scope="row">전화번호</th>
                    <td>0515178468</td>
                  </tr>
                  <tr>
                    <th scope="row">휴대전화번호</th>
                    <td>01094938468</td>
                  </tr>
                  <tr>
                    <th scope="row">주소</th>
                    <td>[08786]<br />서울 관악구 청룡3길 10 영빌딩 603호</td>
                  </tr>
                  <tr>
                    <th scope="row">배송시요청사항</th>
                    <td className="break">문 앞에 놔 주세요</td>  
                  </tr>  
                </tbody>  
              </table>       {/** tbl_order end */}
            </div>     {/** area_left end */}

            {/** 결제정보 및 결제수단 정보 */}
            <div className="area_right">
              <div className="box">
                <h3 className="title first">결제 정보</h3>     {/** title first end */}
                <table className="tbl_order2">
                  <caption className="hidden">결제 정보</caption>      {/** hidden end */}
                  <colgroup>
                    <col style={{ width: "50%"}} />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">상품합계금액</th>
                      <td>69,000 원</td>
                    </tr>
                    <tr>
                      <th scope="row">배송비</th>
                      <td>0 원</td>
                    </tr>
                    <tr>
                      <th scope="row">적립금 결제</th>
                      <td>- 6,890 원</td>
                    </tr>
                    <tr>
                      <th scope="row">쿠폰할인 금액</th>
                      <td>- 6900 원 ([온라인전용] 멤버십_10% 할인 쿠폰)</td>
                    </tr>
                    <tr className="total_row">
                      <th scope="row" className="total">총 결제금액액</th>
                      <td className="total">
                        <strong className="total_price">55,210</strong> 원
                      </td>     {/** total end */}
                    </tr>   {/** total_row end */}
                    <tr className="total_row">
                      <th scope="row">총 적립금</th>
                      <td>1,100 원</td>  
                    </tr>       {/** total_row end */}  
                  </tbody>  
                </table>      {/** tbl_order2 end */}  

                <h3 className="title line">결제수단 정보</h3>      {/** title line end */}
                <table className="tbl_order2">
                  <caption className="hidden">결제수단 정보</caption>
                  <colgroup>
                    <col style={{ width: "25%" }} />
                    <col />
                  </colgroup>  
                  <tbody>
                    <tr>
                      <th scope="row">결제방법</th>
                      <td>토스계좌결제</td>
                    </tr>
                    <tr>
                      <th scope="row">거래정보</th>
	                    <td>tosspay (1) <strong>[<a href="#">결제영수증</a>]</strong></td>
                    </tr>
                    <tr>
                      <th scope="row">입금일자</th>
                      <td>2026/04/30</td>
                    </tr>
                  </tbody>
                </table>      {/** tbl_order2 end */}
              </div>     {/** box end */}  
            </div>    {/** area_right end */}

            {/** 주문 1:1 문의 */}
            <div id="counsel">
              <h3 className="title">주문 1:1문의</h3>
              <table className="tbl_col">
                <caption className="hidden">1:1문의내역</caption>
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">번호</th>
                    <th scope="col">답변</th>
                    <th scope="col">분류</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
			              <td>완료</td>
			              <td>주문 변경</td>
			              <td className="tal">
                      <a href="#"><b>주소지 변경 요청드립니다</b></a> 
                      <img src="https://www.rolarola.com/_skin/rolarola_250716/img/shop/file.gif" border="0" alt="첨부파일" />
                    </td>
			              <td>2026/05/02</td>
                  </tr>
                  <tr>
                    <td colSpan={5} className="none_style">
				              <div id="revQna18010" className="cnt_hidden">
					              <p className="qna_subject">문의내용</p>
					              <div className="qna_cnt">
						              <div>제가 주소를 잘못 입력했는데, 주소지를 &rsquo;서울시 관악구 청룡3길 10 영빌딩 603호&rsquo;로 변경 부탁드립니다.&nbsp;</div>
						              <div>
                            <img src="https://www.rolarola.com/_data/qna/202605/02/eea5e7511418bcddab9b7704880de4ab.png" border="0" id="cs_img18010_1" />
                          </div>
						              <div></div>
					              </div>      {/** qna_cnt end */}
					              <p className="qna_subject">답변내용</p>
					              <div className="qna_cnt"><div>    {/** qna_cnt end */}
                        <span style={{ fontSize: "12px" }}>곽현지 고객님 안녕하세요,</span>
                      </div>
                      <div>
                        <span style={{ fontSize: "12px" }}>로라로라 매니저 백승미입니다.&nbsp;</span>
                      </div>
                      <div>
                        <span style={{ fontSize: "12px" }}><br /></span>
                      </div>
                      <div>
                        <span style={{ fontSize: "12px" }}>주문번호 : 20260501-6C36D</span>
                      </div>
                      <div>
                        <span style={{ fontSize: "12px" }}>변경주소 : 서울 관악구 청룡3길 10
                          <span style={{ whiteSpace:"pre" }}></span>
                          영빌딩 603호
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: "12px" }}><br /></span>
                      </div>
                      <div>
                        <span style={{ fontSize: "12px" }}>요청하신 정보로 변경해 드렸습니다.</span>
                      </div>
                      <div>
                        <span style={{ fontSize: "12px" }}>마이페이지 주문 내역에서 확인해 주시기 바랍니다.&nbsp;</span>
                      </div>
                      <div>
                        <span style={{ fontSize: "12px" }}><br /></span>
                      </div>
                      <div>
                        <span style={{ fontSize: "12px" }}>기타 궁금한 내용은 언제든 문의해 주시고요,</span>
                      </div>
                      <div>
                        <span style={{ fontSize: "12px" }}>앞으로도 로라로라에 많은 관심 부탁드립니다. 감사합니다.&nbsp;</span>
                      </div>
                    </div>
				          </div>
			          </td>
  
                  </tr>  
                </tbody>  
              </table>     {/** tbl_col end */}  

              <div className="btn">
                <span className="box_btn white">
                  <a href="#">주문문의</a>
                </span>
			          <span className="box_btn white">
                  <a href="#">주문변경</a>
                </span>
			          <span className="box_btn white">
                  <a href="#">취소/환불신청</a>
                </span> 
			          <span className="box_btn white">
                  <a href="#">반품신청</a>
                </span>
			          <span className="box_btn fr">
                  <a href="#">주문목록</a>    
                </span>
              </div>     {/** btn end */}
            </div>      {/** #counsel end */}

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