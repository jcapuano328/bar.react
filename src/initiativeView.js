'use strict'

var React = require('react');
import { View, Image, Text } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var IconButton = require('./widgets/iconButton');
var Button = require('apsl-react-native-button');
var Icons = require('./widgets/icons');
var DiceRoll = require('./widgets/diceRoll');
var Initiative = require('./services/initiative');

var InitiativeView = React.createClass({
    dice: [
        {num: 1, low: 0, high: 9, color: 'red'},
        {num: 1, low: 0, high: 9, color: 'blue'}
    ],
    getInitialState() {
        return {
            initiative: Initiative.current(),
            british: '0',
            american: '0',
            die1: 0,
            die2: 0
        };
    },
    componentDidMount() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        this.setState({initiative: Initiative.current()});
    },
    onChangeBritish(v) {
        this.state.british = v;
        this.resolve();
    },
    onChangeAmerican(v) {
        this.state.american = v;
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
        Initiative.next()
        .then((init) => {
            this.setState({initiative: init});
            this.props.events.emit('initiativechange');
        });
    },
    resolve() {
        Initiative.find(+this.state.british,+this.state.american,this.state.die1,this.state.die2)
        .then((init) => {
            this.state.initiative = init || 'tie';
            this.setState(this.state);
            if (init) {
                this.props.events.emit('initiativechange');
            }
        })
        .catch((err) => {
            this.state.initiative = '';
            this.setState(this.state);
            log.error(err);
        })
        .done();
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1}}/>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Image style={{width: 64,height: 64,resizeMode: 'contain'}} source={Icons['british']}/>
                        </View>
                        <View style={{flex:2, justifyContent: 'center'}}>
                            <SpinNumeric value={this.state.british} min={0} max={10} onChanged={this.onChangeBritish} />
                        </View>
                        <View style={{flex:1}}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1}}/>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Image style={{width: 64,height: 64,resizeMode: 'contain'}} source={Icons['american']}/>
                        </View>
                        <View style={{flex:2, justifyContent: 'center'}}>
                            <SpinNumeric value={this.state.american} min={0} max={10} onChanged={this.onChangeAmerican} />
                        </View>
                        <View style={{flex:1}}/>
                    </View>
                </View>
                <View style={{flex: 4,flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: 5, alignItems: 'center'}}>
                        <IconButton image={(this.state.initiative||'tie').toLowerCase()} width={80} height={80} resizeMode={'contain'} onPress={this.onNextPlayer}/>
                    </View>
                    <View style={{flex: 1, marginRight: 5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]} onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>
            </View>
        );
        //<Text style={{flex: 2, fontSize: 28, fontWeight: 'bold', marginVertical: 20}}>{this.state.initiative}</Text>
    }
});

module.exports = InitiativeView;
