import { IngameEvent } from './IngameEvent';

export class FirstTowerEvent extends IngameEvent {
    EventName = 'GamePause';

    constructor(EventID: number, EventName: string, EventTime: number) {
        super(EventID, EventName, EventTime);
      }
}