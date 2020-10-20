import { IngameEvent } from './IngameEvent';

export class HeraldKillEvent extends IngameEvent {
  Stolen: boolean;
  KillerName: string;
  Assisters: Array<string>;

  constructor(EventID: number, EventName: string, EventTime: number, Stolen: boolean, KillerName: string, Assisters: Array<string>) {
    super(EventID, EventName, EventTime);
    this.Stolen = Stolen;
    this.KillerName = KillerName;
    this.Assisters = Assisters;
  }
}
