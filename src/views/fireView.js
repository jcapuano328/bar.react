import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import {RadioButtonGroup,MultiSelectList} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import Fire from '../services/fire';
import getBattle from '../selectors/battle';

let FireView = React.createClass({
    dice: [
        {num: 1, low: 0, high: 9, color: 'black', dotcolor:'red'},
        {num: 1, low: 0, high: 9, color: 'black', dotcolor: 'white'}
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
        this.state.results = Fire.resolve(this.state.type,this.state.strength,this.state.range,this.getModifiers(),(this.props.battle.modifiers.fire || []), this.state.die1,this.state.die2);
        this.setState(this.state);
    },
    render() {
        let mods = this.props.battle.modifiers.fire || [];
        let result = this.state.results.replace('*', '');
        let leader = this.state.results.indexOf('*') > -1 ? 'leader-casualty' : null;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', backgroundColor:'whitesmoke', marginTop: 5}}>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'flex-start'}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            {Icons[result]
                                ? <Image style={{marginTop: 5, height: 80, width: 80, resizeMode: 'stretch'}} source={Icons[result]} />
                                : <Text style={{marginTop: 35, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>
                            }
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            {Icons[leader]
                                ? <Image style={{marginTop: 5, height: 80, width: 80, resizeMode: 'stretch'}} source={Icons[leader]} />
                                : null
                            }
                        </View>
                    </View>
                    <View style={{flex: 2, marginRight: 5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]} type={'number'}
                            onRoll={this.onDiceRoll}
                            onDie={this.onDieChanged} />
                    </View>                    
                </View>                
                <View style={{flex: 6, flexDirection: 'row'}}>
                    <View style={{flex: 2, alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch'}}>
                            <RadioButtonGroup title={'Type'} direction={'vertical'}
                                buttons={Fire.types.map((t) => {return {label:t,value:t};})}
                                state={this.state.type}
                                onSelected={this.onChangeType}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch'}}>
                            <RadioButtonGroup title={'SPs'} direction={'vertical'}
                                buttons={Fire.sps.map((t) => {return {label:t,value:t};})}
                                state={this.state.strength}
                                onSelected={this.onChangeStrength}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch'}}>
                            <RadioButtonGroup title={'Range'} direction={'vertical'}
                                buttons={Fire.ranges.map((t) => {return {label:t,value:t};})}
                                state={this.state.range}
                                onSelected={this.onChangeRange}/>
                        </View>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-start'}}>
                        <View style={{flex: 1, alignSelf: 'stretch'}}>
                            <MultiSelectList title={'Modifiers'} items={mods.map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})} onChanged={this.onChangeMods}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    battle: getBattle(state)
});

module.exports = connect(
  mapStateToProps
)(FireView);