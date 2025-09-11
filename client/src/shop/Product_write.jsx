import "./Product_write.css";
import { useState } from "react";
import axios from "axios";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";

const Product_write = () => {
	const [form, setForm] = useState({
    rv_title: "",
    rv_rating: 5,
    id: "guswl0817", // 로그인 유저 ID (임시 하드코딩, 실제로는 세션에서 가져와야 함)
    pname: "",
    content: "",
    image: "", // 이미지 업로드 구현 시 처리
  });

	const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

    try {
      const res = await axios.post("http://localhost:5001/api/review", {
        ...form,
        date: today,
      });
      if (res.data.success) {
        alert("리뷰가 등록되었습니다!");
        // 이동처리나 상태 초기화
      }
    } catch (err) {
      console.error("리뷰 등록 실패:", err);
      alert("리뷰 등록에 실패했습니다.");
    }
  };

  return (
    <div className="Product_write_wrapper">
      <div className="pdWrite_Header">
        <Header_loginOK />
      </div>
      <div className="pdWrite_Content">
        <div className="pdWriteDiv">
          <h2 className="subtitle">REVIEW_WRITE</h2>
          <form name="qnaFrm" method="post" onSubmit={handleSubmit} style={{ margin: "0px" }}>
		        <fieldset>
			        <legend className="hidden">상품문의 작성</legend>
			        <div className="name">
				        <label htmlFor="b_name">작성자</label>
				        <span className="check">
					        <input type="hidden" name="secret" value="Y" />
				        </span>
			        </div>    {/** name end */}

			        {/** <div>
				        <label>분류</label>
				        <select name="cate" onChange="">
                  <option value="">:: 분류 선택 ::</option>
                  <option value="상품문의">상품문의</option>
                  <option value="배송일정">배송일정</option>
                  <option value="기타">기타</option>
                </select>
			        </div> */}
			
              <div>
				        <label htmlFor="b_category">상품명</label>
				        <input 
									type="text" 
									name="pname" 
									value={form.pname}
									id="qna_title" 
									onChange={handleChange}
									className="form_input block" 
									placeholder="상품명" 
								/>
			        </div>
			        <div>
				        <label htmlFor="b_category">제목</label>
				        <input 
									type="text" 
									name="title" 
									value={form.rv_title}
									onChange={handleChange}
									id="qna_title" 
									className="form_input block" 
									placeholder="제목" 
								/>
			        </div>
							<div>
                <label>별점</label>
                <input
                  type="number"
                  name="rv_rating"
                  value={form.rv_rating}
                  onChange={handleChange}
                  min={1}
                  max={5}
                  className="form_input block"
                />
              </div>
			        <div className="contents">
				        <label htmlFor="qna_content">글내용</label>
				        <textarea 
									name="content" 
									value={form.content}
									rows={20} 
									className="form_input block" 
									id="qnaContent">
								</textarea>
                {/** <iframe className="editorFrm" id="editorFrm" frameBorder="0" style={{ width: "100%", height: "406px" }}></iframe> */}
			        </div>    {/** contents end */}
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
		        </div>    {/** btn end */}
          </form>
        </div>    {/** pdWriteDiv end */}
      </div>    {/** pdWrite_Content end */}
      <div className="pdWrite_Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Product_write;