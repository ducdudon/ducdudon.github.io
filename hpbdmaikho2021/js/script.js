/* https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/ */

function getTimeRemaining(endtime){
  var arr = endtime.split(/[- :]/);
  var date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
  var t = Date.parse(date) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60);
  var minutes = Math.floor( (t/1000 / 60) % 60);
  var hours = Math.floor( (t/(1000 * 60 * 60)) % 24);
  var days = Math.floor( t/(1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime){
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  
  function updateClock(){
    var t = getTimeRemaining(endtime);
    
    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
    if(t.total <= 0){
      clearInterval(timeinterval);
      window.location.href = "step1.html";
    }
  }
  
  updateClock();
  var timeinterval = setInterval(updateClock,1000);
}

var deadline = '2021-10-19 00:00:00';
initializeClock('clockdiv', deadline);

function height(){
  var m = document.getElementById("main");
  m.style.height = window.innerHeight + "px";
}
height();
window.addEventListener("resize",height,false);
