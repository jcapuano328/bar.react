import { Store } from 'react-native-nub';
import rootReducer from '../reducers';
/*  the "store" will look like so:
    {
        info: {
            version: string,
            releasedate: datetime
        },
        toast: {
            active: bool,
            message: string,
            duration: integer
        },
        current: { 
            battle: int,
            turn: int,
            phase: int,
            player: int,
            initiative: int,            
            morale: {
                "0": int,
                "1": int,
                "2": int
            },                        
            victory: {
                "0": int,
                "1": int
            }
        }
    }
*/
const store = Store(rootReducer);

export default store;