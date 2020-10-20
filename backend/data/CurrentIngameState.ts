import { IngameSession } from '../types/ingame/IngameSession';
import { IngameStats } from '../types/ingame/IngameStats';

export class CurrentIngameState {
  session: IngameSession;
  gameStats: IngameStats;

  constructor(session: IngameSession, gameStats: IngameStats) {
    this.session = session;
    this.gameStats = gameStats;
  }
}