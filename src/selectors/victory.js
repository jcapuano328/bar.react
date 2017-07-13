import { createSelector } from 'reselect';
import getGame from './game';
const getSide1VP = (state) => state.current.victory['0'];
const getSide2VP = (state) => state.current.victory['1'];

export default createSelector(
    [getGame,getSide1VP,getSide2VP],
    (game,vp1,vp2) => {
		let vp = vp1 - vp2;		
		let v = game.victory.find((v) => vp >= v.low && vp <= v.high) || {level:''};		
    return {side: v.side, level: v.level};
    }    
);
