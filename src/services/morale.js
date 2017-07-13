import ArmyMorale from './armymorale';

module.exports = {
	check(armymorale,unitmorale,leader,die) {
		let battle = Current.battle();
		let armymod = ArmyMorale.moraleModifier(battle.moraleLevels, armymorale);

    	return (die + unitmorale + armymod + leader >= 5);
    }
};
