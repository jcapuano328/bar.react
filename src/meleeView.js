'use strict'

var React = require('react');
import { View, Image, Text, Picker } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
var SpinNumeric = require('./widgets/spinNumeric');
var MultiSelectList = require('./widgets/multiSelectList');
var DiceRoll = require('./widgets/diceRoll');
var Dice = require('./services/dice');
var Icons = require('./widgets/icons');
var Current = require('./services/current');
var Melee = require('./services/melee');

let MeleeView = React.createClass({
    dice: [
        {num: 1, low: 0, high: 9, color: 'red'},
        {num: 1, low: 0, high: 9, color: 'white'}
    ],
    getInitialState() {
        return {
            attacknationality: Melee.nationalities()[0],
            attackmorale: '0',
            attackleader: '0',
            attackmods: {},

            defendnationality: Melee.nationalities()[1],
            defendmorale: '0',
            defendleader: '0',
            defendmods: {},

            odds: Melee.odds[2],
            results: '',
            die1: 0,
            die2: 0
        };
    },
    onChangeAttackNationality(v) {
        this.state.attacknationality = v;
        this.resolve();
    },
    onChangeAttackMorale(v) {
        this.state.attackmorale = v;
        this.resolve();
    },
    onChangeAttackLeader(v) {
        this.state.attackleader = v;
        this.resolve();
    },
    onChangeAttackMod(m,v) {
        this.state.attackmods[m.name] = m.selected;
        this.resolve();
    },

    onChangeDefendNationality(v) {
        this.state.defendnationality = v;
        this.resolve();
    },
    onChangeDefendMorale(v) {
        this.state.defendmorale = v;
        this.resolve();
    },
    onChangeDefendLeader(v) {
        this.state.defendleader = v;
        this.resolve();
    },
    onChangeDefendMod(m,v) {
        this.state.defendmods[m.name] = m.selected;
        this.resolve();
    },

    onChangeOdds(o) {
        this.state.odds = o;
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
    getModifiers(type) {
        let mods = [];
        Object.keys(this.state[type+'mods']).forEach((k) => {
            if (this.state.mods[k]) {
                mods.push(k);
            }
        });
        return mods;
    },
    resolve() {
        this.state.results = Melee.resolve(this.state.odds,
            this.state.attackmorale,this.state.attacknationality,this.state.attackleader,this.getModifiers('attack'),
            this.state.defendmorale,this.state.defendnationality,this.state.defendleader,this.getModifiers('defend'),
            this.state.die1,this.state.die2);
        this.setState(this.state);
    },
    render() {
        /*
            attack              defend

            odds    result      dice
        */
        // maybe, parse the result and present images instead of text?
        //let result = this.state.results.replace('*', '');
        //let leader = this.state.results.indexOf('*') > -1 ? 'leader-casualty' : null;
        let result = this.state.results;
        let leader = null;

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 5, flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <MeleeInput
                            label={'Attack'}
                            nationalities={Melee.nationalities()}
                            nationality={this.state.attacknationality}
                            onChangeNationality={this.onChangeAttackNationality}
                            morale={this.state.attackmorale}
                            onChangeMorale={this.onChangeAttackMorale}
                            leader={this.state.attackleader}
                            onChangeLeader={this.onChangeAttackLeader}
                            modifiers={Melee.attackModifiers()}
                            mods={this.state.attackmods}
                            onChangeMod={this.onChangeAttackMod}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <MeleeInput
                            label={'Defend'}
                            nationalities={Melee.nationalities()}
                            nationality={this.state.defendnationality}
                            onChangeNationality={this.onChangeDefendNationality}
                            morale={this.state.defendmorale}
                            onChangeMorale={this.onChangeDefendMorale}
                            leader={this.state.defendleader}
                            onChangeLeader={this.onChangeDefendLeader}
                            modifiers={Melee.defendModifiers()}
                            mods={this.state.defendmods}
                            onChangeMod={this.onChangeDefendMod}
                        />
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                        <View style={{flex:1, flexDirection: 'row', marginTop: 15}}>
                            <Text style={{flex: 1, fontSize: 16,fontWeight: 'bold', marginLeft: 5, marginTop: 13}}>Odds</Text>
                            <Picker style={{flex: 2, marginRight: 25}}
                                selectedValue={this.state.odds}
                                onValueChange={this.onOddsChanged}
                            >
                                {Melee.odds.map((o,i) => {
                                    return (
                                        <Picker.Item key={i} label={o} value={o} />
                                    );
                                })}
                            </Picker>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                            {Icons[result]
                                ? <Image style={{marginTop: 5, height: 80, width: 80, resizeMode: 'stretch'}} source={Icons[result]} />
                                : <Text style={{marginTop: 35, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>
                            }
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                            {Icons[leader]
                                ? <Image style={{marginTop: 5, height: 80, width: 80, resizeMode: 'stretch'}} source={Icons[leader]} />
                                : null
                            }
                        </View>
                        <View style={{flex: 1, marginRight: 5}}>
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

let MeleeInput = React.createClass({
    /*
        header label
        nationality (radios?)
        spin input morale
        spin input leader
        multi select list modifiers

    */
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', borderColor: 'gray', borderStyle: 'solid', borderLeftWidth: 1, borderRightWidth: 1}}>
                <View style={{flex:.5, alignItems: 'center'}}>
                    <Text>{this.props.label}</Text>
                </View>
                <View style={{flex:1, alignItems: 'center'}}>
                    <RadioForm
                      formHorizontal={true}
                      animation={true}
                    >
                        {this.props.nationalities.map((n,i) => {
                            return (
                            <RadioButton labelHorizontal={true} key={i} >
                              <RadioButtonInput
                                obj={n}
                                index={0}
                                isSelected={this.props.nationality==n}
                                onPress={this.props.onChangeNationality}
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
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <Text style={{marginLeft: 10}}>Morale</Text>
                    </View>
                    <View style={{flex:2, alignItems: 'center'}}>
                        <SpinNumeric value={this.props.morale} min={-5} max={5} onChanged={this.props.onChangeMorale} />
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <Text style={{marginLeft: 10}}>Leader</Text>
                    </View>
                    <View style={{flex:2, alignItems: 'center'}}>
                        <SpinNumeric value={this.props.leader} min={-5} max={5} onChanged={this.props.onChangeLeader} />
                    </View>
                </View>
                <View style={{flex: 7, alignSelf: 'stretch'}}>
                    <MultiSelectList title={'Modifiers'} items={this.props.modifiers.map((m) => {return {name: m.name, selected: this.props.mods[m.name]};})} onChanged={this.props.onChangeMod}/>
                </View>
            </View>
        );
    }
});

module.exports = MeleeView;
