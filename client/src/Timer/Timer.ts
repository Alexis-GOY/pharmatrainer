export class CountdownTimer {
    private startingTimeMs: number;
    private id: number;

    constructor(private timeMs = 0, private updateInterval = 10) {
        this.startingTimeMs = timeMs;
        this.updateInterval = updateInterval;
        this.updateCallback = time => {
        };
        this.timeoutCallback = () => {
        };
        this.id = -1;
    }

    setUpdateCallback(callback: (time: number) => void) {
        this.updateCallback = callback;
    }

    setTimeoutCalllback(callback: () => void) {
        this.timeoutCallback = callback;
    };

    update() {
        if (!this.isStarted()) return;

        this.timeMs -= this.updateInterval;
        if (this.timeMs < 0) {
            this.timeMs = 0;
            this.timeoutCallback();
            this.stop();
        }

        this.updateCallback(this.timeMs);
    }

    start(startingTimeMs = this.startingTimeMs) {
        if (this.id !== -1) return;

        this.startingTimeMs = startingTimeMs;
        this.timeMs = this.startingTimeMs;

        this.id = setInterval(this.update.bind(this), this.updateInterval) as unknown as number;
    }

    resetTime() {
        this.timeMs = this.startingTimeMs;
    }

    stop() {
        if (this.id !== -1) clearInterval(this.id);
        this.id = -1;
    }

    reset() {
        this.stop();
        this.start();
    }

    isStarted() {
        return (this.id !== -1);
    }

    isTimeout() {
        return (this.timeMs === 0);
    }

    getCurrentTimeMs() {
        return this.timeMs;
    }

    getStartingTimeMs() {
        return this.startingTimeMs;
    }

    getPercentTime() {
        return (this.timeMs / this.startingTimeMs) * 100.0;
    }

    private updateCallback = (time: number): void => {
    };

    private timeoutCallback = (): void => {
    };
}
