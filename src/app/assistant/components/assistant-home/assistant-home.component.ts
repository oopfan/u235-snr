import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { U235AstroFlashArg } from 'u235-astro';

@Component({
  selector: 'app-assistant-home',
  templateUrl: './assistant-home.component.html',
  styleUrls: ['./assistant-home.component.css']
})
export class AssistantHomeComponent implements OnInit {
  pageTitle = 'Assistant';
  browserTitle = this.pageTitle + ' | U235+SNR';
  assistants = [ 1 ];
  nextAssistant = 2;

  utcValue$: Observable<Date>;
  utcString$: Observable<string>;
  utcFlash$: Observable<U235AstroFlashArg>;

  constructor(
    private titleService: Title,
    private router: Router) {}

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);

    this.utcValue$ = interval(1000).pipe(map(() => { return new Date(); }));
    this.utcString$ = this.utcValue$.pipe(map((date) => { return date.toUTCString(); }));
    this.utcFlash$ = this.utcValue$.pipe(map(() => { return {}; }));
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

  onHelp(section: string) {
    this.router.navigate(['/help', section]);
  }

}
