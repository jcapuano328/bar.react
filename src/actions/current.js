import types from '../constants/actionTypes';
import {toast} from './toast';
import Battles from '../services/battles';
import Phases from '../services/phases';
import getBattle from '../selectors/battle';
import getPlayer from '../selectors/currentPlayer';

export const reset = (e) => (dispatch,getState) => {
    const {current} = getState();    
    e = e || {id: current.battle, player: 0, initiative: -1};    
    let battle = Battles.get(e.id);
    let data = {
        battle: e.id,
        turn: 1,
        phase: 0,
        player: current.player,
        initiative: current.initiative,
        // this isn't quite right...
        morale: {
            "0": battle.startBritishMorale,
            "1": battle.startAmericanMorale,
            "2": battle.startFrenchMorale
        },
        victory: {
            "0": 0,
            "1": 0
        }        
    };    
    Phases.init(battle);
    dispatch({type: types.SET_CURRENT, value: data});
}

export const prevTurn = () => (dispatch) => {    
    dispatch({type: types.PREV_TURN});
}
export const nextTurn = () => (dispatch,getState) => {    
    const battle = getBattle(getState());
    dispatch({type: types.NEXT_TURN, value: battle.turns});
}

export const prevPhase = () => (dispatch,getState) => {        
    const player = getPlayer(getState());
    dispatch({type: types.PREV_PHASE, value: Phases.count(player)});
}
export const nextPhase = () => (dispatch,getState) => {        
    const battle = getBattle(getState());
    const player = getPlayer(getState());
    dispatch({type: types.NEXT_PHASE, value: {maxphases: Phases.count(player), maxturns: battle.turns}});
}

export const nextPlayer = () => (dispatch) => {    
    dispatch({type: types.NEXT_PLAYER});
}

export const nextInitiative = () => (dispatch) => {    
    dispatch({type: types.NEXT_INITIATIVE});
}

export const setInitiative = (v) => (dispatch) => {    
    dispatch({type: types.SET_INITIATIVE, value: v});
}

export const setMorale = (side, m) => (dispatch) => {    
    dispatch({type: types.SET_MORALE, value: {side: side, value: m}});
}

export const setVictory = (side, vp) => (dispatch) => {    
    dispatch({type: types.SET_VICTORY, value: {side: side, value: vp}});
}
