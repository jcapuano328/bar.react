'use strict'

var Store = require('../stores/current');
var Battles = require('./battles');
var Phases = require('./phases');
var moment = require('moment');
var log = require('./log');
var TURN_MINS = 60;

var _current = {};

module.exports = {
	load() {
		return Store.load()
		.then((current) => {
        	_current = current;
			Phases.init(this.battle());
            return _current;
		});
	},
	save() {
		return Store.save(_current);
	},
	remove() {
		return Store.remove()
		.then(() => {
			_current = null;
		});
	},
	reset(data) {
		return Store.reset(data)
		.then((current) => {
			_current = current;
			Phases.init(this.battle());
			return _current;
		});
	},
	battle() {
		return Battles.get((_current||{}).battle) || {};
	},
	turn() {
		let battle = this.battle();
        var dt = moment(battle.startDateTime);
        var o = (_current.turn - 1) * TURN_MINS;
        dt.add(o, 'minutes');
        return dt.format("MMM DD, YYYY hh:mm A");
	},
	prevTurn(dosave) {
		log.debug('prev turn: ' + _current.turn);
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
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	nextTurn(dosave) {
		log.debug('next turn: ' + _current.turn);
		var maxturns = this.battle().turns;
		log.debug('max turns: ' + maxturns);
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
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	phase() {
		let phase = Phases.get(_current.phase, _current.initiative);
		log.debug('phase: ' + phase);
		return phase;
	},
	prevPhase() {
		if (--_current.phase < 0) {
			_current.phase = Phases.length(_current.initiative) - 1;
			if (_current.player == 'first') {
				this.prevTurn(false);
				_current.player = 'second';
			} else {
				_current.player = 'first';
			}
		}
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	nextPhase() {
		if (++_current.phase >= Phases.length(_current.initiative)) {
			_current.phase = 0;
			if (_current.player == 'second') {
				this.nextTurn(false);
				_current.player = 'first';
			} else {
				_current.player = 'second';
			}
		}
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	nextPlayer() {
		if (_current.player == 'second') {
			_current.player = 'first';
		} else {
			_current.player = 'second';
		}
		return this.save()
        .then(() => {
        	return this.player();
		});
	},
	player() {
		return _current.player;
	},
	initiative(v) {
    	if (typeof v != 'undefined') {
        	_current.initiative = v;
		}		
        return _current.initiative;
    }
};