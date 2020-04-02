import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sandbox-home',
  templateUrl: './assistant-home.component.html',
  styleUrls: ['./assistant-home.component.css']
})
export class AssistantHomeComponent implements OnInit, OnDestroy {
  pageTitle = 'Assistant';
  browserTitle = this.pageTitle + ' | U235+SNR';
  intervalId = 0;
  assistants = [ 1 ];
  nextAssistant = 2;
  utcString = '';
  utcSubject: Subject<Date> = new Subject<Date>();

  constructor(
    private titleService: Title,
    private router: Router) {}

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    this.update();
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  onNewAssistant() {
    this.assistants.push(this.nextAssistant++);
  }

  onRemoveAssistant(value: any) {
    const index = this.assistants.findIndex(id => id === value);
    if (index >= 0) {
      this.assistants.splice(index, 1);
    }
  }

  startTimer() {
    this.intervalId = window.setInterval(() => {
      this.update();
    }, 1000);
  }

  update() {
    const date = new Date();
    this.utcString = date.toUTCString();
    this.utcSubject.next(date);
  }

  clearTimer() {
    window.clearInterval(this.intervalId);
  }

  onHelp(section: string) {
    this.router.navigate(['/help', section]);
  }

}
