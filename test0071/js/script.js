window.addEventListener('DOMContentLoaded',function(){
  //new slideBanner();
})


// function writeMessage(canvas, messx, messy) {
//   var context = canvas.getContext('2d');
//   var width = canvas.width/2;
//   var height = canvas.height/2;
//   context.beginPath();
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.moveTo(width, height);
// 	context.quadraticCurveTo(messx, messy, 200, height);
// 	context.lineWidth = 5;
// 	context.strokeStyle = 'black';
// 	context.stroke();
//   console.log(canvas.width);
// }
// function getMousePos(canvas, evt) {
//   var rect = canvas.getBoundingClientRect();
//   return {
//     x: evt.clientX - rect.left,
//     y: evt.clientY - rect.top
//   };
// }
// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');


// canvas.addEventListener('mousemove', function(evt) {
//   var mousePos = getMousePos(canvas, evt);
//   var messx = mousePos.x;
//   var messy = mousePos.y;
//   writeMessage(canvas, messx, messy);
// }, false);

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

function drawRectangle(myRectangle, context) {
  context.beginPath();
  context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
  context.lineWidth = myRectangle.borderWidth;
  var context = canvas.getContext('2d');
  var width = canvas.width;
  var height = canvas.height;
  var moveX = myRectangle.x;
  var moveY = myRectangle.y;
  // moveX += 100;
  // moveY += 100;
  context.beginPath();
  context.clearRect(0, 0, width, height);
  context.moveTo((width), 400);
	//context.quadraticCurveTo(myRectangle.x, myRectangle.y, -100, 400);
	context.bezierCurveTo(0, moveY, 0, moveY, 0, 400);
	context.lineWidth = 2;
	context.strokeStyle = 'black';
	context.stroke();
  //console.log(moveY);
}
function animate(myRectangle, canvas, context, startTime) {
  // update
  var time = (new Date()).getTime() - startTime;
  var amplitude = 500;

  // in ms
  // var period = 3000;
  // var centerX = canvas.width / 2 - myRectangle.width / 2;
  // nextX += 10;
  // if(nextX > (canvas.width+myRectangle.width)*1.1) {
  // 	nextX = 0;
  // }

  var period = 10000;
  var centerX = canvas.width / 2 - myRectangle.width / 2;
  var nextX = amplitude * Math.sin(time * 2 * Math.PI / period) + centerX;
  myRectangle.x = nextX;

  nextY = 600 * Math.sin(nextX*2*Math.PI / period);
  myRectangle.y = nextY;

  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw
  drawRectangle(myRectangle, context);

  // request new frame
  requestAnimFrame(function() {
    animate(myRectangle, canvas, context, startTime);
  });
}
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var myRectangle = {
  x: 0,
  y: 75,
  width: 100,
  height: 50,
  borderWidth: 2
};
var nextX = 0;
var nextY = 100;
drawRectangle(myRectangle, context);

// wait one second before starting animation
setTimeout(function() {
  var startTime = (new Date()).getTime();
  animate(myRectangle, canvas, context, startTime);
}, 1000);



///////////////////////////////////
function plotSine(ctx, xOffset, yOffset) {
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var scale = 500;
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(66,44,255)";
  
  var x = 0;
  var y = 0;
  var amplitude = 200;
  var frequency = 400;
  while (x < width) {
      y = height/2 + amplitude * Math.sin((x+xOffset)/frequency);
      ctx.lineTo(x, y);
      x++;
  }
  ctx.stroke();
}
function draw() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, 1000, 800);
  context.save();            
  
  plotSine(context, step, 150);
  context.restore();
  
  step += 4;
  window.requestAnimationFrame(draw);
}
function init() {
  window.requestAnimationFrame(draw);
}
var step = -4;
