import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState = {
    battle: -1,
    turn: 1,
    phase: 0,
    player: 0,
    initiative: 0,            
    morale: {
        "0": 0,
        "1": 0,
        "2": 0
    },                        
    victory: {
        "0": 0,
        "1": 0
    }    
};

const prevTurn = (t) => {    
    if (--t < 1) { t = 1; }
    return t;    
}
const nextTurn = (t,m) => {    
    if (++t > m) { t = m; }
    return t;    
}

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:
        if (action.payload.current) {
            return  {
                ...state,
                ...action.payload.current
            };        	
        }
        return state;

    case types.SET_CURRENT:
        return {
            ...action.value
        };

    case types.PREV_TURN:        
        return {
            ...state,
            turn: prevTurn(state.turn)
        };

    case types.NEXT_TURN:
        return {
            ...state,
            turn: nextTurn(state.turn, action.value)
        };
    
    case types.PREV_PHASE:
        let phase = state.phase - 1;
        let player = state.player;
        let turn = state.turn;
		if (phase < 0) {
			phase = action.value - 1;
            if (action.value.changeplayer) {
                if (player == 0) {
                    turn = prevTurn(state.turn);
                    player = 1;
                } else {
                    player = 0;
                }
            } else {
                turn = prevTurn(state.turn);
            }
		}
        return {
            ...state,
            turn: turn,
            phase: phase,
            player: player
        };           

    case types.NEXT_PHASE:
        phase = state.phase + 1;
        player = state.player;
        turn = state.turn;
		if (phase >= action.value.maxphases) {
			phase =  0;
            if (player == 1) {
                turn = nextTurn(state.turn,action.value.maxturns);
                player = 0;
            } else {
                player = 1;
            }
		}
        return {
            ...state,
            turn: turn,
            phase: phase,
            player: player
        };

    case types.NEXT_PLAYER:
        return {
            ...state,
            player: state.player == 0 ? 1 : 0
        };

    case types.SET_PLAYER:
        return {
            ...state,
            player: action.value
        };
        
    case types.NEXT_INITIATIVE:
        let init = state.initiative;
		if (init == 0) {
			init = 1;
		} else {
			init = 0;
		}

        return {
            ...state,
            initiative: init,
            player: init
        };

    case types.SET_INITIATIVE:
        return {
            ...state,
            initiative: action.value,
            player: action.value
        };
        
    case types.SET_MORALE:    
        return {
            ...state,
            morale: {
                ...state.morale,
                [action.value.side]: action.value.value
            }
        };
        
    case types.SET_VICTORY:    
        return {
            ...state,
            victory: {
                ...state.victory,
                [action.value.side]: action.value.value
            }
        };

    default:
        return state;
    }
}
