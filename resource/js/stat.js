(function(window) {

	"use strict";

	/**
	 * Constructor of the class Stat
	 * @param Int pId : Id of the stat in the database
	 * @param Float pValue : Value of the stat at level 1
	 * @param Float pIncrement : How much
	 * @static
	 */

	function Stat(pId) {
		this.statClass = pClass;
		this.statValue = pValue;
		this.statIncrement = pIncrement;
	}

	window.Stat = Stat;

}(window));
