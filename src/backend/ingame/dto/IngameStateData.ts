import BaronTimer from '../dto/baronTimer';
import DragonTimer from '../dto/dragonTimer';
import HeraldTimer from './HeraldTimer';

export class IngameStateData {
    dragonTimer: DragonTimer;
    baronTimer: BaronTimer;
    heraldTimer: HeraldTimer;
    blueGold: number;
    redGold: number;
    gameTime: number;

    gamePaused: boolean;

    constructor() {
        this.dragonTimer = new DragonTimer();
        this.baronTimer = new BaronTimer();
        this.heraldTimer = new HeraldTimer();
        this.blueGold = 0;
        this.redGold = 0;
        this.gameTime = 0;

        this.gamePaused = false;
    }
}