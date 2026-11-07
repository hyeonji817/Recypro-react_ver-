import { Link } from "react-router-dom";
import { membership } from "./membershipData";
import "./MembershipNotice.css";

export default function MembershipNotice() {
  return <article className="membership-notice" aria-labelledby="membership-title">
    <header className="membership-intro">
      <p className="membership-eyebrow">RECYPRO MEMBERSHIP</p>
      <h2 id="membership-title">더 나은 일상,<br/>함께할수록 커지는 혜택.</h2>
      <p>일상 속 작은 실천을 함께하는 리싸이프로.<br/>새로운 만남부터 꾸준한 선택까지, 감사의 마음을 혜택으로 전합니다.</p>
      <span className="membership-draft">혜택 안내 시안 · 리싸이프로 운영 정책 확정 전</span>
    </header>

    <nav className="membership-nav" aria-label="멤버십 안내 바로가기">
      <a href="#membership-welcome">신규가입 혜택</a><a href="#membership-levels">등급별 혜택</a><a href="#membership-benefits">공통 혜택</a><a href="#membership-guide">이용 안내</a>
    </nav>

    <section id="membership-welcome" className="membership-section" aria-labelledby="welcome-title">
      <div className="membership-section-heading"><div><p className="membership-eyebrow">WELCOME BENEFITS</p><h3 id="welcome-title">첫 만남을 위한 선물</h3></div><p>리싸이프로의 새로운 회원님을 환영합니다.</p></div>
      <div className="membership-coupons">{membership.welcome.map((item, index) => <div className="membership-coupon" key={item.title + item.value}>
        <span className="membership-coupon-type">{index === 2 ? "WELCOME POINT" : "WELCOME COUPON"}</span>
        <p className="membership-amount">{item.value}<span>{item.unit}</span></p><h4>{item.title}</h4><p>{item.description}</p>
      </div>)}</div>
      <p className="membership-footnote">신규가입 혜택 구성 예시입니다. 실제 지급 조건과 사용 기간은 운영 정책 확정 후 안내됩니다.</p>
    </section>

    <section id="membership-levels" className="membership-section" aria-labelledby="levels-title">
      <div className="membership-section-heading"><div><p className="membership-eyebrow">MEMBERSHIP LEVEL</p><h3 id="levels-title">함께할수록 더 풍성하게</h3></div><p>최근 6개월 구매 금액 기준 · 매월 1일 등급 산정</p></div>
      <div className="membership-table-scroll" role="region" aria-label="회원 등급별 혜택 비교표, 작은 화면에서는 좌우로 스크롤하세요" tabIndex={0}>
        <table className="membership-table"><caption className="membership-sr-only">회원 등급별 구매 조건, 구매 적립률, 할인 쿠폰 및 연간 추가 적립금</caption>
          <thead><tr><th scope="col">혜택 안내</th>{membership.tiers.map(tier => <th scope="col" key={tier.name}><span className={`membership-tier membership-tier-${tier.name.toLowerCase()}`}>{tier.name}</span><small>{tier.label}</small></th>)}</tr></thead>
          <tbody>
            <tr><th scope="row">등급 조건</th>{membership.tiers.map(tier => <td key={tier.name}>{tier.condition}</td>)}</tr>
            <tr><th scope="row">구매 적립</th>{membership.tiers.map(tier => <td key={tier.name}><strong className="membership-rate">{tier.rate}</strong></td>)}</tr>
            <tr><th scope="row">할인 쿠폰</th>{membership.tiers.map(tier => <td key={tier.name}>{tier.coupons}</td>)}</tr>
            <tr><th scope="row">추가 적립금</th>{membership.tiers.map(tier => <td key={tier.name}>{tier.annual}</td>)}</tr>
          </tbody>
        </table>
      </div>
      <p className="membership-mobile-hint">표를 좌우로 밀어 모든 등급을 확인하세요.</p>
    </section>

    <section id="membership-benefits" className="membership-section" aria-labelledby="benefits-title">
      <div className="membership-section-heading"><div><p className="membership-eyebrow">EVERYDAY BENEFITS</p><h3 id="benefits-title">리싸이프로 회원이라면</h3></div></div>
      <div className="membership-benefit-grid">{membership.benefits.map(item => <div className="membership-benefit" key={item.number}><span>{item.number}</span><h4>{item.title}</h4><p>{item.description}</p></div>)}</div>
    </section>

    <section id="membership-guide" className="membership-guide" aria-labelledby="guide-title"><h3 id="guide-title">꼭 확인해 주세요</h3><ul>{membership.notes.map(note => <li key={note}>{note}</li>)}</ul><p>위 혜택은 원본 안내를 바탕으로 구성한 온라인몰 UI 시안입니다. 리싸이프로의 실제 회원 정책과는 다를 수 있습니다.</p></section>
    <div className="membership-bottom"><p>오늘부터 리싸이프로와 함께해요.</p><Link to="/account/register" className="membership-primary">회원가입</Link><Link to="/mypage_coupon" className="membership-secondary">내 쿠폰 확인</Link></div>
  </article>;
}
