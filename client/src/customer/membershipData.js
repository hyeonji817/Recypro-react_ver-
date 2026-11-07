// 원본 로라로라 안내를 바탕으로 한 UI 시안. 리싸이프로 운영 정책 확정 후 수정합니다.
// 쿠폰 발급, 적립, 등급 계산은 수행하지 않습니다.
export const membership = {
  welcome: [
    { value: "5,000", unit: "원", title: "웰컴 할인 쿠폰", description: "첫 만남을 위한 할인 혜택" },
    { value: "10", unit: "%", title: "웰컴 할인 쿠폰", description: "마음에 드는 상품을 더 가볍게" },
    { value: "3,000", unit: "원", title: "신규가입 적립금", description: "1,000원부터 사용 가능" },
  ],
  tiers: [
    { name: "MEMBER", label: "멤버", condition: "신규 회원 · 30만원 미만", rate: "2%", coupons: "10% · 5,000원 각 1장", annual: "—" },
    { name: "SILVER", label: "실버", condition: "30만원 이상 ~ 100만원 미만", rate: "3%", coupons: "10% · 5,000원 · 1만원 · 2만원 각 1장", annual: "—" },
    { name: "GOLD", label: "골드", condition: "100만원 이상 ~ 500만원 미만", rate: "5%", coupons: "10% · 5,000원 · 1만원 · 2만원 각 1장", annual: "연 1회 20,000원" },
    { name: "VIP", label: "브이아이피", condition: "500만원 이상", rate: "5%", coupons: "10% · 5,000원 · 1만원 · 2만원 각 1장", annual: "연 1회 30,000원" },
  ],
  benefits: [
    { number: "01", title: "무료배송", description: "3만원 이상 구매 시 배송비 부담 없이 만나보세요." },
    { number: "02", title: "생일 · 기념일 쿠폰", description: "소중한 날을 함께하는 특별한 쿠폰 혜택을 준비합니다." },
    { number: "03", title: "회원 할인", description: "회원 전용 쿠폰으로 일상에 필요한 상품을 알뜰하게 구매하세요." },
    { number: "04", title: "구매 적립", description: "회원 등급에 따라 구매 금액의 2~5%를 적립해 드립니다." },
  ],
  notes: [
    "회원 등급은 최근 6개월 구매 금액을 기준으로 매월 1일 산정됩니다.",
    "구매 금액은 주문서의 거래 완료 기준이며, 교환·반품 및 적립금 사용 금액은 제외됩니다.",
    "일부 품목에는 쿠폰 사용이 제한될 수 있으며, 쿠폰은 중복 사용할 수 없습니다.",
    "쿠폰별 사용 조건과 유효기간은 마이페이지의 쿠폰 내역에서 확인해 주세요.",
  ],
};
