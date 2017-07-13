import { createSelector } from 'reselect';
import getPlayers from './players';
const getPlayer = (state) => state.current.player;

export default createSelector(
    [getPlayer,getPlayers],
    (player, players) => {                
        return players[player];
    }    
);