import { IngameEvent } from './IngameEvent';

export class MinionsSpawningEvent extends IngameEvent {
    EventName = 'MinionsSpawning';

    constructor(EventID: number, EventName: string, EventTime: number) {
        super(EventID, EventName, EventTime);
      }
}