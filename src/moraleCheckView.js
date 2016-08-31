'use strict'

var React = require('react');
import { View, Image, Text } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
var SpinNumeric = require('./widgets/spinNumeric');
var DiceRoll = require('./widgets/diceRoll');
var Dice = require('./services/dice');
var Icons = require('./widgets/icons');
var Current = require('./services/current');
var Morale = require('./services/morale');
var Melee = require('./services/melee');

let MoraleCheckView = React.createClass({
    dice: [
        {num: 1, low: 0, high: 9, color: 'white'}
    ],
    getInitialState() {
        return {
            nationality: Melee.nationalities()[0],
            unit: '0',
            leader: '0',
            results: '',
            die1: 0
        };
    },
    onChangeNationality(v) {
        this.state.nationality = v;
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
                    <RadioForm
                      formHorizontal={true}
                      animation={true}
                    >
                        {Melee.nationalities().map((n,i) => {
                            return (
                            <RadioButton labelHorizontal={true} key={i} >
                              <RadioButtonInput
                                obj={n}
                                index={0}
                                isSelected={this.state.nationality==n}
                                onPress={this.onChangeNationality}
                                borderWidth={1}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}
                              />
                              <Image style={{marginLeft: 10, height: 48, width: 64, resizeMode: 'stretch'}} source={Icons[n.toLowerCase()]} />
                            </RadioButton>
                            );
                        })}
                    </RadioForm>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:1}}/>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <Text style={{marginLeft: 10}}>Unit</Text>
                    </View>
                    <View style={{flex:2, alignItems: 'center'}}>
                        <SpinNumeric value={this.state.unit} min={-5} max={5} onChanged={this.onChangeUnit} />
                    </View>
                    <View style={{flex:1}}/>
                </View>
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
                <View style={{flex: 6, flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={{height: 64, width: 64, resizeMode: 'stretch', marginTop: 10}} source={icon} />
                    </View>
                    <View style={{flex: 1, marginRight: 15}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                            onRoll={this.onDiceRoll}
                            onDie={this.onDieChanged} />
                    </View>
                </View>
            </View>
        );
        //<Text style={{marginTop: 25, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>

    }
});

module.exports = MoraleCheckView;
