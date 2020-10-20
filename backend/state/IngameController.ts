/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable quotes */
import { EventEmitter } from "events";
import IngameDataProviderService from "../data/league/IngameDataProviderService";
import DataDragon from "../data/league/datadragon";
import logger from "../logging/logger";
import Tickable from "../Tickable";
import { CurrentIngameState } from "../data/CurrentIngameState";
import { IngameEvent } from "../types/ingame/events/IngameEvent";

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

    if(this.pastGameTime === newState.gameStats.gameTime) {
      //SEND GAME PAUSE UPDATE
      this.gamePaused = true;
    } else if(this.gamePaused) {
      //SEND GAME UNPAUSE UPDATE
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
      //SEND EVENT UPDATE
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
      this.swapToChampSelect();
    });
  }
}
