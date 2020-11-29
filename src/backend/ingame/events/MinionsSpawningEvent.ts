import { IngameEvent } from './IngameEvent';

export class MinionsSpawningEvent extends IngameEvent {
    EventName = 'MinionsSpawning';

    constructor({ EventID, EventName, EventTime }: any) {
        super(EventID, EventName, EventTime);
      }
}