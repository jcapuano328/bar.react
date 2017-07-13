import { createSelector } from 'reselect';
import Phases from '../services/phases';
import getPlayer from './currentPlayer';

const getPhase = (state) => state.current.phase;

export default createSelector(
    [getPlayer,getPhase],
    (player,phase) => {
        return Phases.get(phase,player);
    }    
);
