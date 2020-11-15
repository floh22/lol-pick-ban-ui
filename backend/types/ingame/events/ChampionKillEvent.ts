import { IngameEvent } from './IngameEvent';

export class ChampionKillEvent extends IngameEvent {
  VictimName: string;
  KillerName: string;
  Assisters: Array<string>;

  constructor({ EventID, EventName, EventTime, VictimName, KillerName, Assisters }: any) {
    super(EventID, EventName, EventTime);
    this.VictimName = VictimName;
    this.KillerName = KillerName;
    this.Assisters = Assisters;
  }
}
