/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { IngameEvent } from './events/IngameEvent';
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
import { FirstBloodEvent } from './events/FirstBloodEvent';
import { GameCompletedEvent } from './events/GameCompletedEvent';
import { InhibRespawnedEvent } from './events/InhibRespawnedEvent';
import { InhibRespawningSoonEvent } from './events/InhibRespawningSoonEvent';

export class IngameSession {
  Events: Array<IngameEvent> = [];

  constructor(session: Array<any>) {
    session.forEach(event => {
      switch (event.EventName) {
        case 'GameStart':
          this.Events.push(new GameStartEvent(event));
          break;
        case 'GameEnd':
          this.Events.push(new GameCompletedEvent(event));
          break;
        case 'MinionsSpawning':
          this.Events.push(new MinionsSpawningEvent(event));
          break;
        case 'FirstBrick':
          this.Events.push(new FirstTowerEvent(event));
          break;
        case 'FirstBlood':
          this.Events.push(new FirstBloodEvent(event));
          break;
        case 'TurretKilled':
          this.Events.push(new TowerKilledEvent(event));
          break;
        case 'InhibKilled':
          this.Events.push(new InhibKilledEvent(event));
          break;
        case 'InhibRespawned':
          this.Events.push(new InhibRespawnedEvent(event));
          break;
        case 'InhibRespawningSoon':
          this.Events.push(new InhibRespawningSoonEvent(event));
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
          console.log('Cannot decode ingame event! Event type received:' + event.EventName);
          console.log(event);
          break;
      }
    });
  }
}