import "./orderOK.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import beepBeep_Toy1 from "../assets/pet/1. beepBeep_Toy1.jpg"; 

const OrderOK = () => {
  return (
    <div className="orderOK_wrapper">
      <div className="orderOK_Header">
        <Header_loginOK />  
      </div>  {/** orderOK_Header end */}

      <div className="orderOK_Body">
        <div className="orderOK_Content">
          <h2 className="subtitle">주문완료</h2>    {/** subtitle end */}
          <div className="orderfin">    
            <h3>주문내역</h3>
	          <div className="box">
		          <table className="tbl_order2">
			          <caption className="hidden">결제정보</caption>    {/** hidden end */}
			          <colgroup>
				          <col style={{ width: "50%" }} />
				          <col />
			          </colgroup>

			          <tbody>
				          <tr>
					          <th scope="row">주문번호</th>
					          <td><strong>20250709-E6D79</strong></td>
				          </tr>
				          <tr>
					          <th scope="row">총 상품구매금액</th>
					          <td>7,110 원</td> {/** 상품 총 합계 */}
				          </tr>
				          <tr>
					          <th scope="row">배송비</th>
					          <td>3,000 원</td>
				          </tr>
				          <tr>
					          <th scope="row">총 주문금액</th>
					          <td>10,110 원</td> {/** 배송비 포함 합계 */}
				          </tr>
				          <tr>
					          <th scope="row">총 결제금액</th>
					          <td>10,110 원</td> {/** 실결제금액 */}
				          </tr>
			          </tbody>
		          </table>
	          </div>    {/** box end */}

	          <div className="info">
		          <p className="email">
                고객님의 소중한 주문정보를 <strong>guswl0817@naver.com</strong>로 발송해 드렸습니다.<br />
                (비회원으로 주문하신 경우 주문 확인시 주문번호가 필요하오니 꼭 메모해 두세요.)
              </p>    {/** email end */}
		          <form method="post" style={{ margin: "0px" }}>
	              <input type="hidden" name="exec_file" value="" />
		          </form>
	          </div>    {/** info end */}
	
            <table className="tbl_col prd">
	            <caption>주문상품</caption>
	            <colgroup>
		            <col style={{ width: "10%" }} />
		            <col />
		            <col style={{ width: "12%" }} />
		            <col style={{ width: "12%" }} />
		            <col style={{ width: "12%" }} />
		            <col style={{ width: "12%" }} />
	            </colgroup>

	            <thead>
		            <tr>
			            <th scope="col" colSpan={2}>상품명</th>
			            <th scope="col">가격</th>
			            <th scope="col">수량</th>
			            <th scope="col">총금액</th>
			            <th scope="col">적립금</th>
		            </tr>
	            </thead>

	            <tbody>
                <tr>
			            <td>
                    <a href="#">
                      <img src={beepBeep_Toy1} width={60} height={80} />
                    </a>
                  </td>
			            <td className="tal">
                    <a href="#">[지구pick] 바잇미 접이식 실리콘 휴대용 물컵 파스텔 </a><br />
                    색상 : 그린<br />
                  </td>   {/** tal end */}
			            <td>7,110 원<br /></td>
			            <td>1</td>
			            <td>10,110 원</td>
			            <td>158 원</td>
		            </tr>
                <tr></tr>
              </tbody>
            </table>    {/** tbl_col prd end */}

	          <div className="btn">
		          <span className="box_btn large"><a href="#">주문조회하기</a></span>   {/** box_btn large end */}
		          <span className="box_btn large white"><a href="/">쇼핑계속하기</a></span>   {/** box_btn large white end */}
	          </div>  {/** btn end */}
          </div>    {/** orderfin end */}
        </div>   {/** orderOK_Content end */}
      </div>    {/** orderOK_Body end */}

      <div className="orderOK_Footer">
        <Footer />  
      </div>  {/** orderOK_Footer end */}
    </div>   /** orderOK_wrapper end */
  );
};

export default OrderOK;