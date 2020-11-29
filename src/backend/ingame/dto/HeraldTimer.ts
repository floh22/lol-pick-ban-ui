import Timer from './Timer';

export default class HeraldTimer {

    timer: Timer;
    hidden: boolean;

    constructor() {
        this.timer = new Timer(480);
        this.hidden = false;
    }

    StartGame(): void {
        this.hidden = false;
        this.timer.maxTime = 480;
        this.timer.lastGameTime = 0;
        this.timer.newGameTime = 0;
        this.timer.ResetTimer(0);
    }

    Reset(gameTime: number): void {
        this.timer.maxTime = 360;
        this.timer.ResetTimer(gameTime);
    }

    Pause(): void {
        this.timer.PauseTimer();
    }

    Unpause(): void {
        this.timer.UnpauseTimer();
    }

}