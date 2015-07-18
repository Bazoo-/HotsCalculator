(function(window) {

	"use strict";

	/**
	 * Constructor of the class Item
	 * @param Float pValues : Value of the item at level 1
	 * @param Float pIncrement : How much
	 * @static
	 */

	function Item(pName, pDescription, pValues, pIncrements) {
		this.itemName = pName;
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

	Item.prototype.levelChangeDescription = function(pLevel) {

		if(!this.values && !this.increments) {
			return;
		}

		var newValues = [];

		for(var i = 0; i < this.values.length; i++) {
			newValues[i] = (this.increments[i] * pLevel) + this.values[i];
		}

		var newDesc = this.modifyDesc(newValues);

		return {values : newValues, desc : newDesc};
	};

	Item.prototype.modifyItem = function(pValues, pModifiers) {
		var newValues = this.values;
		for (var i = 0; i < pValues.length; i++) {
			newValues[pValues[i]]
		}
	};

	Item.prototype.modifyDesc = function(pValues) {
		var newDesc;
		for(var i = 0; i < pValues.length; i++) {
			var regexV = new RegExp('#' + i);
			if(!i) newDesc = this.desc.replace(regex, pValues[i]);
			newDesc = newDesc.replace(regexV, pValues[i]);
		}
		return newDesc;
	}

	window.Item = Item;

}(window));
