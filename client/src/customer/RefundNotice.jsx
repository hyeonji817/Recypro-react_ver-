import { refundSections } from "./refundNoticeData";
import "./RefundNotice.css";

function NumberedItems({ items }) {
  return <ol className="refund-items">{items.map(item => <li key={item}>{item}</li>)}</ol>;
}

export default function RefundNotice() {
  return <article className="notice-refunds refund-detailed" aria-label="리싸이프로 결제수단별 환불 안내">
    <p className="refund-intro">리싸이프로를 이용해 주시는 고객님께 감사드립니다.<br/>원활한 취소 및 반품 처리를 위해 결제수단별 환불 절차와 적립금, 쿠폰 정산 내용을 확인해 주세요.</p>
    <p className="refund-highlight"><span aria-hidden="true">★</span> 환불금액은 원결제수단으로 반환하며, 적립금이나 예치금으로 임의 전환하지 않습니다.</p>
    {refundSections.map((section,index) => <section className="refund-section" key={section.title}>
      <h2><span className="refund-number">{index+1}</span>{section.title}</h2>
      {section.items && <NumberedItems items={section.items}/>}
      {section.note && <p className="refund-note">※ {section.note}</p>}
      {section.groups?.map(group => <section className="refund-group" key={group.title}><h3><span aria-hidden="true">▴</span> {group.title}</h3><NumberedItems items={group.items}/></section>)}
    </section>)}
    <aside className="refund-contact"><strong>환불 내역이 궁금하신가요?</strong><p>주문번호와 결제수단을 준비하여 고객센터 또는 Q&A 게시판으로 문의해 주세요.<br/>고객센터 2010-0609 · 평일 10:00~12:00 / 13:00~17:00</p><p>처리 기간은 영업일 기준이며 주말과 공휴일은 제외됩니다. 최종 환불금액과 적용 조건은 해당 주문의 결제/배송/쿠폰 내역을 확인하여 안내합니다.</p></aside>
  </article>;
}
