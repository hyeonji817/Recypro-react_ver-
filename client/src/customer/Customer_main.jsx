import { useState } from "react";
import { Link } from "react-router-dom";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import { notices } from "./noticeData";
import "./Customer_main.css";

export default function Customer_main() {
  const [field, setField] = useState("title");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const rows = notices.filter(notice => String(notice[field]).toLowerCase().includes(search.toLowerCase()));
  return <div className="CustomerMain_wrapper recypro-notices">
    <Header_loginOK />
    <main className="notice-container">
      <h1 className="notice-heading">공지사항</h1>
      <div className="notice-table-scroll">
        <table className="notice-list">
          <caption className="notice-sr-only">리싸이프로 공지사항 목록</caption>
          <colgroup><col className="notice-col-number"/><col/><col className="notice-col-author"/><col className="notice-col-date"/><col className="notice-col-views"/></colgroup>
          <thead><tr>{["번호", "제목", "작성자", "작성일", "조회수"].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
          <tbody>{rows.map(notice => <tr key={notice.id}>
            <td className="notice-pinned">공지</td>
            <td className="notice-title"><Link to={`/customer_notice/${notice.id}`}>{notice.title}</Link></td>
            <td>{notice.author}</td><td>{notice.date}</td><td>{notice.views}</td>
          </tr>)}{!rows.length && <tr><td colSpan={5}>검색 결과가 없습니다.</td></tr>}</tbody>
        </table>
      </div>
      <nav className="notice-pagination" aria-label="공지사항 페이지"><span aria-current="page">1</span></nav>
      <form className="notice-search" role="search" onSubmit={event => { event.preventDefault(); setSearch(query.trim()); }}>
        <label className="notice-sr-only" htmlFor="notice-field">검색 기준</label>
        <select id="notice-field" value={field} onChange={event => setField(event.target.value)}><option value="title">제목</option><option value="content">내용</option><option value="author">작성자</option></select>
        <label className="notice-sr-only" htmlFor="notice-query">검색어</label>
        <input id="notice-query" value={query} onChange={event => setQuery(event.target.value)}/>
        <button type="submit" aria-label="검색"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m15 15 6 6" stroke="currentColor" strokeWidth="2"/></svg></button>
      </form>
    </main>
    <Footer />
  </div>;
}
