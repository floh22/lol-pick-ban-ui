import EventEmitter from 'events';
import fetch from 'node-fetch';
import logger from '../../logging/logger';
import { IngameEvent } from '../events/IngameEvent';
import { CurrentIngameState } from '../../data/CurrentIngameState';
import { GameUnpauseEvent } from '../events/GameUnpauseEvent';
import { GameOverEvent } from '../events/GameOverEvent';
import { IngameStateData } from './IngameStateData';
import { GameStartEvent } from '../events/GameStartEvent';
import { GoldHistory } from './GoldHistory';

const log = logger('IngameState');

export class IngameState extends EventEmitter {

    stateData: IngameStateData;

    goldHistory: GoldHistory;

    allEvents: Array<IngameEvent>;

    constructor() {
        super();
        this.stateData = new IngameStateData();
        this.goldHistory = new GoldHistory();
        this.stateData.blueGold = 0;
        this.stateData.redGold = 0;
        this.stateData.gameTime = 0;
        this.stateData.gamePaused = false;
        this.allEvents = [];
    }

    HandleNewEvents(newEvents: Array<IngameEvent>): void {

        //Front end event handling
        /*
        newEvents.forEach(event => {
            log.info('New Event of type' + event.EventName);
            this.emit('ingame_event', event);
          });
          */

        newEvents.forEach(event => {
            log.info('New Event of type ' + event.EventName);
            switch (event.EventName) {
                case 'GameStart':
                    this.StartGame(event as GameStartEvent);
                    break;
                case 'MinionsSpawning':
                    break;
                case 'FirstBrick':
                    break;
                case 'TurretKilled':
                    break;
                case 'InhibKilled':
                    break;
                case 'DragonKill':
                    this.stateData.dragonTimer.Reset(event.EventTime);
                    break;
                case 'HeraldKill':
                    this.stateData.heraldTimer.Reset(event.EventTime);
                    break;
                case 'BaronKill':
                    this.stateData.baronTimer.Reset(event.EventTime);
                    break;
                case 'ChampionKill':
                    break;
                case 'Multikill':
                    break;
                case 'Ace':
                    break;
                default:
                    break;
            }
        });

    }

    UpdateTimes(gameTime: number): void {
        this.stateData.baronTimer.timer.newGameTime = gameTime;
        this.stateData.dragonTimer.timer.newGameTime = gameTime;
        this.stateData.heraldTimer.timer.newGameTime = gameTime;
    }


    PauseGame(newState: CurrentIngameState): void {
        const pauseEvent = new GameUnpauseEvent(-1, 'GamePause', newState.gameStats.gameTime);
        this.stateData.baronTimer.timer.PauseTimer();
        this.stateData.dragonTimer.timer.PauseTimer();
        this.stateData.heraldTimer.timer.PauseTimer();
        this.emit('pause', pauseEvent);
        this.stateData.gamePaused = true;
    }

    UnpauseGame(newState: CurrentIngameState): void {
        const pauseEvent = new GameUnpauseEvent(-1, 'GameUnpause', newState.gameStats.gameTime);
        this.stateData.baronTimer.timer.UnpauseTimer();
        this.stateData.dragonTimer.timer.UnpauseTimer();
        this.stateData.heraldTimer.timer.UnpauseTimer();
        this.emit('unpause', pauseEvent);
        this.stateData.gamePaused = false;
    }

    StartGame(event: GameStartEvent): void {
        this.stateData.dragonTimer.StartGame();
        this.stateData.baronTimer.StartGame();
        this.stateData.heraldTimer.StartGame();

        this.stateData.blueGold = 0;
        this.stateData.redGold = 0;
        this.stateData.gameTime = 0;
        this.stateData.gamePaused = false;

        this.emit('game_start', event);
    }

    StopGame(): void {
        log.info('New Event of type GameOver');
        this.emit('game_over', new GameOverEvent(-1, 'GameOver', -1));
        this.stateData.baronTimer.timer.StopTimer();
        this.stateData.dragonTimer.timer.StopTimer();
        this.stateData.heraldTimer.timer.StopTimer();
        this.stateData.baronTimer.hidden = true;
        this.stateData.heraldTimer.hidden = false;
        this.allEvents = [];
    }

}