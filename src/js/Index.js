// 배너 객체를 전역으로 등록 
window.banner = {
  rollId: null,
  interval: 2000,

  rollInit: function (newinterval) {
    console.log("rollInit 시작");
    if (parseInt(newinterval) > 0) {
      this.interval = newinterval; 
    }

    const firstitem = document.querySelector(".rolling_imgs li");
    console.log("첫 번째 항목: ", firstitem);   // 첫 번째 아이템 확인 
    if (firstitem) firstitem.classList.add("currentroll");

    const seconditem = document.querySelectorAll(".rolling_imgs li")[1];
    console.log("두 번째 항목: ", seconditem);  // 두 번째 아이템 확인 
    if (seconditem) seconditem.classList.add("nextroll");

    const lastItem = document.querySelector(".rolling_imgs li:last-child");
    console.log("마지막 항목: ", lastItem);   // 마지막 아이템 확인 
    if (lastItem) lastItem.classList.add("prevroll");
    
    this.rollId = setInterval(this.rollNext.bind(this), this.interval);
    console.log("Banner initialized");
  },

  rollNext: function () {
    console.log("rollNext 호출됨");   // 전환 함수 호출 확인 
    const prev = document.querySelector(".prevroll");
    const current = document.querySelector(".currentroll");
    const next = document.querySelector(".nextroll");

    console.log("prev:", prev, "current:", current, "next:", next); // 전환 전 상태 출력 

    if (prev) prev.classList.remove("prevroll");
    if (current) {
      current.classList.add("prevroll");
      current.classList.remove("currentroll");
    }
    if (next) {
      next.classList.add("currentroll");
      next.classList.remove("nextroll");
    }

    const newNext = 
      next?.nextElementSibling || document.querySelector(".rolling_imgs li");
    newNext.classList.add("nextroll");
    console.log("Banner rolled to the next image");
  },
};