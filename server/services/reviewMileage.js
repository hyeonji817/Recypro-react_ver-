import fs from 'node:fs/promises';import path from 'node:path';import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {reviewMileage} from './mileagePolicy.js';
const fail=(status,message)=>Object.assign(Error(message),{status});
export function photoExtension(buffer){
 if(buffer?.length>3&&buffer[0]===255&&buffer[1]===216&&buffer[2]===255)return 'jpg';
 if(buffer?.length>8&&buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return 'png';
 if(buffer?.length>12&&buffer.toString('ascii',0,4)==='RIFF'&&buffer.toString('ascii',8,12)==='WEBP')return 'webp';
 throw fail(400,'JPG·PNG·WEBP 사진만 첨부할 수 있습니다.');
}
export async function submitRewardReview(pool,userId,input,files=[],uploadRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../uploads/reviews')){
 const {order_item_id,rv_title}=input||{};const rating=Number(input?.rv_rating);
 if(!/^\d+$/.test(String(order_item_id))||Number(order_item_id)<=0||typeof rv_title!=='string'||!rv_title.trim()||rv_title.length>1000||!Number.isInteger(rating)||rating<1||rating>5)throw fail(400,'리뷰 내용(1~1000자)과 별점(1~5점)을 확인해 주세요.');
 const amount=reviewMileage(files.length);const extensions=files.map(file=>{if(file.size>5*1024*1024)throw fail(400,'사진은 장당 5MB 이내로 첨부해 주세요.');return photoExtension(file.buffer);});
 const conn=await pool.promise().getConnection();const saved=[];
 try{
  await conn.beginTransaction();const [[user]]=await conn.query('SELECT id,withdrawn_at FROM user WHERE id=? FOR UPDATE',[userId]);if(!user||user.withdrawn_at!=null)throw fail(401,'로그인이 필요합니다.');
  const [[item]]=await conn.query("SELECT oi.order_item_id,oi.order_id,oi.pname FROM order_items oi JOIN orders o ON o.order_id=oi.order_id JOIN mileage_delivery_confirmations d ON d.order_id=o.order_id WHERE oi.order_item_id=? AND o.user_id=? AND o.status='PAID'",[order_item_id,userId]);if(!item)throw fail(404,'배송완료된 본인 주문 상품만 리뷰를 작성할 수 있습니다.');
  const [[existing]]=await conn.query('SELECT order_item_id FROM mileage_review_rewards WHERE order_item_id=?',[order_item_id]);if(existing)throw fail(409,'이미 리뷰와 적립금이 등록된 주문 상품입니다.');
  const [[legacy]]=await conn.query('SELECT r.pname FROM review r WHERE r.id=? AND r.pname=? AND NOT EXISTS (SELECT 1 FROM mileage_review_rewards a WHERE a.user_id=r.id AND a.pname=r.pname) LIMIT 1',[userId,item.pname]);if(legacy)throw fail(409,'기존 리뷰가 등록된 상품은 소급 적립하지 않습니다.');
  await fs.mkdir(uploadRoot,{recursive:true});for(let i=0;i<files.length;i++){const filename=crypto.randomUUID()+'.'+extensions[i];const dest=path.join(uploadRoot,filename);await fs.writeFile(dest,files[i].buffer,{flag:'wx'});saved.push({dest,url:'reviews/'+filename});}
  const images=saved.map(file=>file.url);
  const [credit]=await conn.query('INSERT INTO mileage_ledger (user_id,order_id,delta,reason,memo) VALUES (?,?,?,?,?)',[userId,item.order_id,amount,'REVIEW_EARN',images.length?'사진 리뷰 적립':'텍스트 리뷰 적립']);
  await conn.query('INSERT INTO mileage_review_rewards (order_item_id,order_id,user_id,pname,content,rating,images_json,amount,ledger_id) VALUES (?,?,?,?,?,?,?,?,?)',[order_item_id,item.order_id,userId,item.pname,rv_title.trim(),rating,JSON.stringify(images),amount,credit.insertId]);
  await conn.query('INSERT INTO review (image,rv_title,rv_rating,id,date,pname) VALUES (?,?,?,?,CURRENT_DATE(),?)',[images[0]||'',rv_title.trim(),rating,userId,item.pname]);
  await conn.commit();return {success:true,earned:amount,message:`리뷰 등록과 ${amount.toLocaleString('ko-KR')}원 적립이 완료되었습니다.`};
 }catch(error){await conn.rollback();for(const file of saved)await fs.unlink(file.dest).catch(()=>{});throw error;}finally{conn.release();}
}
