import { IngameEvent } from './IngameEvent';

export class InhibRespawningSoonEvent extends IngameEvent {
    EventName = 'InhibRespawningSoon';
    InhibRespawningSoon: string;

    constructor({ EventID, EventName, EventTime, InhibRespawningSoon }: any) {
        super(EventID, EventName, EventTime);
        this.InhibRespawningSoon = InhibRespawningSoon;
      }
}