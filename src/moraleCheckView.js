'use strict'

var React = require('react');
import { View, Image, Text } from 'react-native';
import {RadioButtonGroup, SpinNumeric} from 'react-native-app-nub';
import {DiceRoll} from 'react-native-dice';
var Icons = require('./res/icons');
var Current = require('./services/current');
var Morale = require('./services/morale');
var Melee = require('./services/melee');

let MoraleCheckView = React.createClass({
    dice: [
        {num: 1, low: 0, high: 9, color: 'green',dotcolor: 'white'}
    ],
    getInitialState() {
        return {
            nationality: Melee.nationalities()[0],
            unit: 0,
            leader: 0,
            results: '',
            die1: 0
        };
    },
    onChangeNationality(v) {
        this.state.nationality = Melee.nationalities()[v];
        this.resolve();
    },
    onChangeUnit(v) {
        this.state.unit = v;
        this.resolve();
    },
    onChangeLeader(v) {
        this.state.leader = v;
        this.resolve();
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    resolve() {
        this.state.results = Morale.check(this.state.nationality,+this.state.unit,+this.state.leader,this.state.die1) ? 'pass' : 'fail';
        this.setState(this.state);
    },
    render() {
        let icon = this.state.results == 'fail' ? Icons['fail'] : Icons['pass'];
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, alignItems: 'center', paddingTop: 15}}>
                    <RadioButtonGroup buttons={Melee.nationalities().map((n,i) => {
                            return {image: Icons[n.toLowerCase()], imagepos:'right', imageheight:48, imagewidth:64, value: i};
                        })}
                        state={Melee.nationalities().indexOf(this.state.nationality)}
                        onSelected={this.onChangeNationality}
                    />
                </View>
                <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:1}}/>
                    {/*
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <Text style={{marginLeft: 10}}>Unit</Text>
                    </View>
                    <View style={{flex:2, alignItems: 'center'}}>
                        <SpinNumeric value={this.state.unit} min={-5} max={5} onChanged={this.onChangeUnit} />
                    </View>
                    */}
                    <View style={{flex:2, borderRightWidth:1,borderRightColor:'gray'}}>
                        <RadioButtonGroup title={'Unit'} direction={'vertical'} buttons={[-2,-1,0,1,2].map((m) => {return {label: m.toString(), value: m};})}
                            state={this.state.unit}
                            onSelected={this.onChangeUnit}
                        />
                    </View>
                    <View style={{flex:2}}>
                        <RadioButtonGroup title={'Leader'} direction={'vertical'} buttons={[0,1,2,3,4,5,6].map((l) => {return {label: l.toString(), value: l};})}
                            state={this.state.leader}
                            onSelected={this.onChangeLeader}
                        />
                    </View>
                    <View style={{flex:1}}/>
                </View>
                {/*
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:1}}/>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <Text style={{marginLeft: 10}}>Leader</Text>
                    </View>
                    <View style={{flex:2, alignItems: 'center'}}>
                        <SpinNumeric value={this.state.leader} min={-5} max={5} onChanged={this.onChangeLeader} />
                    </View>
                    <View style={{flex:1}}/>
                </View>
                */}
                <View style={{flex:2}}/>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor:'whitesmoke'}}>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                        {/*<Text style={{marginTop: 25, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>*/}
                        <Image style={{height: 64, width: 64, resizeMode: 'stretch', marginTop: 10}} source={icon} />
                    </View>
                    <View style={{flex: 1, marginRight: 15}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]} type={'number'}
                            onRoll={this.onDiceRoll}
                            onDie={this.onDieChanged} />
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = MoraleCheckView;
