'use strict';
var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sandbox = require('sandboxed-module');
chai.use(require('sinon-chai'));

describe('Phases', () => {
	var env = {};
	beforeEach(() => {
		env = {};
		env.log = sandbox.require('../mocks/log')();

        env.battleNoPhases = {};
        env.battlePhases = {
            phases: [
    			"One",
                {
                	"A": [
                    	"A1",
                        "A2",
                        "A3",
                        "A4"
    				],
                	"B": [
                        "B1",
    					"B2",
    					"B3",
    					"B4",
    					"B5",
                        "B6"
    				]
    			},
    			"Two"
            ]
        };

		env.Phases = sandbox.require('../../src/services/phases', {
			requires: {
				"react-native-app-nub": {
                    Log: env.log
                }
			}
		});
    });

	describe('init', () => {
        describe('default', () => {
            beforeEach(() => {
                env.Phases.init(env.battleNoPhases);
    		});

    		it('should initialize defaults', () => {
    			expect(env.Phases.phases).to.have.length(3);
                expect(env.Phases.phases[0]).to.equal('Initiative');
                expect(env.Phases.phases[1]).to.deep.equal({
                	"American": [
                    	"Movement",
                        "Rally",
            			"Def Arty Fire",
                        "Rifle Fire",
                        "Close Combat"
            		],
                	"British": [
                        "Movement",
            			"Rally",
            			"Def Arty Fire",
            			"Rifle Fire",
            			"Close Combat"
            		]
            	});
                expect(env.Phases.phases[2]).to.equal('End of Turn');
    		});
        });

        describe('battle specific', () => {
            beforeEach(() => {
                env.Phases.init(env.battlePhases);
    		});

    		it('should initialize phases', () => {
    			expect(env.Phases.phases).to.have.length(env.battlePhases.phases.length);
                expect(env.Phases.phases).to.deep.equal(env.battlePhases.phases);
    		});
        });
	});

    describe('get', () => {
        describe('default', () => {
            beforeEach(() => {
                env.Phases.init(env.battleNoPhases);
    		});

            describe('American', () => {
                it('should retrieve the first common phase', () => {
        			expect(env.Phases.get(0, 'American')).to.equal('Initiative');
        		});
                it('should retrieve the fourth common phase', () => {
        			expect(env.Phases.get(4, 'American')).to.equal('Rifle Fire');
        		});
                it('should retrieve the last common phase', () => {
        			expect(env.Phases.get(6, 'American')).to.equal('End of Turn');
        		});
            });

            describe('British', () => {
                it('should retrieve the first common phase', () => {
        			expect(env.Phases.get(0, 'British')).to.equal('Initiative');
        		});
                it('should retrieve the fourth common phase', () => {
        			expect(env.Phases.get(4, 'British')).to.equal('Rifle Fire');
        		});
                it('should retrieve the last common phase', () => {
        			expect(env.Phases.get(6, 'British')).to.equal('End of Turn');
        		});
            });
        });

        describe('battle specific', () => {
            beforeEach(() => {
                env.Phases.init(env.battlePhases);
    		});

            describe('A', () => {
                it('should retrieve the first common phase', () => {
        			expect(env.Phases.get(0, 'A')).to.equal('One');
        		});
                it('should retrieve the fourth common phase', () => {
        			expect(env.Phases.get(4, 'A')).to.equal('A4');
        		});
                it('should retrieve the last common phase', () => {
        			expect(env.Phases.get(5, 'A')).to.equal('Two');
        		});
            });

            describe('B', () => {
                it('should retrieve the first common phase', () => {
        			expect(env.Phases.get(0, 'B')).to.equal('One');
        		});
                it('should retrieve the fourth common phase', () => {
        			expect(env.Phases.get(4, 'B')).to.equal('B4');
        		});
                it('should retrieve the last common phase', () => {
        			expect(env.Phases.get(7, 'B')).to.equal('Two');
        		});
            });
        });
	});


    describe('length', () => {
        describe('default', () => {
            beforeEach(() => {
                env.Phases.init(env.battleNoPhases);
    		});

            describe('American', () => {
                it('should retrieve the length', () => {
        			expect(env.Phases.length('American')).to.equal(7);
        		});
            });

            describe('British', () => {
                it('should retrieve the length', () => {
        			expect(env.Phases.length('British')).to.equal(7);
        		});
            });
        });

        describe('battle specific', () => {
            beforeEach(() => {
                env.Phases.init(env.battlePhases);
    		});

            describe('A', () => {
                it('should retrieve the length', () => {
        			expect(env.Phases.length('A')).to.equal(6);
        		});
            });

            describe('B', () => {
                it('should retrieve the length', () => {
        			expect(env.Phases.length('B')).to.equal(8);
        		});
            });
        });
	});
});
