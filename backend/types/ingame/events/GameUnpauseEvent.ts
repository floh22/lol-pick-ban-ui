import { IngameEvent } from './IngameEvent';

export class GameUnpauseEvent extends IngameEvent {
    EventName = 'GameUnpause';

    constructor(EventID: number, EventName: string, EventTime: number) {
        super(EventID, EventName, EventTime);
      }
}