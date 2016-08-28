'use strict'

var React = require('react');
import { View, Text, StyleSheet } from 'react-native';
var SpinButton = require('./spinButton');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    //backgroundColor: 'blue',
  },
  button: {
      width: 50,
  },
  valueContainer: {
      flex: 90,
      alignItems: 'center',
      //justifyContent: 'center',
      //backgroundColor: '#DCDCDC',
      padding: 5,
  },
  value: {
      fontSize: 18,
  },
});

var SpinSelect = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },
  onPrev() {
      this.props.onPrev && this.props.onPrev();
  },
  onNext() {
      this.props.onNext && this.props.onNext();
  },
  render() {
    return (
      <View style={styles.container}>
        <SpinButton style={styles.button} direction={'prev'} onPress={this.onPrev} />
        <View style={styles.valueContainer}>
            <Text style={styles.value} >
                {this.props.value}
            </Text>
        </View>
        <SpinButton style={styles.button} direction={'next'} onPress={this.onNext} />
      </View>
    );
  }
});

module.exports = SpinSelect;
