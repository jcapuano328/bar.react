'use strict'

var React = require('react');
import { View, TextInput, Text } from 'react-native';
var SpinButton = require('./spinButton');

let format = (v, ib) => {
    if (v != null && v != '') {
        v = ib ? Math.floor(+v).toString() : (+v).toFixed(1);
    } else {
        v = '';
    }
    return v;
}

var SpinNumeric = React.createClass({
    nextValue(value, neg) {
        let values = this.props.values;
        if (!values || values.length < 1) {
            let v = neg ? value - 1 : value + 1;
            if (this.props.hasOwnProperty('min') && v < this.props.min) {
                v = this.props.min;
            } else if (this.props.hasOwnProperty('max') && v > this.props.max) {
                v = this.props.max;
            }
            return v;
        }

        var i = values.findIndex((v) => {return v==value;}) + (neg ? -1 : 1);
        if (i < 0) {
            i = 0;
        } else if (i >= values.length) {
            i = values.length - 1;
        }
        return values[i];
    },
    onPrev() {
        try {
            let v = this.nextValue(+this.props.value, true);
            this.props.onChanged && this.props.onChanged(v.toString());
        } catch(err) {
            console.error(err);
        }
    },
    onNext() {
        try {
            let v = this.nextValue(+this.props.value);
            this.props.onChanged && this.props.onChanged(v.toString());
        } catch(err) {
            console.error(err);
        }
    },
    onChanged(e) {
        try {
            this.props.onChanged && this.props.onChanged(e);
        } catch(err) {
            console.error(err);
        }
    },
    render() {
        return (
            <View style={{flex: 1,flexDirection: 'row',paddingTop: 5,paddingBottom: 5, alignItems: 'center'}}>
                {this.props.label
                    ? <Text style={{flex: 10,marginTop: 10}}>{this.props.label}</Text>
                    : null
                }
                <SpinButton style={{flex: 10, width: 50}} direction={'prev'} onPress={this.onPrev} />
                <View style={{flex: 60,height: 50,alignItems: 'center',padding: 5}}>
                    <TextInput
                        style={{flex: 60, width: 50, fontSize: 18,borderWidth: 1,borderRadius: 4,
                                borderColor: '#E6E5ED',
                                //backgroundColor: '#F8F8F9',
                                //backgroundColor: 'red',
                                justifyContent: 'center',
                                textAlign: 'center'}}
                        keyboardType={'numeric'}
                        autoCorrect={false}
                        onChangeText={this.onChanged}
                        defaultValue={this.props.defaultValue}
                        value={this.props.value}
                    />
                </View>
                <SpinButton style={{flex: 10, width: 50}} direction={'next'} onPress={this.onNext} />
            </View>
        );
    }
});

module.exports = SpinNumeric;
