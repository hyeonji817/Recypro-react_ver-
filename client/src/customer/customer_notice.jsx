import { Link, useParams } from "react-router-dom";
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import { notices } from "./noticeData";
import calendar from "../assets/notices/chuseok-2026-calendar.svg";
import "./Customer_main.css";
import MembershipNotice from "./MembershipNotice";

export default function Customer_notice() {
  const { noticeId = "chuseok-2026" } = useParams();
  const notice = notices.find(item => item.id === noticeId);
  return <div className="recypro-notices">
    <Header_loginOK />
    <main className={`notice-container${noticeId === "authenticity" ? " notice-authenticity-page" : ""}`}>
      <h1 className="notice-heading">공지사항</h1>
      {!notice ? <div className="notice-missing"><p>존재하지 않는 공지사항입니다.</p><Link to="/customer_main">목록으로</Link></div> : <>
        <dl className="notice-meta"><div><dt>제목</dt><dd>{notice.title}</dd><dt>조회</dt><dd>{notice.views}</dd></div><div><dt>작성자</dt><dd>{notice.author}</dd><dt>작성일</dt><dd>{notice.date}</dd></div></dl>
        {notice.id === "chuseok-2026" ? <article className="notice-holiday">
          <p className="notice-brand">리싸이프로</p>
          <h2>2026년 풍성한 한가위 보내세요!</h2>
          <p className="notice-intro">리싸이프로를 사랑해 주셔서 감사드립니다.<br/>추석 연휴를 맞아 온라인 배송 및<br/>고객센터 휴무 일정을 안내드립니다.</p>
          <img className="notice-calendar" src={calendar} width="1100" height="720" alt="2026년 추석 배송 일정. 9월 23일 수요일 오후 3시 배송 마감. 9월 24일부터 27일까지 휴무. 9월 28일 월요일부터 순차 배송 시작."/>
          <div className="notice-holiday-copy">
            <p>9월 23일 (수) 오후 3시 이후 주문 건은 명절 연휴가 지난<br/><strong>9월 28일 (월)</strong>부터 순차적으로 배송이 시작됩니다.</p>
            <p>연휴 이전 온라인 주문 건 중 상품 및 거래처와 택배사의 사정에<br/>따라 일부 상품의 배송이 지연될 수 있습니다.<br/>최대한 많은 물량을 확보하여 고객님께서 불편함이 없도록 최선을 다하겠습니다.</p>
            <p>*연휴 기간 (9/24 ~ 9/27)에는 CS 고객센터 운영이 중단됩니다.</p>
          </div>
        </article> : notice.id === "membership" ? <MembershipNotice /> : notice.id === "authenticity" ? <article className="notice-authenticity">
          <p>안녕하세요, 리싸이프로입니다.</p>
          <p>리싸이프로는 26년 3월 15일부터 SS시즌 상품부터 정품 인증 홀로그램 스티커가 부착되지 않습니다.</p>
          <p>간혹, 가격택에 홀로그램 스티커 없이 상품이 출고되므로 구매 전 참고바랍니다.</p>
          <p>리싸이프로의 모든 상품은 자사의 승인 없이 이미지를 복제하거나,</p>
          <p>디자인 및 특허권을 도용 및 침해하는 경우 강력한 법적 조치 대상이 될 수 있습니다.</p>
          <p>리싸이프로를 사랑해 주셔서 감사드립니다.</p>
          <p>감사합니다.</p>
        </article> : <article className="notice-plain"><h2>{notice.title}</h2><p>{notice.content}</p><p>상세 안내 내용은 준비 중입니다.</p></article>}
        <div className="notice-detail-actions"><Link to="/customer_main">목록</Link></div>
      </>}
    </main><Footer />
  </div>;
}
