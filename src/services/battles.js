import battles from '../data/battles.json';

module.exports = {
    battles: battles,
    get(id) {
        return battles.find((battle,i) => {
            return battle.id == id;
        }) || {};
    }
};
