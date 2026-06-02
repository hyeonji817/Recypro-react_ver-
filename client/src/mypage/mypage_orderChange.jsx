import "./mypage_orderChange.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Mp_OrderChange = () => {

  return (
    <div className="mpOrder_Change_wrapper">
      <div className="mpOrder_Change_Header">
        <Header_loginOK />  
      </div>     {/** mpOrder_Change_Header end */}

      <div className="mpOrder_Change_Content">
        <div className="mpOrder_Change_body">
          <h2 className="subtitle">MY PAGE</h2>      {/** subtitle end */}  

          <div className="mpOrder_Change_top">
            <div className="customer_section">
              <div className="name">
                <strong>곽현지</strong>님은 MEMBER  
              </div>      {/** name end */}

              <a href="#" className="my_edit">
                정보 수정하기
              </a>      {/** my_edit end */}

              <ul className="point_section">
                <li>
                  <a href="#">
                    <strong>쿠폰</strong> 0 장
                  </a>
                </li>
                <li>
                  <a href="#">
                    <strong>적립금</strong> 0 원
                  </a>
                </li>
                <li>
                  <a href="#">
                    <strong>포인트</strong> 0 P
                  </a>
                </li>
              </ul>     {/** point_section end */}

              <ul className="mpOrder_Change_tab">
                <li>
                  <a href="/orders" className="tab_title">
                    ORDER
                    <br />
                    <strong className="tab_sub">주문내역</strong>
                  </a>
                </li>
                <li>
                  <a href="/wishlist" className="tab_title">
                    WISH LIST
                    <br />
                    <strong className="tab_sub">관심상품</strong>
                  </a>
                </li>
                <li>
                  <a href="/coupons" className="tab_title">
                    COUPON
                    <br />
                    <strong className="tab_sub">쿠폰</strong>
                  </a>
                </li>
                <li>
                  <a href="/mileage" className="tab_title">
                    MILEAGE
                    <br />
                    <strong className="tab_sub">적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="/deposits" className="tab_title">
                    DEPOSITS
                    <br />
                    <strong className="tab_sub">예치금</strong>
                  </a>
                </li>
                <li>
                  <a href="/special-mileage" className="tab_title">
                    SECRET MILEAGE
                    <br />
                    <strong className="tab_sub">스페셜 적립금</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    Q&amp;A
                    <br />
                    <strong className="tab_sub">내 상품문의</strong>
                  </a>
                </li>
                <li>
                  <a href="#" className="tab_title">
                    MYBOARD
                    <br />
                    <strong className="tab_sub">내 상품평</strong>
                  </a>
                </li>
                <li>
                  <a href="/withdraw" className="tab_title">
                    WITHDRAW
                    <br />
                    <strong className="tab_sub">회원 탈퇴</strong>
                  </a>
                </li>  
              </ul>      {/** mpOrder_Change_tab end */}
            </div>    {/** customer_section end */}  
          </div>    {/** mpOrder_Change_top end */}

          <div id="counsel_write">
            <form method="post" action="" encType="multipart/form-data" style={{ margin: "0px", textAlign: "center" }}>
              <input type="hidden" name="exec_file" value="" />
              <input type="hidden" name="ono" value="" />
              <input type="hidden" name="cate1" value="1" />
              <input type="hidden" name="cate2" value="1" />
              <input type="hidden" name="sbscr" value="N" />
              <input type="hidden" name="editor_code" value="" />

		          <fieldset>
			          <legend className="hidden">1:1문의 작성하기</legend>
			          <div>주문 변경
                  <input type="hidden" name="cate1" value="1" />
                  <input type="hidden" name="cate2" value="1" />
                </div>
			          <div>주문번호 : 20250828-ABB83</div>
                <div>주문상품 : CASHMERE BLENDED BASIC CARDIGAN LIGHT BLUE</div>
			
			          <div>
				          <label htmlFor="counsel_title">제목</label>
				          <input type="text" name="title" id="counsel_title" className="form_input block" placeholder="제목" />
			          </div>
			          <div className="content">
				          <label htmlFor="counsel_cnt">문의내용</label>
				          <textarea name="content" id="counsel_cnt" className="form_input block" placeholder="문의내용" style={{ display: "none" }}></textarea>
                  {/** <iframe class="editorFrm" id="editorFrm" frameborder="0" scrolling="no" src="/main/exec.php?exec_file=smartEditor/SmartEditor2Skin.php&amp;editor_code=counsel_temp_1756558247&amp;contentId=counsel_cnt&amp;neko_gr=counsel&amp;urlfix=Y" style="width: 100%; height: 406px;"></iframe> */}
			          </div>
			          <div>
				          <label htmlFor="counsel_file1">첨부파일 1</label>
				          <input type="file" name="upfile1" id="counsel_file1" className="form_input block" />
			          </div>
			          <div>
				          <label htmlFor="counsel_file2">첨부파일 2</label>
				          <input type="file" name="upfile2" id="counsel_file2" className="form_input block" />
			          </div>	
		          </fieldset>

		          <div className="btn">
			          <span className="box_btn large w150"><input type="submit" value="확인" /></span>
			          <span className="box_btn large w150 white"><a href="/">취소</a></span>
		          </div>
	          </form>
    
          </div>      {/** #counsel_write end */}
        </div>     {/** mpOrder_Change_body end */}  
      </div>    {/** mpOrder_Change_Content end */}

      <div className="mpOrder_Change_Footer">
        <Footer />  
      </div>     {/** mpOrder_Change_Footer end */}
    </div>      /** mpOrder_Change_wrapper end */
  );
};

export default Mp_OrderChange;