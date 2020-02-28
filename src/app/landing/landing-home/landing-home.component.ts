import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.css']
})
export class LandingHomeComponent implements OnInit {
  browserTitle = 'Home | U235+SNR';
  pageTitle = 'Welcome to U235 Astrophotography';

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
  }

}
