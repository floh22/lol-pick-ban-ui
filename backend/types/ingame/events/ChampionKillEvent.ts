import { IngameEvent } from './IngameEvent';

export class ChampionKillEvent extends IngameEvent {
  VictimName: string;
  KillerName: string;
  Assisters: Array<string>;

  constructor(EventID: number, EventName: string, EventTime: number, VictimName: string, KillerName: string, Assisters: Array<string>) {
    super(EventID, EventName, EventTime);
    this.VictimName = VictimName;
    this.KillerName = KillerName;
    this.Assisters = Assisters;
  }
}
