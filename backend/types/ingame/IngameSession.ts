/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
//import { Action, Cell, Timer } from './';

import { IngameEvent } from '../ingame/events/IngameEvent';
import { FirstTowerEvent } from './events/FirstTowerEvent';
import { GameStartEvent } from './events/GameStartEvent';
import { InhibKilledEvent } from './events/InhibKilledEvent';
import { MinionsSpawningEvent } from './events/MinionsSpawningEvent';
import { TowerKilledEvent } from './events/TowerKilledEvent';
import { DragonKillEvent } from './events/DragonKillEvent';
import { HeraldKillEvent } from './events/HeraldKillEvent';
import { BaronKillEvent } from './events/BaronKillEvent';
import { ChampionKillEvent } from './events/ChampionKillEvent';
import { MultikillEvent } from './events/MultikillEvent';
import { AceEvent } from './events/AceEvent';

export class IngameSession {
  /*myTeam: Array<Cell> = [];
  theirTeam: Array<Cell> = [];
  actions: Array<Array<Action>> = [];
  timer: Timer = new Timer();
*/
  Events: Array<IngameEvent> = [];

  constructor(session: Array<any>) {
    session.forEach(event => {
      switch (event.EventName) {
        case 'GameStart':
          this.Events.push(new GameStartEvent(event));
          break;
        case 'MinionsSpawning':
          this.Events.push(new MinionsSpawningEvent(event));
          break;
        case 'FirstBrick':
          this.Events.push(new FirstTowerEvent(event));
          break;
        case 'TurretKilled':
          this.Events.push(new TowerKilledEvent(event));
          break;
        case 'InhibKilled':
          this.Events.push(new InhibKilledEvent(event));
          break;
        case 'DragonKill':
          this.Events.push(new DragonKillEvent(event));
          break;
        case 'HeraldKill':
          this.Events.push(new HeraldKillEvent(event));
          break;
        case 'BaronKill':
          this.Events.push(new BaronKillEvent(event));
          break;
        case 'ChampionKill':
          this.Events.push(new ChampionKillEvent(event));
          break;
        case 'Multikill':
          this.Events.push(new MultikillEvent(event));
          break;
        case 'Ace':
          this.Events.push(new AceEvent(event));
          break;
        default:
          console.log('Cannot decode ingame event! Event type received:' + event[1]);
          console.log(event);
          break;
      }
    });
  }
}