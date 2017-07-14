import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icons from '../res';
import {nextPlayer} from '../actions/current';
import getPlayer from '../selectors/currentPlayer';

var TurnPlayerView = React.createClass({
    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width ||
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },    
    onNextPlayer() {
        //console.log('next player');
        this.props.nextPlayer();        
    },    
    render() {
        const player = (this.props.player||'').toLowerCase();
        let width = this.state.width || 96;
        let height = this.state.height || 88;
        return (            
            <TouchableOpacity onPress={this.onNextPlayer} onLayout={this.onLayout}>
                <Image style={{width: width,height: height,resizeMode: 'contain'}} source={Icons[player]}/>
            </TouchableOpacity>
        );
    }
});

const mapStateToProps = (state) => ({
    player: getPlayer(state)
});

const mapDispatchToProps =  ({nextPlayer});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurnPlayerView);

