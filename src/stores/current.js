'use strict'

var RNFS = require('react-native-fs');
var FILE = 'bar.app.current';
var PATH = RNFS.DocumentDirectoryPath + '/' + FILE;
var log = require('../services/log.js');

var blank = require('./current.json');

module.exports = {
	load() {
		// read the file
		log.debug('Load current from ' + PATH);
		return RNFS.readFile(PATH)
		.then((data) => {
			if (data) {
				log.debug('Current retrieved');
				let current = JSON.parse(data);
				log.debug(current);
				return current;
			}
			log.debug('No Current item');
			return null;
		})
		.catch((err) => {
			log.warn(err.message);
			return null;
		});
	},
	save(current) {
		// write the file
		log.debug('Save Current to ' + PATH);
		log.debug(current);
		return RNFS.writeFile(PATH, JSON.stringify(current))
		.then((success) => {
			log.debug('Current saved');
		})
		.catch((err) => {
			log.warn(err.message);
		});
	},
	remove() {
		log.debug('Remove Current from ' + PATH)
		return RNFS.unlink(PATH)
		.then((result) => {
	    	let success = result[0], path = result[1];
			log.debug('FILE DELETED', success, path);
		})
		// `unlink` will throw an error, if the item to unlink does not exist
		.catch((err) => {
			log.warn(err.message);
		});
	},
	reset(data) {
		blank.battle = data.id;
		blank.britishMorale = data.startBritishMorale;
	    blank.americanMorale = data.startAmericanMorale;
	    blank.frenchMorale = data.startFrenchMorale;
		return this.save(blank)
		.then(() => {
			return blank;
		});
	}
};
