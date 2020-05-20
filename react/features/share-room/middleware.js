// @flow

import { Share } from 'react-native';

import { getName } from '../app';
import { MiddlewareRegistry } from '../base/redux';
import { getShareInfoText } from '../invite';

import { endShareRoom } from './actions';
import { BEGIN_SHARE_ROOM } from './actionTypes';
import logger from './logger';

/**
 * Middleware that captures room URL sharing actions and starts the sharing
 * process.
 *
 * @param {Store} store - Redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    switch (action.type) {
    case BEGIN_SHARE_ROOM:
        _shareRoom(action.roomURL, store);
        break;
    }

    return next(action);
});

/**
 * Open the native sheet for sharing a specific conference/room URL.
 *
 * @param {string} roomURL - The URL of the conference/room to be shared.
 * @param {Store} store - Redux store.
 * @private
 * @returns {void}
 */
function _shareRoom(roomURL: string, { dispatch, getState }) {
    // alert(111);
    getShareInfoText(getState(), roomURL)
        .then(message => {

            // toko specific: get last part of the roomURL, which is the actual room name 
            var lastSlashIndex = roomURL.lastIndexOf('/');
            var actualRoomName = roomURL.substring(lastSlashIndex + 1);
            var actualTokoUrl = 'https://tokochat.com/' + actualRoomName;

            // const title = `${getName()} Conference`;
            const title = 'Toko Meeting';
            const onFulfilled
                = (shared: boolean) => dispatch(endShareRoom(actualTokoUrl, shared));
                
            alert(title);

            Share.share(
                /* content */ {
                    // message,
                    message: 'You have been invited to a Toko Meeting. Access it here:\n\nhttps://tokochat.com/' + actualRoomName,
                    title
                },
                /* options */ {
                    dialogTitle: title, // Android
                    subject: title // iOS
                })
                .then(
                    /* onFulfilled */ value => {
                        onFulfilled(value.action === Share.sharedAction);
                    },
                    /* onRejected */ reason => {
                        logger.error(
                            `Failed to share conference/room URL ${actualTokoUrl}:`,
                            reason);
                        onFulfilled(false);
                    });
        });
}
