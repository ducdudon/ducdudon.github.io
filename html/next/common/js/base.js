window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback){
    return window.setTimeout(callback, 1000/60);
  };
})();

window.cancelAnimFrame = (function(_id) {
  return window.cancelAnimationFrame ||
  window.cancelRequestAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.mozCancelRequestAnimationFrame ||
  window.msCancelAnimationFrame ||
  window.msCancelRequestAnimationFrame ||
  window.oCancelAnimationFrame ||
  window.oCancelRequestAnimationFrame ||
  function(_id) { window.clearTimeout(id); };
})();

window.addEventListener('DOMContentLoaded', function() {
  new Scroll();
  new Social();
});

window.addEventListener('load', function(){
  new Loading();
});

/* images pc <---> sp */
(function () {
  var PicturePolyfill = (function () {
    function PicturePolyfill() {
      var _this = this;
      this.pictures = [];
      this.onResize = function () {
        var width = document.body.clientWidth;
        for (var i = 0; i < _this.pictures.length; i = (i + 1)) {
          _this.pictures[i].update(width);
        };
      };
      if ([].includes) return;
      var picture = Array.prototype.slice.call(document.getElementsByTagName('picture'));
      for (var i = 0; i < picture.length; i = (i + 1)) {
        this.pictures.push(new Picture(picture[i]));
      };
      window.addEventListener("resize", this.onResize, false);
      this.onResize();
    }
    return PicturePolyfill;
  }());
  var Picture = (function () {
    function Picture(node) {
      var _this = this;
      this.update = function (width) {
        width <= _this.breakPoint ? _this.toSP() : _this.toPC();
      };
      this.toSP = function () {
        if (_this.isSP) return;
        _this.isSP = true;
        _this.changeSrc();
      };
      this.toPC = function () {
        if (!_this.isSP) return;
        _this.isSP = false;
        _this.changeSrc();
      };
      this.changeSrc = function () {
        var toSrc = _this.isSP ? _this.srcSP : _this.srcPC;
        _this.img.setAttribute('src', toSrc);
      };
      this.img = node.getElementsByTagName('img')[0];
      this.srcPC = this.img.getAttribute('src');
      var source = node.getElementsByTagName('source')[0];
      this.srcSP = source.getAttribute('srcset');
      this.breakPoint = Number(source.getAttribute('media').match(/(\d+)px/)[1]);
      this.isSP = !document.body.clientWidth <= this.breakPoint;
      this.update();
    }
    return Picture;
  }());
  new PicturePolyfill();
}());

// Scroll section
var Scroll = function() {
  function Scroll() {
    var s = this;
    this._main = document.getElementById('main');
    this._section = document.querySelectorAll('.section');
    this._member = document.querySelectorAll('.member');
    this._logo = document.getElementById('logo_r');
    this._amenu = document.querySelectorAll('#aside_menu li');
    this._footer = document.getElementById('footer');
    this._topscr = document.getElementById('top_scr');
    this._height = window.innerHeight;
    this._control = false;
    this.sec = 0;
    this.y;
    this.m;
    this.step = function(){
      (s.y > 0)?
        (s.sec >= (s._section.length - 1))?
        s.sec = s._section.length - 1:
        s.sec++:
      (s.sec <= 0)?s.sec = 0:s.sec--;
      s._main.style.transform = 'translateY('+(-s.sec*s._height)+'px)';
      s._main.style.transition = 'transform .5s cubic-bezier(0.76, 0.02, 0.24, 0.99)';
    }
    this.scroll = function(){
      s.y = ((event.deltaY || -s.wheelDelta || s.detail) >>10 ) || 1;
      s.step();
    }
    this.delay = function(){
      s._control = true;
      setTimeout(function() { s._control = false; },1200);
    }
    this.change = function(){
      (s.sec < 2)?
      s._logo.classList.remove('black'):
      setTimeout(function() {s._logo.classList.add('black');},1000);
    }
    this.active = function(){
      Array.prototype.forEach.call(s._amenu, function(e){
        e.classList.remove('active');
      })
      s._amenu[s.sec].classList.add('active');
      s._section[s.sec].classList.add('effect');
      (s.sec < (s._section.length - 1)) ? 
      s._footer.classList.remove('open') :
      s._footer.classList.add('open');
      if (s._topscr) {
        s.change();
      }
    }
    this.handle = function(){
      if (!s._control) {
        s.scroll();
        s.delay();
        s.active();
      }
    }
    this.effect = function(){
      Array.prototype.forEach.call(s._section,function(el, i){
        s._section[0].classList.add('effect');
        s._section[i].style.height = s._height+'px';
      });
    }
    Array.prototype.forEach.call(s._amenu,function(el, i){
      el.addEventListener('click',function(e){
        s.sec = i-1;
        s.handle();
      })
    });
    if (s._topscr) {
      s._topscr.addEventListener('click',function(){
        s.sec = 0;
        s.handle();
      });
    }
    setTimeout(function() { s.effect(); },1500);
    window.addEventListener('wheel', s.handle);
    window.addEventListener('touchstart', function(e){
      s.m = e.touches[0].screenY;
    });
    window.addEventListener('touchmove', function(e){
      if (!s._control){
        (s.m > e.touches[0].screenY) ? s.y = 1 : s.y = -1;
        s.step();
        s.delay();
        s.active();
      }
    });
    window.addEventListener('resize', function(){
      s._height = window.innerHeight;
      s._main.style.transform = 'translateY('+(-s.sec*s._height)+'px)';
      s.effect();
    });
  };
  return Scroll;
}();

// Social
var Social = function() {
  function Social() {
    var s = this;
    this._btn = document.getElementById('btn_share');
    this._lst = document.getElementById('lst_share');
    this.active = function(){
      s._btn.classList.toggle('open');
      s._lst.classList.toggle('open');
    };
    s._btn.addEventListener('click', s.active);
  };
  return Social;
}();

// Loading page
var Loading = function() {
  function Loading() {
    var l = this;
    this._loading = document.getElementById('loading');
    this.active = function(){
      l._loading.classList.add('active');
      setTimeout(function(){ l._loading.classList.add('end'); }, 1000);
      setTimeout(function(){ l._loading.classList.add('zindex'); }, 2000);
    };
    l.active();
  };
  return Loading;
}();