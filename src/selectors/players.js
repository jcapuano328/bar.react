import { createSelector } from 'reselect';
import getBattle from './battle';

export default createSelector(
    [getBattle],
    (battle) => {                
        return (battle.nationalities||['British','American']);
    }    
);