import express from 'express'; // ES6 import 문법, express : 웹 서버 프레임워크. API 요청과 응답 처리 
import Popular_Product from './Popular_Product.js';  // 불러들일 서버 데이터. 인기 상품 데이터를 처리하는 데 사용.
import cors from "cors"; 

const router = express.Router();    // router : Express의 라우터 객체. API 엔드포인트 정의. 
const app = express();    // Express 애플리케이션 객체. 필요 시 추가적인 설정을 위해 사용. 

// 모든 도메인에서의 요청을 허용하여 CORS 문제를 해결. 
// 프론트엔드와의 통신을 원활하게 함.
router.use(cors());
  // 모든 도메인에서의 요청을 허용

// 인기 상품 리스트 API
// 인기 상품 데이터를 반환하는 API 
// Popular_Product.findAll()을 호출해 데이터를 가져옴. 
// 성공 시, 데이터를 JSON 형식으로 반환
// 실패 시 HTTP 상태 코드 500과 함께 "Server Error" 메시지를 반환 
router.get('/popular_products', async (req, res) => {
  try {
    // Popular_Product.js에서 정의된 데이터베이스 조회 로직을 호출
    // 인기 상품 데이터를 데이터베이스에서 가져오는 역할 담당. 
    const popular_products = await Popular_Product.findAll();
    res.json(popular_products);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

export default router; // ES6 export 문법. 모듈 내보내기 (다른 모듈에서 사용할 수 있도록 라우터 객체를 내보냄)
