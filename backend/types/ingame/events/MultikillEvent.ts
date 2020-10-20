import { IngameEvent } from './IngameEvent';

export class MultikillEvent extends IngameEvent {
  KillerName: string;
  KillStreak: number;

  constructor(EventID: number, EventName: string, EventTime: number, KillerName: string, Killstreak: number) {
    super(EventID, EventName, EventTime);
    this.KillStreak = Killstreak;
    this.KillerName = KillerName;
  }
}
