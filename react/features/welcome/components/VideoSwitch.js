// @flow

import React, { Component } from 'react';
import { Switch, TouchableWithoutFeedback, View, Alert } from 'react-native';

import { ColorSchemeRegistry } from '../../base/color-scheme';
import { translate } from '../../base/i18n';
import { Text } from '../../base/react';
import { connect } from '../../base/redux';
import { updateSettings } from '../../base/settings';

import styles, { SWITCH_THUMB_COLOR, SWITCH_UNDER_COLOR } from './styles';

/**
 * The type of the React {@code Component} props of {@link VideoSwitch}.
 */
type Props = {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function,

    /**
     * The i18n translate function.
     */
    t: Function,

    /**
     * Color schemed style of the header component.
     */
    _headerStyles: Object,

    /**
     * The current settings from redux.
     */
    _settings: Object
};

/**
 * Renders the "Video <-> Voice" switch on the {@code WelcomePage}.
 */
class VideoSwitch extends Component<Props> {
    /**
     * Initializes a new {@code VideoSwitch} instance.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onStartAudioOnlyChange = this._onStartAudioOnlyChange.bind(this);
        this._onStartAudioOnlyFalse = this._onStartAudioOnlyChangeFn(false);
        this._onStartAudioOnlyTrue = this._onStartAudioOnlyChangeFn(true);
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { t, _headerStyles, _settings } = this.props;

        return (
            <View style = { styles.audioVideoSwitchContainer }>
                <TouchableWithoutFeedback>
                    <View style = { styles.switchLabel }>
                        <Text style = { _headerStyles.headerText }>
                            {/* { t('welcomepage.audioVideoSwitch.video') } */}
                            {/* { "Video OFF" } */}
                            { _settings.startWithVideoMuted && "Video OFF" }
                            { !_settings.startWithVideoMuted && "Video ON" }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <Switch
                    onValueChange = { this._onStartAudioOnlyChange }
                    style = { styles.audioVideoSwitch }
                    // thumbColor = { SWITCH_THUMB_COLOR }
                    thumbColor = { !_settings.startWithVideoMuted ? '#ffffff' : SWITCH_THUMB_COLOR }
                    trackColor = {{ true: '#242424' }}
                    value = { _settings.startWithVideoMuted } />
                {/* <TouchableWithoutFeedback
                    onPress = { this._onStartAudioOnlyTrue }>
                    <View style = { styles.switchLabel }>
                        <Text style = { _headerStyles.headerText }>
                            { t('welcomepage.audioVideoSwitch.audio') }
                        </Text>
                    </View>
                </TouchableWithoutFeedback> */}
            </View>
        );
    }

    _onStartAudioOnlyChange: boolean => void;

    /**
     * Handles the audio-video switch changes.
     *
     * @private
     * @param {boolean} startWithVideoMuted - The new startAudioOnly value.
     * @returns {void}
     */
    _onStartAudioOnlyChange(startWithVideoMuted) {
        const { dispatch } = this.props;

        // dispatch(updateSettings({
        //     startAudioOnly
        // }));
        dispatch(updateSettings({
            startWithVideoMuted: startWithVideoMuted
        }));

        if (startWithVideoMuted) {
            Alert.alert(
                'Video OFF',
                '\nConversation will start without video from now on.\n\nAudio can be toggled in the settings menu.',
                [
                    { text: 'Ok' },
                ],
                { cancelable: false });
        }
        else {
            Alert.alert(
                'Video ON',
                '\nConversation will start with video from now on.\n\nAudio can be toggled in the settings menu.',
                [
                    { text: 'Ok' },
                ],
                { cancelable: false });

        }
    }

    /**
     * Creates a function that forwards the {@code startAudioOnly} changes to
     * the function that handles it.
     *
     * @private
     * @param {boolean} startAudioOnly - The new {@code startAudioOnly} value.
     * @returns {void}
     */
    _onStartAudioOnlyChangeFn(startAudioOnly) {
        return () => this._onStartAudioOnlyChange(startAudioOnly);
    }

    _onStartAudioOnlyFalse: () => void;

    _onStartAudioOnlyTrue: () => void;
}

/**
 * Maps (parts of) the redux state to the React {@code Component} props of
 * {@code VideoSwitch}.
 *
 * @param {Object} state - The redux state.
 * @protected
 * @returns {{
 *     _settings: Object
 * }}
 */
export function _mapStateToProps(state: Object) {
    return {
        _headerStyles: ColorSchemeRegistry.get(state, 'Header'),
        _settings: state['features/base/settings']
    };
}

export default translate(connect(_mapStateToProps)(VideoSwitch));
