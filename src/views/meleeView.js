import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import {RadioButtonGroup,SpinNumeric,MultiSelectList,SelectDropdown,Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import Melee from '../services/melee';
import getNationalities from '../selectors/nationalities';
import getAttackMeleeModifiers from '../selectors/attackMeleeModifiers';
import getDefendMeleeModifiers from '../selectors/defendMeleeModifiers';


let MeleeView = React.createClass({
    dice: [
        {num: 1, low: 0, high: 9, color: 'black', dotcolor:'red'},
        {num: 1, low: 0, high: 9, color: 'black', dotcolor: 'white'}
    ],
    getInitialState() {
        return {
            attacknationality: this.props.nationalities[0],
            attackmorale: '0',
            attackleader: '0',
            attackmods: {},

            defendnationality: this.props.nationalities[1],
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
        let modifiers = this.state[type+'mods'];
        Object.keys(modifiers).forEach((k) => {
            if (modifiers[k]) {
                mods.push(k);
            }
        });
        return mods;
    },
    resolve() {
        this.state.results = Melee.resolve(this.state.odds,
            this.state.attacknationality,+this.state.attackmorale,+this.state.attackleader,this.getModifiers('attack'),this.props.attackModifiers,
            this.state.defendnationality,+this.state.defendmorale,+this.state.defendleader,this.getModifiers('defend'),this.props.defendModifiers,
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
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor:'whitesmoke', marginTop: 5}}>
                    {/*
                    <View style={{flex:1, flexDirection: 'row', marginTop: 15}}>
                        <Text style={{flex: 1, fontSize: Style.Font.medium(),fontWeight: 'bold', marginLeft: 5, marginTop: 13}}>Odds</Text>
                        <View style={{flex: 2, marginRight: 25}}>
                            <SelectDropdown values={Melee.odds} value={this.state.odds} onSelected={this.onOddsChanged} />
                        </View>
                    </View>
                    */}
                    <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold'}}>{this.state.results}</Text>
                    </View>
                    <View style={{flex: 2, marginRight: 5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]} type={'number'}
                            onRoll={this.onDiceRoll}
                            onDie={this.onDieChanged} />
                    </View>
                </View>                
                <View style={{flex:1}}>
                    <RadioButtonGroup title={'Odds'} buttons={Melee.odds.map((o) => ({label: o, value: o}))}
                        state={this.state.odds}
                        onSelected={this.onChangeOdds}
                    />
                </View>                
                <View style={{flex: 6, flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <MeleeInput
                            label={'Attack'}
                            nationalities={this.props.nationalities}
                            nationality={this.state.attacknationality}
                            onChangeNationality={this.onChangeAttackNationality}
                            morale={this.state.attackmorale}
                            onChangeMorale={this.onChangeAttackMorale}
                            leader={this.state.attackleader}
                            onChangeLeader={this.onChangeAttackLeader}
                            modifiers={this.props.attackModifiers}
                            mods={this.state.attackmods}
                            onChangeMod={this.onChangeAttackMod}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <MeleeInput
                            label={'Defend'}
                            nationalities={this.props.nationalities}
                            nationality={this.state.defendnationality}
                            onChangeNationality={this.onChangeDefendNationality}
                            morale={this.state.defendmorale}
                            onChangeMorale={this.onChangeDefendMorale}
                            leader={this.state.defendleader}
                            onChangeLeader={this.onChangeDefendLeader}
                            modifiers={this.props.defendModifiers}
                            mods={this.state.defendmods}
                            onChangeMod={this.onChangeDefendMod}
                        />
                    </View>
                </View>
            </View>
        );
    }
});

let MeleeInput = React.createClass({
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', borderColor: 'gray', borderStyle: 'solid', borderLeftWidth: 1, borderRightWidth: 1}}>
                <View style={{flex:.5, alignItems: 'center', backgroundColor:'silver'}}>
                    <Text style={{fontSize: Style.Font.medium(), fontWeight:'bold'}}>{this.props.label}</Text>
                </View>
                <View style={{flex:1, alignItems: 'center'}}>
                    <RadioButtonGroup buttons={this.props.nationalities.map((n) => {
                            return {image: Icons[n.toLowerCase()], imagepos:'right', imageheight:48, imagewidth:64, value: n};
                        })}
                        state={this.props.nationality}
                        onSelected={this.props.onChangeNationality}
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButtonGroup title={'Morale'} buttons={['-2','-1','0','+1','+2'].map((m) => {return {label: m, value: m};})}
                        state={this.props.morale}
                        onSelected={this.props.onChangeMorale}
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButtonGroup title={'Leader'} buttons={['0','1','2','3','4'].map((m) => {return {label: m, value: m};})}
                        state={this.props.leader}
                        onSelected={this.props.onChangeLeader}
                    />
                </View>
                <View style={{flex: 4.5, alignSelf: 'stretch'}}>
                    <MultiSelectList title={'Modifiers'} items={this.props.modifiers.map((m) => {return {name: m.name, selected: this.props.mods[m.name]};})} onChanged={this.props.onChangeMod}/>
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    nationalities: getNationalities(state),
    attackModifiers: getAttackMeleeModifiers(state),
    defendModifiers: getDefendMeleeModifiers(state)
});

module.exports = connect(
  mapStateToProps
)(MeleeView);
