'use strict'

var React = require('react');
import { View, Image, Text } from 'react-native';
import {SpinNumeric} from 'react-native-app-nub';
var Icons = require('./res/icons');
var Current = require('./services/current');
var Melee = require('./services/melee');
var ArmyMorale = require('./services/armymorale');

let MoraleLevelsView = React.createClass({
    getInitialState() {
        return {mod: 0};
    },
    componentDidMount: function() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        this.setState({mod: 0});
    },
    onChangeArmyMorale(n) {
        return (v) => {
            Current.armyMorale(n,+v);
            Current.save()
            .then(() => {
                this.setState({mod: this.state.mod+1});
            });
        };
    },
    render() {
        let levels = Current.battle().moraleLevels;
        let max = ArmyMorale.maxMorale(levels);
        return (
            <View>
                {Melee.nationalities().map((n,i) => {
                    let level = Current.armyMorale(n);
                    let status = ArmyMorale.status(levels, level);
                    let style = {
                        //color: 'black',
                        backgroundColor: 'transparent'
                    };
                    if (status == 'high') {
                        // default
                    }
                    else if (status == 'wavering') {
                        style.backgroundColor = 'yellow';
                    } else if (status == 'fatigued') {
                        style.backgroundColor = '#FFA500';//'orange';
                    } else { // demoralized
                        //style.color = 'white';
                        style.backgroundColor = 'red';
                    }
                    return (
                        <View key={i} style={[{flex: 1, flexDirection: 'row', alignItems: 'center'},style]}>
                            <View style={{flex:1}}/>
                            <View style={{flex:1, justifyContent: 'center'}}>
                                <Image style={{marginLeft: 10, height: 48, width: 64, resizeMode: 'stretch'}} source={Icons[n.toLowerCase()]} />
                            </View>
                            <View style={{flex:2, alignItems: 'center'}}>
                                <SpinNumeric value={level.toString()} min={0} max={max} onChanged={this.onChangeArmyMorale(n)} />
                            </View>
                            <View style={{flex:1}}/>
                        </View>
                    );
                })}
            </View>
        );
    }
});

module.exports = MoraleLevelsView;
