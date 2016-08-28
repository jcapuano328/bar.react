'use strict';

var battles = require('../stores/battles.json');

module.exports = {
    battles: battles,
    get(id) {
        return battles.find((battle,i) => {
            return battle.id == id;
        }) || {};
    }
};
