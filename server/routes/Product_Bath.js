import express from "express";
import { db } from "../server.js";    // 서버 DB 연결 
const router = express.Router();    // 라우터 설정 
const app = express(); 

/** 콜백 기반 db.query → Promise 래퍼 */
const q = (sql, params = []) => 
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

// displayName 매핑 (필요 시 확장)
const GROUP_LABEL = {
  color: "색상", 
  kind: "종류", 
  size: "사이즈",
};

export default router;