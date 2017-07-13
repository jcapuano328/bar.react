import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import TurnView from './turnView';
import InitiativeView from './initiativeView';
//import FireView from './fireView';
//import MeleeView from './meleeView';
//import MoraleView from './moraleView';
//import VictoryView from './victoryView';
//import GeneralView from './generalView';
import Icons from '../res';
import getBattle from '../selectors/battle';

var BattleView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },    
    render() {        
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44),backgroundColor: 'rgba(0,0,0,0.01)'}}>            
                <TurnView logo={Icons[this.props.battle.image]} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.medium()}}
                    initialPage={this.state.initialPage}                    
                >
                    <InitiativeView tabLabel="Initiative" />
                    <View tabLabel="Fire" />
                    <View tabLabel="Melee" />
                    <View tabLabel="Morale" />
                    <View tabLabel="Victory" />
                    <View tabLabel="General" />
                </ScrollableTabView>                
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    battle: getBattle(state)
});

module.exports = connect(
  mapStateToProps
)(BattleView);
