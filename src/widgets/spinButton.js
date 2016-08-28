'use strict'

var React = require('react');
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
var Icons = require('./icons');

var styles = StyleSheet.create({
  prevButton: {
      flex: 10,
      marginTop: 5,
      padding: 5,
      //backgroundColor: 'red',
      alignItems: 'center',
  },
  nextButton: {
      flex: 10,
      marginTop: 5,
      padding: 5,
      //backgroundColor: 'red',
      alignItems: 'center',
  },
});

var SpinButton = React.createClass({
    render() {
        let style = this.props.direction == 'prev' ? styles.prevButton : styles.nextButton;
        let icon = this.props.direction == 'prev' ? Icons.prevButton : Icons.nextButton;
        return (
            <TouchableOpacity onPress={this.props.onPress} style={style}>
                <Image source={icon} />
            </TouchableOpacity>
        );
    }
});

module.exports = SpinButton;
