import ArmyMorale from './armymorale';

module.exports = {
	check(armymorale,unitmorale,moralelevels,leader,die) {		
		let armymod = ArmyMorale.moraleModifier(moralelevels, armymorale);

    	return (die + unitmorale + armymod + leader >= 5);
    }
};
