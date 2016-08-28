'use strict';

var React = require('react');
import { View, Text, ScrollView } from 'react-native';
var Checkbox = require('./checkbox');

var MultiSelectList = React.createClass({
    onSelected(item) {
        return (b) => {
            item.selected = b;
            this.props.onChanged && this.props.onChanged(item);
        }
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={{fontSize: 20, backgroundColor: 'silver', textAlign: 'center'}}>{this.props.title}</Text>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {this.props.items.map((item,i) => {
                        return (
                            <Checkbox key={i} label={item.name} selected={item.selected} onSelected={this.onSelected(item)}/>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
});

module.exports = MultiSelectList;
