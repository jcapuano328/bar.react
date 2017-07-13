import { createSelector } from 'reselect';
import getPlayers from './players';
const getInitiative = (state) => state.current.initiative;

export default createSelector(
    [getInitiative,getPlayers],
    (player, players) => {    
        if (player < 0)    
            return 'tie';
        return players[player];
    }    
);