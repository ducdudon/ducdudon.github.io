document.addEventListener('DOMContentLoaded',function(event){
  function btn() {
    var btn = document.getElementById('btn');
    var bg = document.getElementById('bg');
    var card = document.getElementById('card');
    var tovideo = document.getElementById('tovideo');
    btn.addEventListener('click',function(){
      bg.classList.add('open');
      play();
      setInterval(() => randomizedConfetti(), 500);
      setTimeout(function() {
        card.classList.toggle('hover');
        setTimeout(function() {
          tovideo.classList.add('open');
        }, 10000);
      }, 10000);
    });
    card.addEventListener('click',function(){
      card.classList.toggle('hover');
    });
    tovideo.addEventListener('click',function(){
      video();
    });
  }
  btn();

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

  function play(){
    var audio = document.getElementById("audio");
    audio.play();
    audio.loop = true;
    audio.volume = 0.5;
   }

  function video(){
    var video = document.getElementById("video");
    var audio = document.getElementById("audio");
    video.play();
    audio.pause();
    toggleFullScreen();
   }
 
   function toggleFullScreen() {
     var el = document.getElementById("video");
     if (el.requestFullscreen) {
       el.requestFullscreen();
     } else if (el.msRequestFullscreen) {
       el.msRequestFullscreen();
     } else if (el.mozRequestFullScreen) {
       el.mozRequestFullScreen();
     } else if (el.webkitRequestFullscreen) {
       el.webkitRequestFullscreen();
     }
   };
});