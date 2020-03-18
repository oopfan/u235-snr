import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Timekeeper } from '@shared/classes';

@Component({
  selector: 'app-sandbox-home',
  templateUrl: './sandbox-home.component.html',
  styleUrls: ['./sandbox-home.component.css']
})
export class SandboxHomeComponent implements OnInit, OnDestroy {
  browserTitle = 'SANDBOX | U235+SNR';
  intervalId = 0;
  counter = 0;
  backgroundColor = 'cyan';
  date = new Date();
  timekeeper = new Timekeeper();


  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    this.timekeeper.setDate(this.date);
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  startTimer() {
    this.intervalId = window.setInterval(() => {
      this.backgroundColor = (this.counter++ & 1) == 0 ? 'magenta' : 'cyan';
      this.date.setTime(Date.now());
      this.timekeeper.setDate(this.date);
    }, 1000);
  }

  clearTimer() {
    window.clearInterval(this.intervalId);
  }

}
