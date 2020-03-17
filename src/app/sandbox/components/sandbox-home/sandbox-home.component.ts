import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

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

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  startTimer() {
    this.intervalId = window.setInterval(() => {
      this.backgroundColor = (this.counter++ & 1) == 0 ? 'magenta' : 'cyan';
    }, 1000);
  }

  clearTimer() {
    window.clearInterval(this.intervalId);
  }

}
