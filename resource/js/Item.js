(function(window) {

	"use strict";

	Item.prototype.level = 1;

	/**
	 * Constructor of the class Item
	 * @param String pName : Name of the item
	 * @param String pDescription : Raw description of the item with values replaced
	 * @param Array pValues : Values of the item at level 1
	 * @param Array pIncrements : How much the values increments per level
	 * @static
	 */

	function Item(pName, pDescription, pValues, pIncrements) {
		this.modifierCode = 0;
		this.modifiers = [];
		this.modifiersList = [];
		this.name = pName;
		this.rawDesc = pDescription;

		this.values = pValues;
		this.increments = pIncrements;

		// Correct operand?
		if(this.values && this.increments) {
			this.updateValues();
		} else {
			this.desc = pDescription;
		}
	}

	/**
		* Modifies the raw description with the new values
		* @param Array pValues : New values to replace in the raw description
		* @return String newDesc : The modified description
		*/

	Item.prototype.modifyDesc = function(pValues) {
		var newDesc;
		for(var i = 0; i < pValues.length; i++) {
			var regexV = new RegExp('#' + i);
			if(!i) newDesc = this.rawDesc.replace(regex, pValues[i]);
			newDesc = newDesc.replace(regexV, pValues[i]);
		}
		return newDesc;
	};

	/**
		* Modifies original values to be incremented with levels
		* @return Array newValues : New values incremented with levels
		*/

	Item.prototype.levelUpdate = function() {

		if(!this.values && !this.increments) {
			return;
		}

		var newValues = [];

		for(var i = 0; i < this.values.length; i++) {
			newValues[i] = (this.increments[i] * this.level) + this.values[i];
		}

		return newValues;
	};

	/**
		* Updates the leveled values with the modifications
		* @static
		*/

	Item.prototype.updateValues = function () {
		var plusMods = [];
		var multMods = [];

		for (var x = 0; x < this.values.length; x++) {
			plusMods[x] = 0;
			multMods[x] = 1;
		}

		for (var i = 0; i < this.modifiers.length; i++) {
			for (var y = 0; y < this.values.length; y++) {
				var mod = this.modifiers[i][y];

				if(mod.substring(0, 1) === '*') {
					multMods[y] += parseFloat(mod.substring(1));
				} else {
					plusMods[y] += mod;
				}
			}
		}

		var newValues = this.levelUpdate();

		for (var z = 0; z < this.values.length; z++) {
			newValues[z] += plusMods[z];
			newValues[z] *= multMods[z];
		}

		this.desc = this.modifyDesc(newValues);
	};

	Item.prototype.addModifiers = function(pModifiers) {
		this.modifiers.push(pModifiers);
		this.modifiersList.push(this.getNewModifierCode());
		this.updateValues();
		return this.modifierCode;
	};

	Item.prototype.removeModifiers = function(pModifierCode) {
		var modifiersIndex = this.modifiers.indexOf(pModifierCode);
		this.modifiers.splice(modifiersIndex, 1);
		this.modifiersList.splice(modifiersIndex, 1);
		this.updateValues();
	};

	Item.prototype.getNewModifierCode = function() {
		return this.modifierCode++;
	};

	window.Item = Item;

}(window));
