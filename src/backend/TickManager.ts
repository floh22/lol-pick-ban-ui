import logger from './logging/logger';
import Timeout = NodeJS.Timeout;
import Tickable from './Tickable';

const log = logger('tick');

class TickManager {
  tickable: Tickable;
  timeout?: Timeout;
  //Ticks per second
  static tickRate = 2;

  constructor(kwargs: { tickable: Tickable }) {
    this.tickable = kwargs.tickable;
  }

  startLoop(): void {
    log.info(`Starting main loop with ${TickManager.tickRate} ticks/s!`);
    this.timeout = setInterval(() => this.runLoop(), 1000 / TickManager.tickRate);
  }

  async runLoop(): Promise<void> {
    await this.tickable.tick();
  }
}

export default TickManager;
