import { IngameEvent } from './IngameEvent';

export class GameStartEvent extends IngameEvent {
    EventName = 'GameStart';

    constructor({ EventID, EventName, EventTime }: any) {
        super(EventID, EventName, EventTime);
      }
}