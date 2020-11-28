import { IngameEvent } from './IngameEvent';

export class GameCompletedEvent extends IngameEvent {
    eventType = 'GameCompleted';

    constructor({ EventID, EventName, EventTime }: any) {
        super(EventID, 'GameCompleted', EventTime);
      }
}