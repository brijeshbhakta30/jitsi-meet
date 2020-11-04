/* eslint-disable react/prop-types */
// @flow

import React, { Component } from 'react';

import { translate } from '../../../base/i18n';
import {
    IconToggleRecording
} from '../../../base/icons';
import { connect as reactReduxConnect } from '../../../base/redux';
import { OverflowMenuItem } from '../../../base/toolbox/components';
import { setLekturRecordingFlag } from '../../actions.web';

/**
 * Local recorder functionality for Lektur
 */
class LekturRecordingButton extends Component {

    /**
     * Initializes a new {@code LekturRecordingButton} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onStopCapture = this._onStopCapture.bind(this);
        this._onStartRecording = this._onStartRecording.bind(this);
        this._onSave = this._onSave.bind(this);
    }

    /**
     * Stop the current capture in process.
     *
     * @returns {null}
     */
    _onStopCapture() {
        this.stop.click();
        this._onSave();
        this.props.dispatch(setLekturRecordingFlag(false));
    }

    /**
     * Starts recording in local computer.
     *
     * @returns {null}
     */
    async _onStartRecording() {
        this.start.click();
        this.props.dispatch(setLekturRecordingFlag(true));
    }

    /**
     * Saves the locally recorded stream.
     *
     * @returns {null}
     */
    _onSave() {
        this.save.click();
    }

    /**
     * Component did mount for recorder which add events to video playback.
     *
     * @returns {null}
     */
    componentDidMount() {
        this.start = document.getElementById('recordStart');
        this.stop = document.getElementById('recordStop');
        this.save = document.getElementById('recordSave');
    }

    /**
     * Return view for recorder buttons/ menu items.
     *
     * @returns {React$Node}
     */
    render() {

        const { t, isLekturRecording } = this.props;

        return (
            <>
                {isLekturRecording ? <OverflowMenuItem
                    accessibilityLabel = { t('toolbar.accessibilityLabel.recording') }
                    icon = { IconToggleRecording }
                    onClick = { this._onStopCapture }
                    text = { t('dialog.stopRecording') } />
                    : <OverflowMenuItem
                        accessibilityLabel = { t('toolbar.accessibilityLabel.recording') }
                        icon = { IconToggleRecording }
                        onClick = { this._onStartRecording }
                        text = { t('dialog.startRecording') } />}
            </>
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
    const {
        isLekturRecording
    } = state['features/toolbox'];

    return {
        isLekturRecording
    };
}

export default reactReduxConnect(_mapStateToProps)(translate(LekturRecordingButton));
