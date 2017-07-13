import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {NavDrawer} from 'react-native-nub';
import Icons from '../res';
import Battles from '../services/battles';
import {reset} from '../actions/current';

let NavigationDrawer = React.createClass({    
    onSelect(e) {
        let b = Battles.get(e);
        this.props.reset(b);
        Actions.battle({title: b.name, subtitle: b.desc});        
    },        
    render () {
        let items = Battles.battles.map((b) => {
            return {key:b.id,name:b.name,desc:b.desc,image:Icons[b.image]};
        });
        return (            
            <NavDrawer items={items} onSelect={this.onSelect} >
                {this.props.children}
            </NavDrawer>                
        );
    }
});

module.exports = connect(null,{reset})(NavigationDrawer);
