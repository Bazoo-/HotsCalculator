(function(window) {

	"use strict";

	Talent.prototype.talentsDb = false;
	Talent.prototype.abilitiesDb = false;
	Talent.prototype.abilities = false;

	/**
	 * Constructor of the class Talent
	 * @param Int pId : Id of the talent
	 * @static
	 */

	function Talent(pId) {

		if(!this.talentsDb || !this.abilitiesDb || !this.abilities) throw "The static values need to be defined";

		var talent = this.talentsDb[pId];
		if(talent.abilityId) talent = this.abilitiesDb[talent.abilityId];

		Item.call(this,
			talent.name,
			talent.desc,
			talent.values,
			talent.increments
		);

		var keys = Object.keys(talent);
		var mismatch = ['name', 'desc', 'values', 'increments'];

		for (var i = 0; i < keys.length; i++) {
			if(mismatch.indexOf(keys[i]) == -1) {
				this[keys[i]] = talent[keys[i]];
			}
		}

		this.assignMods();
	}

	Talent.prototype = Object.create(Item.prototype);
	Talent.prototype.constructor = Talent;

	Talent.prototype.assignMods = function() {
		if(!this.abilitiesNum && !this.statsId) return;

		this.affectedAbilities = [];
		this.affectedStats = [];

		if(this.abilitiesNum) {
			for (var i = 0; i < this.abilitiesNum.length; i++) {
				this.affectedAbilities[i] = this.abilities[this.abilitiesNum[i]];
			}
		}

		if(this.statsId) {
			for (var x = 0; x < this.statsId.length; x++) {
				for (var y = 0; y < pStats.length; y++) {
					if(pStats[y].id === this.statsId[x]) this.affectedStats[x] = pStats[y];
				}
			}
		}
	};

	Talent.prototype.activateTalent = function() {
		if(!this.abilitiesNum && !this.statsId) return;

		if(this.abilitiesNum) {
			this.abilitiesCodes = [];
			for (var i = 0; i < this.abilitiesNum.length; i++) {
				this.abilitiesCodes[i] = this.affectedAbilities[i].addModifiers(this.abilitiesMods[i]);
			}
		}

		if(this.statsId) {
			this.statsCodes = [];
			for (var x = 0; x < this.statsId.length; x++) {
				this.statsCodes[x] = this.affectedStats[x].addModifiers(this.statsMods[x]);
			}
		}
	};

	Talent.prototype.deactivateTalent = function() {
		if(!this.abilitiesCodes && !this.statsCodes) return;

		if(this.abilitiesCodes) {
			for (var i = 0; i < this.abilitiesNum.length; i++) {
				this.affectedAbilities[i].removeModifiers(this.abilitiesCodes[i]);
			}
			this.abilitiesCodes = undefined;
		}

		if(this.statsCodes) {
			for (var x = 0; x < this.statsId.length; x++) {
				this.affectedStats[x].removeModifiers(this.statsCodes[x]);
			}
			this.statsCodes = undefined;
		}
	};

	window.Talent = Talent;

}(window));
