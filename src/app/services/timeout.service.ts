// based on:   https://stackoverflow.com/questions/3969475/javascript-pause-settimeout#answer-3969760

import { Injectable } from '@angular/core';

@Injectable()
export class TimeoutService {

  timeouts = new Array<Timeout>();
  removeFinishedTimeoutsInterval = 5000;
  removeFinishedTimeoutsIntervalId: any;
  paused = false;
  
  constructor() {
    this.setRemoveFinishedTimeoutsInterval();
  }
  
  setRemoveFinishedTimeoutsInterval() {
    this.removeFinishedTimeoutsIntervalId = setInterval(() => { 
      if (!this.paused) {
        this.removeFinishedTimeouts(); 
      }
    }, this.removeFinishedTimeoutsInterval);
  }

  setTimeout(callback, time) {
    const timeout = new Timeout(callback, time);
    this.timeouts.push(timeout);
    return timeout.timeoutId;
  }

  pause() {
    this.paused = true;
    clearInterval(this.removeFinishedTimeoutsIntervalId);
    this.timeouts.forEach((t) => {
      t.pause();
    });
  }

  resume() {
    this.setRemoveFinishedTimeoutsInterval();
    this.paused = false;
    this.timeouts.forEach((t) => {
      t.resume();
    });
  }

  remove(timeout) {
    const index = this.timeouts.indexOf(timeout, 0);
    if (index > -1) {
      this.timeouts.splice(index, 1);
    }
  }

  removeFinishedTimeouts() {
    const toRemove = Array<Timeout>();
    this.timeouts.forEach((t) => {
      if (t.start + t.remaining < Date.now()) {
        toRemove.push(t);
      }
    });
    toRemove.forEach((t) => {
      this.remove(t);
    });
  }

}


class Timeout {
  timeoutId: number;
  start: any; 
  remaining: number;
  callback: any;

  constructor(callback, time) {
    this.callback = callback;
    this.remaining = time;
    this.resume();
  }

  pause() {
    clearTimeout(this.timeoutId);
    this.remaining = Date.now() - this.start;
  }

  resume() {
    this.start = Date.now();
    // clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.callback, this.remaining);
  }

}
