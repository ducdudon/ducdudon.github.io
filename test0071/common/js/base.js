window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
window.cancelAnimFrame = (function () {
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
        function (id) { window.clearTimeout(id); };
})();
function closest(el,selector) {
  // type el -> Object
  // type select -> String
  var matchesFn;
  // find vendor prefix
  ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
    if (typeof document.body[fn] == 'function') {
      matchesFn = fn;
      return true;
    }
    return false;
  })
  var parent;
  // traverse parents
  while (el) {
    parent = el.parentElement;
    if (parent && parent[matchesFn](selector)) {
      return parent;
    }
    el = parent;
  }
  return null;
}
function getCssProperty(elem, property){
   return window.getComputedStyle(elem,null).getPropertyValue(property);
}
var easingEquations = {
  easeOutSine: function (pos) {
      return Math.sin(pos * (Math.PI / 2));
  },
  easeInOutSine: function (pos) {
      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
  },
  easeInOutQuint: function (pos) {
      if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
      }
      return 0.5 * (Math.pow((pos - 2), 5) + 2);
  }
};
function isPartiallyVisible(el) {
  var elementBoundary = el.getBoundingClientRect();
  var top = elementBoundary.top;
  var bottom = elementBoundary.bottom;
  var height = elementBoundary.height;
  return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}
function isFullyVisible(el) {
  var elementBoundary = el.getBoundingClientRect();
  var top = elementBoundary.top;
  var bottom = elementBoundary.bottom;
  return ((top >= 0) && (bottom <= window.innerHeight));
}
function CreateElementWithClass(elementName ,className) {
  var el = document.createElement(elementName);
  el.className = className;
  return el;
}
function createElementWithId(elementName,idName){
  var el =  document.createElement(elementName);
  el.id = idName;
  return el;
}
function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    document.body.appendChild(outer);
    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";
    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        
    var widthWithScroll = inner.offsetWidth;
    // remove divs
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}
function insertAfter(referenceNode,newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
window.addEventListener('DOMContentLoaded',function(){
  
})