import Timer from './Timer';

export default class BaronTimer {

    timer: Timer;
    hidden: boolean;

    constructor() {
        this.timer = new Timer(1200);
        this.hidden = true;
    }

    StartGame(): void {
        this.hidden = true;
        this.timer.maxTime = 1200;
        this.timer.lastGameTime = 0;
        this.timer.newGameTime = 0;
        this.timer.ResetTimer(0);
    }

    Reset(gameTime: number): void {
        this.timer.maxTime = 420;
        this.timer.ResetTimer(gameTime);
    }

    Pause(): void {
        this.timer.PauseTimer();
    }

    Unpause(): void {
        this.timer.UnpauseTimer();
    }

}