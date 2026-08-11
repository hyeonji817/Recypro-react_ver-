import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product_Review.css";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import axios from "axios"; 

const Product_Review = () => {
  const [reviews, setReviews] = useState([]);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchColumn, setSearchColumn] = useState("author");
  const [searchStr, setSearchStr] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  // 🔍 검색 필터링
  const filteredReviews = reviews.filter((review) => {
    const target = {
      author: review.id,
      title: review.rv_title,
      product: review.pname
    }[searchColumn];
  
    return target?.toLowerCase().includes(searchStr.toLowerCase()); // ✅ target이 undefined일 경우 방지
  });
  

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // 검색 후 첫 페이지로 초기화
  };

  // 🔽 리뷰 불러오기
  useEffect(() => {
    axios.get(`${API_URL}/api/review`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error("리뷰 불러오기 실패:", err);
      });
  }, []);

  return (
    <div className="Product_Review_wrapper">
      <div id="pdRv_Content">
        <div className="PR_Header">
          <Header_loginOK />
        </div>
        <div className="pdRvbody">
          <h2 className="subtitle">REVIEW</h2>

          <div id="pdRev_list_all" className="crema-hide crema-applied">
            {/* 📋 리뷰 테이블 */}
            <table className="pdrv_tbl_col board" id="pdrv_board">
              <thead>
                <tr>
                  <th></th>
                  <th>제목</th>
                  <th>평점</th>
                  <th>작성자</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {currentReviews.map((review, idx) => (
                  <tr key={idx} className="pdReview_list">
                    <td>
                      <a href="#">
                        <img
                          src={`${API_URL}/uploads/${review.image}`} // 이미지 폴더는 서버 static 설정 필요
                          width={45}
                          height={60}
                          alt="리뷰"
                        />
                      </a>
                    </td>
                    <td className="pdrv_subject tal">
                      <p className="prd">
                        <a href="#">{review.pname}</a>
                      </p>
                      <p className="pdrv_title">
                        <a className="p_cursor">{review.rv_title}</a>
                      </p>
                    </td>
                    <td>
                      <span className={`gradebox small point${review.rv_rating}`}></span>
                      <span className="grade">{review.rv_rating}</span>
                    </td>
                    <td className="name">{review.id}</td>
                    <td>{new Date(review.date).toISOString().split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="btn">
			        <span className="box_btn w150 large">
                <Link to="/pd_write">글쓰기</Link>
              </span>
		        </div>    {/** btn end */}

            {/* 🔢 페이지네이션 */}
            <ul className="paging">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(1); }}>
                  &laquo;
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage((prev) => Math.max(prev - 1, 1)); }}>
                  &lt;
                </a>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  {currentPage === i + 1 ? (
                    <strong>{i + 1}</strong>
                  ) : (
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>
                      {i + 1}
                    </a>
                  )}
                </li>
              ))}
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage((prev) => Math.min(prev + 1, totalPages)); }}>
                  &gt;
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(totalPages); }}>
                  &raquo;
                </a>
              </li>
            </ul>

            {/* 🔍 검색 필터 */}
            <div className="board_search">
              <form onSubmit={handleSearch}>
                <select value={searchColumn} onChange={(e) => setSearchColumn(e.target.value)}>
                  <option value="author">작성자</option>
                  <option value="title">제목</option>
                  <option value="product">상품명</option>
                </select>
                <input
                  type="text"
                  value={searchStr}
                  onChange={(e) => setSearchStr(e.target.value)}
                  className="form_input search"
                />
                <input type="submit" value="검색" className="btn_search" />
              </form>
            </div>
          </div>
        </div>
        <div className="PR_footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Product_Review;
