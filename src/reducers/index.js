import { combineReducers } from 'redux';
import info from './info';
import toast from './toast';
import current from './current';

module.exports = combineReducers({
    current: current,
    info: info,
    toast: toast
});
