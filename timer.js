class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);

    }

    start = () => {
        if(this.status === 'started' ){
            return;
        }

        if(this.onStart){
            this.onStart(this.timeRemaining);
        }

        this.tick();
        this.interval = setInterval(this.tick, 10);
        this.status = 'started';
    }

    pause = () => {
        clearInterval(this.interval);
        this.status = 'paused';
    }

    tick = () => {
        
        if (this.timeRemaining <= 0) {
            this.pause();
            this.status = 'completed';
            if(this.onComplete){
                this.onComplete();
            }
            return;
        }
        this.timeRemaining = this.timeRemaining - .01;
        if(this.onTick){
            this.onTick(this.timeRemaining);
        }
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}