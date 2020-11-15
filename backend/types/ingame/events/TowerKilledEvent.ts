import { IngameEvent } from './IngameEvent';

export  class TowerKilledEvent extends IngameEvent {
    EventName = 'TurretKilled';
    TurretKilled: string;
    KillerName: string;
    Assisters: Array<string>;

    constructor({ EventID, EventName, EventTime, TurretKilled, KillerName, Assisters }: any) {
        super(EventID, EventName, EventTime);
        this.TurretKilled = TurretKilled;
        this.KillerName = KillerName;
        this.Assisters = Assisters;
      }
}