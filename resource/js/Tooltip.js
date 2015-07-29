(function(window){

	"use_strict";

	function Tooltip() {}

	Tooltip.prototype.changeTip = function(pItem) {
		pItem.updateValues();

		var keys = Object.keys(this);

		for (var i = 0; i < keys.length; i++) {
			delete this[keys[i]];
		}

		this.name = pItem.name;
		this.desc = pItem.desc;
		this.src = pItem.src;

		this.createKey('cd', pItem.cd);
		this.createKey('mana', pItem.mana);
		this.createKey('fury', pItem.fury);
		this.createKey('brew', pItem.brew);
		this.createKey('charges', pItem.charges);

	};

	Tooltip.prototype.createKey = function(pKey, pValue) {
		if(pValue) {
			this[pKey] = pValue;
		}
	};

	Tooltip.prototype.constructor = Tooltip;

	window.Tooltip = Tooltip;

})(window);
