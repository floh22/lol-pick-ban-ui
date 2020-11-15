/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable quotes */
import { EventEmitter } from "events";
import IngameDataProviderService from "../data/league/IngameDataProviderService";
import DataDragon from "../data/league/datadragon";
import logger from "../logging/logger";
import Tickable from "../Tickable";
import { CurrentIngameState } from "../data/CurrentIngameState";
import { IngameEvent } from "../types/ingame/events/IngameEvent";
import { GamePauseEvent } from "../types/ingame/events/GamePauseEvent";
import { GameUnpauseEvent } from "../types/ingame/events/GameUnpauseEvent";

const log = logger("IngameController");

export default class IngameController extends EventEmitter implements Tickable {
  dataProvider: IngameDataProviderService;
  ddragon: DataDragon;
  swapToChampSelect: any;
  pastEvents: Array<IngameEvent>;
  pastGameTime: number;
  gamePaused: boolean;

  constructor(kwargs: {
    dataProvider: IngameDataProviderService;
    ddragon: DataDragon;
    swapToChampSelect: any;
  }) {
    super();


    this.dataProvider = kwargs.dataProvider;
    this.ddragon = kwargs.ddragon;
    this.swapToChampSelect = kwargs.swapToChampSelect;
    this.pastEvents = [];
    this.pastGameTime = -1;
    this.gamePaused = false;
  }

  applyNewState(newState: CurrentIngameState): void {
    /*
    newState.session.Events.forEach(event => {
      log.debug("current event:" + event.EventName);
    });
    */


    //TODO: Clear past events on new game
    if(this.pastGameTime === newState.gameStats.gameTime) {
      //SEND GAME PAUSE UPDATE
      const pauseEvent = new GamePauseEvent(-1, 'GamePause', newState.gameStats.gameTime);
      this.emit('pause', pauseEvent);
      this.gamePaused = true;
    } else if(this.gamePaused) {
      //SEND GAME UNPAUSE UPDATE
      const pauseEvent = new GameUnpauseEvent(-1, 'GameUnpause', newState.gameStats.gameTime);
      this.emit('unpause', pauseEvent);
      this.gamePaused = false;
    }

    let newEvents = [];
    if (this.pastEvents.length > 0) {
      newEvents = newState.session.Events.slice(this.pastEvents.length, newState.session.Events.length);
    }
    else {
      newEvents = newState.session.Events;
    }

    newEvents.forEach(event => {
      console.log('New Event of type' + event.EventName);
      this.emit('ingame_event', event);
    });

    this.pastEvents = newState.session.Events;
    this.pastGameTime = newState.gameStats.gameTime;
    return;
  }

  tick(): Promise<void> {
    return this.dataProvider.getCurrentData().then((newState: CurrentIngameState) => {
      this.applyNewState(newState);
    }).catch(err => {
      console.log("Game ended!")
      this.pastEvents = [];
      this.swapToChampSelect();
    });
  }
}
