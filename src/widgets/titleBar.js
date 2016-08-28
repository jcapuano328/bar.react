'use strict';

var React = require('react');
import { View, Text } from 'react-native';
var IconButton = require('./iconButton');
let iconWidth = 32, iconHeight = 32;

var renderTitle = (props) => {
    if (typeof props.title == 'function') {
        return props.title();
    }
    return props.title || '';
}
var renderSubTitle = (props) => {
    if (typeof props.subtitle == 'function') {
        return props.subtitle();
    }
    return props.subtitle || '';
}

var TitleBar = (props) => {
    props = props || {};
    return {
        LeftButton(route, navigator, index, navState) {
            route = route || {};
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <IconButton image={props.logo || 'menu'} height={iconHeight} width={iconWidth} resizeMode='stretch' onPress={route.onMenu} />
                </View>
            );
        },
        Title(route, navigator, index, navState) {
            route = route || {};
            return (
                <View style={{flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{
                          color: 'black',
                          fontSize: 22,
                          fontWeight: 'bold',
                          //marginLeft: 10,
                          //marginVertical: 10,
                          //color: 'blue'
                        }}>
                      {renderTitle(route)}
                    </Text>
                    {route.subtitle
                        ? <Text style={{
                              color: 'black',
                              fontSize: 14,
                              //marginLeft: 10,
                              //marginVertical: 10,
                              //color: 'blue'
                            }}>
                            {renderSubTitle(route)}
                          </Text>
                        : null
                    }
                </View>
            );
        },
        RightButton(route, navigator, index, navState) {
            route = route || {};
            if (!route.onRefresh) {
              return null;
            }
            return (
                <View style={{flex: 1, flexDirection: 'row', marginVertical: 10}}>
                    <IconButton image={'refreshButton'} height={iconHeight} width={iconWidth} onPress={route.onRefresh} />
                    <IconButton image={'info'} height={iconHeight} width={iconWidth} onPress={route.onInfo} />
                </View>
            );
        }
    };
}

module.exports = TitleBar;
