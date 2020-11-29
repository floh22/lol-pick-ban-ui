import { IngameEvent } from './IngameEvent';

export class GameStartEvent extends IngameEvent {
    eventType = 'game_start';

    constructor({ EventID, EventName, EventTime }: any) {
        super(EventID, 'GameStart', EventTime);
      }
}