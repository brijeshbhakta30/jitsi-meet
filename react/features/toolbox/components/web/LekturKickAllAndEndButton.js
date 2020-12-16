/* eslint-disable react/prop-types */
// @flow

import React, { Component } from 'react';

import { disconnect } from '../../../base/connection';
import { translate } from '../../../base/i18n';
import { IconKick } from '../../../base/icons';
import { getLocalParticipant, isLocalParticipantModerator, kickParticipant } from '../../../base/participants';
import { connect as reactReduxConnect } from '../../../base/redux';
import { OverflowMenuItem } from '../../../base/toolbox/components';

/**
 * Kick all and end functionality for Lektur
 */
class LekturKickAllAndEndButton extends Component {

    /**
     * Initializes a new {@code LekturKickAllAndEndButton} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onEndForAll = this._onEndForAll.bind(this);
    }

    /**
     * Listens for the ending meeting for all event sent to all participants.
     *
     * @returns {null}
     */
    _onEndForAll() {
        const { participants, me, dispatch } = this.props;
        const allParticipantsToKick = participants.filter(p => p.id !== me.id);

        allParticipantsToKick.forEach(p => {
            dispatch(kickParticipant(p.id));
        });

        dispatch(disconnect(false));
    }

    /**
     * Return view for end meeting for all buttons/ menu items.
     *
     * @returns {React$Node}
     */
    render() {

        const { visible } = this.props;

        if (!visible) {
            return null;
        }

        return (
            <OverflowMenuItem
                accessibilityLabel={"End meeting for all"}
                icon={IconKick}
                onClick={this._onEndForAll}
                text={"End meeting for all"} />
        );
    }
}


/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code Conference} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state) {
    const participants = state['features/base/participants'];

    return {
        participants,
        me: getLocalParticipant(state),
        visible: isLocalParticipantModerator(state, true)
    };
}

export default reactReduxConnect(_mapStateToProps)(translate(LekturKickAllAndEndButton));
