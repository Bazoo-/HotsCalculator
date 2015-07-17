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
			this.levelChangeDescription(1);
		}
	}

	Item.prototype.levelChangeDescription = function(pLevel) {
		
		var newValues = [];
		var newDesc;
		
		for(var i = 0; i < this.values.length; i++) {
			newValues[i] = (this.increments[i] * pLevel) + this.values[i];
			var regexV = new RegExp('#' + i);
			var regexI = new RegExp('%' + i);
			if(!i) newDesc = this.desc.replace(regex, newValues[i]);
			newDesc = newDesc.replace(regexV, newValues[i]);
			newDesc = newDesc.replace(regexI, this.increments[i]);
		}

		return {values : newValues, desc : newDesc};
	}

	Item.prototype.modifyItem = function(pFunction) {

	}

	window.Item = Item;

}(window));