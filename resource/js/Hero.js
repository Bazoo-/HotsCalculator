(function(window) {

	"use strict";

	Hero.prototype.heroes = false;

	/**
	 * Constructor of the class Hero
	 * @param Int pId : Id of the hero
	 * @static
	 */

	function Hero(pId) {

		if(!this.heroes) throw "The heroes database needs to be defined";

		var hero = this.heroes[pId];

		this.name = hero.name;
		this.role = hero.role;
		this.allTalents = hero.talents;
		this.abilities = [];
		this.stats = [];

		for (var i = 0; i < hero.abilities.length; i++) {
			this.abilities[i] = new Ability(hero.abilities[i]);
		}

		for (var x = 0; x < hero.stats.length; x++) {
			var stat = hero.stats[x];
			this.stats[x] = new Stat(stat[0], stat[1], stat[2]);
		}
	}

	Hero.prototype.getObjects = function () {
		return { abilities : this.abilities, stats : this.stats};
	};

	Hero.prototype.tierTalents = function () {
		this.tierTalents = [];
		for (var i = 0; i < this.allTalents.length; i++) {
			var tier = [];
			for (var x = 0; x < this.allTalents[i].length; x++) {
				tier[x] = new Talent(this.allTalents[i][x]);
			}
			this.tierTalents[i] = tier;
		}

		return this.tierTalents;
	};

	window.Hero = Hero;

}(window));
