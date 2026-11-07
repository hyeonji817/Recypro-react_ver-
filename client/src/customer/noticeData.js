import { shoppingGuideSearchText } from "./shoppingGuideData";
import { newMembershipSearchText } from "./newMembershipData";
import { membership } from "./membershipData";
// UI 시안용 데이터. DB 연동 시 이 목록을 API 응답으로 교체합니다.
export const notices = [
  { id: "new-membership", title: "[리싸이프로] NEW 회원등급별 멤버십 혜택 안내", author: "리싸이프로 운영자", date: "2026-11-07", views: 0, content: newMembershipSearchText },
  { id: "payment-refunds", title: "[리싸이프로] 결제수단에 따른 환불안내 (+적립금·쿠폰 안내)","author":"리싸이프로 운영자","date":"2026-11-07","views":0,"content":"카드·선불금 카드 취소 반영에는 승인 후 영업일 기준 3~7일이 걸릴 수 있습니다. 이후에도 환불이 확인되지 않으면 카드사에 확인해 주세요. 무통장 입금 환불받을 은행·계좌번호·예금주를 알려 주세요. 실제 입금자와 계좌 명의가 다르거나 정보가 정확하지 않으면 처리가 늦어질 수 있습니다. 휴대폰 결제 결제한 달에는 전체 취소가 가능합니다. 부분 취소나 이전 달 결제는 현금 환불 방식으로 처리될 수 있습니다. 가상계좌 전체 취소 시 계좌 환불로 진행됩니다. 품절 상품이 포함된 주문은 전체 취소 후 나머지 상품의 재주문이 필요할 수 있습니다. 네이버페이·카카오페이 환불과 배송비 정산은 이용한 결제 서비스의 처리 방식에 따릅니다. 구매 확정 이후에는 배송비를 별도로 정산할 수 있습니다. 적립금 부분 반품 시 사용한 적립금이 남은 상품에 반영될 수 있습니다. 반환 내역은 마이페이지에서 확인해 주세요. 환불액을 적립금이나 예치금으로 바꾸지는 않습니다. 쿠폰 반품 후 남은 구매금액이 사용 조건을 충족하지 않으면 쿠폰 할인이 취소될 수 있습니다. 만료된 쿠폰과 일부 일회성 쿠폰은 복원되지 않습니다."},
  { id: "shopping-guide", title: "쇼핑몰 이용 가이드 (구매전필독해주세요♡)", author: "리싸이프로 운영자", date: "2026-11-07", views: 0, content: shoppingGuideSearchText },
  { id: "chuseok-2026", title: "리싸이프로 추석연휴 배송안내", author: "리싸이프로 운영자", date: "2026-09-23", views: 16, content: "추석 연휴 온라인 배송 마감 및 고객센터 휴무 일정 안내" },
  { id: "membership", title: "리싸이프로 신규가입 및 멤버십 등급 혜택 변경 안내", author: "리싸이프로 운영자", date: "2025-05-26", views: 8957, content: ["신규가입 및 멤버십 등급 혜택 변경 안내", ...membership.welcome.map(item => `${item.value}${item.unit} ${item.title} ${item.description}`), ...membership.tiers.map(item => `${item.name} ${item.label} ${item.condition} ${item.rate} ${item.coupons} ${item.annual}`), ...membership.benefits.map(item => `${item.title} ${item.description}`), ...membership.notes].join(" ") },
  { id: "authenticity", title: "정품 인증 홀로그램 스티커 변경 안내", author: "리싸이프로 운영자", date: "2026-03-15", views: 411, content: "정품 인증 홀로그램 스티커 변경 안내" },
  { id: "returns", title: "교환반품 및 환불은 어떻게 이용하나요?", author: "리싸이프로 운영자", date: "2025-08-16", views: 5773, content: "교환·반품 및 환불 이용 안내" },
];
