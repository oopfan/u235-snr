import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sandbox-home',
  templateUrl: './sandbox-home.component.html',
  styleUrls: ['./sandbox-home.component.css']
})
export class SandboxHomeComponent implements OnInit {
  browserTitle = 'SANDBOX | U235+SNR';

  constructor(
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
  }

}
