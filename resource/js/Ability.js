(function(window) {

	"use strict";

	Ability.prototype.abilities = false;

	/**
	 * Constructor of the class Ability
	 * @param Int pId : Id of the ability
	 * @static
	 */

	function Ability(pId) {

		if(!this.abilities) throw "The abilities database needs to be defined";

		var ability = this.abilities[pId];

		Item.call(this,
			ability.name,
			ability.desc,
			ability.values,
			ability.increments
		);

		var keys = Object.keys(ability);
		var mismatch = ['name', 'desc', 'values', 'increments'];

		for (var i = 0; i < keys.length; i++) {
			if(mismatch.indexOf(keys[i]) == -1) {
				this[keys[i]] = ability[keys[i]];
			}
		}
	}

	Ability.prototype = Object.create(Item.prototype);
	Ability.prototype.constructor = Ability;

	window.Ability = Ability;

}(window));
