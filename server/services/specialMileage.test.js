import test from 'node:test';
import assert from 'node:assert/strict';
import { redeemSpecialMileage, hashCode } from './specialMileage.js';
function fixture(overrides = {}, duplicate = false, insertFails = false) {
  const events = [];
  const conn = {
    async beginTransaction() { events.push('begin'); },
    async commit() { events.push('commit'); },
    async rollback() { events.push('rollback'); },
    release() { events.push('release'); },
    async query(sql, args) {
      events.push({sql,args});
      if (sql.startsWith('SELECT id FROM user')) return [[{id: 7}]];
      if (sql.includes('FROM special_mileage_codes')) return [[{ id:1, title:'이벤트', amount:3000, active:1, in_period:1, redeemed_count:0, max_redemptions:10, target_user_id:null, ...overrides }]];
      if (sql.includes('SELECT id FROM special_mileage_redemptions')) return [duplicate ? [{id:1}] : []];
      if (insertFails && sql.includes('INSERT INTO mileage_ledger')) throw new Error('DB failed');
      return [{affectedRows:1}];
    }
  };
  return {pool:{promise:()=>({getConnection:async()=>conn})},events};
}
test('코드 대소문자와 양끝 공백은 동일하게 처리',()=>assert.equal(hashCode(' ABCD-1234 '),hashCode('abcd-1234')));
test('정상 지급은 등록·원장·사용횟수를 한 트랜잭션으로 커밋',async()=>{
  const {pool,events}=fixture(); const result=await redeemSpecialMileage(pool,7,'ABCD-1234');
  assert.equal(result.amount,3000);
  assert.equal(events.filter(e=>e.sql?.startsWith('INSERT')).length,2);
  assert.deepEqual(events.slice(-2),['commit','release']);
  assert.deepEqual(events.find(e=>e.sql?.includes('INSERT INTO mileage_ledger')).args,[7,3000,'SPECIAL_COUPON','스페셜 적립금 · 이벤트']);
});
for(const [name,overrides,duplicate] of [['중복',{},true],['만료',{in_period:0}],['횟수 소진',{redeemed_count:10}],['다른 회원',{target_user_id:'8'}],['비활성',{active:0}]]) {
 test(name+' 쿠폰 지급 차단',async()=>{const {pool,events}=fixture(overrides,duplicate);await assert.rejects(redeemSpecialMileage(pool,7,'ABCD-1234'),{status:409});assert.ok(events.includes('rollback'));assert.ok(!events.some(e=>e.sql?.startsWith('INSERT')));});
}
test('원장 실패 시 전체 롤백',async()=>{const {pool,events}=fixture({},false,true);await assert.rejects(redeemSpecialMileage(pool,7,'ABCD-1234'));assert.deepEqual(events.slice(-2),['rollback','release']);assert.ok(!events.includes('commit'));});
test('로그인 및 형식 검증',async()=>{await assert.rejects(redeemSpecialMileage(null,null,'ABCD-1234'),{status:401});await assert.rejects(redeemSpecialMileage(null,7,'bad'),{status:400});});
