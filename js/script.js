window.addEventListener('DOMContentLoaded',function(){
	var modal = document.getElementById('modal01');
	var img = document.getElementById('img01');
	img.onclick = function(){modal.style.display = "block";}

	var modal02 = document.getElementById('modal02');
	var img02 = document.getElementById('img02');
	img02.onclick = function(){modal02.style.display = "block";}

	var span = document.getElementsByClassName("mark")[0];
	span.onclick = function() {modal.style.display = "none";}
	var span02 = document.getElementsByClassName("mark")[1];
	span02.onclick = function() {modal02.style.display = "none";}
})