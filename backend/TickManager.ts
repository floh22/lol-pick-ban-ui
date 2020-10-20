import logger from './logging/logger';
import Timeout = NodeJS.Timeout;
import Tickable from './Tickable';

const log = logger('tick');

class TickManager {
  tickable: Tickable;
  timeout?: Timeout;
  tickRate = 1;

  constructor(kwargs: { tickable: Tickable }) {
    this.tickable = kwargs.tickable;
  }

  startLoop(): void {
    log.info(`Starting main loop with ${1 / this.tickRate} ticks/s!`);
    this.timeout = setInterval(() => this.runLoop(), 1000 / this.tickRate);
  }

  async runLoop(): Promise<void> {
    await this.tickable.tick();
  }
}

export default TickManager;
