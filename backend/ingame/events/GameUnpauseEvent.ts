import { IngameEvent } from './IngameEvent';

export class GameUnpauseEvent extends IngameEvent {
    eventType = 'game_unpause'

    constructor(EventID: number, EventName: string, EventTime: number) {
        super(EventID, 'GameUnpause', EventTime);
      }
}