'use strict'
import {Log} from 'react-native-app-nub';
var log = Log;

function find(levels, morale) {
	return levels.find((l) => {
		return (morale >= l.low && morale <= l.high);
	}) || {name: 'demoralized'};
}

module.exports = {
	maxMorale(levels) {
		let lvl = levels.find((l) => {
			return l.name == 'high';
		}) || {high: 1};
		return lvl.high;
    },

    status(levels, morale) {
    	let level = find(levels, morale);
        log.debug('Status: ' + level.name);
		return level.name || 'high';
    },

	initiativeModifier(levels, morale) {
    	let level = find(levels, morale);
        if (level.name == 'high') {
        	return 1;
        }
        if (level.name == 'wavering') {
        	return -1;
        }
        if (level.name == 'demoralized') {
        	return -2;
        }
        return 0;
    },
	moraleModifier: function(levels, morale) {
    	let level = find(levels, morale);
        if (level.name == 'fatigued') {
        	return -1;
        }
        if (level.name == 'wavering') {
        	return -2;
        }
        if (level.name == 'demoralized') {
        	return -3;
        }
        return 0;
    }
};
