import Timer from './Timer';
import DragonTypes from './DragonTypes'

export default class DragonTimer {

    dragonType: DragonTypes;
    previousDragons: number;
    timer: Timer;
    hidden: false;

    constructor() {
        this.dragonType = DragonTypes.Default;
        this.previousDragons = 0;
        this.hidden = false;
        this.timer = new Timer(300);
    }

    StartGame(): void {
        this.hidden = false;
        this.timer.maxTime = 300;
        this.timer.lastGameTime = 0;
        this.timer.newGameTime = 0;
        this.timer.ResetTimer(0);
    }

    Reset(gameTime: number): void {
        this.timer.maxTime = 300;
        this.timer.ResetTimer(gameTime);
    }

    Pause(): void {
        this.timer.PauseTimer();
    }

    Unpause(): void {
        this.timer.UnpauseTimer();
    }

}