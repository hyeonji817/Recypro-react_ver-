// popular_products.js => 서버 코드 
import express from "express";    // ES6 import 문법 
import Popular_Product from "../models/Popular_Product";

const router = express.Router();

// 인기 상품 리스트 API 
router.get('/api/popular_product', async (req, res) => {
  try {
    const popular_products = await Popular_Product.findAll();
    res.json(popular_products);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

export default router;    // ES6 export 문법 