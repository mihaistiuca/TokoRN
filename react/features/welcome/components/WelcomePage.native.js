import React from 'react';
import {
    Animated,
    Keyboard,
    SafeAreaView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,Image,
    AsyncStorage,
    TouchableWithoutFeedback
} from 'react-native';

import { getName } from '../../app';

import { ColorSchemeRegistry } from '../../base/color-scheme';
import { translate } from '../../base/i18n';
import { Icon, IconMenu } from '../../base/icons';
import { MEDIA_TYPE } from '../../base/media';
import { Header, LoadingIndicator, Text } from '../../base/react';
import { connect } from '../../base/redux';
import { ColorPalette } from '../../base/styles';
import {
    createDesiredLocalTracks,
    destroyLocalTracks
} from '../../base/tracks';
import { HelpView } from '../../help';
import { DialInSummary } from '../../invite';
import { SettingsView } from '../../settings';

import { setSideBarVisible } from '../actions';

import {
    AbstractWelcomePage,
    _mapStateToProps as _abstractMapStateToProps
} from './AbstractWelcomePage';
import LocalVideoTrackUnderlay from './LocalVideoTrackUnderlay';
import styles, { PLACEHOLDER_TEXT_COLOR } from './styles';
import VideoSwitch from './VideoSwitch';
import WelcomePageLists from './WelcomePageLists';
import WelcomePageSideBar from './WelcomePageSideBar';
import TokoLogo from './TokoLogo';
import TermsDialog from './TermsDialog';

const wereTermsAndConditionsAcceptedKey = 'wereTermsAndConditionsAccepted';

/**
 * The native container rendering the welcome page.
 *
 * @extends AbstractWelcomePage
 */
class WelcomePage extends AbstractWelcomePage {
    /**
     * Constructor of the Component.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);

        

        this.state._fieldFocused = false;
        this.state.hintBoxAnimation = new Animated.Value(0);
        this.state.currentPage = 1;
        this.state.showAcceptTermsPopup = false;

        // Bind event handlers so they are only bound once per instance.
        this._onFieldFocusChange = this._onFieldFocusChange.bind(this);
        this._onShowSideBar = this._onShowSideBar.bind(this);
        this._renderHintBox = this._renderHintBox.bind(this);

        // Specially bind functions to avoid function definition on render.
        this._onFieldBlur = this._onFieldFocusChange.bind(this, false);
        this._onFieldFocus = this._onFieldFocusChange.bind(this, true);
    }

    async getStorageItem(key) {
      try {
          let value = await AsyncStorage.getItem(key);
          return value;
      } catch (error) {
          return null;
      }
    }

    async setStorageItem(key, value) {
      try {
          await AsyncStorage.setItem(key, value);
      } catch (error) {
      }
    }

    pressAcceptTerms = async () => {
        await this.setStorageItem(wereTermsAndConditionsAcceptedKey, 'true');
        this.setState({
            showAcceptTermsPopup: false
        });
    }

    /**
     * Implements React's {@link Component#componentDidMount()}. Invoked
     * immediately after mounting occurs. Creates a local video track if none
     * is available and the camera permission was already granted.
     *
     * @inheritdoc
     * @returns {void}
     */
    async componentDidMount() {
        super.componentDidMount();

        this._updateRoomname();

        const { dispatch } = this.props;
// alert(this.props.defaultPage);
        if (this.props._settings.startAudioOnly) {
            dispatch(destroyLocalTracks());
        } else {
            // Make sure we don't request the permission for the camera from
            // the start. We will, however, create a video track iff the user
            // already granted the permission.
            navigator.permissions.query({ name: 'camera' }).then(response => {
                response === 'granted'
                    && dispatch(createDesiredLocalTracks(MEDIA_TYPE.VIDEO));
            });
        }

        let wereTermsAndConditionsAcceptedString = await this.getStorageItem(wereTermsAndConditionsAcceptedKey);
        if (!wereTermsAndConditionsAcceptedString || wereTermsAndConditionsAcceptedString != 'true') {
            this.setState({
                showAcceptTermsPopup: true
            });
        }
    }

    component

    /**
     * Implements React's {@link Component#render()}. Renders a prompt for
     * entering a room name.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        // We want to have the welcome page support the reduced UI layout,
        // but we ran into serious issues enabling it so we disable it
        // until we have a proper fix in place. We leave the code here though, because
        // this part should be fine when the bug is fixed.
        //
        // NOTE: when re-enabling, don't forget to uncomment the respective _mapStateToProps line too

        /*
        const { _reducedUI } = this.props;

        if (_reducedUI) {
            return this._renderReducedUI();
        }
        */

        return this._renderFullUI();
    }

    /**
     * Constructs a style array to handle the hint box animation.
     *
     * @private
     * @returns {Array<Object>}
     */
    _getHintBoxStyle() {
        return [
            styles.hintContainer,
            {
                opacity: this.state.hintBoxAnimation
            }
        ];
    }

    /**
     * Callback for when the room field's focus changes so the hint box
     * must be rendered or removed.
     *
     * @private
     * @param {boolean} focused - The focused state of the field.
     * @returns {void}
     */
    _onFieldFocusChange(focused) {
        focused
            && this.setState({
                _fieldFocused: true
            });

        Animated.timing(
            this.state.hintBoxAnimation,
            {
                duration: 300,
                toValue: focused ? 1 : 0
            })
            .start(animationState =>
                animationState.finished
                    && !focused
                    && this.setState({
                        _fieldFocused: false
                    }));
    }

    /**
     * Toggles the side bar.
     *
     * @private
     * @returns {void}
     */
    _onShowSideBar() {
        Keyboard.dismiss();
        this.props.dispatch(setSideBarVisible(true));
    }

    _onHideKeyboard() {
        Keyboard.dismiss();
    }

    /**
     * Renders the hint box if necessary.
     *
     * @private
     * @returns {React$Node}
     */
    _renderHintBox() {
        if (this.state._fieldFocused) {
            const { t } = this.props;

            return (
                <Animated.View style = { this._getHintBoxStyle() }>
                    <View style = { styles.hintTextContainer } >
                        <Text style = { styles.hintText }>
                            {/* { t('welcomepage.roomnameHint') } */}
                            { "Enter the name of the room you want to create or join. After entering the room, you will be able to invite friends and family in." }
                        </Text>
                    </View>
                    <View style = { styles.hintButtonContainer } >
                        { this._renderJoinButton() }
                    </View>
                </Animated.View>
            );
        }

        return null;
    }

    /**
     * Renders the join button.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderJoinButton() {
        const { t } = this.props;
        let children;


        if (this.state.joining) {
            // TouchableHighlight is picky about what its children can be, so
            // wrap it in a native component, i.e. View to avoid having to
            // modify non-native children.
            children = (
                <View>
                    <LoadingIndicator
                        color = { styles.buttonText.color }
                        size = 'small' />
                </View>
            );
        } else {
            children = (
                <Text style = { styles.buttonText }>
                    { this.props.t('welcomepage.join') }
                </Text>
            );
        }

        return (
            <TouchableHighlight
                accessibilityLabel =
                    { t('welcomepage.accessibilityLabel.join') }
                onPress = { this._onJoin }
                style = { styles.button }
                // underlayColor = { ColorPalette.white }>
                >
                { children }
            </TouchableHighlight>
        );
    }

    onChangePageHandler(pageIndex) {
        // alert('change ' + pageIndex);
        this.setState({
            currentPage: pageIndex
        });
    }

    /**
     * Renders the full welcome page.
     *
     * @returns {ReactElement}
     */
    _renderFullUI() {
        const roomnameAccLabel = 'welcomepage.accessibilityLabel.roomname';
        const { _headerStyles, t, defaultPage } = this.props;

        return (
            <LocalVideoTrackUnderlay style = { styles.welcomePage }>

<TermsDialog isVisible={this.state.showAcceptTermsPopup} pressAcceptTerms={() => { this.pressAcceptTerms(); }}></TermsDialog>
            
                <TouchableOpacity activeOpacity={1} style = { _headerStyles.page } onPress = { this._onHideKeyboard } >
                    <Header style = { styles.header }>
                        <TouchableOpacity onPress = { this._onShowSideBar } >
                            <Icon
                                src = { IconMenu }
                                style = { _headerStyles.headerButtonIcon } />
                        </TouchableOpacity>
                        <VideoSwitch />
                    </Header>
                    <TokoLogo/>

                    {
                        this.state.currentPage != 1 &&
                        <SafeAreaView style = { styles.roomContainer } >
                   
                        <View style={{height: 10}}></View>
                        <Text style={ [ styles.introText, { fontSize: 16 } ] }>
                            Create private room
                        </Text>

                        <View style={{height: 10}}></View>
                        <View style = { styles.joinControls } >

                        
                            {/* <Text style = { styles.enterRoomText }>
                                { this.state.currentPage }
                            </Text> */}
                            {/* <Text style = { styles.enterRoomText }>
                                { t('welcomepage.roomname') }
                            </Text> */}
                            <TextInput
                                accessibilityLabel = { t(roomnameAccLabel) }
                                autoCapitalize = 'none'
                                autoComplete = 'off'
                                autoCorrect = { false }
                                autoFocus = { false }
                                onBlur = { this._onFieldBlur }
                                onChangeText = { this._onRoomChange }
                                onFocus = { this._onFieldFocus }
                                onSubmitEditing = { this._onJoin }
                                // placeholder = { this.state.roomPlaceholder }
                                placeholder = { 'Enter room name here' }
                                placeholderTextColor = { PLACEHOLDER_TEXT_COLOR }
                                returnKeyType = { 'go' }
                                style = { styles.textInput }
                                underlineColorAndroid = 'transparent'
                                value = { this.state.room } />
                            {
                                this._renderHintBox()
                            }
                        </View>
                    </SafeAreaView>
                    }

                    
                    <View style={{height: 10}}></View>
                    <WelcomePageLists onChangePage={(pageIndex) => this.onChangePageHandler(pageIndex)} disabled = { this.state._fieldFocused } />
                </TouchableOpacity>
                <WelcomePageSideBar />
                { this._renderWelcomePageModals() }
            </LocalVideoTrackUnderlay>
        );
    }

    /**
     * Renders a "reduced" version of the welcome page.
     *
     * @returns {ReactElement}
     */
    _renderReducedUI() {
        const { t } = this.props;

        return (
            <View style = { styles.reducedUIContainer }>
                <Text style = { styles.reducedUIText }>
                    { t('welcomepage.reducedUIText', { app: getName() }) }
                </Text>
            </View>
        );
    }

    /**
     * Renders JitsiModals that are supposed to be on the welcome page.
     *
     * @returns {Array<ReactElement>}
     */
    _renderWelcomePageModals() {
        return [
            <HelpView key = 'helpView' />,
            <DialInSummary key = 'dialInSummary' />,
            <SettingsView key = 'settings' />
        ];
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Object}
 */
function _mapStateToProps(state) {
    return {
        ..._abstractMapStateToProps(state),
        _headerStyles: ColorSchemeRegistry.get(state, 'Header')

        // _reducedUI: state['features/base/responsive-ui'].reducedUI
    };
}

export default translate(connect(_mapStateToProps)(WelcomePage));
