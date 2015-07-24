(function(window) {

	"use strict";

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

	var heroesDb, statsDb, abilitiesDb, talentsDb;
	$.getJSON('resource/db/heroes.json', function(data){
		heroesDb = data;
	});
	$.getJSON('resource/db/stats.json', function(data){
		statsDb = data;
	});
	$.getJSON('resource/db/abilities.json', function(data){
		abilitiesDb = data;
	});
	$.getJSON('resource/db/talents.json', function(data){
		talentsDb = data;
	});

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

}(window));
