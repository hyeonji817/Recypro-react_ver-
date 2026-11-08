import { Link } from "react-router-dom";
import { returnsSections } from "./returnsNoticeData";
import "./ReturnsNotice.css";

export default function ReturnsNotice() {
  return <article className="returns-notice" aria-labelledby="returns-title">
    <header className="returns-intro"><p className="returns-eyebrow">RECYPRO RETURN & EXCHANGE</p><h2 id="returns-title">교환 및 반품부터 환불까지,<br/>차근차근 안내해 드립니다.</h2><p>다시 쓰는 물건이 안심할 수 있는 선택이 되도록.<br/>리싸이프로의 재활용품, 재사용 생활용품 교환 및 반품 절차를 확인해 주세요.</p></header>
    <ol className="returns-steps" aria-label="교환 반품 진행 순서">{["신청 접수", "상품 포장&회수", "상품 및 구성품 확인", "교환 출고 또는 환불"].map((step,index) => <li key={step}><span>{String(index+1).padStart(2,"0")}</span>{step}</li>)}</ol>
    <div className="returns-grid">{returnsSections.map((section,index) => <section className={index === returnsSections.length-1 ? "returns-section returns-wide" : "returns-section"} key={section.title}><h3><span>{String(index+1).padStart(2,"0")}</span>{section.title}</h3><ol>{section.items.map(item => <li key={item}>{item}</li>)}</ol>{index === returnsSections.length-1 && <Link className="returns-related" to="/customer_notice/payment-refunds">결제수단별 환불/적립금/쿠폰 상세 안내 →</Link>}</section>)}</div>
    <section className="returns-contact" aria-labelledby="returns-contact-title"><div><h3 id="returns-contact-title">교환 및 반품 접수 및 문의</h3><strong>2010-0609</strong><p>평일 10:00~12:00 / 13:00~17:00<br/>주말, 공휴일 휴무</p><Link to="/customer_question">Q&A 게시판으로 문의하기 →</Link></div><div><h3>교환 및 반품 주소</h3><address>서울특별시 서초구 리싸이프로대로 17길 08</address><p>발송 전 고객센터에서 수거 방법과 주소를 확인해 주세요.<br/>주문번호와 반품 상품명을 알려주시면 확인에 도움이 됩니다.</p></div></section>
  </article>;
}
