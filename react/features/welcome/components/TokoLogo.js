// @flow

import React, { Component } from 'react';
import { View, Image, Text} from 'react-native';

import { connect } from '../../base/redux';
import { getLocalVideoTrack } from '../../base/tracks';
import { TOKO_LOGO } from '../../recording/components/Recording/styles.native';
import styles from './styles';


/**
 * Implements a React {@code Component}
 */
class TokoLogo extends Component{
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @override
     * @returns {ReactElement}
     */
    render() {
        return (
            <View>
                <View style={{textAlign: 'center', alignItems: 'center'}}>
                    <Image style={{width: 200, height: 82, }} source={TOKO_LOGO}></Image>
                </View>
                <Text style={ styles.introText }>
                    Don't stop talking!
                </Text>
                <View style={{height:10}}></View>
            </View>
            
        );
    }
}

/**
 * Maps (parts of) the redux state to the React {@code Component} props of
 * {@code LocalVideoTrackUnderlay}.
 *
 * @param {Object} state - The redux state.
 * @private
 * @returns {{
 *     _localVideoTrack: (Track|undefined)
 * }}
 */
function _mapStateToProps(state) {
    return {
        
    };
}

export default connect(_mapStateToProps)(TokoLogo);
