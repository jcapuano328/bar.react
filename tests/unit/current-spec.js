'use strict';
var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sandbox = require('sandboxed-module'),
	moment = require('moment');
chai.use(require('sinon-chai'));

describe('Current', () => {
	var env = {};
	beforeEach(() => {
		env = {};
		env.log = sandbox.require('../mocks/log')();
		env.store = {
			load: sinon.stub(),
			save: sinon.stub(),
			remove: sinon.stub()
		};
		env.Store = sinon.stub().returns(env.store);
		env.Battles = {
			get: sinon.stub()
		};
		env.Phases = {
			init: sinon.stub(),
			get: sinon.stub(),
			length: sinon.stub()
		};

		env.Current = sandbox.require('../../src/services/current', {
			requires: {
				"react-native-app-nub": {
					Store: env.Store,
                    Log: env.log
                },
				"./battles": env.Battles,
				"./phases": env.Phases,
				"moment": moment
			}
		});
    });

	describe('load', () => {
	});
	describe('save', () => {
	});
	describe('remove', () => {
	});
	describe('reset', () => {
	});
	describe('battle', () => {
	});
	describe('turn', () => {
	});
	describe('prevTurn', () => {
	});
	describe('nextTurn', () => {
	});
	describe('phase', () => {
	});
	describe('prevPhase', () => {
	});
	describe('nextPhase', () => {
	});

	describe('player', () => {
	});
	describe('nextPlayer', () => {
	});

	describe('initiative', () => {
	});
	describe('armyMorale', () => {
	});
	describe('britishMorale', () => {
	});
	describe('americanMorale', () => {
	});
	describe('frenchMorale', () => {
	});
	describe('armyVP', () => {
	});
	describe('britishVP', () => {
	});
	describe('americanVP', () => {
	});

});
