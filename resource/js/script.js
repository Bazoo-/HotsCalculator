var levelProgressBar = document.getElementById('levelProgress');

levelProgressBar.addEventListener('mousedown', function(e) {
	changeLevel(e);
	this.addEventListener('mousemove', changeLevel);
});

window.addEventListener('mouseup', function() {
	levelProgressBar.removeEventListener('mousemove', changeLevel);
});

function changeLevel(e) {
	var x = e.pageX - levelProgressBar.offsetLeft;
	levelProgressBar.value = Math.round(x * levelProgressBar.max / levelProgressBar.offsetWidth);
	if (levelProgressBar.value === 0) levelProgressBar.value = 1;
	modifyStats();
}

function modifyStats() {

}
