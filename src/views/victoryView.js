import React from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import {SpinNumeric} from 'react-native-nub';
import Icons from '../res';
import {setVictory} from '../actions/current';
import getNationalities from '../selectors/nationalities';

let VictoryView = React.createClass({
    onChangeArmyVP(n) {
        return (v) => {
            this.props.setVictory(n,+v);
        };            
    },
    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.nationalities.map((n,i) => {
                    return (
                        <View key={i} style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex:1}}/>
                            <View style={{flex:1, justifyContent: 'center'}}>
                                <Image style={{marginLeft: 10, height: 48, width: 64, resizeMode: 'stretch'}} source={Icons[n.toLowerCase()]} />
                            </View>
                            <View style={{flex:2, alignItems: 'center'}}>
                                <SpinNumeric value={this.props.victory[i.toString()].toString()} min={0} max={50} onChanged={this.onChangeArmyVP(i)} />
                            </View>
                            <View style={{flex:1}}/>
                        </View>
                    );
                })}
                <View style={{flex: 8-this.props.nationalities.length}} />
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    nationalities: getNationalities(state),
    victory: state.current.victory
});

const mapDispatchToProps = ({setVictory});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(VictoryView);
