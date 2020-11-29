/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable quotes */
import { EventEmitter } from "events";
import IngameDataProviderService from "../data/league/IngameDataProviderService";
import DataDragon from "../data/league/datadragon";
import logger from "../logging/logger";
import Tickable from "../Tickable";
import { CurrentIngameState } from "../data/CurrentIngameState";
import { IngameState } from './dto/IngameState';

const log = logger("IngameController");

export default class IngameController extends EventEmitter implements Tickable {
  dataProvider: IngameDataProviderService;
  ingameState: IngameState;
  ddragon: DataDragon;
  swapToChampSelect: any;
  pastGameTime: number;
  gameOverSent: boolean;

  constructor(kwargs: {
    dataProvider: IngameDataProviderService;
    ingameState: IngameState;
    ddragon: DataDragon;
    swapToChampSelect: any;
  }) {
    super();

    this.ingameState = kwargs.ingameState;
    this.dataProvider = kwargs.dataProvider;
    this.ddragon = kwargs.ddragon;
    this.swapToChampSelect = kwargs.swapToChampSelect;
    this.pastGameTime = -1;
    this.gameOverSent = false;
  }

  applyNewState(newState: CurrentIngameState): void {
    /*
    newState.session.Events.forEach(event => {
      log.debug("current event:" + event.EventName);
    });
    */


    //TODO: Clear past events on new game
    if (this.pastGameTime === newState.gameStats.gameTime) {
      //SEND GAME PAUSE UPDATE
      this.ingameState.PauseGame(newState);
    } else if (this.ingameState.stateData.gamePaused) {
      //SEND GAME UNPAUSE UPDATE
      this.ingameState.UnpauseGame(newState);
    }
    
    this.ingameState.UpdateTimes(newState.gameStats.gameTime);
    this.ingameState.stateData.gameTime = newState.gameStats.gameTime;

    let newEvents = [];
    if (this.ingameState.allEvents.length > 0) {
      newEvents = newState.session.Events.slice(this.ingameState.allEvents.length, newState.session.Events.length);
    }
    else {
      newEvents = newState.session.Events;
      this.gameOverSent = false;
    }

    this.ingameState.HandleNewEvents(newEvents);
    
    this.ingameState.allEvents = newState.session.Events;
    this.pastGameTime = newState.gameStats.gameTime;
    return;
  }

  tick(): Promise<void> {
    return this.dataProvider.getCurrentData().then((newState: CurrentIngameState) => {
      this.applyNewState(newState);
    }).catch(() => {
      if (!this.gameOverSent) {
        log.info("Game ended!")
        this.gameOverSent = true;
        this.ingameState.StopGame();
        this.swapToChampSelect();
      }
    });
  }
}
