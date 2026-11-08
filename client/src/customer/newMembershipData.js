// 7등급 산정·표시는 구현. 할인·쿠폰·적립·배송 특전은 별도 적용 전 시안.
export const newMembership = {
  benefits: [
    ["신규회원 쿠폰팩", "20,000원", "가입 시 구매금액별 할인 쿠폰 4종"],
    ["생일 축하 쿠폰", "최대 10%", "회원등급별 연 1회 생일 할인"],
    ["신상품 할인", "5%", "새롭게 만나는 상품의 할인 혜택"],
    ["무료배송", "80,000원 이상", "쿠폰 할인 후 상품금액 기준 · 기본 배송비 3,500원"],
    ["등급별 추가 할인", "최대 5%", "최근 6개월 구매실적에 따른 혜택"],
    ["리뷰 적립금", "500원 / 1,500원", "배송완료 상품 텍스트 500원 · 사진 포함 1,500원"],
  ],
  tiers: [
    { code: "N", name: "NEW", condition: "신규회원", discount: "0.5%", birthday: "—", shipping: "—", exchange: "—", vip: "—", color: "mint" },
    { code: "B", name: "BRONZE", condition: "1원 이상 ~ 20만원 미만", discount: "1%", birthday: "3%", shipping: "—", exchange: "—", vip: "—", color: "bronze" },
    { code: "S", name: "SILVER", condition: "20만원 이상 ~ 50만원 미만", discount: "1.5%", birthday: "5%", shipping: "—", exchange: "—", vip: "—", color: "silver" },
    { code: "G", name: "GOLD", condition: "50만원 이상 ~ 100만원 미만", discount: "2%", birthday: "5%", shipping: "매월 1장", exchange: "매월 1회", vip: "—", color: "gold" },
    { code: "P", name: "PLATINUM", condition: "100만원 이상 ~ 150만원 미만", discount: "3%", birthday: "7%", shipping: "매월 1장", exchange: "매월 1회", vip: "—", color: "platinum" },
    { code: "V", name: "VIP", condition: "150만원 이상 ~ 250만원 미만", discount: "4%", birthday: "7%", shipping: "상시 무료", exchange: "매월 1회", vip: "이용 가능", color: "pink" },
    { code: "Q", name: "QUEEN", condition: "250만원 이상", discount: "5%", birthday: "10%", shipping: "상시 무료", exchange: "매월 1회", vip: "이용 가능", color: "rose" },
  ],
  coupons: [["2,000원", "2만원 이상 구매"], ["3,000원", "3만원 이상 구매"], ["5,000원", "5만원 이상 구매"], ["10,000원", "10만원 이상 구매"]],
  notes: [
    "구매 적립금은 쿠폰 할인·사용 적립금을 제외한 상품금액의 1%를 원 단위로 버림하여 계산하며 관리자 배송완료 확인 7일 후 지급합니다. 사용 최소금액과 만료는 없습니다.",
    "배송완료된 주문 상품의 리뷰는 텍스트 500원·사진 포함 1,500원을 등록 시 1회 지급합니다. 기존 리뷰는 소급 지급하지 않습니다.",
    "가입 쿠폰은 기존 회원도 1회 지급하며 4종 모두 발급 후 90일간 유효합니다. 쿠폰은 주문당 1장 사용합니다.",
    "등급은 한국시간 매일 오전 3시를 기준으로 조회 시 자동 산정합니다. 최근 6개월 결제완료 주문의 상품 실결제액에서 배송비·쿠폰 할인·사용 적립금을 제외합니다.",
    "예치금과 적립금으로 결제한 금액은 등급 산정 구매실적에서 제외됩니다.",
    "휴대폰·가상계좌 결제 후 부분 취소 및 익월 전체 취소 주문은 구매실적에 반영되지 않습니다.",
    "현재 구매실적에 따른 7등급 산정·표시를 제공합니다. 반품 횟수에 따른 추가 강등과 등급별 자동 할인·쿠폰은 적용 전입니다.",
    "주문 반품·환불·취소로 사용한 쿠폰이 재발급되지는 않습니다.",
    "네이버페이 구매에는 회원 혜택이 적용되지 않으며, 일부 품목은 등급 할인·쿠폰 적용 대상에서 제외될 수 있습니다.",
    "등록한 생일 당일 등급에 따라 연 1회 생일 쿠폰을 발급하며 30일간 유효합니다(NEW 제외). 2월 29일생은 평년 2월 28일에 발급합니다.",
    "매월 1일 한국시간 03시 기준 GOLD·PLATINUM에 기본 배송비 무료 쿠폰을 1장 발급하며 발급 후 90일간 유효합니다. VIP·QUEEN 상시 무료배송은 아직 적용 전입니다.",
  ],
};
export const newMembershipSearchText = ["NEW 회원등급별 멤버십 멤버쉽 혜택 안내", ...newMembership.benefits.flat(), ...newMembership.tiers.map(t => `${t.name} ${t.condition} 할인 ${t.discount} 생일 ${t.birthday} 무료배송 ${t.shipping} 사이즈 교환 ${t.exchange} VIP 게시판 ${t.vip} 1% 적립`), ...newMembership.coupons.flat(), ...newMembership.notes].join(" ");
