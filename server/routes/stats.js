import express from "express";

const router = express.Router();

/**
 * 1단계: DB 없이 mock 데이터 반환
 * 2단계: 나중에 MySQL 쿼리로 교체하면 됨
 */

router.get("/summary", (req, res) => {
  res.json({
    totalOrders: 128,
    totalRevenue: 3421000,
    totalUsers: 54,
    totalItems: 980,
  });
});

router.get("/category-share", (req, res) => {
  res.json([
    { category: "생활", value: 32 },
    { category: "주방", value: 21 },
    { category: "욕실", value: 18 },
    { category: "식품", value: 14 },
    { category: "사무", value: 9 },
    { category: "반려동물", value: 6 },
  ]);
});

router.get("/monthly-trend", (req, res) => {
  res.json([
    { month: "2026-03", orders: 22, revenue: 520000 },
    { month: "2026-04", orders: 31, revenue: 680000 },
    { month: "2026-05", orders: 28, revenue: 640000 },
    { month: "2026-06", orders: 35, revenue: 790000 },
    { month: "2026-07", orders: 44, revenue: 910000 },
    { month: "2026-08", orders: 39, revenue: 860000 },
  ]);
});

router.get("/top-products", (req, res) => {
  res.json([
    { name: "대나무 칫솔", qty: 42, revenue: 252000 },
    { name: "재생 종이노트", qty: 37, revenue: 185000 },
    { name: "리유저블 컵", qty: 31, revenue: 310000 },
    { name: "친환경 수세미", qty: 28, revenue: 112000 },
    { name: "비건 스낵", qty: 25, revenue: 158000 },
  ]);
});

export default router;