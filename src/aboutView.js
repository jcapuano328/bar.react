'use strict'
var React = require('react');
import { View, Text, Image, TouchableNativeFeedback, Linking } from 'react-native';
var Button = require('apsl-react-native-button');
var Icons = require('./widgets/icons');
var log = require('./services/log');

var OpenURLButton = React.createClass({
  propTypes: {
      label: React.PropTypes.string,
      url: React.PropTypes.string
  },
  handleClick: function() {
      Linking.canOpenURL(this.props.url)
      .then(supported => {
          if (supported) {
              Linking.openURL(this.props.url);
          } else {
              log.debug('Don\'t know how to open URI: ' + this.props.url);
          }
      });
  },
  render: function() {
      return (
        <TouchableNativeFeedback onPress={this.handleClick}>
            <View style={{padding: 10,backgroundColor: '#3B5998',marginBottom: 10}}>
                <Text style={{color: 'white'}}>{this.props.label}</Text>
            </View>
        </TouchableNativeFeedback>
    );
  }
});

var AboutView = React.createClass({
    getInitialState() {
        return {
        };
    },
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                //height: 100,
                //width: 100,
                //backgroundColor: '#ffffff',
                //opacity: 0.25,
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 5,
                margin: 50,
                paddingLeft: 25,
                paddingRight: 25,
                paddingBottom: 25,
                paddingTop: 25
            }}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: 96,height: 96,resizeMode: 'stretch'}} source={Icons.logo}/>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18,fontWeight: 'bold',marginLeft: 15}}>{'About BAR Assistant'}</Text>
                        <Text style={{fontSize: 14,marginLeft: 15}}>{'Version: 1.0.0'}</Text>
                        <Text style={{fontSize: 14,marginLeft: 15}}>{'Release: August 31, 2016'}</Text>
                    </View>
                </View>
                <View style={{flex: .75}}>
                    <Text style={{fontSize: 18}}>{'A no frills assistant for the Battles of the American Revolution conglomeration of wargames.'}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 18}}>{'All glory to them that made it possible!'}</Text>
                    <OpenURLButton label={'GMT Games'} url={''}/>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 18}}>{'And of course check out the discussions and extras'}</Text>
                    <OpenURLButton label={'ConsimWorld Forum'} url={''}/>
                    <OpenURLButton label={'BAR Extras'} url={''}/>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 14}}>{'Built with React Native and these helpful modules:'}</Text>
                    <Text style={{fontSize: 12}}>{'apsl-react-native-button'}</Text>
                    <Text style={{fontSize: 12}}>{'react-native-scrollable-tab-view'}</Text>
                    <Text style={{fontSize: 12}}>{'react-native-simple-radio-button'}</Text>
                    <Text style={{fontSize: 12}}>{'react-native-audioplayer'}</Text>
                    <Text style={{fontSize: 12}}>{'react-native-fs'}</Text>
                </View>
                <Button onPress={this.props.onClose}>{'Close'}</Button>
            </View>
        );
        /*
        <OpenURLButton label={'react-native'} url={'http://www.reactnative.com/'}/>
        <OpenURLButton label={'apsl-react-native-button'} url={'https://github.com/APSL/react-native-button'}/>
        <OpenURLButton label={'react-native-scrollable-tab-view'} url={'https://github.com/brentvatne/react-native-scrollable-tab-view'}/>
        <OpenURLButton label={'react-native-simple-radio-button'} url={'https://github.com/moschan/react-native-simple-radio-button'}/>
        <OpenURLButton label={'react-native-audioplayer'} url={'https://github.com/andreaskeller/react-native-audioplayer'}/>
        <OpenURLButton label={'react-native-fs'} url={'https://github.com/johanneslumpe/react-native-fs'}/>
        */
    }
});

module.exports = AboutView;
