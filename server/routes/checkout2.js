import express from "express"; 
import crypto from "crypto"; 
import { db } from "../server.js"; 

const router = express.Router(); 

const q = (sql, params=[]) => new Promise((res, rej) => {
  db.query(sql, params, (err, rows) => err ? rej(err) : res(rows)); 
});

const SHIPPING_THRESHOLD = 30000; 
const SHIPPING_FEE = 3000; 
const MILEAGE_RATE = 0.05; 

