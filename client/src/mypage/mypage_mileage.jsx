import "./mypage_mileage.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

function formatUsedMileage(amount) {
  const usedAmount = Math.abs(Number(amount) || 0);
  return `${usedAmount > 0 ? '− ' : ''}${usedAmount.toLocaleString('ko-KR')} 원`;
}

const Mp_Mileage = () => {

  return (
    <div className="mpMileage_wrapper">
      <div className="mpMileage_Header">
        <Header_loginOK />  
      </div>      {/** mpMileage_Header end */}

      <div className="mpMileage_Content">
        <div className="mpMileage_body">
          <h2 className="subtitle">MY PAGE</h2>

          <div className="mpMileage_top">
	          <div className="customer_section">
		          <div className="name"><strong>곽현지</strong>님은 MEMBER</div>
		          <a href="/member/edit_step1.php" className="my_edit">정보 수정하기</a>
		          <ul className="point_section">
                <li><a href="/mypage_coupon"><strong>쿠폰</strong> 6 장</a></li>
                <li><a href="/mypage_mileage"><strong>적립금</strong> 3,030 원</a></li>
                <li><a href="#"><strong>포인트</strong> 0 P</a></li>
		          </ul>

              <ul className="mpMileage_tab">
                <li>
                  <a href="/orders" className="tab_title">
                    ORDER<br />
                    <strong className="tab_sub">주문내역</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_wishList" className="tab_title">
                    WISH LIST<br />
                    <strong className="tab_sub">관심상품</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_coupon" className="tab_title">
                    COUPON<br />
                    <strong className="tab_sub">쿠폰</strong>
                  </a>
                </li>
                <li>
                  <a href="/mypage_mileage" className="tab_title">
                    MILEAGE<br />
                    <strong className="tab_sub">적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
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
                    MYBOARD<br />
                    <strong className="tab_sub">내 상품평</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    WITHDRAW<br />
                    <strong className="tab_sub">회원 탈퇴</strong>
                  </a>
                </li>
              </ul>
	          </div>
          </div>

          <div className="milage_section">  
	          <h3 className="title first">적립금 내역</h3>
	          <div className="box_mp">
		          <p className="have">총 적립금<span>3,030</span></p>
	          </div>
	
            <table className="tbl_col">
	            <caption className="hidden">적립금 내역</caption>
              <colgroup>
                <col style={{ width: "12%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />                
                <col />
              </colgroup>

              <thead>
                <tr>
                  <th scope="col">적립/사용일</th>
                  <th scope="col">적립금액</th>
                  <th scope="col">사용금액</th>
                  <th scope="col">소계</th>
                  
                  <th scope="col">만료일</th>
                  
                  <th scope="col">내용</th>
                </tr>
              </thead>
              <tbody><tr>
                  <td>2025/07/24</td>
                  <td><strong>+ 500 원</strong></td>
                  <td><strong className="p_color">{formatUsedMileage(0)}</strong></td>
                  <td>3,030 원</td>                 
                  <td>2026/07/24</td>
                  <td className="tal">상품평 등록 (20250709-E6D79|HEART FRIENDS PUPPY T-SHIRT WHITE)</td>
                </tr>

                <tr>
                  <td>2025/07/13</td>
                  <td><strong>+ 530 원</strong></td>
                  <td><strong className="p_color">{formatUsedMileage(0)}</strong></td>
                  <td>2,530 원</td>
                  <td>2026/07/13</td>
                  <td className="tal">상품 구매 (20250709-E6D79 | HEART FRIENDS PUPPY T-SHIRT WHITE)</td>
                </tr>

                <tr>
                  <td>2025/05/14</td>
                  <td><strong>+ 2,000 원</strong></td>
                  <td><strong className="p_color">{formatUsedMileage(0)}</strong></td>
                  <td>2,000 원</td>
                  
                  <td>2026/05/14</td>
                  
                  <td className="tal">회원 가입</td>
                </tr>
              </tbody>
            </table>

	          <ul className="paging">
              <li></li>
              <li><strong>1</strong></li>
              <li></li>
            </ul>
          </div>
		    </div>
      </div>     {/** mpMileage_Content end */}

      <div className="mpMileage_Footer">
        <Footer />  
      </div>      {/** mpMileage_Footer end */}
    </div>     /** mpMileage_wrapper end */
  );
};

export default Mp_Mileage;