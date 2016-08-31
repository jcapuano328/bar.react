'use strict'
var Current = require('./current');
var ArmyMorale = require('./armymorale');

module.exports = {
	check(nationality,unitmorale,leader,die) {
		let battle = Current.battle();
		let armymorale = 0;
		if (nationality == 'British') {
			armymorale = Current.britishMorale();
		} else if (nationality == 'American') {
			armymorale = Current.americanMorale();
		} else if (nationality == 'French') {
			armymorale = Current.frenchMorale();
		}
		let armymod = ArmyMorale.moraleModifier(battle.moraleLevels, armymorale);

    	return (die + unitmorale + armymod + leader >= 5);
    }
};
