import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTargetService, TargetParsed } from '@core/services';

@Component({
  selector: 'app-target-create',
  templateUrl: './target-create.component.html',
  styleUrls: ['./target-create.component.css']
})
export class TargetCreateComponent implements OnInit {
  browserTitle = 'New Target | U235+SNR';
  pageTitle = 'New Target';
  navigateToUrl = '/targets';

  constructor(private titleService: Title, private targetService: UserTargetService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
  }

  onSubmit(value: TargetParsed) {
    this.targetService.create(
      value.name,
      '' + value.surfaceBrightness,
      value.rightAscension,
      value.declination
    );
    this.router.navigate([ this.navigateToUrl ]);
  }

  onCancel() {
    this.router.navigate([ this.navigateToUrl ]);
  }

}
