/* eslint-disable no-unused-vars */
import React from 'react';
import cx from 'classnames';
import css from './styleIngame/index.less';

import dragonIcon from '../assets/timers/dragon-icon.png';
import dragonBackground from '../assets/timers/dragon-bg.png'
import dragonCircle from '../assets/timers/dragon-spinner.png'
import dragonLive from '../assets/timers/dragon-live.png'

import baronIcon from '../assets/timers/baron-icon.png';
import baronBackground from '../assets/timers/baron-bg.png'
import baronCircle from '../assets/timers/baron-spinner.png'
import baronLive from '../assets/timers/baron-live.png'


export default class OverlayIngame extends React.Component {

    state = {
        dragonTimer: 300,
        baronTimer: 300,
    };


    render() {
        const { state, config } = this.props;
        const debug = false;
        
        if (!debug && (!state.currentlyIngame || config === undefined)) {
            return (
                <div></div>
            );
        }

        let baronTimerDate;
        let dragonTimerDate;
        let baronTimerRaw;
        let dragonTimerRaw;
        let dragonCurrentlyLive = false;
        let baronCurrentlyLive = false;

        const convertTimeFormat = (date) => {
            return date.toISOString().substr(14, 5);;
        }

        const setTimerText = (timerInSeconds, type) => {
            if (timerInSeconds <= 0) {
                if (type === 'baron') {
                    baronCurrentlyLive = true;
                } else if(type === 'dragon'){
                    dragonCurrentlyLive = true;
                }
                return "ERROR";
            } else {
                if (type === 'baron') {
                    baronCurrentlyLive = false;
                } else if(type === 'dragon'){
                    dragonCurrentlyLive = false;
                }
                return (convertTimeFormat(new Date(timerInSeconds * 1000)));
            }
        }

        const setTimers = () => {

            if (state.ingameStateData.EventName === 'GameStart') {
                baronTimerRaw = 1200000;
                baronTimerDate = convertTimeFormat(new Date(1200000));
                dragonTimerRaw = 300000;
                dragonTimerDate = convertTimeFormat(new Date(300000));
            } else {
                baronTimerRaw = state.ingameStateData.baronTimer.timer.timeLeft;
                dragonTimerRaw = state.ingameStateData.dragonTimer.timer.timeLeft;
                baronTimerDate = setTimerText(baronTimerRaw, 'baron')
                dragonTimerDate = setTimerText(dragonTimerRaw, 'dragon');
            }
        }

        const debugIngame = () => {
            baronTimerRaw = 1201;
            dragonTimerRaw = 0;
            baronTimerDate = setTimerText(baronTimerRaw, 'baron');
            dragonTimerDate = setTimerText(dragonTimerRaw, 'dragon');
        }



        if(!debug) {
            setTimers();
        } else {
            debugIngame();
        }

        return (
            <div className={cx(css.Europe)}>
                <div className={cx(css.Objectives)}>
                    {baronTimerRaw <= 120 && <div className={cx(css.Baron)}>
                        <div className={cx(css.BaronBG)}>
                            <img src={baronBackground} width={"100%"} alt="baronBackground" />
                        </div>
                        <div className={cx(css.BaronCircle)}>
                            <img src={baronCircle} width={"100%"} alt="baronSpinner" />
                        </div>
                        <div className={cx(css.BaronIcon)}>
                            <img src={baronIcon} width={"100%"} alt="baronIcon" />
                        </div>
                        {baronCurrentlyLive === true && <div className={css.BaronLive}>
                            <img src={baronLive} width={"100%"} alt="baronLive" />
                        </div>}
                        {baronCurrentlyLive === false && <div className={css.BaronText}>
                            {baronTimerDate}
                        </div>}
                    </div>}
                    {baronTimerRaw > 120 && <div className={css.Baron}></div>}
                    {dragonTimerRaw <= 120 && <div className={cx(css.Dragon)} z-index={1}>
                        <div className={cx(css.DragonBG)}>
                            <img src={dragonBackground} width={"100%"} alt="dragonBackground" />
                        </div>
                        <div className={cx(css.DragonCircle)}>
                            <img src={dragonCircle} width={"100%"} alt="dragonSpinner" />
                        </div>
                        <div className={cx(css.DragonIcon)}>
                            <img src={dragonIcon} width={"100%"} alt="dragonIcon" />
                        </div>
                        {dragonCurrentlyLive === true && <div className={css.DragonLive}>
                            <img src={dragonLive} width={"100%"} alt="dragonLive" />
                        </div>}
                        {dragonCurrentlyLive === false && <div className={css.DragonText}>
                            {dragonTimerDate}
                        </div>}
                    </div>}
                    {dragonTimerRaw > 120 && <div className={css.Dragon}></div>}
                </div>
            </div>
        );
    }
}
