import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {Landing,Style} from 'react-native-nub';
import {splash} from '../res';
import getBattle from '../selectors/battle';

var HomeView = React.createClass({
    componentDidUpdate() {
        if (this.props.battle && this.props.battle.name) {
            Actions.battle({title: this.props.battle.name, subtitle: this.props.battle.desc});
        }
    },
    render() {        
        return (
            <Landing splash={splash} top={Style.Scaling.scale(44)} />
        );
    }
});

const mapStateToProps = (state) => ({
    battle: getBattle(state)
});

module.exports = connect(
  mapStateToProps
)(HomeView);
