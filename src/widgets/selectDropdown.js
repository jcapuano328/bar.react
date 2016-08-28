'use strict'

var React = require('react');
import { View, Text, Picker } from 'react-native';

let SelectDropdown = React.createClass({
    render() {
        return (
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={{flex:1}}>
                    <Text style={{marginLeft: 10}}>{this.props.label}</Text>
                </View>
                <View style={{flex:2}}>
                    <Picker style={{marginRight: 25}}
                        selectedValue={this.props.value} onValueChange={this.props.onSelected}>
                        {this.props.values.map((o,i) => <Picker.Item key={i} label={o} value={o} />)}
                    </Picker>
                </View>
            </View>
        );
        //
    }
});


module.exports = SelectDropdown;
