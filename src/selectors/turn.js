import { createSelector } from 'reselect';
import moment from 'moment';
import getBattle from './battle';
import TURN_MINS from '../constants/turn';

const getTurn = (state) => state.current.turn;

export default createSelector(
    [getTurn, getBattle],
    (turn, battle) => {
        if (!battle || !battle.startDateTime) {
            return '';
        }
        let dt = moment(battle.startDateTime);
        let o = (turn - 1) * TURN_MINS;
        dt.add(o, 'minutes');
        return dt.format("MMM DD, YYYY HH:mm");
    }    
);
