import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./customerQA_write.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const CustomerQA_write = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cate, setCate] = useState("");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("cate", cate);
    formData.append("upfile1", file1);
    formData.append("upfile2", file2);
    formData.append("id", "비회원"); // 로그인 안 되어있으면 기본값

    try {
      const response = await fetch("http://localhost:5001/api/questionAnswer/customer_question", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Q&A가 등록되었습니다.");
        window.location.href = "/customer_question";
      } else {
        alert("등록 실패: " + result.error);
      }
    } catch (err) {
      console.error("에러 발생:", err);
    }
  };

  return (
    <div className="CSQA_wrapper">
      <div className="CSQA_Header">
        <Header_loginOK />
      </div>
      <div className="CSQA_Contents">
        <div className="CSQA_write">
          <div id="qnaWriteDiv">
            <h2 className="subtitle">Q&A_WRITE</h2>
            <form name="qnaFrm" method="post" style={{ margin: "0px" }} onSubmit={handleSubmit} encType="multipart/form-data">
              <fieldset>
                <legend className="hidden">상품문의 작성</legend>
			          <div className="name">
				          <label htmlFor="b_name">작성자</label>
				          <span className="check">
					          <input type="hidden" name="secret" value="Y" />
				          </span>
			          </div>  {/** name end */}

                <div>
				          <label>분류</label>
				          <select value={cate} onChange={(e) => setCate(e.target.value)}>
                    <option value="">:: 분류 선택 ::</option>
                    <option value="상품문의">상품문의</option>
                    <option value="배송일정">배송일정</option>
                    <option value="기타">기타</option>
                  </select>
			          </div>

                <div>
				          <label htmlFor="b_category">제목</label>
				          <input 
                    type="text" 
                    name="title" 
                    id="qna_title" 
                    className="form_input block" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목" 
                  />
			          </div>

			          <div className="contents">
				          <label htmlFor="qna_content">글내용</label>
				          <textarea 
                    name="content" 
                    rows={20} 
                    className="form_input block" 
                    id="qnaContent" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  {/** <iframe className="editorFrm" id="editorFrm" style={{ width: "100%", height: "406px" }}></iframe> */}
			          </div>

			          <div>
				          <label htmlFor="qna_file1">첨부파일 1</label>
				          <input 
                    type="file" 
                    name="upfile1" 
                    id="qna_file1" 
                    onChange={(e) => setFile1(e.target.files[0])}
                    className="form_input block" 
                  />
			          </div>

			          <div>
				          <label htmlFor="qna_file2">첨부파일 2</label>
				          <input 
                    type="file" 
                    name="upfile2" 
                    id="qna_file2" 
                    onChange={(e) => setFile2(e.target.files[0])}
                    className="form_input block" 
                  />
			          </div>
              </fieldset>
              <div className="btn">
			          <span className="box_btn w150 large">
                  <input type="submit" value="확인" />
                </span>
		          </div>    {/** btn end */}
            </form>
          </div>   {/** qnaWriteDiv end */}
        </div>    {/** CSQA_write end */}
      </div>    {/** CSQA_Contents end */}
      <div className="CSQA_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default CustomerQA_write;