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

var heroesDb = $.getJSON('resource/db/heroes.json');
var statsDb = $.getJSON('resource/db/stats.json');
var abilitiesDb = $.getJSON('resource/db/abilities.json');
var talentsDb = $.getJSON('resource/db/talents.json');

Hero.prototype.heroes = heroesDb;
Stat.prototype.stats = statsDb;
Ability.prototype.abilities = Talent.prototype.abilitiesDb = abilitiesDb;
Talent.prototype.talentsDb = talentsDb;

var hero = new Hero(1);
var objects = hero.getObjects();
var abilities = objects.abilities;
var stats = objects.stats;

Talent.prototype.abilities = abilities;

var talents = Hero.tierTalents();
