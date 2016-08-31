'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TurnView = require('./turnView');
var InitiativeView = require('./initiativeView');
var FireView = require('./fireView');
var MeleeView = require('./meleeView');
var MoraleView = require('./moraleView');
var Current = require('./services/current');
var icons = require('./widgets/icons');

var BattleView = React.createClass({
    getInitialState() {
        return {
            initialPage: 3
        };
    },
    componentWillMount: function() {
        this.props.events.addListener('menureset', this.onReset);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        Current.reset(this.props.battle)
        .then((current) => {
            this.props.events.emit('reset');
        })
        .done();
    },
    onChangeTab({i, ref}) {
    },
    render() {
        let battle = this.props.battle || {};
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <TurnView logo={icons[battle.image]} events={this.props.events} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.initialPage}
                >
                    <InitiativeView tabLabel="Initiative" events={this.props.events} />
                    <FireView tabLabel="Fire" events={this.props.events} />
                    <MeleeView tabLabel="Melee" events={this.props.events} />
                    <MoraleView tabLabel="Morale" events={this.props.events} />
                    <Text tabLabel="Victory" events={this.props.events} />
                    <Text tabLabel="General" events={this.props.events} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = BattleView;
