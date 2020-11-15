import { IngameEvent } from './IngameEvent';

export class DragonKillEvent extends IngameEvent {
  DragonType: string;
  Stolen: boolean;
  KillerName: string;
  Assisters: Array<string>;

  constructor({ EventID, EventName, EventTime, DragonType, Stolen, KillerName, Assisters }: any) {
    super(EventID, EventName, EventTime);
    this.DragonType = DragonType;
    this.Stolen = Stolen;
    this.KillerName = KillerName;
    this.Assisters = Assisters;
  }
}
