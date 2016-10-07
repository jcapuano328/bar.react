'use strict'

var React = require('react');
import { View, Text } from 'react-native';
import {DiceRoll} from 'react-native-dice';

var GeneralView = React.createClass({
    dice: [
        {num: 1, low: 0, high: 9, color: 'red', dotcolor:'white'},
        {num: 1, low: 0, high: 9, color: 'white', dotcolor:'black'},
        {num: 1, low: 0, high: 9, color: 'blue', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            die1: 1,
            die2: 1,
            die3: 1
        };
    },
    onDiceRoll(d) {
        this.setState({die1: d[0].value,die2: d[1].value,die3: d[0].value});
    },
    render() {
        return (
            <View style={{flex: 1, marginTop: 5, marginRight: 125, justifyContent: 'flex-start', alignItems: 'center'}}>
                <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3]} type={'number'} onRoll={this.onDiceRoll} />
            </View>
        );
    }
});

module.exports = GeneralView;
