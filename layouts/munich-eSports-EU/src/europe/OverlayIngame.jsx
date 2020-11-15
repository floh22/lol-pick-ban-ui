/* eslint-disable no-unused-vars */
import React from 'react';

export default class OverlayIngame extends React.Component {

    state = {
        currentlyIngame: false
    };

    render() {
        const { state, config } = this.props;

        if (!state.currentlyIngame) {
            console.log("showing ingame overlay");
            return (
                <div></div>
            );
        }

        return (
            <div>Currently ingame</div>
        );
    }
}
