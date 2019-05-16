window.addEventListener('DOMContentLoaded',function(){
  new Nav();
  new Faq();
  //new Top();
})

// Arcodion
var Faq = (function(){
	function Faq(){
		f = this;
		this._question = document.getElementsByClassName("question");
		this.i;
		this.answer;
		for (f.i = 0; f.i < f._question.length; f.i++) {
			this._toggle = function() {
				f.answer = this.nextElementSibling;
				this.classList.toggle("open");
				f.answer.classList.toggle("as_open");
			}
			f._question[f.i].addEventListener("click", f._toggle, false);
			//console.log(question[i]);
		}
	}
	return Faq;
})()

// CLick toogle menu
var Nav = (function(){
	function Nav(){
		n = this;
		this._iconNav = document.getElementById("nav_ham");
		this._menuNav = document.getElementById("nav");
		this._main = document.getElementById("mt");
		this._toggle = function(){
			n._iconNav.classList.toggle("open");
			n._menuNav.classList.toggle("active");
			n._main.classList.toggle("block_scroll");
		}
		n._iconNav.addEventListener("click",n._toggle,false);
	}
	return Nav;
})()

// Scroll top
var Top = (function(){
	function Top() {
		t = this;
		this.timeOut;
		this._target = document.querySelector("#top");
		this._scrollTop = document.body.scrollTop;
		this._toTop = document.documentElement.scrollTop;
		this._click = function() {
			if (t._scrollTop != 0 || t._toTop != 0){
				window.scrollBy(0,-100);
				t.timeOut = setTimeout('Top()',10);
			}else{
				clearTimeout(t.timeOut);
			}
		}
		t._click();
	}
	document.querySelector("#top").addEventListener('click',Top,false);
	document.querySelector("#top_footer").addEventListener('click',Top,false);
	return Top;
})()

//WOW
new WOW().init();