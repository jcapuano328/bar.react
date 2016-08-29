'use strict'
var Current = require('./current');

module.exports = {
	current(init) {
		return Current.initiative(init);
	},
    find(d1, d2) {
		let diff = d1 - d2;
		let init = '';
		if (diff < 0) {
			init = 'player2';
		} else if (diff > 0) {
			init = 'player1';
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
		let init = Player.get(this.current());
		if (init.player == 'player1') {
			init.player = 'player2';
		} else {
			init.player = 'player1';
		}
		Current.initiative(init.player);
		Current.player(init.player);
		return Current.save()
		.then(() => {
			return init.player;
		});
	}
};
