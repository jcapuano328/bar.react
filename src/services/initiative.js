'use strict'
var Current = require('./current');
var ArmyMorale = require('./armymorale');

module.exports = {
	current(init) {
		return Current.initiative(init);
	},
	nationalities(battle) {
		battle = battle || Current.battle();
		return battle.nationalities || ['British', 'American'];
    },
    find(britmomentum,amermomentum,britdie,amerdie) {
		let battle = Current.battle();
		let nationalities = this.nationalities(battle);
		let britInitMod = ArmyMorale.initiativeModifier(battle.moraleLevels, Current.britishMorale());
        let amerInitMod = ArmyMorale.initiativeModifier(battle.moraleLevels, Current.americanMorale());

        let britdrm = britInitMod + (2 * britmomentum);
        let amerdrm = amerInitMod + (2 * amermomentum);
		let diff = (britdie + britdrm)  - (amerdie + amerdrm);
		let init = '';
		if (diff > 0) {
        	init = nationalities[0];
		} else if (diff < 0) {
        	init = nationalities[1];
        } else {
			init = '';
		}

		Current.initiative(init);
		Current.player(init);
		return Current.save()
		.then(() => {
			return init;
		});
    },
	next() {
		let init = this.current();
		let nationalities = this.nationalities();
		let idx = nationalities.findIndex((n) => n == init);
		if (++idx > 1) {
			idx = 0;
		}
		init = nationalities[idx];
		Current.initiative(init);
		Current.player(init);
		return Current.save()
		.then(() => {
			return init;
		});
	}
};
