import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
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
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
  }

  onHelp(section: string) {
    this.router.navigate(['/help', section]);
  }

}
