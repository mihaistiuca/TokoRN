// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView} from 'react-native';

import { connect } from '../../base/redux';
import { getLocalVideoTrack } from '../../base/tracks';
import { TOKO_LOGO } from '../../recording/components/Recording/styles.native';
import styles from './styles';
import { IconCocktail, IconPointToRight } from '../../base/icons';
import { Icon, IconBusiness, IconPeople, IconCook } from '../../base/icons';

import { createWelcomePageEvent, sendAnalytics } from '../../analytics';
import { appNavigate } from '../../app';


/**
 * Implements a React {@code Component}
 */
class TokoHome extends Component{



    _onJoin(predefinedRoom) {
        sendAnalytics(
            createWelcomePageEvent('clicked', 'joinButton', {
                isGenerated: false,
                room: predefinedRoom
            }));

        this.setState({ joining: true });

        // By the time the Promise of appNavigate settles, this component
        // may have already been unmounted.
        const onAppNavigateSettled
            = () => this._mounted && this.setState({ joining: false });

        this.props.dispatch(appNavigate(predefinedRoom))
            .then(onAppNavigateSettled, onAppNavigateSettled);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @override
     * @returns {ReactElement}
     */
    render() {
        return (
            <ScrollView style={{paddingHorizontal: 16}}>
                <Text style={ styles.introText }>
                    Join one of these public rooms.
                </Text>
                <View style={{height: 30}}></View>

                <TouchableOpacity activeOpacity={0.7} style={[privateStyles.menuOption, { backgroundColor: '#cfcfcf' }]}
                        onPress={() => this._onJoin('Toko Open Discussion')}>
                <View style={{alignItems: 'center', width: '10%', justifyContent: 'center'}}>
                    <Icon
                        onClick = { this._onCopyInviteUrl }
                        size = { 20 }
                        color={'#911800'}
                        src = { IconPeople } />
                </View>
                        
                <View>
                    <Text style={privateStyles.menuOptionText}>
                    Open discussions
                    </Text>
                    <View style={{height: 10}}></View>
                    <Text style={privateStyles.menuOptionTextDesc}>
                    Find people to chat about anything
                    </Text>
                </View>

                    <View style={{ alignItems: 'center', width: '10%', justifyContent: 'center' }}>
                        <Icon
                            onClick = { this._onCopyInviteUrl }
                            size = { 18 }
                            color={'#292929'}
                            src = { IconPointToRight } />
                    </View>
                </TouchableOpacity>

                <View style={{height: 30}}></View>

                <TouchableOpacity activeOpacity={0.7} style={[privateStyles.menuOption, { backgroundColor: '#cfcfcf' }]}
                        onPress={() => this._onJoin('Toko Virtual Pub')}>
                  <View style={{alignItems: 'center', width: '10%', justifyContent: 'center'}}>
                    <Icon
                        onClick = { this._onCopyInviteUrl }
                        size = { 20 }
                        color={'#ad6e00'}
                        src = { IconCocktail } />
                  </View>
                        
                  <View>
                    <Text style={privateStyles.menuOptionText}>
                      Cheers together!
                    </Text>
                    <View style={{height: 10}}></View>
                    <Text style={privateStyles.menuOptionTextDesc}>
                      Click to join our virtual pub
                    </Text>
                  </View>
    
                    <View style={{ alignItems: 'center', width: '10%', justifyContent: 'center' }}>
                        <Icon
                            onClick = { this._onCopyInviteUrl }
                            size = { 18 }
                            color={'#292929'}
                            src = { IconPointToRight } />
                    </View>
                </TouchableOpacity>

                <View style={{height: 30}}></View>

                <TouchableOpacity activeOpacity={0.7} style={[privateStyles.menuOption, { backgroundColor: '#cfcfcf' }]}
                        onPress={() => this._onJoin('Toko Business')}>
                <View style={{alignItems: 'center', width: '10%', justifyContent: 'center'}}>
                    <Icon
                        onClick = { this._onCopyInviteUrl }
                        size = { 20 }
                        color={'#0068ad'}
                        src = { IconBusiness } />
                </View>
                        
                <View>
                    <Text style={privateStyles.menuOptionText}>
                    Business discussions
                    </Text>
                    <View style={{height: 10}}></View>
                    <Text style={privateStyles.menuOptionTextDesc}>
                        Click to join some business talks
                    </Text>
                </View>

                    <View style={{ alignItems: 'center', width: '10%', justifyContent: 'center' }}>
                        <Icon
                            onClick = { this._onCopyInviteUrl }
                            size = { 18 }
                            color={'#292929'}
                            src = { IconPointToRight } />
                    </View>
                </TouchableOpacity>

                <View style={{height: 30}}></View>

                <TouchableOpacity activeOpacity={0.7} style={[privateStyles.menuOption, { backgroundColor: '#cfcfcf' }]}
                        onPress={() => this._onJoin('Toko Cooking Ideas')}>
                <View style={{alignItems: 'center', width: '10%', justifyContent: 'center'}}>
                    <Icon
                        onClick = { this._onCopyInviteUrl }
                        size = { 20 }
                        color={'#0c9100'}
                        src = { IconCook } />
                </View>
                        
                <View>
                    <Text style={privateStyles.menuOptionText}>
                        What should I cook today?
                    </Text>
                    <View style={{height: 10}}></View>
                    <Text style={privateStyles.menuOptionTextDesc}>
                        Join and ask what other people cook 
                    </Text>
                </View>

                    <View style={{ alignItems: 'center', width: '10%', justifyContent: 'center' }}>
                        <Icon
                            onClick = { this._onCopyInviteUrl }
                            size = { 18 }
                            color={'#292929'}
                            src = { IconPointToRight } />
                    </View>
                </TouchableOpacity>
            </ScrollView>
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

const privateStyles = {
    introWrapper: {
      padding: 20,
      paddingTop: 0,
      marginTop: 30,
      paddingBottom: 10
    },
    introText: {
      fontSize: 30,
      textAlign: 'center',
      color: 'white'
    },
    stayAtHome: {
      fontSize: 18,
      textAlign: 'center',
      color: '#e3e3e3'
    },
    welcome: {
      fontSize: 14,
      textAlign: 'center',
      color: '#e3e3e3'
    },
    welcomeChange: {
      fontSize: 14,
      textAlign: 'center',
      color: '#2c8ed4',
    },
    menuOption: {
      borderRadius: 5,
      padding: 10,
    //   flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    menuOptionText: {
      fontSize: 18,
      textAlign: 'center',
      color: '#292929'
    },
    menuOptionTextDesc: {
      fontSize: 13,
      textAlign: 'center',
      color: '#525252'
    },
    backgroundImage: {
      zIndex: 1,
      position: 'absolute',
      resizeMode: 'cover', // or 'stretch'
    }
}
export default connect(_mapStateToProps)(TokoHome);
