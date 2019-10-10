'use strict'
import {Store, Log} from 'react-native-app-nub';
var store = Store('bar.app.current');
var Battles = require('./battles');
var Phases = require('./phases');
var moment = require('moment');
var log = Log;
var TURN_MINS = 60;

var _current = {};

module.exports = {
	load() {
		return store.load()
		.then((current) => {
        	_current = current;
			Phases.init(this.battle());
            return _current;
		});
	},
	save() {
		return store.save(_current);
	},
	remove() {
		return store.remove()
		.then(() => {
			_current = null;
		});
	},
	reset(data) {
		let nationalities = this.nationalities(data.id);
		let blank = {
		    battle: data.id,
		    turn: 1,
		    phase: 0,
		    player: nationalities[0],
		    initiative: nationalities[0],
		    britishMorale: data.startBritishMorale,
		    americanMorale: data.startAmericanMorale,
		    frenchMorale: data.startFrenchMorale,
		    britishVP: 0,
		    americanVP: 0
		};
		return store.save(blank)
		.then((current) => {
			_current = blank;
			Phases.init(this.battle());
			return _current;
		});
	},
	battle() {
		return Battles.get((_current||{}).battle) || {};
	},
	nationalities(id) {
		let battle = id ? Battles.get(id) : this.battle();
		return battle.nationalities || ['British', 'American'];
	},
	turn() {
		let battle = this.battle();
        var dt = moment(battle.startDateTime);
        var o = (_current.turn - 1) * TURN_MINS;
        dt.add(o, 'minutes');
        return dt.format("MMM DD, YYYY HH:mm");
	},
	prevTurn(dosave) {
		if (--_current.turn < 1) {
			_current.turn = 1;
		}
        let turn = this.turn();
		if (dosave) {
        	return this.save()
            .then(() => {
            	return turn;
			});
		}
        //return new Promise((resolve, reject) => resolve(turn));
	},
	nextTurn(dosave) {
		var maxturns = this.battle().turns;
		if (++_current.turn >= maxturns) {
			_current.turn = maxturns;
		}
        let turn = this.turn();
		if (dosave) {
        	return this.save()
            .then(() => {
            	return turn;
			});
		}
        //return new Promise((resolve, reject) => resolve(turn));
	},
	phase() {
		return Phases.get(_current.phase, _current.player);
	},
	prevPhase() {
		//console.log('<<<< Prev Phase ' + _current.initiative + '/' + _current.player + '/' + _current.phase);
		if (--_current.phase < 0 && this.isInitiativePlayer()) {
			// move to previous turn
			this.prevTurn(false);
			// and previous player
			this.nextPlayer(false);
			_current.phase = Phases.lengthall(_current.player) - 1;
		} else if (_current.phase < 1 && !this.isInitiativePlayer()) {
			// move to previous player
			this.nextPlayer(false);
			_current.phase = Phases.length(_current.player);
		}
		//console.log('             -> ' + _current.initiative + '/' + _current.player + '/' + _current.phase);
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	nextPhase() {
		console.log('>>>> Next Phase ' + _current.initiative + '/' + _current.player + '/' + _current.phase);
		if (++_current.phase > Phases.length(_current.player) && this.isInitiativePlayer()) {
			// move to next player
			this.nextPlayer(false);
			_current.phase = 1;
		} else if (_current.phase >= Phases.lengthall(_current.player)) {
			// move to next turn
			this.nextTurn(false);
			// and next player
			this.nextPlayer(false);
			_current.phase = 0;
		}
		console.log('             -> ' + _current.initiative + '/' + _current.player + '/' + _current.phase);
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	nextPlayer(dosave) {
		let nationalities = this.nationalities();
		if (this.isFirstPlayer(_current.player, nationalities)) {
			_current.player = nationalities[1];
		} else {
			_current.player = nationalities[0];
		}
		if (dosave) {
        	return this.save()
            .then(() => {
            	return this.player();
			});
		}
        //return new Promise((resolve, reject) => resolve(turn));
	},
	isInitiativePlayer() {
		return _current.player == _current.initiative;
	},
	isFirstPlayer(player,nationalities) {
		player = player || _current.player;
		nationalities = nationalities || this.nationalities();
		return (nationalities.indexOf(player) == 0);
	},
	player(v) {
		if (typeof v != 'undefined') {
        	_current.player = v;
		}
        return _current.player;
	},
	initiative(v) {
    	if (typeof v != 'undefined') {
        	_current.initiative = v;
		}
        return _current.initiative;
    },
	armyMorale(n,v) {
		n = n.toLowerCase();
		if (n == 'british') {
			return this.britishMorale(v);
		}
		if (n == 'american') {
			return this.americanMorale(v);
		}
		if (n == 'french') {
			return this.frenchMorale(v);
		}
	},
	britishMorale(v) {
    	if (typeof v != 'undefined') {
        	_current.britishMorale = v;
		}
        return _current.britishMorale;
    },
	americanMorale(v) {
    	if (typeof v != 'undefined') {
        	_current.americanMorale = v;
		}
        return _current.americanMorale;
    },
	frenchMorale(v) {
    	if (typeof v != 'undefined') {
        	_current.frenchMorale = v;
		}
        return _current.frenchMorale;
    },
	armyVP(n,v) {
		n = n.toLowerCase();
		if (n == 'british') {
			return this.britishVP(v);
		}
		//else if (n == 'american') {
		return this.americanVP(v);
	},
	britishVP(v) {
    	if (typeof v != 'undefined') {
        	_current.britishVP = v;
		}
        return _current.britishVP;
    },
	americanVP(v) {
    	if (typeof v != 'undefined') {
        	_current.americanVP = v;
		}
        return _current.americanVP;
    }
};
