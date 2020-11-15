import { IngameEvent } from './IngameEvent';

export class BaronKillEvent extends IngameEvent {
  Stolen: boolean;
  KillerName: string;
  Assisters: Array<string>;

  constructor({ EventID, EventName, EventTime, Stolen, KillerName, Assisters }: any) {
    super(EventID, EventName, EventTime);
    this.Stolen = Stolen;
    this.KillerName = KillerName;
    this.Assisters = Assisters;
  }
}
