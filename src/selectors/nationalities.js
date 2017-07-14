import { createSelector } from 'reselect';
import getBattle from './battle';

export default createSelector(
    [getBattle],
    (battle) => {                
        let nationalities = battle.nationalities || [];
        if (nationalities.length < 1) {
            if (battle.hasOwnProperty('startBritishMorale')) {
                nationalities.push('British');
            }
            if (battle.hasOwnProperty('startAmericanMorale')) {
                nationalities.push('American');
            }
            if (battle.hasOwnProperty('startFrenchMorale')) {
                nationalities.push('French');
            }
        }
		return nationalities;
    }    
);