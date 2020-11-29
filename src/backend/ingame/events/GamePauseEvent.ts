import { IngameEvent } from './IngameEvent';

export class GamePauseEvent extends IngameEvent {
    eventType = 'game_pause';

    constructor(EventID: number, EventName: string, EventTime: number) {
        super(EventID, 'GamePause', EventTime);
      }
}