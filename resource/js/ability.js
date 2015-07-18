(function(window) {

	"use strict";

	/**
	 * Constructor of the class Ability
	 * @param Float pValues : Value of the item at level 1
	 * @param Float pIncrement : How much
	 * @static
	 */

	function Ability(pId) {
		this.abilityName = pName;
		this.desc = pDescription;

		this.values = pValues;
		this.increments = pIncrements;

		// Correct operand?
		if(this.values && this.increments) {
			return this.levelChangeDescription(1);
		} else {
			return this.desc;
		}
	}

	Ability.prototype.createAbility = function() {

	};

	window.Ability = Ability;

}(window));
