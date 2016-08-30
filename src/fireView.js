'use strict'

var React = require('react');
import { View, Image, Text } from 'react-native';
var SelectList = require('./widgets/selectList');
var MultiSelectList = require('./widgets/multiSelectList');
var DiceRoll = require('./widgets/diceRoll');
var Dice = require('./services/dice');
var Icons = require('./widgets/icons');
var Current = require('./services/current');
var Fire = require('./services/fire');

let FireView = React.createClass({
    dice: [
        {num: 1, low: 0, high: 9, color: 'red'},
        {num: 1, low: 0, high: 9, color: 'white'}
    ],
    getInitialState() {
        return {
            type: Fire.types[0],
            strength: Fire.sps[0],
            range: Fire.ranges[0],
            mods: {},
            results: '',
            die1: 0,
            die2: 0
        };
    },
    onChangeType(v) {
        this.state.type = v;
        this.resolve();
    },
    onChangeStrength(v) {
        this.state.strength = v;
        this.resolve();
    },
    onChangeRange(t) {
        this.state.range = t;
        this.resolve();
    },
    onChangeMods(m) {
        this.state.mods[m.name] = m.selected;
        this.resolve();
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    getModifiers() {
        let mods = [];
        Object.keys(this.state.mods).forEach((k) => {
            if (this.state.mods[k]) {
                mods.push(k);
            }
        });
        return mods;
    },
    resolve() {
        this.state.results = Fire.resolve(this.state.type,this.state.strength,this.state.range,this.getModifiers(),this.state.die1,this.state.die2);
        this.setState(this.state);
    },
    render() {
        let mods = Current.battle().modifiers.fire || [];
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 4, flexDirection: 'row'}}>
                    <View style={{flex: 2, alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch'}}>
                            <SelectList title={'Type'} titleonly={true} items={Fire.types} selected={this.state.type} onChanged={this.onChangeType}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch'}}>
                            <SelectList title={'SPs'} titleonly={true} items={Fire.sps} selected={this.state.strength} onChanged={this.onChangeStrength}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch'}}>
                            <SelectList title={'Range'} titleonly={true} items={Fire.ranges} selected={this.state.range} onChanged={this.onChangeRange}/>
                        </View>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-start'}}>
                        <View style={{flex: 1, alignSelf: 'stretch'}}>
                            <MultiSelectList title={'Modifiers'} items={mods.map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})} onChanged={this.onChangeMods}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                            {Icons[this.state.results.toUpperCase()]
                                ? <Image style={{marginTop: 13, height: 64, width: 64, resizeMode: 'stretch'}} source={Icons[this.state.results]} />
                                : <Text style={{marginTop: 35, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>
                            }
                        </View>
                        <View style={{flex: 2, marginRight: 15}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll}
                                onDie={this.onDieChanged} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = FireView;
