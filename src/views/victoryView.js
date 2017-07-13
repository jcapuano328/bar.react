'use strict'

var React = require('react');
import { View, Image, Text } from 'react-native';
import {SpinNumeric} from 'react-native-app-nub';
var Icons = require('./res/icons');
var Current = require('./services/current');
var Melee = require('./services/melee');

let VictoryView = React.createClass({
    getInitialState() {
        return {mod: 0};
    },
    componentDidMount: function() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        this.setState({mod: 0});
    },
    onChangeArmyVP(n) {
        return (v) => {
            Current.armyVP(n,+v);
            Current.save()
            .then(() => {
                this.setState({mod: this.state.mod+1});
            });
        };
    },
    render() {
        return (
            <View>
                {Melee.nationalities().map((n,i) => {
                    return (
                        <View key={i} style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex:1}}/>
                            <View style={{flex:1, justifyContent: 'center'}}>
                                <Image style={{marginLeft: 10, height: 48, width: 64, resizeMode: 'stretch'}} source={Icons[n.toLowerCase()]} />
                            </View>
                            <View style={{flex:2, alignItems: 'center'}}>
                                <SpinNumeric value={Current.armyVP(n).toString()} min={0} max={50} onChanged={this.onChangeArmyVP(n)} />
                            </View>
                            <View style={{flex:1}}/>
                        </View>
                    );
                })}
            </View>
        );
    }
});

module.exports = VictoryView;
