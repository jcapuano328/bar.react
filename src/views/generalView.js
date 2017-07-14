import React from 'react';
import { View, Text } from 'react-native';
import {DiceRoll} from 'react-native-dice';

var GeneralView = React.createClass({
    dice: [
        {num: 1, low: 0, high: 9, color: 'red', dotcolor:'white'},
        {num: 1, low: 0, high: 9, color: 'green', dotcolor: 'white'},
        {num: 1, low: 0, high: 9, color: 'blue', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            die1: 0,
            die2: 0,
            die3: 0
        };
    },
    onDiceRoll(d) {
        this.setState({die1: d[0].value,die2: d[1].value,die3: d[0].value});
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: 5}}>
                    <View style={{flex:2}} />
                    <View style={{flex:3}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3]} type={'number'} onRoll={this.onDiceRoll} />                    
                    </View>
                </View>
                <View style={{flex:6}} />                
            </View>
        );
    }
});

module.exports = GeneralView;
