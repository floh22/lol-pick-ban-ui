/* eslint-disable no-unused-vars */
import React from 'react';

export default class OverlayIngame extends React.Component {
    render() {
        const { state, config } = this.props;

        if (state.champSelectActive ) {
            return null;
        }

        return (
            <div></div>
        );
    }
}
