import { createSelector } from 'reselect';
import getBattle from './battle';

export default createSelector(
    [getBattle],
    (battle) => {        
        return [{name: 'Tactical Leader', value: 0}].concat(battle.modifiers.melee.defend);
    }    
);