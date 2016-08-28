'use strict'
var Sound = require('./sound.js');
var range = require('./range.js');

function Die(low, high, color) {
	var self = this;
    var value = low;
    color = color || 'white';

	function randomBetween(low, high) {
		return Math.floor(Math.random()*(high-low+1)) + low;
	}

    self.image = function() {
    	return color + value.toString();
    }

    self.value = function(d) {
    	if (typeof d != 'undefined') {
        	value = d;
            if (value < low) {
            	value = low;
            } else if (value > high) {
            	value = high;
            }
        }
        return value;
    }

    self.increment = function(rollover) {
    	if (++value > high) {
        	value = rollover ? low : high;
        }
    }
    self.decrement = function(rollover) {
    	if (--value < low) {
        	value = rollover ? high : low;
        }
    }
    self.roll = function() {
    	value = randomBetween(low, high);
        return value;
    }
}

function Dice(opts) {
	var self = this;
    var dice = [];
    opts = opts || [{num: 1, low: 1, high: 6, color: 'white'}];
	opts.forEach((opt) => {
		range(opt.num).forEach((i) => {
	    	dice.push(new Die(opt.low, opt.high, opt.color));
        });
	});

	self.count = function() {
    	return dice.length;
    }

    self.each = function(callback) {
    	dice.forEach((die, index) => {
        	callback(die, index);
        });
    }

	self.map = function(callback) {
    	return dice.map((die, index) => {
        	return callback(die, index);
        });
    }

    self.dice = function() {
        return dice.map((die) => {
        	return {
            	value: die.value(),
                image: die.image()
            };
        });
    }

    self.dieEx = function(i) {
    	if (--i >= 0 && i < dice.length) {
        	return dice[i];
        }
        return {};
    }

    self.die = function(i, d) {
    	var o = self.dieEx(i);
    	if (typeof d != 'undefined' && o.hasOwnProperty('value')) {
        	o.value(d);
        }
        return o.hasOwnProperty('value') ? o.value() : 0;
    }

    self.roll = function(i) {
    	if (typeof i != 'undefined') {
        	var d = self.dieEx(i);
            if (d && d.hasOwnProperty('roll')) {
            	d.roll();
                return d.value();
            }
            return 0;
        }

        Sound.play();
    	for (var i=0; i<dice.length; i++) {
        	dice[i].roll();
        }
    }
}

module.exports = {
	Die: Die,
	Dice: Dice
};
