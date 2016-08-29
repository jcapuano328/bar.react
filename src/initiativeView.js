'use strict'

var React = require('react');
import { View, Image, Text } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var IconButton = require('./widgets/iconButton');
var Icons = require('./widgets/icons');
var DiceRoll = require('./widgets/diceRoll');
var Initiative = require('./services/initiative');
var Player = require('./services/player');

var AdminInitiativeView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'blue'}
    ],
    getInitialState() {
        return {
            initiative: Initiative.current(),
            british: '0',
            american: '0',
            die1: 1,
            die2: 1
        };
    },
    componentDidMount() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        this.setState({initiative: Initiative.current()});
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
        this.setState(this.state);
        /*
        Initiative.find(this.state.die1, this.state.die2)
        .then((init) => {
            this.setState({die1: this.state.die1, die2: this.state.die2, initiative: init || 'tie'});
            if (init) {
                this.props.events.emit('initiativechange');
            }
        })
        .catch((err) => {
            this.setState({die1: die1, die2: die2, initiative: ''});
            log.error(err);
        });
        */
    },
    render() {
        let player = Player.get();
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <Image style={{width: 96,height: 88,resizeMode: 'contain'}} source={icons['british']}/>
                    </View>
                    <View style={{flex:2, justifyContent: 'center'}}>
                        <SpinNumeric value={this.props.british} min={0} max={10} onChanged={this.props.onChangeBritish} />
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <Image style={{width: 96,height: 88,resizeMode: 'contain'}} source={icons['american']}/>
                    </View>
                    <View style={{flex:2, justifyContent: 'center'}}>
                        <SpinNumeric value={this.props.american} min={0} max={10} onChanged={this.props.onChangeAmerican} />
                    </View>
                </View>

                <View style={{flex: 1,flexDirection: 'row'}}>
                    <Text style={{flex: 1, fontSize: 20, marginLeft: 5, marginVertical: 25}}>Initiative</Text>
                    <View style={{flex: 2, marginRight: 5}}>
                    <IconButton image={this.state.initiative.toLowerCase()} width={80} height={80} resizeMode={'contain'} onPress={this.onNextPlayer}/>
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

module.exports = AdminInitiativeView;
