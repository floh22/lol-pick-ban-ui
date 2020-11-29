import { IngameEvent } from './IngameEvent';

export class FirstBloodEvent extends IngameEvent {
    EventName = 'FirstBlood';
    Recipient: string;

    constructor({ EventID, EventName, EventTime, Recipient }: any) {
        super(EventID, EventName, EventTime);
        this.Recipient = Recipient;
      }
}