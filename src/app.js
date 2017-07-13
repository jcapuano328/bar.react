import React from 'react';
import {Text} from 'react-native';
import { Router } from 'react-native-router-flux';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './stores/store';
import {NavDrawer} from './views';
//import codePush from "react-native-code-push";

let App = React.createClass({    
    componentWillMount() {
        Text.defaultProps.allowFontScaling = false;
    },    
    render () {      
        return (            
            <Provider store={store}>
                <NavDrawer>
                    <Router style={{flex:1}} scenes={routes} />
                </NavDrawer>                
            </Provider>            
        );
    }
});

module.exports = App;//codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })(App);
