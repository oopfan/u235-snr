import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-covid19-home',
  templateUrl: './covid19-home.component.html',
  styleUrls: ['./covid19-home.component.css']
})
export class Covid19HomeComponent implements OnInit {
  browserTitle = 'COVID-19 | U235+SNR';

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
  }

}
