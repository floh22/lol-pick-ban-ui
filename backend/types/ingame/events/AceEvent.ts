import { IngameEvent } from './IngameEvent';

export class AceEvent extends IngameEvent {
  Acer: string;
  AcingTeam: string;
  constructor(EventID: number, EventName: string, EventTime: number, Acer: string, AcingTeam: string) {
    super(EventID, EventName, EventTime);
    this.Acer = Acer;
    this.AcingTeam = AcingTeam;
  }
}
