/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Timer {

    maxTime: number;
    timeLeft: number;
    intervalId?: NodeJS.Timeout;
    paused: boolean;
    lastGameTime: number;
    newGameTime: number;

    constructor(maxTime: number) {
        this.maxTime = maxTime;
        this.timeLeft = maxTime;
        this.intervalId = undefined;
        this.paused = false;
        this.lastGameTime = 0;
        this.newGameTime = 0;
    }

    ResetTimer(currentTime: number): void {
        this.timeLeft = this.maxTime;
        this.lastGameTime = currentTime;
        if (!this.IsRunning()) {
            this.StartTimer();
        }
    }

    StartTimer(): void {
        this.intervalId = setInterval(() => {
            if (this.paused)
                return;
            const timeDiff = (this.newGameTime) - (this.lastGameTime);
            this.timeLeft = this.timeLeft - timeDiff;
            this.lastGameTime = this.newGameTime;
            if (this.timeLeft <= 0 && this.intervalId !== undefined) {
                clearInterval(this.intervalId as NodeJS.Timeout);
                this.intervalId = undefined;
                this.timeLeft = 0;
            }
        }, 1000);
    }

    PauseTimer(): void {
        this.paused = true;
    }

    UnpauseTimer(): void {
        this.paused = false;
    }

    StopTimer(): void {
        if (this.intervalId !== undefined) {
            clearInterval(this.intervalId as NodeJS.Timeout);
            this.intervalId = undefined;
        }
    }

    IsRunning(): boolean {
        return this.intervalId !== undefined;
    }

    toJSON(): Record<string, any> {
        return {
            'maxTime': this.maxTime,
            'timeLeft': this.timeLeft,
            'paused': this.paused
        };
    }

}