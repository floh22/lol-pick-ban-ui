import { IngameEvent } from './IngameEvent';

export class InhibRespawnedEvent extends IngameEvent {
    EventName = 'InhibRespawned';
    InhibRespawned: string;

    constructor({ EventID, EventName, EventTime, InhibRespawned }: any) {
        super(EventID, EventName, EventTime);
        this.InhibRespawned = InhibRespawned;
      }
}