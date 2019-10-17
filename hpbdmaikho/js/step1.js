
const TwoPI = Math.PI * 2;
var w = window.innerWidth;
var h = window.innerHeight;
var center_x = w / 2;
var center_y = h / 2;

var colors = ['#FF0000', '#E8D45B', '#8CFF00']

// I know the abs is not needed... but oh well
var max_distance = Math.abs(Math.max(center_x, center_y));
var min_distance = Math.abs(Math.min(center_x, center_y));
function Firefly(){
  this.velocity = 0;
  var random_angle = Math.random() * TwoPI;
  this.x = center_x +  Math.sin(random_angle) * ((Math.random() * (max_distance - min_distance) + min_distance));
  this.y = center_y + Math.cos(random_angle) * ((Math.random() * (max_distance - min_distance) + min_distance));

  
  
  this.angle_of_attack = Math.atan2(  this.y - center_y ,  this.x - center_x);
  this.vel =  ( Math.random() * 5 ) + 5 ;
  
  this.color = colors[ ~~(colors.length * Math.random()) ]
  
  
  this.xvel = this.vel * Math.cos( this.angle_of_attack );
  this.yvel = this.vel * Math.sin( this.angle_of_attack );
  this.size = 2 + Math.random() * 2;
  
  this.phase_diff = Math.random() * TwoPI;
    
}



Firefly.prototype.move = function(dt){
  if( isOnHeart(this.x, this.y)){
    this.size -= 0.001;
    return;
  }
  this.x += this.xvel * dt;
  this.y += this.yvel * dt;
}

Firefly.prototype.render = function(ctx, now){
  if( this.size < 1) {
    return;
  }
  ctx.globalAlpha = Math.max(Math.abs(Math.sin( (now + this.phase_diff) / (~~(this.size * 100)) )), 0.4);
  ctx.fillStyle = this.color;
  ctx.shadowColor = this.color;
  ctx.shadowBlur = 20 / this.size; 
  ctx.beginPath();
  ctx.arc( this.x, this.y, this.size, 0, TwoPI, false);
  ctx.closePath();
  ctx.fill();
}

var max_fireflies = 300;
var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var fireflies = [];


var last = Date.now();
var dt = 0, now = 0;
var alive_fireflies = 0;
var last_emit = 0;

function render(){
  now = Date.now();
  dt = (last - now) / 300; 
  last = now;
  ctx.clearRect(0,0,w,h);
  fireflies.forEach(function(f){
    f.move(dt);
    f.render(ctx, now);    
  });
  
  fireflies = fireflies.filter(function(f){
    return (f.size > 1);
  });

  alive_fireflies = fireflies.length;  
  
  if( alive_fireflies < max_fireflies && last_emit - now < - 100){
    fireflies.push( new Firefly());
    last_emit = now;
  }
  
  requestAnimationFrame(render);
}


render();

// 
function isOnHeart(x,y){
    x = ((x - center_x) / (min_distance * 1.2)) * 1.8;
    y = ((y - center_y) / (min_distance)) * - 1.8;

    var x2 = x * x;
    var y2 = y * y;
    // Simplest Equation of lurve
    return (Math.pow((x2 + y2 - 1), 3) - (x2 * (y2 * y)) <= 0);
}


document.addEventListener('DOMContentLoaded',function(event){
  // array with texts to type in typewriter
  var ctnText = document.querySelector(".content p");
  var dataText = [ctnText.innerHTML];
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
     ctnText.innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 130);
    }
  }
  // start a typewriter animation for a text in the dataText array
   function StartTextAnimation(i) {
     if (typeof dataText[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(0);
        }, 20000);
     }
     // check if dataText[i] exists
    if (i < dataText[i].length) {
      // text exists! start typewriter animation
      typeWriter(dataText[i], 0, function(){
        // after callback (and whole text has been animated), start next text
        StartTextAnimation(i + 1);
     });
    }
  }
  

  function btn() {
    var btn = document.getElementById('btn');
    var ctn = document.getElementById('content');
    var img = document.getElementById('img');
    setTimeout(function() {
      btn.classList.add('open');
    }, 10000);
    btn.addEventListener('click',function(){
      ctn.classList.add('open');
      // start the text animation
      setTimeout(function() {
        img.classList.add('open');
      }, 2000);
      setTimeout(function() {
        ctnText.style.display = "block";
        StartTextAnimation(0);
      }, 4000);
    });
  }
  btn();
});