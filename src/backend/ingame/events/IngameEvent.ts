export class IngameEvent {
    eventType = 'ingame_event';
    EventID: number;
    EventName: string;
    EventTime: number;
    constructor(EventID: number, EventName: string, EventTime: number) {
      this.EventID = EventID;
      this.EventName = EventName;
      this.EventTime = EventTime;
    }
  }
  