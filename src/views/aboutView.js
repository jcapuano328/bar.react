import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {About} from 'react-native-nub';
import {logo} from '../res';

const AboutView = (props) => {
    return (
        <About logo={logo}
            title={'About BAR Assistant'}
            version={props.version}
            releasedate={moment(props.releasedate).format("MMMM Do YYYY, h:mm:ss a")}
            description={'A no frills assistant for the Battles of the American Revolution system of wargames.'}
            credit={{
                description: 'All glory to them that made it possible!',
                links: [
                    {label: 'GMT Games', url: 'http://www.gmtgames.com/c-3-battles-of-the-american-revolution.aspx'}                    
                ]
            }}
            additionalinfo={{
                description: 'And of course check out the discussions and extras',
                links: [
                    {label: 'ConsimWorld Forum', url: 'http://talk.consimworld.com/WebX/.ee6d708/9280'},
                    {label: 'BAR Extras', url: ''}
                ]
            }}
            dependencies={[
                {description: 'react-redux', url: 'https://github.com/reactjs/react-redux'},
                {description: 'react-native-router-flux', url: 'https://github.com/aksonov/react-native-router-flux'},
                {description: 'react-native-drawer', url: 'https://github.com/root-two/react-native-drawer'},
                {description: 'react-native-scrollable-tab-view', url: ''},
                {description: 'react-native-sound', url: ''},                
                {description: 'redux-persist', url: ''},
                {description: 'moment', url: ''}
            ]}
        />
    );
}

const mapStateToProps = (state) => ({
    version: state.info.version,
    releasedate: state.info.releasedate
});

module.exports = connect(
  mapStateToProps
)(AboutView);
