import { IngameEvent } from './IngameEvent';

export  class TowerKilledEvent extends IngameEvent {
    EventName = 'TurretKilled';
    TurretKilled: string;
    KillerName: string;
    Assisters: Array<string>;

    constructor(EventID: number, EventName: string, EventTime: number, TurretKilled: string, KillerName: string, Assisters: Array<string>) {
        super(EventID, EventName, EventTime);
        this.TurretKilled = TurretKilled;
        this.KillerName = KillerName;
        this.Assisters = Assisters;
      }
}