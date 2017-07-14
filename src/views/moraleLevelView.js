import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {SpinNumeric} from 'react-native-nub';
import ArmyMorale from '../services/armymorale';
import getMoraleLevels from '../selectors/moraleLevels';
import getNationalities from '../selectors/nationalities';
import {setMorale} from '../actions/current';

let MoraleLevelView = React.createClass({
    onChangeArmyMorale(v) {
        this.props.setMorale(this.props.nationality,+v);
    },
    render() {
        let levels = this.props.moralelevels;
        let max = ArmyMorale.maxMorale(levels);
        let level = this.props.morale[this.props.nationality];
        let status = ArmyMorale.status(levels, level);
        let style = {
            //color: 'black',
            backgroundColor: 'transparent'
        };
        if (status == 'high') {
            // default
        }
        else if (status == 'wavering') {
            style.backgroundColor = 'yellow';
        } else if (status == 'fatigued') {
            style.backgroundColor = '#FFA500';//'orange';
        } else { // demoralized
            //style.color = 'white';
            style.backgroundColor = 'red';
        }
        return (
            <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center'},style]}>
                <SpinNumeric label={'Level'} value={level.toString()} min={0} max={max} onChanged={this.onChangeArmyMorale} />
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    moralelevels: getMoraleLevels(state),
    morale: state.current.morale
});

const mapDispatchToProps = ({setMorale});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoraleLevelView);
