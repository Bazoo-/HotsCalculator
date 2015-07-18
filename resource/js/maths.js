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

	Maths.multiply = function(pValues) {
		var result = pValues[0];

		for (var i = 1; i < pValues.length; i++) {
			result *= pValues[i];
		}

		return result;
	};

	Maths.divide = function(pValues) {
		var result = pValues[0];

		for (var i = 1; i < pValues.length; i++) {
			result /= pValues[i];
		}

		return result;
	};

	Maths.add = function(pValues) {
		var result = pValues[0];

		for (var i = 1; i < pValues.length; i++) {
			result += pValues[i];
		}

		return result;
	};

	Maths.substact = function(pValues) {
		var result = pValues[0];

		for (var i = 1; i < pValues.length; i++) {
			result -= pValues[i];
		}

		return result;
	};

	window.Maths = Maths;

}(window));
