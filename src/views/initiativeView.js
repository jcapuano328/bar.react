import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import {SpinNumeric,IconButton} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import Initiative from '../services/initiative';
import ArmyMorale from '../services/armymorale';
import getBattle from '../selectors/battle';
import getInitiativePlayer from '../selectors/initiativePlayer';
import {setInitiative,nextInitiative} from '../actions/current';

var InitiativeView = React.createClass({
    dice: [
        {num: 1, low: 0, high: 9, color: 'red', dotcolor:'white'},
        {num: 1, low: 0, high: 9, color: 'blue', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            player1: '0',
            player2: '0',
            die1: 0,
            die2: 0
        };
    },
    onChangePlayer1(v) {
        this.state.player1 = v;
        this.resolve();
    },
    onChangePlayer2(v) {
        this.state.player2 = v;
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
    onNextPlayer() {
        this.setState(this.state);
        this.props.nextInitiative();
    },
    resolve() {
        console.log('initiative view', 'resolve', this.props.morale);
        let initmod1 = ArmyMorale.initiativeModifier(this.props.battle.moraleLevels, this.props.morale['0']);
        let initmod2 = ArmyMorale.initiativeModifier(this.props.battle.moraleLevels, this.props.morale['1']);
        
        let init = Initiative.find(+this.state.player1,+this.state.player2,initmod1,initmod2,this.state.die1,this.state.die2);
        this.props.setInitiative(init);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1,flexDirection: 'row', alignItems: 'center', backgroundColor:'whitesmoke'}}>
                    <View style={{flex: 1, marginRight: 5, alignItems: 'center'}}>
                        <IconButton image={Icons[(this.props.player||'tie').toLowerCase()]} width={80} height={80} resizeMode={'contain'} onPress={this.onNextPlayer}/>
                    </View>
                    <View style={{flex: 1, marginRight: 5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]} type={'number'} onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>                
                <View style={{flex: 2}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1}}/>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Image style={{width: 64,height: 64,resizeMode: 'contain'}} source={Icons['british']}/>
                        </View>
                        <View style={{flex:2, justifyContent: 'center'}}>
                            <SpinNumeric value={this.state.player1} min={0} max={10} onChanged={this.onChangePlayer1} />
                        </View>
                        <View style={{flex:1}}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1}}/>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Image style={{width: 64,height: 64,resizeMode: 'contain'}} source={Icons['american']}/>
                        </View>
                        <View style={{flex:2, justifyContent: 'center'}}>
                            <SpinNumeric value={this.state.player2} min={0} max={10} onChanged={this.onChangePlayer2} />
                        </View>
                        <View style={{flex:1}}/>
                    </View>
                </View>
                <View style={{flex:4}} />
            </View>
        );
        //<Text style={{flex: 2, fontSize: 28, fontWeight: 'bold', marginVertical: 20}}>{this.state.initiative}</Text>
    }
});

const mapStateToProps = (state) => ({
    battle: getBattle(state),
    player: getInitiativePlayer(state),
    morale: state.current.morale
});

const mapDispatchToProps = ({setInitiative,nextInitiative});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(InitiativeView);
