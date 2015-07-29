(function(window) {

	"use strict";

	Stat.prototype.stats = false;

	/**
	 * Constructor of the class Stat (Inherits from the class Item)
	 * @param Int pId : Id of the stat in the database
	 * @param Float pValue : Value of the stat at level 1
	 * @param Float pIncrement : How much the value of the stat increments per level
	 * @static
	 */

	function Stat(pId, pValue, pIncrement) {

		if(!this.stats) throw "The stats database needs to be defined";

		this.id = pId;
		this.stat = this.stats[pId];

		var desc = '#0 ' + this.stat.label;
		var value = [pValue];
		var increment = pIncrement ? [pIncrement] : pIncrement;

		Item.call(this, this.stat.name, desc, value, increment);
	}

	Stat.prototype = Object.create(Item.prototype);
	Stat.prototype.constructor = Stat;

	window.Stat = Stat;

}(window));
