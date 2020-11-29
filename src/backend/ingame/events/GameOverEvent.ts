import { IngameEvent } from './IngameEvent';

export class GameOverEvent extends IngameEvent {
    eventType = 'game_over';

    constructor(EventID: number, EventName: string, EventTime: number) {
        super(EventID, 'GameOver', EventTime);
      }
}