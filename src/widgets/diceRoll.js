'use strict'

var React = require('react');
import { View, Text, TouchableOpacity, Image } from 'react-native';
var Button = require('apsl-react-native-button');
var Dice = require('../services/dice');
var range = require('../services/range');
var Images = require('./dieImages');

var DieButton = React.createClass({
    shouldComponentUpdate(nextProps, nextState) {
      return true;
    },
    onPress() {
        this.props.onPress && this.props.onPress(this.props.die);
    },
    render() {
        let image = Images(this.props.image);
        return (
            <TouchableOpacity style={{marginRight: 5}} onPress={this.onPress} >
                <Image source={image} />
            </TouchableOpacity>
        );
    }
});

var DiceRoll = React.createClass({
    dice: null,
    onRoll(e) {
      this.dice.roll();
      this.props.onRoll && this.props.onRoll(this.dice.dice());
    },
    onDie(e) {
      let die = this.dice.dieEx(e);
      die.increment(true);
      this.props.onDie && this.props.onDie(e, die.value());
    },
    render() {
        this.dice = new Dice.Dice(this.props.dice);
        //style={{flex: 1,padding: 5, alignItems: 'center'}}
        //, alignItems: 'center'
        return (
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12}}>
                {this.dice.map((die, i) => {
                    if (i<this.props.values.length) {
                        die.value(this.props.values[i]);
                    }
                    return (
                        <DieButton key={i} die={i+1} image={die.image()} onPress={this.onDie} />
                    );
                })}
            </View>
            <Button
                style={{width: 96,height: 64,marginTop: 12,marginRight: 5,backgroundColor: '#3F51B5'}}
                textStyle={{fontSize: 18,color: '#FFF'}} onPress={this.onRoll}>
                Roll
            </Button>
          </View>
        );
    }
});

module.exports = DiceRoll;
