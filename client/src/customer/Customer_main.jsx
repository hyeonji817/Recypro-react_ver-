import "./Customer_main.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import btnSearch from "../assets/btn_search.jpg";
import { useEffect, useState } from "react";
import btnWrite from "../assets/btn_write.jpg";
import axios from "axios"; // axios 설치 필요

const Customer_main = () => {
	const [notices, setNotices] = useState([]);
	//const isAdmin = user.id === "admin"; // 또는 운영자 조건

	const [newNotice, setNewNotice] = useState({
		nt_title: "",
		id: "recypro운영자",
		date: new Date().toISOString().slice(0, 10),
		views: 0,
	});
	
	const handleSubmit = () => {
		axios.post("http://localhost:5001/notice", newNotice)
			.then(() => {
				alert("공지사항 등록 완료");
				window.location.reload(); // or re-fetch data
			})
			.catch((err) => console.error(err));
	};	

  useEffect(() => {
    axios.get("http://localhost:5001/api/notice")
      .then((res) => setNotices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="CustomerMain_wrapper">
      {/** 헤더부분 */}
      <div className="cnt_Header">
        <Header_loginOK />
      </div>
      {/** 중앙 */}
	    <div id="cnt">
		    <div className="cntbody">
		      <h2 className="subtitle">공지사항</h2>
          <div id="boardlist">
	          <table cellSpacing={0} cellPadding={0} className="board_col">
		          <caption className="hidden">게시판 글목록</caption>
		          <colgroup>
			          <col style={{ width: '8%' }} />
			          <col />
			          <col style={{ width: '10%' }} />
			          <col style={{ width: '12%' }} />
			          <col style={{ width: '8%' }} />
		          </colgroup>
		          <thead>
			          <tr>
				          <th scope="col">번호</th>
				          <th scope="col">제목</th>
				          <th scope="col">작성자</th>
				          <th scope="col">작성일</th>
				          <th scope="col">조회수</th>
			          </tr>
		          </thead>

		          <tbody>
  							{notices.map((notice) => (
    							<tr className="notice_row" key={notice.nt_num}>
      							<td className="no">공지</td>
      							<td className="left">
        							<strong><a href="#">{notice.nt_title}</a></strong>
      							</td>
      							<td>{notice.id}</td>
      							<td>{notice.date?.slice(0, 10)}</td>
      							<td>{notice.views}</td>
    							</tr>
  							))}
							</tbody>
	          </table>

	          <div className="btn_write">
              <a>
                <img src={btnWrite} alt="글쓰기" />
              </a>
            </div>
	          <ul className="paging">
              <li></li>
              <li><strong>1</strong></li>
              <li></li>
            </ul>
	          <div className="board_search">
		          <form method="get">
                <input type="hidden" name="cate" value="" readOnly />
                <input type="hidden" name="db" value="basic_1" readOnly />

			          <select name="search">
				          <option value="title">제목</option>
				          <option value="content">내용</option>
				          <option value="name">작성자</option>
			          </select>
			          <input type="text" name="search_str" className="input boardsearch" />
			          <input type="image" src={btnSearch} alt="검색" className="input boardClue" />
		          </form>
	          </div>    {/** board_search end */}
						{/** {isAdmin && ( 
  						<div className="notice_form">
    						<input
      						type="text"
      						placeholder="공지 제목"
      						value={newNotice.nt_title}
      						onChange={(e) => setNewNotice({ ...newNotice, nt_title: e.target.value })}
    						/>
    						<button onClick={handleSubmit}>공지 작성</button>
  						</div>
						)} */}


          </div>    {/** board_list end */}
          
          <form name="mariFrm" method="get" action="?" style={{ margin: 0 }}>
            <input type="hidden" name="db" value="basic_1" readOnly />
            <input type="hidden" name="no" value="" readOnly />
            <input type="hidden" name="mari_mode" value="" readOnly />
            <input type="hidden" name="cate" value="" readOnly />
            <input type="hidden" name="page" value="1" readOnly />
            <input type="hidden" name="search" value="" readOnly />
            <input type="hidden" name="search_str" value="" readOnly />
            <input type="hidden" name="temp" value="" readOnly />
          </form>
		    </div>    {/** cntbody end */}
	    </div>    {/** cnt end */}
	    {/** //중앙 */}
      {/** 푸터 */}
      <div className="cnt_Footer">
        <Footer />
      </div>
    </div>    
  );
};

export default Customer_main;