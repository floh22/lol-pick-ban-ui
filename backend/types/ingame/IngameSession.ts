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
      switch (event[1]) {
        case 'GameStart':
          this.Events.push(event as GameStartEvent);
          break;
        case 'MinionsSpawning':
          this.Events.push(event as MinionsSpawningEvent);
          break;
        case 'FirstBrick':
          this.Events.push(event as FirstTowerEvent);
          break;
        case 'TurretKilled':
          this.Events.push(event as TowerKilledEvent);
          break;
        case 'InhibKilled':
          this.Events.push(event as InhibKilledEvent);
          break;
        case 'DragonKill':
          this.Events.push(event as DragonKillEvent);
          break;
        case 'HeraldKill':
          this.Events.push(event as HeraldKillEvent);
          break;
        case 'BaronKill':
          this.Events.push(event as BaronKillEvent);
          break;
        case 'ChampionKill':
          this.Events.push(event as ChampionKillEvent);
          break;
        case 'Multikill':
          this.Events.push(event as MultikillEvent);
          break;
        case 'Ace':
          this.Events.push(event as AceEvent);
          break;
        default:
          console.log('Cannot decode ingame event! Event type received:' + event[1]);
          console.log(event);
          break;
      }
    });
  }
}