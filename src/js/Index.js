// 배너 객체를 전역으로 등록 
window.banner = {
  rollId: null,
  interval: 2000,

  rollInit: function (newinterval) {
    if (parseInt(newinterval) > 0) {
      this.interval = newinterval; 
    }

    const firstitem = document.querySelector(".rolling_imgs li");
    if (firstitem) firstitem.classList.add("currentroll");

    const seconditem = document.querySelectorAll(".rolling_imgs li")[1];
    if (seconditem) seconditem.classList.add("nextroll");

    document.querySelector(".rolling_imgs li:last-child").classList.add("prevroll");
    
    this.rollId = setInterval(this.rollNext.bind(this), this.interval);
    console.log("Banner initialized");
  },

  rollNext: function () {
    const prev = document.querySelector(".prevroll");
    const current = document.querySelector(".currentroll");
    const next = document.querySelector(".nextroll");

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