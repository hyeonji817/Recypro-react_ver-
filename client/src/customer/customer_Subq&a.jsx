import "./customer_Subq&a.css"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

// 이미지 
import iNew from "../assets/i_new.jpg"; 
import iSecret from "../assets/i_secret.jpg"; 
import ReplyBefore from "../assets/reply_before.jpg";

const Customer_Subqa = () => {
  return (
    <div className="csSub_qa_wrapper">
      <div className="csSub_qa_Header">
        <Header_loginOK />
      </div>
      <div className="csSub_qa_Content">
        <div className="csSub_qaBody">
          <h2 className="subtitle">Q&amp;A</h2>

          {/** 마이페이지 메뉴 */}
          <div id="qna_list" className="qna_list">
            <table className="tbl_col board">
              <caption className="hidden">상품문의</caption>
              <colgroup>
                <col style={{ width: "5%" }} />
                <col />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">답변여부</th>
                  <th scope="col">작성자</th>
                  <th scope="col">작성일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="subject tal">
                    [<a href="#">배송일정</a>] 
                    <a href="#">배송일정</a> 
                    <img src={iSecret} border="0" alt="" />  
                    <img src={iNew} border="0" alt="최신" />
                  </td>
                  <td>
                    <img src={ReplyBefore} border="0" alt="답글없음" />
                  </td>
                  <td className="name"></td>
                  <td>2025/07/05</td>
                </tr>
                <tr>
                  <td colSpan={5} className="qna_cnt">
                    <div id="revQna10218" style={{ display: "block" }}>
                      <div className="question">
                        <span className="icon">Q</span> 
                        제가 저번주에 볼륨 슬리브 핑크 가디건을 주문했었는데 너무 늦어요ㅠㅠ&nbsp;
                        {/** <div id="qna_pwd10218" className="modi_pwd">
                          <form name="qna_pfrm10218" method="post">
                            <input type="hidden" name="exec_file" value="shop/qna_edit.php" />
                            <input type="hidden" name="no" value="10218" />
                            <input type="hidden" name="exec" />
                            <div id="pwbox">
                              <h3>비밀번호 입력</h3>
			                        <p>작성자와 관리자만 볼 수 있는 글입니다.<br />글 작성시 입력했던 비밀번호를 입력하세요.</p>
			                        <input type="password" name="pwd" className="form_input" />
			                        <div>
				                        <span className="box_btn w100"><input type="submit" value="확인" /></span>
				                        <span className="box_btn w100 white"><a href="#">취소</a></span>
			                        </div>
                            </div>
                          </form>
                        </div> */}

                        <div id="qna_modi10218" className="modi_cnt">
                          <div className="qnarev_write">
                            <form name="qna_mfrm10218" method="post">
                              <input type="hidden" name="exec_file" />
                              <input type="hidden" name="no" />
                              <input type="hidden" name="neko_id" />
                              <fieldset>
                                <legend className="hidden">상품문의 수정</legend>
					                        <div className="fld name">
						                        <label htmlFor="b_name">비밀글</label>
						                        <span className="check">
							                        <input type="checkbox" name="secret" value="Y" checked="" />비밀글
						                        </span>
					                        </div>
                                  {/** <div className="fld">
						                        <label>분류</label>
						                        <select name="cate">
                                      <option value="">:: 분류 선택 ::</option>
                                      <option value="상품문의">상품문의</option>
                                      <option value="배송일정" selected="">배송일정</option>
                                      <option value="기타">기타</option>
                                    </select> 
					                        </div> */}
                                  {/** <div className="fld">
						                        <label htmlFor="b_category">제목</label>
						                        <input type="text" name="title" value="배송일정" id="qna_title" className="form_input block" />
					                        </div> */}
					                        {/** <div className="fld contents">
						                        <label htmlFor="qna_content">글내용</label>
						                        <textarea name="content" rows="20" id="qna_content" className="form_input block">
                                      제가 저번주에 볼륨 슬리브 핑크 가디건을 주문했었는데 너무 늦어요ㅠㅠ&nbsp;
                                    </textarea>
					                        </div> */}
					                        {/** <div className="fld">
						                        <label htmlFor="qna_file1">첨부파일 1</label>
						                        <input type="file" name="upfile1" id="qna_file1" className="form_input block" />
					                        </div>
					                        <div className="fld">
						                        <label htmlFor="qna_file2">첨부파일 2</label>
						                        <input type="file" name="upfile2" id="qna_file2" className="form_input block" />
					                        </div> */}
                                </fieldset>
                                <div className="btn">
					                        <span className="box_btn w100">
                                    <input type="submit" value="확인" />
                                  </span>
				                        </div> 
                              </form>
                            </div> 
                        </div>
                      </div>
                    </div>
                    <div className="answer">
						          <span className="icon">A</span>
						          답변 준비중입니다.
					          </div>
					          <div className="btn">
						          <span className="box_btn w100 white"><a href="#">수정</a></span>
						          <span className="box_btn w100 white"><a href="#">삭제</a></span>
					          </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="btn">
		          <span className="box_btn w100"><a href="#">글쓰기</a></span>
		          <span className="box_btn w100 white"><a href="#">목록</a></span>
	          </div>
            <div className="qnarev_write">
	            <div id="qnaWriteDiv" style={{ display: "none" }}>
                <form name="qnaFrm" method="post" style={{ margin: "0" }}>
                  <input type="hidden" name="exec_file" />
                  <input type="hidden" name="pno" value="" />
                  <input type="hidden" name="no" value="" />
                  <input type="hidden" name="exec" value="" />
                  <input type="hidden" name="neko_id" />
		              <fieldset>
			              <legend className="hidden">상품문의 작성</legend>
			              <div className="name">
				              <label htmlFor="b_name">작성자</label>
				              <span className="check">
					              <input type="hidden" name="secret" value="Y" />
				              </span>
			              </div>

			              <div>
				              <label>분류</label>
				              <select name="cate">
                        <option value="">:: 분류 선택 ::</option>
                        <option value="상품문의">상품문의</option>
                        <option value="배송일정">배송일정</option>
                        <option value="기타">기타</option>
                      </select>
			              </div>
			
			              <div>
				              <label htmlFor="b_category">제목</label>
				              <input type="text" name="title" value="" id="qna_title" className="form_input block" placeholder="제목" />
			              </div>

			              <div className="contents">
				              <label htmlFor="qna_content">글내용</label>
				              <textarea name="content" rows="20" className="form_input block" id="qnaContent"></textarea>
			              </div>

			              <div>
				              <label htmlFor="qna_file1">첨부파일 1</label>
				              <input type="file" name="upfile1" id="qna_file1" className="form_input block" />
			              </div>

			              <div>
				              <label htmlFor="qna_file2">첨부파일 2</label>
				              <input type="file" name="upfile2" id="qna_file2" className="form_input block" />
			              </div>
		              </fieldset>
		              <div className="btn">
			              <span className="box_btn w150 large">
                      <input type="submit" value="확인" />
                    </span>
		              </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="csSub_qa_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Customer_Subqa;