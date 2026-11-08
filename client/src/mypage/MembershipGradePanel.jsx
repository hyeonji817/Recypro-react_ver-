import './MembershipGradePanel.css';
const money = value => Number(value).toLocaleString('ko-KR');
const date = value => new Date(value).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: false });
export default function MembershipGradePanel({ membership }) {
  if (!membership) return <p className="membership-grade-panel" role="status">회원등급 정보를 불러오는 중입니다.</p>;
  return <section className="membership-grade-panel" aria-label="내 회원등급 산정 내역">
    <div><span className="membership-grade-label">MY MEMBERSHIP</span><h3>{membership.grade}</h3><p>최근 6개월 상품 실결제액 <strong>{money(membership.qualifying_spend)}원</strong></p></div>
    <div><p>{membership.next_grade ? <><strong>{membership.next_grade}</strong> 등급까지 <strong>{money(membership.remaining_amount)}원</strong> 남았습니다.</> : '가장 높은 QUEEN 등급입니다.'}</p><p>산정 기간: {date(membership.period_start)} ~ {date(membership.period_end)} 미만<br/>다음 기준 갱신: {date(membership.next_update_at)} (한국시간)</p></div>
    <p className="membership-grade-basis">{membership.basis}<br/>등급 산정과 가입·생일·월별 쿠폰을 제공합니다. 등급별 상시 할인은 별도 적용 예정입니다.</p>
  </section>;
}
