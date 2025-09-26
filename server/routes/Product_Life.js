import express from "express";
import { db } from "../server.js";    // 서버 DB 연결 

const router = express.Router();    // 라우터 설정 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

export default router;