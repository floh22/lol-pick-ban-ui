import { IngameEvent } from './IngameEvent';

export class DragonKillEvent extends IngameEvent {
  DragonType: string;
  Stolen: boolean;
  KillerName: string;
  Assisters: Array<string>;

  constructor(EventID: number, EventName: string, EventTime: number, DragonType: string, Stolen: boolean, KillerName: string, Assisters: Array<string>) {
    super(EventID, EventName, EventTime);
    this.DragonType = DragonType;
    this.Stolen = Stolen;
    this.KillerName = KillerName;
    this.Assisters = Assisters;
  }
}
