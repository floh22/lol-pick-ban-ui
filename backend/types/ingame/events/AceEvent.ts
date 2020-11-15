import { IngameEvent } from './IngameEvent';

export class AceEvent extends IngameEvent {
  Acer: string;
  AcingTeam: string;
  constructor({ EventID, EventName, EventTime, Acer, AcingTeam }: any) {
    super(EventID, EventName, EventTime);
    this.Acer = Acer;
    this.AcingTeam = AcingTeam;
  }
}
