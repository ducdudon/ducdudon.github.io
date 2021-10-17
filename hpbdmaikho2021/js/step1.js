document.addEventListener('DOMContentLoaded',function(event){
  function btn() {
    var btn = document.getElementById('btn');
    var bg = document.getElementById('bg');
    var card = document.getElementById('card');
    var tovideo = document.getElementById('tovideo');
    btn.addEventListener('click',function(){
      bg.classList.add('open');
    });
    setTimeout(function() {
      card.classList.toggle('hover');
      setTimeout(function() {
        tovideo.classList.add('open');
      }, 10000);
    }, 5000)
    card.addEventListener('click',function(){
      card.classList.toggle('hover');
    });
  }
  btn();

  setInterval(() => randomizedConfetti(), 500);
  function randomizedConfetti() {
    let randomX = Math.floor(Math.random() * (document.body.clientWidth-100) + 0);
    let randomY = Math.floor(Math.random() * (window.innerHeight-200) + 0);
    const burst = new mojs.Burst({
      left: 0,
      top: 0,
      radius: { 0: 200 },
      count: 20,
      degree: 360,
      children: {
        fill: { white: "#333" },
        duration: 3000
      }
    }).tune({
      x: randomX,
      y: randomY
    });
  
    burst.replay();
  }
});