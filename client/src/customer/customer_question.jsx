import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import "./customer_question.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

// 이미지 import 
import replyBefore from "../assets/reply_before.jpg";
import reply from "../assets/reply.jpg";

const Customer_question = () => {
	const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/questionAnswer")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => console.error("Q&A 가져오기 오류:", err));
  }, []);

  const getReplyImage = (status) => {
    return status === "답변완료" ? reply : replyBefore;
  };

  return (
    <div className="customer_Question_wrapper">
      <div className="cq_Header">
        <Header_loginOK />
      </div>
      
      <div className="cq_body">
        <h2 className="subtitle">Q&amp;A</h2>
          <div id="qnarev_list_all">
	          <table className="tbl_col board">
		          <caption className="hidden">상품문의</caption>
		            <colgroup>
			            <col style={{ width: "8%" }} />
			            <col />
			            <col style={{ width: "20%" }} />
			            <col style={{ width: "10%" }} />
			            <col style={{ width: "10%" }} />
		            </colgroup>
		          <thead>
			          <tr>
				          <th scope="col"></th>
				          <th scope="col">제목</th>
				          <th scope="col">답변여부</th>
				          <th scope="col">작성자</th>
				          <th scope="col">작성일</th>
			          </tr>
		          </thead>

							<tbody>
              {questions.map((qna) => (
                <tr key={qna.qa_num}>
                  <td>
                    {qna.product_img && (
                      <img
												src={`http://localhost:5001/uploads/${qna.product_img}`}
												alt={qna.pname}
												width={45}
												height={60}
											/>
                    )}
                  </td>
                  <td className="subject tal">
                    <div className="qNa_list_wrapper">
                      {qna.pname && (
                        <p className="prd">
                          <a href="#">{qna.pname}</a>
                        </p>
                      )}
                      <p className="title">
                        <a href="/customer_subqa">{qna.title}</a>
                      </p>
                    </div>
                  </td>
                  <td className="replySignal">
										<a href="#">{qna.answer}</a>
                  </td>
                  <td className="name">{qna.id || "비회원"}</td>
                  <td>{new Date(qna.date).toISOString().split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
	        </table>

	        <div className="btn">
		        <div className="box_btn w100">
              <Link to="/customerQA_write">글쓰기</Link>
              {/** <a href="#">글쓰기</a> */}
            </div>
	        </div>

	        <div className="qnarev_write">
	          <div id="qnaWriteDiv" style={{ display : "none" }}>
              <form name="qnaFrm" method="post" target="hidden1749980025" style={{margin: 0 }}>
                <input type="hidden" name="exec_file" value="shop/qna_reg.exe.php" />
                <input type="hidden" name="pno" value="" />
                <input type="hidden" name="no" value="" />
                <input type="hidden" name="exec" value="" />
                <input type="hidden" name="neko_id" value="product_qna_temp_1749980025" />
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
				              <select name="cate" onChange="">
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
	
	          <div className="board_search">
		          <form name="" method="get">
			          <select name="search_column">
				          <option value="1">작성자</option>
				          <option value="2">아이디</option>
				          <option value="3">제목</option>
			          </select>
			          <input type="text" name="rsearch_str" className="form_input search" />
			          <input type="submit" value="검색" className="btn_search" />
		          </form>
	          </div>
          </div>{/** mkt script '애널리언스' scr_bottom start */}
		    </div>

      <div className="cq_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Customer_question;