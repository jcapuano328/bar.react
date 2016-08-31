'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var MoraleCheckView = require('./moraleCheckView');
var MoraleLevelsView = require('./moraleLevelsView');

var MoraleView = React.createClass({
    getInitialState() {
        return {
            page: 0
        };
    },
    componentDidMount() {
        // hack to get the page to display (in a nested view)
        this.refs.tab.goToPage(-1);
        setTimeout(() => this.refs.tab.goToPage(this.state.page), 0);
    },
    onChangeTab({i, ref}) {
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollableTabView
                    ref="tab"
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.page}>
                    <MoraleCheckView tabLabel="Check" events={this.props.events} />
                    <MoraleLevelsView tabLabel="Levels" events={this.props.events} />                    
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = MoraleView;
