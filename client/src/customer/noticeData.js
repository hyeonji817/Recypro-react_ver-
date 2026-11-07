import { returnsSearchText } from "./returnsNoticeData";
import { refundSearchText } from "./refundNoticeData";
import { shoppingGuideSearchText } from "./shoppingGuideData";
import { newMembershipSearchText } from "./newMembershipData";
import { membership } from "./membershipData";
// UI 시안용 데이터. DB 연동 시 이 목록을 API 응답으로 교체합니다.
export const notices = [
  { id: "new-membership", title: "[리싸이프로] NEW 회원등급별 멤버십 혜택 안내", author: "리싸이프로 운영자", date: "2026-11-07", views: 0, content: newMembershipSearchText },
  { id: "payment-refunds", title: "[리싸이프로] 결제수단에 따른 환불안내 (+적립금·쿠폰 안내)","author":"리싸이프로 운영자","date":"2026-11-07","views":0,content: refundSearchText},
  { id: "shopping-guide", title: "쇼핑몰 이용 가이드 (구매 전 필독해 주세요♡)", author: "리싸이프로 운영자", date: "2026-11-07", views: 0, content: shoppingGuideSearchText },
  { id: "chuseok-2026", title: "리싸이프로 추석연휴 배송안내", author: "리싸이프로 운영자", date: "2026-09-23", views: 16, content: "추석 연휴 온라인 배송 마감 및 고객센터 휴무 일정 안내" },
  { id: "membership", title: "리싸이프로 신규가입 및 멤버십 등급 혜택 변경 안내", author: "리싸이프로 운영자", date: "2025-05-26", views: 8957, content: ["신규가입 및 멤버십 등급 혜택 변경 안내", ...membership.welcome.map(item => `${item.value}${item.unit} ${item.title} ${item.description}`), ...membership.tiers.map(item => `${item.name} ${item.label} ${item.condition} ${item.rate} ${item.coupons} ${item.annual}`), ...membership.benefits.map(item => `${item.title} ${item.description}`), ...membership.notes].join(" ") },
  { id: "authenticity", title: "정품 인증 홀로그램 스티커 변경 안내", author: "리싸이프로 운영자", date: "2026-03-15", views: 411, content: "정품 인증 홀로그램 스티커 변경 안내" },
  { id: "returns", title: "교환반품 및 환불은 어떻게 이용하나요?", author: "리싸이프로 운영자", date: "2025-08-16", views: 5773, content: returnsSearchText },
];
