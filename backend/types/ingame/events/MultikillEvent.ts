import { IngameEvent } from './IngameEvent';

export class MultikillEvent extends IngameEvent {
  KillerName: string;
  KillStreak: number;

  constructor({ EventID, EventName, EventTime, KillerName, Killstreak }: any) {
    super(EventID, EventName, EventTime);
    this.KillStreak = Killstreak;
    this.KillerName = KillerName;
  }
}
