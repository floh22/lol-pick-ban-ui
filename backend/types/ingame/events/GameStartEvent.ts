import { IngameEvent } from './IngameEvent';

export class GameStartEvent extends IngameEvent {
    EventName = 'GameStart';

    constructor(EventID: number, EventName: string, EventTime: number) {
        super(EventID, EventName, EventTime);
      }
}