import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import {RadioButtonGroup, RadioButton, SpinNumeric} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import MoraleLevelView from './moraleLevelView';
import Icons from '../res';
import Morale from '../services/morale';
import getMoraleLevels from '../selectors/moraleLevels';
import getNationalities from '../selectors/nationalities';

let MoraleView = React.createClass({
    dice: [
        {num: 1, low: 0, high: 9, color: 'green',dotcolor: 'white'}
    ],
    getInitialState() {
        return {
            nationality: this.props.nationalities[0],
            unit: '0',
            leader: '0',
            results: '',
            die1: 0
        };
    },
    onChangeNationality(v) {
        this.state.nationality = this.props.nationalities[v];
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
        this.state.results = Morale.check(this.state.nationality,+this.state.unit,this.props.moralelevels,+this.state.leader,this.state.die1) ? 'pass' : 'fail';
        this.setState(this.state);
    },
    render() {
        let icon = this.state.results == 'fail' ? Icons['fail'] : Icons['pass'];
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor:'whitesmoke', marginTop: 5}}>
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
                <View style={{flex:6, marginTop: 3}}>     
                    <View style={{flex:1}}>                    
                        {this.props.nationalities.map((n,i) => {
                            return (
                                <View key={i} style={{flex:1, flexDirection:'row', justifyContent:'center',alignItems: 'center'}}>
                                    <View style={{flex:1, justifyContent:'center',alignItems: 'center'}}>
                                        <RadioButton key={i}                                            
                                            image={Icons[n.toLowerCase()]} imagepos={'right'} imageheight={48} imagewidth={64}
                                            selected={i==this.props.nationalities.indexOf(this.state.nationality)} 
                                            onSelected={() => this.onChangeNationality(i)} />                                        
                                    </View>
                                    <View style={{flex:1}}>
                                        <MoraleLevelView nationality={i}/>
                                    </View>
                                    <View style={{flex:.25}}/>                                    
                                </View>
                            );
                        })                        
                        }
                    </View>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1}}/>
                        <View style={{flex:2, borderRightWidth:1,borderRightColor:'gray'}}>
                            <RadioButtonGroup title={'Unit'} direction={'vertical'} buttons={['-2','-1','0','+1','+2'].map((m) => {return {label: m, value: m};})}
                                state={this.state.unit}
                                onSelected={this.onChangeUnit}
                            />
                        </View>
                        <View style={{flex:2}}>
                            <RadioButtonGroup title={'Leader'} direction={'vertical'} buttons={['0','1','2','3','4','5','6'].map((l) => {return {label: l, value: l};})}
                                state={this.state.leader}
                                onSelected={this.onChangeLeader}
                            />
                        </View>
                        <View style={{flex:1}}/>
                    </View>
                </View>
            </View>
        );
    }
});


const mapStateToProps = (state) => ({
    nationalities: getNationalities(state),
    moralelevels: getMoraleLevels(state)
});

module.exports = connect(
  mapStateToProps
)(MoraleView);
