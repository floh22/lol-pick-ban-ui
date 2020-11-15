import { IngameEvent } from './IngameEvent';

export class FirstTowerEvent extends IngameEvent {
    EventName = 'FirstTower';

    constructor({ EventID, EventName, EventTime }: any) {
        super(EventID, EventName, EventTime);
      }
}