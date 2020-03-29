import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-utilities-home',
  templateUrl: './utilities-home.component.html',
  styleUrls: ['./utilities-home.component.css']
})
export class UtilitiesHomeComponent implements OnInit {
  pageTitle = 'Utilities';
  browserTitle = this.pageTitle + ' | U235+SNR';

  constructor(
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
  }

}
