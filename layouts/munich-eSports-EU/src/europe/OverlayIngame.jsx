/* eslint-disable no-unused-vars */
import React from 'react';
import cx from 'classnames';
import css from './styleIngame/index.less';
//import { url } from 'inspector';
import bgDragon from '../assets/Baron-BG.png'

export default class OverlayIngame extends React.Component {

    state = {
        dragonTimer: 300,
        baronTimer: 300,
    };


    render() {
        const { state, config } = this.props;
        if (!state.currentlyIngame) {
            return (
                <div></div>
            );
        }

        let baronTimerDate;
        let dragonTimerDate;

        const convertTimeFormat = (date) => {
            return date.toISOString().substr(14, 5);;
        }

        const setTimerText = (timerInSeconds) => {
            if(timerInSeconds <= 0) {
                return "";
            } else {
                return(convertTimeFormat(new Date(timerInSeconds * 1000)));
            }
        }

        const setTimers = () => {

            if (state.ingameStateData.EventName === 'GameStart') {
                baronTimerDate = convertTimeFormat(new Date(1200000));
                dragonTimerDate = convertTimeFormat(new Date(300000));
            } else {
                baronTimerDate = setTimerText(state.ingameStateData.baronTimer.timer.timeLeft)
                dragonTimerDate = setTimerText(state.ingameStateData.dragonTimer.timer.timeLeft);
            }
        }



        setTimers();

        return (
            <div className={cx(css.Europe)}>
                <div className={cx(css.Objectives)}>
                    <div className={cx(css.Baron)}>{baronTimerDate}</div>
                    <div className={cx(css.Dragon)}>{dragonTimerDate}</div>
                </div></div>
        );
    }
}
