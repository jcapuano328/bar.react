'use strict'

var React = require('react');
import { View } from 'react-native';
import {SpinNumeric} from 'react-native-app-nub';
var Current = require('./services/current');
var Melee = require('./services/melee');
var ArmyMorale = require('./services/armymorale');

let MoraleLevelView = React.createClass({
    getInitialState() {
        return {mod: 0};
    },
    componentDidMount: function() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        this.setState({mod: 0});
    },
    onChangeArmyMorale(v) {
        Current.armyMorale(this.props.nationality,+v);
        Current.save()
        .then(() => {
            this.setState({mod: this.state.mod+1});
        });
    },
    render() {
        let levels = Current.battle().moraleLevels;
        let max = ArmyMorale.maxMorale(levels);
        let level = Current.armyMorale(this.props.nationality);
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
            <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center'},style]}>
                <SpinNumeric label={'Level'} value={level.toString()} min={0} max={max} onChanged={this.onChangeArmyMorale} />
            </View>
        );
    }
});

module.exports = MoraleLevelView;
