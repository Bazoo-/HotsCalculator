(function(window) {
	"use strict";

	/**
	 * Maths Class Constructor
	 * @static
	 */

	function Maths() {
		throw "The class Maths cannot be instantiated...";
	}

// public static method:
	/**
	 * @method multiply , divide, add, substract
	 * @param array pValues : Values that need to be multiplied
	 * @return {number} Answer to the math function
	 * @static
	 **/

	Maths.prototype.multiply = function(pValues) {
		var result = pValues[0];

		for (var i = 1; i < pValues.length; i++) {
			result *= pValues[i];
		}

		return result;
	};

	Maths.prototype.divide = function(pValues) {
		var result = pValues[0];

		for (var i = 1; i < pValues.length; i++) {
			result /= pValues[i];
		}

		return result;
	};

	Maths.prototype.add = function(pValues) {
		var result = pValues[0];

		for (var i = 1; i < pValues.length; i++) {
			result += pValues[i];
		}

		return result;
	};

	Maths.prototype.substact = function(pValues) {
		var result = pValues[0];

		for (var i = 1; i < pValues.length; i++) {
			result -= pValues[i];
		}

		return result;
	};

	// Random range

	Maths.prototype.randomRange = function(pMin, pMax) {
  	return Math.floor(Math.random() * (pMax - pMin + 1)) + pMin;
	};

	window.Maths = Maths;

}(window));
