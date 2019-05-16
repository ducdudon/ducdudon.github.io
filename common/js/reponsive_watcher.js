// JavaScript Document

var ResponsiveWatcher = (function () {
  function ResponsiveWatcher() {
    var _this = this;
    this.responsiveRatio = 769;
    this.isSP = window.innerWidth >= this.responsiveRatio ? true : false;
    this.isFirstTrigger = true;
    this.domRespnosiveImage = document.getElementsByClassName('resimg');
    this.init = function () {
      window.addEventListener("resize", _this.OnResize, false);
    };
    this.OnResize = function () {
      var i = 0 | 0;
      if (window.innerWidth >= _this.responsiveRatio && _this.isSP) {
        _this.isSP = false;
        for (i = 0; i < _this.domRespnosiveImage.length; i = (i + 1) | 0) {
          _this.domRespnosiveImage[i].setAttribute("src", _this.domRespnosiveImage[i].getAttribute("src").replace("_sp.", "_pc."));
        };
      }
      if (window.innerWidth < _this.responsiveRatio && !_this.isSP) {
        _this.isSP = true;
        for (i = 0; i < _this.domRespnosiveImage.length; i = (i + 1) | 0) {
          _this.domRespnosiveImage[i].setAttribute("src", _this.domRespnosiveImage[i].getAttribute("src").replace("_pc.", "_sp."));
        };
      }
      if (_this.isFirstTrigger) {
        _this.isFirstTrigger = false;
        for (i = 0; i < _this.domRespnosiveImage.length; i = (i + 1) | 0) {
          _this.domRespnosiveImage[i].style.visibility = "visible";
        }
      }
    };
    window.addEventListener('DOMContentLoaded', this.init);
    this.OnResize();
  }
  return ResponsiveWatcher;
}());

new ResponsiveWatcher();
